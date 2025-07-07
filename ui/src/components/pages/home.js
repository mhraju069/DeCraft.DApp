import React, { useEffect, useState } from 'react'
import '../css/home.css'
import Grids from '../hooks/grids';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    

    useEffect(() => {
        document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    })


    return (
        <>
            <>
                <Grids/>
                
                {/* <!-- Header --> */}
                <header>
                    <div className="container header-container">
                        <a href="#" className="logo">DeCraft.Ai</a>
                        <nav className="nav-links">
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </nav>
                        <button className="mobile-menu-btn">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </header>

                {/* <!-- Hero Section --> */}
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Decentralized AI Training Platform</h1>
                            <p>Connect data owners with AI developers in a secure, blockchain-powered marketplace. Monetize your data or access premium datasets without downloads - train models directly in our decentralized cloud.</p>
                            <div className="hero-buttons">
                                <Link to="/login"  className="btn btn-primary">Get Started</Link>
                                <a href="#how-it-works" className="btn btn-secondary">Learn More</a>
                            </div>
                        </div>
                        {/* <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="AI and Data Visualization" className="hero-image"/> */}
                        <img src="/images/robot.png" className="hero-image" alt="" />
                    </div>
                </section>

                {/* <!-- Features Section --> */}
                <section className="section" id="features">
                    <div className="container">
                        <div className="section-title">
                            <h2>Key Features</h2>
                            <p>Why choose LAB.Ai for your AI training needs</p>
                        </div>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <h3>Secure Data Access</h3>
                                <p>Data never leaves owner's control. AI models train on encrypted datasets with blockchain-verified access permissions.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-coins"></i>
                                </div>
                                <h3>Fair Monetization</h3>
                                <p>Data owners earn crypto payments for each model trained on their datasets, with transparent usage tracking.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <h3>Decentralized Compute</h3>
                                <p>Leverage our global network of GPU nodes for distributed training at scale with no single point of failure.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-project-diagram"></i>
                                </div>
                                <h3>Federated Learning</h3>
                                <p>Train models across multiple datasets without centralizing the data, preserving privacy and compliance.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <h3>Performance Metrics</h3>
                                <p>Real-time training analytics and model performance tracking with dataset attribution.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fas fa-code-branch"></i>
                                </div>
                                <h3>Version Control</h3>
                                <p>Immutable dataset versions and model training histories stored on blockchain for full reproducibility.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- How It Works --> */}
                <section className="section" id="how-it-works">
                    <div className="container">
                        <div className="section-title">
                            <h2>How It Works</h2>
                            <p>Simple steps to participate in the decentralized AI economy</p>
                        </div>
                        <div className="steps-container">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h3>For Data Owners</h3>
                                    <p>Upload your dataset to our secure decentralized storage network. Set your pricing model (per-training, subscription, or custom). Maintain full control over access rights and revoke anytime.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h3>For AI Developers</h3>
                                    <p>Browse our marketplace of verified datasets. Select the data you need and choose compute resources. Your model trains directly on the encrypted data without downloading.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h3>Secure Training</h3>
                                    <p>Our platform orchestrates the training process across decentralized nodes. Data remains encrypted and access is logged on blockchain. Models train without direct data exposure.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h3>Automatic Payments</h3>
                                    <p>Smart contracts automatically distribute payments to data owners based on usage. Developers pay only for what they use with transparent pricing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Pricing --> */}
                <section className="section" id="pricing">
                    <div className="container">
                        <div className="section-title">
                            <h2>Simple Pricing</h2>
                            <p>Choose the plan that fits your needs</p>
                        </div>
                        <div className="pricing-grid">
                            <div className="pricing-card">
                                <h3>Starter</h3>
                                <div className="price">$99<span>/month</span></div>
                                <ul className="pricing-features">
                                    <li>Up to 100 training hours</li>
                                    <li>Basic datasets access</li>
                                    <li>Community support</li>
                                    <li>1 concurrent training job</li>
                                    <li>Standard GPU nodes</li>
                                </ul>
                                <a href="#" className="btn btn-secondary">Get Started</a>
                            </div>
                            <div className="pricing-card popular">
                                <h3>Professional</h3>
                                <div className="price">$499<span>/month</span></div>
                                <ul className="pricing-features">
                                    <li>Up to 500 training hours</li>
                                    <li>Premium datasets access</li>
                                    <li>Priority support</li>
                                    <li>3 concurrent training jobs</li>
                                    <li>High-performance GPU nodes</li>
                                    <li>Advanced analytics</li>
                                </ul>
                                <a href="#" className="btn btn-primary">Get Started</a>
                            </div>
                            <div className="pricing-card">
                                <h3>Enterprise</h3>
                                <div className="price">Custom</div>
                                <ul className="pricing-features">
                                    <li>Unlimited training hours</li>
                                    <li>All datasets access</li>
                                    <li>24/7 dedicated support</li>
                                    <li>Unlimited concurrent jobs</li>
                                    <li>Top-tier GPU clusters</li>
                                    <li>Custom SLAs</li>
                                    <li>Private data marketplace</li>
                                </ul>
                                <a href="#" className="btn btn-secondary">Contact Sales</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- CTA Section --> */}
                <section className="cta">
                    <img src="/images/cta-bg.jpg" alt=""/>
                    <div className="container">
                        <h2>Ready to join the decentralized AI revolution?</h2>
                        <p>Whether you have valuable data to monetize or need high-quality datasets for your AI models, LAB.Ai connects you to the future of ethical, efficient AI training.</p>
                        <a href="#pricing" className="btn btn-primary">Start Now</a>
                    </div>
                </section>

                {/* <!-- Footer --> */}
                <footer>
                    <div className="container">
                        <div className="footer-grid">
                            <div className="footer-about">
                                <a href="#" className="footer-logo">LAB.<span>Ai</span></a>
                                <p>The decentralized platform for ethical AI training, connecting data owners with developers in a secure marketplace.</p>
                                <div className="social-links">
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-github"></i></a>
                                    <a href="#"><i className="fab fa-discord"></i></a>
                                    <a href="#"><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="footer-links">
                                <h4>Platform</h4>
                                <ul>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#how-it-works">How It Works</a></li>
                                    <li><a href="#pricing">Pricing</a></li>
                                    <li><a href="#">Case Studies</a></li>
                                </ul>
                            </div>
                            <div className="footer-links">
                                <h4>Resources</h4>
                                <ul>
                                    <li><a href="#">Documentation</a></li>
                                    <li><a href="#">API Reference</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Community</a></li>
                                </ul>
                            </div>
                            <div className="footer-links">
                                <h4>Company</h4>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p>&copy; 2023 LAB.Ai. All rights reserved. Decentralized AI training platform.</p>
                        </div>
                    </div>
                </footer>


            </>
        </>
    )
}
