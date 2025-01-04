"use client";

import React, { useState } from 'react';
import { services } from '../data/data';
import PageTitle from '../components/PageTitle';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Icons mapping for each category
  const categoryIcons = {
    "Printing Services": "bi-printer-fill",
    "Design Services": "bi-brush-fill",
    "Digital Services": "bi-laptop-fill",
    "Construction Services": "bi-tools"
  };

  return (
    <main className="main-wrapper bg-light">
      <PageTitle title="Our Services" />
      
      <section className="services-section py-5">
        <div className="container">
          {/* Hero Section */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-10">
              <div className="text-center animate-fade-in">
                <h2 className="display-4 fw-bold mb-3 text-dark">
                  <span className="text-primary">{services.company}</span>
                </h2>
                <p className="lead mb-5 px-md-5 text-dark">{services.description}</p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="row g-4 justify-content-center">
            {services.categories.map((category, idx) => (
              <div 
                key={category.id} 
                className="col-md-6 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div 
                  className={`service-category h-100 p-4 bg-white rounded-4 shadow hover-shadow transition-all cursor-pointer ${
                    activeCategory === category.id ? 'active-category' : ''
                  }`}
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                >
                  <div className="d-flex align-items-center mb-4">
                    <div className="category-icon-wrapper bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                      <i className={`bi ${categoryIcons[category.title as keyof typeof categoryIcons]} text-primary fs-4`}></i>
                    </div>
                    <h3 className="h4 mb-0 text-dark">{category.title}</h3>
                  </div>
                  <div className="service-list">
                    {category.services.map((service, index) => (
                      <div 
                        key={index} 
                        className="service-item d-flex align-items-center mb-3 p-3 rounded-3 service-item-bg"
                      >
                        <i className="bi bi-check-circle-fill text-primary me-3"></i>
                        <span className="text-dark">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="row justify-content-center mt-5 pt-4">
            <div className="col-md-8 text-center">
              <div className="cta-box bg-primary p-5 rounded-4 animate-fade-in text-white">
                <h3 className="h4 mb-3">Need Our Services?</h3>
                <p className="mb-4">Contact us today to discuss your project requirements</p>
                <a 
                  href="/contact" 
                  className="btn btn-light px-4 py-2 rounded-pill hover-scale text-primary fw-medium"
                >
                  Contact Us
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hover-shadow:hover {
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
        .service-item-bg {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
        }
        .service-item-bg:hover {
          background-color: #e9ecef;
        }
        .category-icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e7f1ff !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .active-category {
          transform: scale(1.02);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
          border: 2px solid var(--bs-primary);
        }
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.5s ease forwards;
        }
      `}</style>
    </main>
  );
};

export default ServicesPage;
