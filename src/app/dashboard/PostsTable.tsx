'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Flex,
  Heading,
  useToast,
  IconButton,
  useColorModeValue,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { Post } from '../api/posts';
import PostModal from './PostModal';

interface Post {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
  top?: boolean;
  trending?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/postitems');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        title: 'Error loading posts',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    router.push('/createpostitems');
  };

  const handleEdit = (post: Post) => {
    router.push(`/createpostitems/${post._id}`);
  };

  const handleDelete = async (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        const response = await fetch(`/api/postitems/${postToDelete}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        
        toast({
          title: 'Post deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        loadPosts();
      } catch (error) {
        toast({
          title: 'Error deleting post',
          description: 'Please try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Posts Management</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleCreate}
          size="md"
        >
          Create New Post
        </Button>
      </Flex>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgColor}
        borderColor={borderColor}
        shadow="sm"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Author</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post._id}>
                <Td>{post.title}</Td>
                <Td>{post.category}</Td>
                <Td>{post.author}</Td>
                <Td>
                  <Box 
                    width="100px" 
                    height="100px" 
                    position="relative"
                    overflow="hidden"
                    borderRadius="md"
                  >
                    <Image
                      src={post.img}
                      alt={post.title}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/100"
                      onError={(e: any) => {
                        e.target.src = 'https://via.placeholder.com/100';
                      }}
                    />
                  </Box>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Edit post"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEdit(post)}
                  />
                  <IconButton
                    aria-label="Delete post"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(post._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={selectedPost}
        onSubmit={loadPosts}
      />

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}