'use client';

import React from 'react';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { FormControl } from '@chakra-ui/form-control';
import { FormLabel } from '@chakra-ui/form-control';
import { FormErrorMessage } from '@chakra-ui/form-control';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal';
import { Post } from '../api/posts';
import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: Post;
  onSubmit: () => void;
  updatePost: (id: string, data: Omit<Post, 'id'>) => Promise<void>;
  createPost: (data: Omit<Post, 'id'>) => Promise<void>;
}

export default function PostModal({ isOpen, onClose, post, onSubmit, updatePost, createPost }: PostModalProps) {
  const [formData, setFormData] = React.useState<Omit<Post, 'id'>>({
    title: post?.title || '',
    brief: post?.brief || '',
    bgImg: post?.bgImg || '',
    content: post?.content || '',  
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const toast = useToast();

  React.useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        brief: post.brief,
        bgImg: post.bgImg,
        content: post.content || '',
      });
    } else {
      setFormData({
        title: '',
        brief: '',
        bgImg: '',
        content: '',
      });
    }
    setErrors({});
  }, [post]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.brief.trim()) {
      newErrors.brief = 'Brief description is required';
    }
    if (!formData.bgImg) {
      newErrors.bgImg = 'Image is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form data
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.brief.trim()) {
      newErrors.brief = 'Brief description is required';
    }
    if (!formData.bgImg.trim()) {
      newErrors.bgImg = 'Background image is required';
    }

    // Ensure content is always a string
    const content = formData.content ?? '';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        content,  // Use the ensured string value
      };

      if (post?.id) {
        // Update existing post
        await updatePost(post.id, submissionData);
        toast({
          title: 'Post Updated',
          description: "The post has been successfully updated.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new post
        await createPost(submissionData);
        toast({
          title: 'Post Created',
          description: "A new post has been successfully created.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      onClose();
      onSubmit();
    } catch (error) {
      toast({
        title: 'Error',
        description: "There was an error processing your post.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: '' }));
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, bgImg: imageUrl }));
    if (errors.bgImg) {
      setErrors((prev) => ({ ...prev, bgImg: '' }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={(e) => e.preventDefault()} maxH="90vh" overflowY="auto">
        <ModalHeader>{post ? 'Edit Post' : 'Create New Post'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6}>
            <FormControl isRequired isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.brief}>
              <FormLabel>Brief Description</FormLabel>
              <Input
                name="brief"
                value={formData.brief}
                onChange={handleChange}
                placeholder="Enter a short description"
              />
              <FormErrorMessage>{errors.brief}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.content}>
              <FormLabel>Content</FormLabel>
              <Box borderWidth={1} borderRadius="md" borderColor={errors.content ? 'red.500' : 'inherit'}>
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  height={400}
                />
              </Box>
              <FormErrorMessage>{errors.content}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.bgImg}>
              <ImageUpload
                currentImage={formData.bgImg}
                onImageSelect={handleImageSelect}
              />
              <FormErrorMessage>{errors.bgImg}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {post ? 'Save Changes' : 'Create Post'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
