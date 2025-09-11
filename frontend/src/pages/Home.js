import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#4e6c9cff",
        lineHeight: 1.6,
      }}
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(90deg,#0A84FF, #0B1E3D)",
          color: "#fff",
          padding: "80px 20px",
          textAlign: "center",
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: 20 }}>
          Empowering Your Cybersecurity Journey
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: 700, margin: "0 auto 30px" }}>
          Discover cutting-edge tools, expert-curated resources, and
          comprehensive courses to master the world of cybersecurity.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <Link to="/tools" style={ctaButtonStyle}>
            Get Started
          </Link>
          <Link to="/signup" style={ctaButtonStyle}>
            Sign Up
          </Link>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: "40px 20px", marginBottom: 40 }}
      >
        <h2>What is Cyberpidia?</h2>
        <p>
          Cyberpidia is a one-stop platform for cybersecurity enthusiasts and
          professionals. Our mission is to provide reliable information,
          practical tools, and learning resources to help users understand,
          explore, and strengthen their cybersecurity knowledge.
        </p>
        <ul>
          <li>
            <strong>Extensive Tool Collection:</strong> Access tools for
            penetration testing, vulnerability scanning, and network monitoring.
          </li>
          <li>
            <strong>Curated Books:</strong> Learn from carefully selected
            cybersecurity books covering all levels.
          </li>
          <li>
            <strong>Interactive Courses:</strong> Gain practical skills from
            expert-designed online courses.
          </li>
          <li>
            <strong>Smart Search:</strong> Quickly find tools, books, or
            courses.
          </li>
        </ul>
      </motion.section>

      {/* Featured Tools */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          padding: "40px 20px",
          marginBottom: 40,
          background: "#f5f5f5",
          borderRadius: 12,
        }}
      >
        <h2>Top Tools for Security Professionals</h2>
        <p>
          Explore our featured cybersecurity tools that professionals rely on
          every day, including penetration testing suites, vulnerability
          scanners, network analyzers, and forensic tools.
        </p>
        <Link to="/tools" style={ctaButtonStyle}>
          Explore Tools
        </Link>
      </motion.section>

      {/* Books Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: "40px 20px", marginBottom: 40 }}
      >
        <h2>Enhance Your Knowledge</h2>
        <p>
          Our curated collection of books covers all levels, from beginner
          guides to advanced cybersecurity topics. Each book provides actionable
          insights and practical knowledge for real-world cybersecurity
          scenarios.
        </p>
        <Link to="/books" style={ctaButtonStyle}>
          Browse Books
        </Link>
      </motion.section>

      {/* Courses Section */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          padding: "40px 20px",
          marginBottom: 40,
          background: "#f5f5f5",
          borderRadius: 12,
        }}
      >
        <h2>Learn from Experts</h2>
        <p>
          Cyberpidia offers interactive and up-to-date courses created by
          industry experts. Learn at your own pace with step-by-step tutorials
          and hands-on labs. Popular topics include Ethical Hacking, Network
          Security, Cryptography, and Risk Management.
        </p>
        <Link to="/courses" style={ctaButtonStyle}>
          View Courses
        </Link>
      </motion.section>

      {/* Getting Started */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: "60px 20px", textAlign: "center" }}
      >
        <h2>Start Your Cybersecurity Journey Today</h2>
        <p>
          Sign up to access all tools, track your learning progress, and stay
          updated with the latest cybersecurity resources. Cyberpidia makes
          learning interactive, easy, and effective.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <Link to="/signup" style={ctaButtonStyle}>
            Sign Up
          </Link>
          <Link to="/login" style={ctaButtonStyle}>
            Login
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

// CTA button style
const ctaButtonStyle = {
  padding: "12px 24px",
  background: "#0A84FF",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 8,
  fontWeight: 600,
  transition: "all 0.3s ease",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  cursor: "pointer",
};
