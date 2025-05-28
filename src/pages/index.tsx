import Layout from "../components/layout";
import React from "react";
import {
  SimpleGrid,
  Box,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <form style={{ width: "100%" }}>
        <VStack spacing={8} p={8} align="stretch">
          <SimpleGrid columns={[1, 2]} spacing={8}>
            <FormControl>
              <FormLabel htmlFor="breed">Dog Breed</FormLabel>
              <Input id="breed" name="breed" placeholder="e.g. Labrador Retriever" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="age">Dog Age</FormLabel>
              <Input id="age" name="age" placeholder="e.g. 5" type="number" />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="hasPreExistingConditions">
                Pre-existing Conditions
              </FormLabel>
              <Select
                id="hasPreExistingConditions"
                name="hasPreExistingConditions"
                placeholder="Select option"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="coverageLevel">Coverage Level</FormLabel>
              <Select
                id="coverageLevel"
                name="coverageLevel"
                placeholder="Select option"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </Select>
            </FormControl>
          </SimpleGrid>

          <Button colorScheme="blue" type="submit" size="lg" width="100%">
            Calculate
          </Button>
        </VStack>
      </form>
    </Layout>
  );
}
