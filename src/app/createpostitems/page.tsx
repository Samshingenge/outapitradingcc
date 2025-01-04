"use client";

import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export const initialState = {
    img: "",
    category: "",
    date: "",
    title: "",
    brief: "",
    avatar: "",
    author: "",
    validate: ""
};

export default function CreatePostItem() {
   

    const [text, setText] = useState(initialState);

    const handleImageUpload = (url: string) => {
        setText({ ...text, img: url });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value, validate: '' });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Set loading state first
        setText({ ...text, validate: "loading" });

        // Validation
        if (
            !text.img.trim() ||
            !text.category.trim() ||
            !text.date.trim() ||
            !text.title.trim() ||
            !text.brief.trim() ||
            !text.avatar.trim() ||
            !text.author.trim()
        ) {
            setText({ ...text, validate: "incomplete" });
            return;
        }

        try {
            const response = await fetch("/api/postitems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(text),
            });

            if (response.status === 201) {
                setText({ ...initialState, validate: "success" });
                console.log("Post sent successfully");
            } else {
                setText({ ...text, validate: "error" });
                console.error("Server returned error status:", response.status);
            }
        } catch (error) {
            setText({ ...text, validate: "error" });
            console.error("Error sending post:", error);
        }
    };

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
                                            <h1 className="page-title">Create a new post</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <label>Title*</label>
                                                <input 
                                                    type="text" 
                                                    name="title" 
                                                    value={text.title}
                                                    onChange={handleTextChange} 
                                                    className="form-control" 
                                                    placeholder="Enter title"/>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label>Image Upload*</label>
                                                <ImageUpload 
                                                    onImageUpload={handleImageUpload}
                                                    defaultImage={text.img}
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label>Image URL</label>
                                                <input 
                                                    type="text" 
                                                    name="img" 
                                                    value={text.img}
                                                    onChange={handleTextChange} 
                                                    className="form-control" 
                                                    placeholder="Image URL will appear here"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label>Category*</label>
                                                <input 
                                                    type="text" 
                                                    name="category" 
                                                    value={text.category}
                                                    onChange={handleTextChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Post Category"/>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label>Date*</label>
                                                <input 
                                                    type="date" 
                                                    name="date" 
                                                    value={text.date}
                                                    onChange={handleTextChange} 
                                                    className="form-control"/>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label>Author*</label>
                                                <input 
                                                    type="text" 
                                                    name="author" 
                                                    value={text.author}
                                                    onChange={handleTextChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Author name"/>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <label>Avatar URL*</label>
                                                <input 
                                                    type="text" 
                                                    name="avatar" 
                                                    value={text.avatar}
                                                    onChange={handleTextChange} 
                                                    className="form-control" 
                                                    placeholder="Enter Avatar URL"/>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label>Brief*</label>
                                                <textarea 
                                                    className="form-control"
                                                    name="brief" 
                                                    cols={30} 
                                                    rows={10} 
                                                    value={text.brief}
                                                    placeholder="Enter Post Brief"
                                                    onChange={handleTextChange}
                                                ></textarea>
                                            </div>
                                            <div className="col-12 mb-3">
                                                {text.validate === "loading" && (
                                                    <div className="alert alert-info">
                                                        Sending Post...
                                                    </div>
                                                )}
                                                {text.validate === "incomplete" && (
                                                    <div className="alert alert-warning">
                                                        Please fill in all required fields marked with *
                                                    </div>
                                                )}
                                                {text.validate === "success" && (
                                                    <div className="alert alert-success">
                                                        Post sent successfully! You can create another post.
                                                    </div>
                                                )}
                                                {text.validate === "error" && (
                                                    <div className="alert alert-danger">
                                                        An error occurred while sending the post. Please try again.
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-12 d-flex justify-content-center">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary"
                                                    disabled={text.validate === "loading"}
                                                >
                                                    {text.validate === "loading" ? "Sending..." : "Create Post"}
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