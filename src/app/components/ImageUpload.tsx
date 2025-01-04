'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Text,
  VStack,
  useToast,
  Progress,
  Image,
} from '@chakra-ui/react';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  defaultImage?: string;
}

export default function ImageUpload({ onImageUpload, defaultImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(defaultImage || '');
  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'printshop_uploads');

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);
      
      // Validate the returned URL
      if (!data.secure_url) {
        throw new Error('No URL returned from upload');
      }

      // Test the image URL
      const img = new window.Image();
      img.onload = () => {
        onImageUpload(data.secure_url);
        toast({
          title: 'Image uploaded successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      };
      img.onerror = () => {
        throw new Error('Invalid image URL returned');
      };
      img.src = data.secure_url;

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setPreviewUrl(defaultImage || '');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onImageUpload, toast, defaultImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
  });

  return (
    <Box>
      <VStack
        {...getRootProps()}
        p={4}
        border="2px dashed"
        borderColor={isDragActive ? 'blue.400' : 'gray.200'}
        borderRadius="md"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: 'blue.400' }}
        bg={isDragActive ? 'gray.50' : 'white'}
        spacing={4}
      >
        <input {...getInputProps()} />
        
        {previewUrl ? (
          <Box 
            position="relative" 
            width="100%" 
            height="200px"
            overflow="hidden"
            borderRadius="md"
          >
            <Image
              src={previewUrl}
              alt="Preview"
              objectFit="cover"
              width="100%"
              height="100%"
              fallbackSrc="https://via.placeholder.com/200"
              onError={(e: any) => {
                e.target.src = 'https://via.placeholder.com/200';
              }}
            />
          </Box>
        ) : (
          <Text textAlign="center" color="gray.500">
            {isDragActive
              ? 'Drop the image here'
              : 'Drag and drop an image here, or click to select'}
          </Text>
        )}
      </VStack>

      {uploading && (
        <Progress
          size="sm"
          value={uploadProgress}
          mt={2}
          colorScheme="blue"
          isAnimated
          hasStripe
        />
      )}
    </Box>
  );
}
