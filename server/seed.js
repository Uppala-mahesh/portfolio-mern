/**
 * seed.js — Populate MongoDB with Uppala Mahesh's portfolio data.
 * Run:  node seed.js  (from inside /server)
 */
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Profile       = require('./models/Profile');
const Skill         = require('./models/Skill');
const Project       = require('./models/Project');
const Certification = require('./models/Certification');
const Qualification = require('./models/Qualification');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    /* ── Wipe existing data ── */
    await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Certification.deleteMany({}),
      Qualification.deleteMany({})
    ]);
    console.log('Cleared existing collections');

    /* ── Profile ── */
    await Profile.create({
      name: 'Uppala Mahesh',
      title: 'IT Engineering Student | Full Stack Developer | Aspiring Tech Entrepreneur',
      tagline:
        'Designing scalable systems, building intelligent applications, and exploring the intersection of software, data, and innovation.',
      summary:
        'I am an Information Technology undergraduate at Vasavi College of Engineering with a deep interest in full-stack development, system design, and emerging technologies. I enjoy transforming complex problems into scalable and efficient software solutions.\n\nMy technical journey includes building end-to-end web applications using modern stacks, implementing algorithmic solutions, and working on data-driven systems. I actively explore areas like distributed systems, artificial intelligence, and backend architecture.\n\nI am particularly driven by the idea of leveraging technology to solve real-world problems and aim to build a startup that focuses on intelligent, scalable, and user-centric digital solutions.\n\nBeyond coding, I continuously learn from industry practices, refine my development workflow, and strive to write clean, maintainable, and production-ready code.',
      location: 'India',
      email: 'uppala.mahesh@email.com',
      phone: '+91 XXXXXXXXXX',
      linkedin: 'https://linkedin.com/in/uppala-mahesh',
      github: 'https://github.com/Uppala-mahesh'
    });
    console.log('✅ Profile seeded');

    /* ── Skills ── */
    await Skill.insertMany([
      // Frontend
      { name: 'JavaScript',        category: 'Frontend',           level: 85, icon: 'SiJavascript' },
      { name: 'React.js',          category: 'Frontend',           level: 80, icon: 'SiReact' },
      { name: 'HTML / CSS',        category: 'Frontend',           level: 90, icon: 'SiHtml5' },
      { name: 'Responsive Design', category: 'Frontend',           level: 85, icon: 'MdDevices' },
      // Backend
      { name: 'Node.js',           category: 'Backend',            level: 78, icon: 'SiNodedotjs' },
      { name: 'Express.js',        category: 'Backend',            level: 75, icon: 'SiExpress' },
      { name: 'MongoDB',           category: 'Backend',            level: 72, icon: 'SiMongodb' },
      { name: 'REST APIs',         category: 'Backend',            level: 80, icon: 'TbApi' },
      { name: 'Python',            category: 'Backend',            level: 82, icon: 'SiPython' },
      // CS Fundamentals
      { name: 'DSA',               category: 'CS Fundamentals',    level: 85, icon: 'TbBinaryTree' },
      { name: 'OOP Concepts',      category: 'CS Fundamentals',    level: 80, icon: 'TbBoxModel' },
      { name: 'DBMS',              category: 'CS Fundamentals',    level: 78, icon: 'TbDatabase' },
      { name: 'Operating Systems', category: 'CS Fundamentals',    level: 70, icon: 'SiLinux' },
      { name: 'System Design',     category: 'CS Fundamentals',    level: 65, icon: 'TbNetwork' },
      // Tools & Practices
      { name: 'Git & GitHub',      category: 'Tools & Practices',  level: 85, icon: 'SiGit' },
      { name: 'Problem Solving',   category: 'Tools & Practices',  level: 88, icon: 'TbPuzzle' }
    ]);
    console.log('✅ Skills seeded');

    /* ── Projects ── */
    await Project.insertMany([
      {
        title: 'Banking System',
        description:
          'A console-based banking application implementing core banking functionalities such as account creation, transactions, and balance management using object-oriented programming principles.',
        technologies: ['Python', 'OOP'],
        featured: true
      },
      {
        title: 'Cryptocurrency Simulation',
        description:
          'A simulation system demonstrating cryptocurrency transactions and blockchain-like structures using linked lists and hashing concepts to visualize distributed ledger behavior.',
        technologies: ['Python', 'Data Structures'],
        featured: true
      },
      {
        title: 'Nyay AI — Virtual Court System',
        description:
          'A full-stack web application designed to simulate a virtual legal assistant platform, enabling structured case handling, document flow, and intelligent interaction.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        featured: true
      },
      {
        title: 'Smart Supply Chain Management',
        description:
          'A database-driven application that models supply chain operations including inventory tracking, supplier management, and logistics optimization.',
        technologies: ['SQL', 'DBMS'],
        featured: true
      },
      {
        title: 'Video Text Analysis & Character Mapping',
        description:
          'An algorithm-focused project that extracts text from video content and analyzes relationships between entities using graph-based approaches.',
        technologies: ['Python', 'Algorithms', 'NLP Concepts'],
        featured: false
      }
    ]);
    console.log('✅ Projects seeded');

    /* ── Certifications (placeholder — update when ready) ── */
    await Certification.insertMany([
      {
        title: 'Web Development Fundamentals',
        issuer: 'Coursera',
        date: '2024',
        description:
          'Comprehensive course covering HTML, CSS, JavaScript, and modern web development practices.',
        credentialUrl: '#'
      },
      {
        title: 'Python for Data Science',
        issuer: 'NPTEL',
        date: '2024',
        description:
          'In-depth program covering Python programming, data analysis, and scientific computing.',
        credentialUrl: '#'
      },
      {
        title: 'Database Management Systems',
        issuer: 'NPTEL',
        date: '2025',
        description:
          'Advanced course on relational databases, SQL, normalization, and query optimization.',
        credentialUrl: '#'
      },
      {
        title: 'JavaScript Algorithms & Data Structures',
        issuer: 'freeCodeCamp',
        date: '2025',
        description:
          'Certification covering algorithmic thinking, problem-solving patterns, and data structure implementation in JavaScript.',
        credentialUrl: '#'
      }
    ]);
    console.log('✅ Certifications seeded');

    /* ── Qualifications ── */
    await Qualification.insertMany([
      {
        degree: 'B.Tech in Information Technology',
        institution: 'Vasavi College of Engineering',
        year: '2024–2028',
        percentage: '81%',
        status: 'Pursuing'
      },
      {
        degree: 'Intermediate (MPC)',
        institution: 'Sri Chaitanya',
        year: '2022–2024',
        percentage: '93%',
        status: 'Distinction'
      },
      {
        degree: 'SSC',
        institution: 'Little Flower High School',
        year: '2022',
        percentage: '97%',
        status: 'Distinction'
      }
    ]);
    console.log('✅ Qualifications seeded');

    console.log('\n🎉 All data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
