"use client";

import { Suspense, use } from 'react';
import { initialPosts, PostProps } from "@/sections/Posts";
import React, { useState, useEffect } from "react";
import "./style.css";
import Image from 'next/image';
import Preloader from "@/app/components/Preloader";
import SidePostItem from "@/app/components/SidePostItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function PostPage({ params }: PageProps) {
    const resolvedParams = use(params);
    return (
        <main id="main">
            <Suspense fallback={<div>Loading...</div>}>
                <PostContent id={resolvedParams.id} />
            </Suspense>
        </main>
    );
}

interface PostContentProps {
    id: string;
}

function PostContent({ id }: PostContentProps) {
    const [item, setItem] = useState(initialPosts);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const defaultImage = "/default-placeholder.jpg";

    const tabsData = [
        { id: 1, name: 'Popular', active: true },
        { id: 2, name: 'Trending', active: false },
    ];

    const [tabs, setTabs] = useState(tabsData);

    const handleTabActive = (id: number): void => {
        const updatedTabs = tabs.map(tab => ({
            ...tab,
            active: tab.id === id
        }));
        setTabs(updatedTabs);
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = defaultImage;
    };

    const getSinglePostData = async () => {
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
    }

    const getItemsData = async () => {
        try {
            const res = await fetch('/api/postitems');
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            setItems(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
            console.error(e);
        }
    }

    useEffect(() => {
        getSinglePostData();
        getItemsData();
    }, [id]);

    if (isLoading) return <Preloader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <section className="single-post-content">
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-md-9 post-content">
                        {item && item.category !=='' ? ( 
                            <div className="single-post">
                                <div className="post-meta">
                                    <span className="date">{item.category}</span>
                                    <span className="mx-1">
                                        <i className="bi bi-dot"></i>{' '}
                                    </span>{' '}
                                    <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
                                </div>
                                <h1 className="mb-4">{item.title}</h1>

                                <div className="post-content-wrapper">
                                    <figure className="post-figure">
                                        <div className="post-image-container">
                                            <img 
                                                src={item.img || defaultImage}
                                                alt={item.title} 
                                                className="img-fluid"
                                                onError={handleImageError}
                                                loading="lazy"
                                            />
                                        </div>
                                        <figcaption>{item.title}</figcaption>
                                    </figure>

                                    <div className="post-text-content">
                                        <p>
                                            <span className="firstcharacter">
                                                {item.brief && item.brief.charAt(0)}
                                            </span>
                                            {item.brief && item.brief.substring(1)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Preloader/>
                        )}
                    </div>
                    <div className="col-md-3">
                        <div className="aside-block">
                          <ul className="nav nav-pills custom-tab-nav mb-4">
                          {
                                tabs.map(tab=>(
                                    <li className="nav-item" key={tab.id}>
                                        <button className={`nav-link ${tab.active ? 'active' : undefined}`}
                                        onClick={()=>handleTabActive(tab.id)}
                                        >
                                            {tab.name}
                                            </button>
                                    </li>
                                ))
                            }
                          </ul>
                          <div className="tab-content">
                            <div className={`tab-pane fade ${tabs[0].active ? 'show active' : undefined}`}>
                                {items.slice(0,3).map((item: PostProps) => (    
                                    <SidePostItem item={item} key={item._id}/>
                                ))}
                            </div>
                            <div className={`tab-pane fade ${tabs[1].active ? 'show active' : undefined}`}>
                                {items.slice(3,6).map((item: PostProps) => (    
                                    <SidePostItem item={item} key={item._id}/>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div className="aside-block">
                           <h3 className="aside-title">Video</h3>
                           <div className="link-video">
                                <a href="https://www.youtube.com/watch?v=9No-FiEInLA">
                                    <span className="bi bi-play"></span>
                                    <img src="/assets/img/post-landscape-1.jpg" alt="Video" className="img-fluid"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}