import Layout from "../components/layout";
import React, {useState} from "react";
import {
  SimpleGrid,
  Box,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Text
} from "@chakra-ui/react";

export default function Home() {
  const allowedBreeds = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "French Bulldog",
    "Bulldog",
    "Poodle",
    "Beagle",
    "Rottweiler",
    "Dachshund",
    "Yorkshire Terrier",
  ];

  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [preExisting, setPreExisting] = useState("");
  const [coverage, setCoverage] = useState("");
  const [quote, setQuote] = useState<null | {
    totalPremium: number;
    breakdown: Record<string, number>;
  }>(null);

  // Error state
  const [errors, setErrors] = useState({
    breed: "",
    age: "",
    preExisting: "",
    coverage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { breed: "", age: "", preExisting: "", coverage: "" };

    if (!allowedBreeds.includes(breed.trim())) {
      newErrors.breed = "Please enter a valid breed";
      valid = false;
    }

    if (!age || isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = "Age must be a positive number";
      valid = false;
    }

    if (!preExisting) {
      newErrors.preExisting = "Please select an option";
      valid = false;
    }

    if (!coverage) {
      newErrors.coverage = "Please select a coverage level";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch('https://pet-insurance.matthayward.workers.dev/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            breed: breed.trim(),
            age: Number(age),
            hasPreExistingConditions: preExisting === 'true',
            coverageLevel: coverage,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
  
        const result = await response.json();

        console.log('Calculation result:', result);
        setQuote(result);
      } catch (error) {
        console.error('Error during API call:', error);
      }
    }
  };
  
  return (
    <Layout>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <VStack spacing={8} p={8} align="stretch">
          <SimpleGrid columns={[1, 2]} spacing={8}>
            <FormControl isRequired isInvalid={!!errors.breed}>
              <FormLabel htmlFor="breed">Dog Breed</FormLabel>
              <Input
                id="breed"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Labrador Retriever"
              />
              <FormErrorMessage>{errors.breed}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.age}>
              <FormLabel htmlFor="age">Dog Age</FormLabel>
              <Input
                id="age"
                name="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 5"
              />
              <FormErrorMessage>{errors.age}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.preExisting}>
              <FormLabel htmlFor="hasPreExistingConditions">
                Pre-existing Conditions
              </FormLabel>
              <Select
                id="hasPreExistingConditions"
                name="hasPreExistingConditions"
                value={preExisting}
                onChange={(e) => setPreExisting(e.target.value)}
                placeholder="Select option"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
              <FormErrorMessage>{errors.preExisting}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.coverage}>
              <FormLabel htmlFor="coverageLevel">Coverage Level</FormLabel>
              <Select
                id="coverageLevel"
                name="coverageLevel"
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
                placeholder="Select option"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </Select>
              <FormErrorMessage>{errors.coverage}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <Button colorScheme="blue" type="submit" size="lg" width="100%">
            Calculate
          </Button>

          {quote && (
            <Box mt={6} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Total Premium: ${quote.totalPremium.toFixed(2)}
              </Text>
              <Text fontWeight="semibold" mb={2}>
                Breakdown:
              </Text>
              <VStack align="start" spacing={1}>
                {Object.entries(quote.breakdown).map(([key, value]) => (
                  <Text key={key}>
                    {key}: ${value.toFixed(2)}
                  </Text>
                ))}
              </VStack>
            </Box>
          )}

        </VStack>
      </form>
    </Layout>
  );
}
