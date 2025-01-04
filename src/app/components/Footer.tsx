'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { navs } from '../data/data';

interface Category {
    _id: string;
    name: string;
}

export default function Footer() {
    const [categories, setCategories] = useState<Category[]>([]);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/postitems');
            const posts = await response.json();
            
            // Create a Set to track unique categories
            const uniqueCategories = new Set();
            posts.forEach((post: any) => {
                if (!uniqueCategories.has(post.category)) {
                    uniqueCategories.add(post.category);
                }
            });

            // Convert to array of category objects
            const categoryArray = Array.from(uniqueCategories).map((name, index) => ({
                _id: index.toString(),
                name: name as string
            }));

            setCategories(categoryArray);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container py-3">
                <div className="row gy-4">
                    {/* About Column */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-uppercase mb-4">About PrintShop</h5>
                        <p className="mb-4">
                            PrintShop is your premier destination for high-quality printing services 
                            and creative solutions. We take pride in delivering exceptional print 
                            products.
                        </p>
                        <div className="social-links">
                            <a href="#" className="me-3 text-white">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="#" className="me-3 text-white">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="me-3 text-white">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="text-white">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-uppercase mb-4">Navigation</h5>
                        <ul className="list-unstyled">
                            {navs.map((nav) => (
                                <li key={nav.id} className="mb-2">
                                    <Link href={nav.link} className="text-white text-decoration-none hover-link">
                                        <i className="bi bi-chevron-right me-2 small"></i>
                                        {nav.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories Column */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="text-uppercase mb-4">Categories</h5>
                        <ul className="list-unstyled">
                            {categories.map((category) => (
                                <li key={category._id} className="mb-2">
                                    <Link 
                                        href={`/category/${category.name}`} 
                                        className="text-white text-decoration-none hover-link"
                                    >
                                        <i className="bi bi-folder me-2 small"></i>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row mt-5">
                    <div className="col-12">
                        <hr className="bg-light opacity-25" />
                        <p className="text-center mb-0 py-3">
                            &copy; {new Date().getFullYear()} PrintShop. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    position: relative;
                    width: 100%;
                }
                .hover-link {
                    transition: all 0.3s ease;
                }
                .hover-link:hover {
                    opacity: 0.8;
                }
                .social-links a {
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                .social-links a:hover {
                    opacity: 0.8;
                    transform: translateY(-3px);
                }
            `}</style>
        </footer>
    );
}
