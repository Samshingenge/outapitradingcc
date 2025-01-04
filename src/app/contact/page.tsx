'use client';

import React, { useState } from 'react';
import { contact } from '../data/data';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<{
        type: 'success' | 'error' | '';
        message: string;
    }>({
        type: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus({
                type: 'error',
                message: 'Please fill in all fields'
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({
                type: 'error',
                message: 'Please enter a valid email address'
            });
            return;
        }

        try {
            // Here you would typically send the form data to your backend
            // For now, we'll just simulate a successful submission
            setStatus({
                type: 'success',
                message: 'Thank you for your message. We will get back to you soon!'
            });
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'An error occurred. Please try again later.'
            });
        }
    };

    return (
        <main id="main">
            <section className="contact-section">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-5">
                            <h1 className="page-title">Contact Us</h1>
                        </div>
                    </div>

                    <div className="row gy-4">
                        <div className="col-md-4">
                            <div className="info-item d-flex align-items-center">
                                <i className="bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>{contact[0].details.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="info-item d-flex align-items-center">
                                <i className="bi bi-telephone flex-shrink-0"></i>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+1 234 567 8900</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="info-item d-flex align-items-center">
                                <i className="bi bi-geo-alt flex-shrink-0"></i>
                                <div>
                                    <h3>Visit Us</h3>
                                    <p>123 Print Street, Design City, PC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} className="contact-form">
                                {status.message && (
                                    <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} mb-4`}>
                                        {status.message}
                                    </div>
                                )}
                                
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="subject"
                                            className="form-control"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            name="message"
                                            rows={6}
                                            className="form-control"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-primary">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
