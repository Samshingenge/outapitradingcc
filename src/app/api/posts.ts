import { heroSlides } from '../data/data';

export interface Post {
  id: number;
  title: string;
  brief: string;
  bgImg: string;
  content?: string;
}

// Initial posts data from heroSlides
let posts: Post[] = [...heroSlides];

// Simulated API functions
export const getPosts = async (): Promise<Post[]> => {
  return posts;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const newPost = {
    ...post,
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    content: post.content || '',  // Ensure content is always a string
  };
  posts = [...posts, newPost];
  return newPost;
};

export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  posts[index] = { 
    ...posts[index], 
    ...post,
    content: post.content ?? posts[index].content  // Preserve existing content if not provided
  };
  return posts[index];
};

export const deletePost = async (id: number): Promise<void> => {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  posts = posts.filter(p => p.id !== id);
};
