'use client';

import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Container, 
  VStack 
} from '@chakra-ui/react';
import PostsTable from './PostsTable';
import { ChakraProvider } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg="gray.50">
        <Container maxW="container.xl" py={10}>
          <Flex direction="column" align="stretch">
            <Heading 
              mb={8} 
              textAlign="center" 
              size="2xl" 
              color="blue.600"
            >
              Print Shop Dashboard
            </Heading>
            
            <VStack spacing={6} width="full">
              <PostsTable />
              {/* You can add more dashboard components here in the future */}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
