'use client';

import React from 'react';
import Image from 'next/image';
import { teamMembers } from '../data/data';
import Link from 'next/link';

export default function About() {
    return (
        <main id="main">
            <section className="about-section">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div className="col-lg-12 text-center mb-5">
                            <h1 className="page-title">About Us</h1>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-lg-6">
                            <Image
                                src="/assets/img/post-portrait-4.jpg"
                                alt="About Us"
                                width={600}
                                height={400}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="title">Welcome to PrintShop</h2>
                            <p className="mb-4">
                                PrintShop is your premier destination for high-quality printing services and creative solutions. 
                                We take pride in delivering exceptional print products that help businesses and individuals bring their visions to life.
                            </p>
                            <p className="mb-4">
                                With years of experience in the printing industry, we understand the importance of quality, 
                                reliability, and attention to detail. Our team of skilled professionals is dedicated to 
                                providing you with the best printing solutions tailored to your specific needs.
                            </p>
                            <div className="d-flex align-items-center mb-4">
                                <i className="bi bi-check2-circle text-primary me-2 fs-4"></i>
                                <span>Professional Printing Services</span>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <i className="bi bi-check2-circle text-primary me-2 fs-4"></i>
                                <span>Quality Materials</span>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <i className="bi bi-check2-circle text-primary me-2 fs-4"></i>
                                <span>Fast Turnaround Time</span>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-lg-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">Our Mission</h3>
                                    <p className="card-text">
                                        To provide exceptional printing services that exceed customer expectations 
                                        while maintaining the highest standards of quality and customer service.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">Our Vision</h3>
                                    <p className="card-text">
                                        To be the leading printing service provider, recognized for innovation, 
                                        quality, and commitment to customer satisfaction.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">Our Values</h3>
                                    <p className="card-text">
                                        Quality, Integrity, Innovation, Customer Focus, and Environmental Responsibility 
                                        are the core values that guide our business practices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="row mb-5">
                        <div className="col-12 text-center mb-5">
                            <h2 className="display-4">Our Team</h2>
                            <p className="lead">Meet the experts behind PrintShop's success</p>
                        </div>
                        {teamMembers.map((member) => (
                            <div key={member.id} className="col-lg-3 col-md-6 mb-4">
                                <div className="team-member text-center">
                                    <div className="member-img position-relative overflow-hidden mb-4">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={300}
                                            height={300}
                                            className="img-fluid rounded"
                                        />
                                        <div className="social-links position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                                            <Link href={member.social.twitter} className="mx-2 text-white">
                                                <i className="bi bi-twitter-x fs-5"></i>
                                            </Link>
                                            <Link href={member.social.facebook} className="mx-2 text-white">
                                                <i className="bi bi-facebook fs-5"></i>
                                            </Link>
                                            <Link href={member.social.instagram} className="mx-2 text-white">
                                                <i className="bi bi-instagram fs-5"></i>
                                            </Link>
                                            <Link href={member.social.linkedin} className="mx-2 text-white">
                                                <i className="bi bi-linkedin fs-5"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h4 className="mb-2">{member.name}</h4>
                                        <span className="text-muted d-block mb-3">{member.position}</span>
                                        <p className="text-muted">{member.bio}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
                .team-member .member-img {
                    transition: all 0.3s ease;
                }
                
                .team-member .social-links {
                    background: rgba(0, 0, 0, 0.6);
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .team-member:hover .social-links {
                    opacity: 1;
                }
                
                .team-member .social-links a {
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .team-member .social-links a:hover {
                    transform: scale(1.2);
                }
            `}</style>
        </main>
    );
}
