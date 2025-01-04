"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./posts.css";
import PostItemOne from "@/app/components/PostItemOne";
import TrendingPost from "@/app/components/TrendingPost";
import Preloader from "@/app/components/Preloader";

export interface PostProps {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
}

export const initialPosts = {
  _id: "",
  img: "default-placeholder.jpg",  // Default placeholder image
  category: "",
  date: "",
  title: "",
  brief: "",
  avatar: "default-avatar.jpg",    // Default avatar image
  author: "",
};

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getItemsData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/postitems');
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setItems(data);
      // If we have posts, set the first one as the featured post
      if (data && data.length > 0) {
        setItem(data[0]); // Set the first post directly
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getSinglePostData = async (id: string) => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const res = await fetch(`/api/postitems/${id}`);
      if (res.status === 404) {
        router.push('/not-found');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await res.json();
      setItem(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            {isLoading ? (
              <Preloader />
            ) : (
              <PostItemOne large={true} item={item} />
            )}
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {isLoading ? (
                  <Preloader />
                ) : (
                  items &&
                  items.length > 0 ? (
                    items
                      .filter(
                        (item: { trending: boolean; top: boolean }) =>
                          !item.trending && !item.top
                      )
                      .slice(0, 3)
                      .map((item: PostProps) => (
                        <PostItemOne key={item._id} large={false} item={item} />
                      ))
                  ) : (
                    <Preloader />
                  )
                )}
              </div>
              <div className="col-lg-4 border-start custom-border">
                {isLoading ? (
                  <Preloader />
                ) : (
                  items &&
                  items.length > 0 ? (
                    items
                      .filter((item: { trending: boolean; top: boolean }) =>
                        !item.trending && !item.top
                      )
                      .slice(3, 6)
                      .map((item: PostProps) => (
                        <PostItemOne key={item._id} large={false} item={item} />
                      ))
                  ) : (
                    <Preloader />
                  )
                )}
              </div>
              <div className="col-lg-4">
                <div className="treding">
                  <h3>Trending</h3>
                  <ul className="trending">
                    {isLoading ? (
                      <Preloader />
                    ) : (
                      items && items.length > 0 ? (
                        items
                          .filter((item: { trending: boolean }) => item.trending)
                          .map((item: PostProps, index: number) => (
                            <TrendingPost key={item._id} index={index} item={item} />
                          ))
                      ) : (
                        <Preloader />
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
}
