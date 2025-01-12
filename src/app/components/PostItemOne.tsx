'use client';

import React from 'react';
import Link from 'next/link';
import './postItemOne.css';
import { PostProps } from '@/sections/Posts';


interface PostItemOneProps {
  large: boolean;
  item: PostProps;
}

export default function PostItemOne({ large, item }: PostItemOneProps) {
  const defaultImage = "/default-placeholder.jpg";
  const defaultAvatar = "/default-avatar.jpg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultAvatar;
  };

  return (
    <div className={`post-entry-1 ${large ? 'lg' : ''}`}>
      <Link href={`/postitems/${item._id}`}>
        <div className="post-image-container">
          <img 
            src={item.img || defaultImage}
            alt={item.title || "Post image"} 
            className="img-fluid"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="post-meta">
        <span className="date">{item.category}</span>
        <span className="mx-1">
          <i className="bi bi-dot"></i>{' '}
        </span>{' '}
        <span>{item.date ? new Date(item.date).toLocaleDateString('en-US') : ''}</span>
      </div>
      <h2>
        <Link href={`/postitems/${item._id}`}>{item.title}</Link>
      </h2>
      {large ? (
        <>
          <p className="mb-4 d-block">{item.brief}</p>
          <div className="d-flex align-items-center author">
            <div className="photo">
              <img 
                src={item.avatar || defaultAvatar}
                alt={`${item.author}'s avatar`} 
                className="img-fluid"
                onError={handleAvatarError}
                loading="lazy"
              />
            </div>
            <div className="name">
              <h3 className="m-0 p-0">{item.author}</h3>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
