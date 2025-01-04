'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface ImageUploadProps {
  currentImage?: string;
  onImageSelect: (imageUrl: string) => void;
}

export default function ImageUpload({ currentImage, onImageSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'Please select an image under 5MB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormControl>
      <FormLabel>Post Image</FormLabel>
      <VStack spacing={4} align="stretch">
        <Box
          position="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {preview ? (
            <Box position="relative">
              <Image
                src={preview}
                alt="Preview"
                borderRadius="md"
                objectFit="cover"
                w="100%"
                h="200px"
                opacity={isHovered ? 0.7 : 1}
                transition="opacity 0.2s"
              />
              {isHovered && (
                <Button
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  colorScheme="blue"
                  size="sm"
                >
                  Change Image
                </Button>
              )}
            </Box>
          ) : (
            <Box
              borderWidth={2}
              borderStyle="dashed"
              borderRadius="md"
              p={8}
              textAlign="center"
              bg="gray.50"
              _hover={{ bg: 'gray.100' }}
            >
              <AddIcon mb={2} />
              <Box>Click or drag to upload image</Box>
            </Box>
          )}
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            onChange={handleImageChange}
            cursor="pointer"
          />
        </Box>
        <FormHelperText>
          Recommended: 1200x800px or larger. Max size: 5MB
        </FormHelperText>
      </VStack>
    </FormControl>
  );
}
