// --- UI Logic: Initialize Icons & Core Framework ---
document.addEventListener('DOMContentLoaded', () => {
    // DOM ready hone ke baad hi icons build honge, isse GitHub/LinkedIn bug permanently solve ho jayega
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- Constants (Data Realignment to Business Analyst / BI Analyst Perspective) ---
const PROFILE_NAME = "Vashu Tyagi";
const PROFILE_TITLE = "Business Analyst & BI Specialist";
const PROFILE_SUMMARY = "Data-driven Business Analyst specializing in translating complex transactional datasets into strategic revenue growth. Expert in funnel optimization, statistical hypothesis testing, and user behavior cohort modeling. I bridge the gap between engineering and business stakeholders by building scalable business intelligence architectures and interactive operational dashboards that directly impact operational efficiency and ROI.";
const SKILLS = ['Python', 'SQL', 'Power BI', 'Tableau', 'Pandas', 'Process Mapping', 'A/B Testing', 'Git'];

const PROJECTS = [
    {
        title: 'E-Commerce Revenue Leakage & Funnel Analysis',
        technologies: ['MS-SQL', 'Power-BI', 'Process-Mapping'],
        desc: 'Mapped out checkout transaction flows step-by-step to isolate friction points. Pinpointed severe conversion drop-offs during address verification, formulating data-backed solutions to optimize conversion rates.'
    },
    {
        title: 'OTT Platform Churn & User Cohort Analytics',
        technologies: ['Python', 'Cohort-Analysis', 'Customer-Lifetime-Value'],
        desc: 'Segmented user engagement data into temporal cohorts to analyze churn dynamics. Modeled retention behaviors to protect subscription revenue streams and maximize Customer Lifetime Value (CLV).'
    },
    {
        title: 'Food Delivery Service ROI & A/B Validation',
        technologies: ['SQL-Server', 'Hypothesis-Testing', 'Business-Metrics'],
        desc: 'Designed statistical hypothesis tests and cost-benefit frameworks to evaluate a new express feature variant. Quantified operational impact and verified revenue growth prior to nationwide deployment.'
    }
];

// --- UI Logic: Navigation & Scroll Handling ---
const navbar = document.getElementById('navbar');
const navButtons = document.querySelectorAll('.nav-btn');
const sections = ['home', 'about', 'experience', 'projects', 'contact'];

// Handle Scroll for Navbar styling
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-slate-800/50', 'shadow-lg', 'shadow-black/20');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-slate-800/50', 'shadow-lg', 'shadow-black/20');
        navbar.classList.add('bg-transparent');
    }
});

// Smooth Scroll Function
window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Intersection Observer for Active Nav State
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navButtons.forEach(btn => {
                if (btn.dataset.target === id) {
                    btn.classList.add('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-cyan-500/25', 'scale-105');
                    btn.classList.remove('text-slate-400', 'hover:text-cyan-400', 'hover:bg-slate-800/80', 'hover:scale-110');
                } else {
                    btn.classList.remove('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-cyan-500/25', 'scale-105');
                    btn.classList.add('text-slate-400', 'hover:text-cyan-400', 'hover:bg-slate-800/80', 'hover:scale-110');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
});

// --- UI Logic: Fade In Sections ---
const fadeElements = document.querySelectorAll('.fade-section');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));