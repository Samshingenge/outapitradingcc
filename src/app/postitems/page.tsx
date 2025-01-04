"use server";

import React from "react";
import Preloader from "../components/Preloader";
import PostItemOne from "../components/PostItemOne";
import { PostProps } from "@/sections/Posts";
import PageTitle from "../components/PageTitle";

export default async function PostItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/postitems`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const items = await res.json();

  return (
    <main id="main">
      <section id="posts" className="posts">
        <div className="container" data-aos="fade-up">
          <div className="row g-5">
            <PageTitle title="All Posts"/>
            {items && items.length > 0 ? (
              items.map((item: PostProps) => (
                <div className="col-lg-3 col-md-6" key={item._id}>
                  <PostItemOne large={false} item={item}/>
                </div>
              ))
            ) : <Preloader/>}
          </div>
        </div>
      </section>
    </main>
  );
}