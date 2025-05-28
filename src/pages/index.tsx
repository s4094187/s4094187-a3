import Layout from "../components/layout";
import React from "react";
import { SimpleGrid, Box, Input, Select } from '@chakra-ui/react';

export default function Home() {
  return (
    <Layout>
      <SimpleGrid columns={2} spacing={8} p={8}>
      <Box p={4} borderRadius="md">
        <Input name="breed" placeholder='Dog breed'/>
      </Box>
      <Box p={4} borderRadius="md">
        <Input name="age" placeholder='Dog age'/>
      </Box>
      <Box p={4} borderRadius="md">
        <Select name="hasPreExistingConditions " placeholder='Select option'>
          <option value='true'>True</option>
          <option value='false'>False</option>
        </Select>
      </Box>
      <Box p={4} borderRadius="md">
      <Select name="coverageLevel" placeholder='Select option'>
        <option value='basic'>Basic</option>
        <option value='standard'>Standard</option>
        <option value='premium'>Premium</option>
      </Select>
      </Box>
    </SimpleGrid>
    </Layout>
  );
}