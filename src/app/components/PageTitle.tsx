'use client';

import React from 'react';
import './pageTitle.css';

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="section-header d-flex justify-content-between align-items-center mb-5">
      <h2>{title}</h2>
      <div className="section-line"></div>
    </div>
  );
}