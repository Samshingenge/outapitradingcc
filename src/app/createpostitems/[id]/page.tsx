"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Preloader from '@/app/components/Preloader';
import { initialState } from '../page';

// interface PostItem {
//     _id: string;
//     img: string;
//     category: string;
//     date: string;
//     title: string;
//     brief: string;
//     avatar: string;
//     author: string;
// }

export default function EditPostItemPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const [text, setText] = useState(initialState);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    // const getSinglePostData = () => {
    //     fetch(`/api/postitems/${resolvedParams.id}`)
    //         .then(res => res.json())
    //         .then(data => setText(data))
    //         .catch(err => setError(err.message));
    // }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/postitems/${resolvedParams.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setText(data);
            } catch {
                setError('Error fetching post');
            } finally {
                setLoading(false);
            }
        };
        
        fetchPost();
    }, [resolvedParams.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) return;
        setError('');
        
        try {
            const response = await fetch(`/api/postitems/${resolvedParams.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            router.push('/postitems');
            router.refresh();
        } catch {
            setError('Error updating post');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value, validate: '' });
    };

    if (loading || !text) {
        return <Preloader />;
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <main id="main">
            <section className="create-post-content">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-10">
                            <div className="row d-flex justify-content-center mt-5">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-12 text-center mb-5">
                                            <h1 className="page-title">Edit Post</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit} className="needs-validation">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Title*</label>
                                                <input 
                                                    type="text" 
                                                    name="title" 
                                                    value={text.title}
                                                    onChange={handleChange} 
                                                    className="form-control" 
                                                    placeholder="Enter title"
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Image URL*</label>
                                                <input 
                                                    type="text" 
                                                    name="img" 
                                                    value={text.img}
                                                    onChange={handleChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Image URL"
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Category*</label>
                                                <input 
                                                    type="text" 
                                                    name="category" 
                                                    value={text.category}
                                                    onChange={handleChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Post Category"
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Date*</label>
                                                <input 
                                                    type="date" 
                                                    name="date" 
                                                    value={text.date}
                                                    onChange={handleChange} 
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Author*</label>
                                                <input 
                                                    type="text" 
                                                    name="author" 
                                                    value={text.author}
                                                    onChange={handleChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Author name"
                                                    required
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label">Avatar URL*</label>
                                                <input 
                                                    type="text" 
                                                    name="avatar" 
                                                    value={text.avatar}
                                                    onChange={handleChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Avatar URL"
                                                    required
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Brief*</label>
                                                <textarea 
                                                    className="form-control"
                                                    name="brief" 
                                                    value={text.brief}
                                                    onChange={handleChange}
                                                    rows={10} 
                                                    placeholder="Enter Post Brief"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="col-12 text-center">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary px-4 py-2"
                                                    disabled={loading}
                                                >
                                                    Update Post
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}