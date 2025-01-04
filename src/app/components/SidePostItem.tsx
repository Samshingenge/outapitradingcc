'use client';

import { PostProps } from "@/sections/Posts";
import Link from "next/link";
import React from "react";
import { Box, Image } from '@chakra-ui/react';

export default function SidePostItem({item}: {item: PostProps}) {
    const defaultImage = "/default-placeholder.jpg";

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = defaultImage;
    };

    return (
        <div className="post-entry-1 border-bottom">
            <div className="d-flex mb-3">
                <div className="side-post-img-container me-3">
                    <Link href={`/postitems/${item._id}`}>
                        <Image
                            src={item.img || defaultImage}
                            alt={item.title}
                            width="100px"
                            height="100px"
                            objectFit="cover"
                            borderRadius="md"
                            onError={handleImageError}
                            loading="lazy"
                            fallbackSrc={defaultImage}
                        />
                    </Link>
                </div>
                <div className="flex-grow-1">
                    <div className="post-meta">
                        <span className="date">
                            {item.category}
                        </span>
                        <span className="mx-1">
                            <i className="bi bi-dot"></i>
                        </span>
                        <span>{new Date(item.date).toLocaleDateString('en-US')}</span> 
                    </div>
                    <h2 className="mb-2">
                        <Link href={`/postitems/${item._id}`}>{item.title}</Link>
                    </h2>
                    {item.author && (
                        <span className="author mb-3 d-block">{item.author}</span>
                    )}
                </div>
            </div>
        </div>
    );
}