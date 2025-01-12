import React from "react";
import Preloader from "../components/Preloader";
import PostItemOne from "../components/PostItemOne";
import { PostProps } from "@/sections/Posts";
import PageTitle from "../components/PageTitle";

// Custom error component with proper typing
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="container text-center py-5">
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
}

export default async function PostItems() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/postitems`,
      {
        cache: 'no-store', // Disable caching
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const items = await res.json();

    // Handle case where items is null or undefined
    if (!items) {
      return <Preloader />;
    }

    return (
      <main id="main">
        <section id="posts" className="posts">
          <div className="container" data-aos="fade-up">
            <div className="row g-5">
              <PageTitle title="All Posts" />
              {items.length > 0 ? (
                items.map((item: PostProps) => (
                  <div className="col-lg-3 col-md-6" key={item._id}>
                    <PostItemOne large={false} item={item} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No posts found</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <ErrorMessage message={error instanceof Error ? error.message : 'An unknown error occurred'} />;
  }
}