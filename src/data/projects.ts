export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'software' | 'data-science' | 'videography' | 'photography';
  stack: string[];
  image: string;
  liveLink?: string;
  videoLink?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    technologies: string[];
    features: string[];
    challenges: string[];
    results: string[];
    images: string[];
  };
}

export const projects: Project[] = [
  // Data Science Projects
  {
    id: "sales-analytics-dashboard",
    title: "Sales Analytics Dashboard",
    description: "Interactive dashboard for sales performance analysis with real-time data visualization and predictive modeling.",
    category: "data-science",
    stack: ["Python", "Pandas", "Plotly", "Streamlit", "SQL", "Machine Learning"],
    image: "/next.svg",
    liveLink: "https://sales-dashboard.nas.dev",
    caseStudy: {
      overview: "A comprehensive sales analytics dashboard that transforms raw sales data into actionable insights for business decision-making.",
      problem: "Sales teams lacked real-time visibility into performance metrics and struggled to identify trends and opportunities for optimization.",
      solution: "Developed an interactive dashboard using Python and Streamlit that provides real-time analytics, trend analysis, and predictive modeling for sales forecasting.",
      technologies: ["Python", "Pandas", "NumPy", "Plotly", "Streamlit", "SQL", "Scikit-learn", "PostgreSQL"],
      features: [
        "Real-time sales performance tracking",
        "Interactive data visualizations",
        "Predictive sales forecasting",
        "Customer segmentation analysis",
        "Automated reporting generation",
        "Export capabilities for presentations"
      ],
      challenges: [
        "Handling large datasets with millions of records",
        "Implementing real-time data updates",
        "Creating intuitive visualizations for non-technical users",
        "Optimizing query performance for dashboard responsiveness"
      ],
      results: [
        "25% improvement in sales forecasting accuracy",
        "60% reduction in report generation time",
        "Enhanced data-driven decision making across teams",
        "Identified $500K in previously missed opportunities"
      ],
      images: [
        "/next.svg",
        "/vercel.svg",
        "/globe.svg"
      ]
    }
  },
  {
    id: "customer-churn-prediction",
    title: "Customer Churn Prediction Model",
    description: "Machine learning model to predict customer churn with 95% accuracy, enabling proactive retention strategies.",
    category: "data-science",
    stack: ["Python", "Scikit-learn", "XGBoost", "Tableau", "SQL"],
    image: "/globe.svg",
    caseStudy: {
      overview: "A machine learning solution that predicts customer churn with high accuracy, enabling businesses to implement proactive retention strategies.",
      problem: "High customer churn rates were impacting revenue, but the company had no systematic way to identify at-risk customers before they left.",
      solution: "Built a comprehensive churn prediction model using multiple algorithms and feature engineering to identify customers likely to churn within the next 30 days.",
      technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "Tableau", "SQL", "Docker"],
      features: [
        "95% prediction accuracy",
        "Real-time scoring of customer risk",
        "Feature importance analysis",
        "Automated model retraining pipeline",
        "Integration with CRM systems",
        "Executive dashboard for insights"
      ],
      challenges: [
        "Dealing with imbalanced dataset",
        "Feature engineering from diverse data sources",
        "Model interpretability for business stakeholders",
        "Implementing real-time prediction scoring"
      ],
      results: [
        "30% reduction in customer churn rate",
        "95% model accuracy on test data",
        "$2M annual revenue retention",
        "Automated early warning system for at-risk customers"
      ],
      images: [
        "/globe.svg",
        "/vercel.svg",
        "/file.svg"
      ]
    }
  },

  // Software Development Projects
  {
    id: "portfolio-website",
    title: "Interactive Portfolio Website",
    description: "A modern, responsive portfolio website featuring Three.js animations and smooth transitions.",
    category: "software",
    stack: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
    image: "/images/bokeh-lights-dark-background.jpg",
    liveLink: "https://nas-portfolio.dev",
    caseStudy: {
      overview: "A cutting-edge portfolio website that showcases both technical skills and creative work with immersive 3D experiences.",
      problem: "Needed a platform to showcase both data science projects and creative videography/photography work in an engaging way.",
      solution: "Created an interactive hybrid portfolio using modern web technologies with 3D graphics and smooth animations.",
      technologies: ["Next.js 14", "React Three Fiber", "Framer Motion", "TypeScript", "Tailwind CSS", "Three.js"],
      features: [
        "Interactive 3D geometric shapes",
        "Smooth page transitions",
        "Responsive design across all devices",
        "Dark/light mode support",
        "Dual portfolio sections (data/creative)",
        "Performance optimised with lazy loading"
      ],
      challenges: [
        "Optimising Three.js performance on mobile devices",
        "Balancing technical and creative content presentation",
        "Maintaining fast load times with rich media",
        "Creating cohesive design for dual purposes"
      ],
      results: [
        "95+ Lighthouse performance score",
        "Increased client inquiries by 150%",
        "Featured in design showcases",
        "Zero accessibility violations"
      ],
      images: [
        "/next.svg",
        "/vercel.svg",
        "/globe.svg"
      ]
    }
  },

  // Videography Projects
  {
    id: "corporate-brand-video",
    title: "Automotive & Brand Cinematography",
    description: "Dynamic automotive and brand cinematography featuring professional colour grading and storytelling.",
    category: "videography",
    stack: ["DaVinci Resolve Studio", "Lightroom", "Photoshop", "After Effects"],
    image: "/images/Automotive/DSC09689-Enhanced-NR-Edit.png",
    videoLink: "https://vimeo.com/nas/brand-video",
    caseStudy: {
      overview: "A comprehensive brand video series that elevated a company's digital presence through compelling visual storytelling.",
      problem: "The client needed engaging brand videos to improve their online presence and communicate their value proposition effectively.",
      solution: "Produced a series of high-quality brand videos with professional cinematography, motion graphics, and colour grading.",
      technologies: ["DaVinci Resolve Studio", "Adobe Lightroom", "Adobe Photoshop", "After Effects", "Cinema 4D"],
      features: [
        "Professional cinematography and lighting",
        "Custom motion graphics and animations",
        "Advanced colour grading and correction",
        "Multi-format delivery for various platforms",
        "Integrated brand elements and messaging",
        "Optimised for social media distribution"
      ],
      challenges: [
        "Coordinating complex shooting schedules",
        "Matching brand aesthetics across multiple videos",
        "Delivering high-quality content within tight deadlines",
        "Optimising videos for different social platforms"
      ],
      results: [
        "300% increase in social media engagement",
        "50% boost in website conversion rates",
        "Featured on company's main marketing channels",
        "Won local business video award"
      ],
      images: [
        "/images/Automotive/carousel_07.jpg",
        "/images/Automotive/DSC07646-Enhanced-NR.jpg",
        "/images/Automotive/DSC07747-Enhanced-NR.jpg"
      ]
    }
  },
  {
    id: "wedding-highlight-reel",
    title: "Cinematic Wedding Films",
    description: "Cinematic wedding highlight reels with emotional storytelling and professional audio design.",
    category: "videography",
    stack: ["Final Cut Pro", "Motion", "Logic Pro", "Color Finale"],
    image: "/vercel.svg",
    videoLink: "https://vimeo.com/nas/wedding-films",
    caseStudy: {
      overview: "Cinematic wedding films that capture the emotion and beauty of couples' special days through artistic videography.",
      problem: "Couples wanted more than traditional wedding videos - they desired cinematic films that told their unique love story.",
      solution: "Developed a signature cinematic style combining documentary-style shooting with artistic post-production techniques.",
      technologies: ["Final Cut Pro", "Motion 5", "Logic Pro", "Color Finale", "Adobe Audition"],
      features: [
        "Cinematic 4K footage with professional cameras",
        "Emotional storytelling through careful editing",
        "Professional audio mixing and design",
        "Custom colour grading for mood enhancement",
        "Same-day highlights for social sharing",
        "Multiple delivery formats for clients"
      ],
      challenges: [
        "Capturing key moments without being intrusive",
        "Working in various lighting conditions",
        "Coordinating with multiple wedding vendors",
        "Delivering emotional impact through editing choices"
      ],
      results: [
        "100% client satisfaction rate",
        "Featured in multiple wedding blogs",
        "Referral rate of 80% from previous clients",
        "Expanded to destination wedding bookings"
      ],
      images: [
        "/vercel.svg",
        "/globe.svg",
        "/window.svg"
      ]
    }
  },

  // Photography Projects
  {
    id: "portrait-photography-series",
    title: "Sports & Portrait Photography",
    description: "High-impact sports photography and portraits capturing peak performance and raw emotion.",
    category: "photography",
    stack: ["DaVinci Resolve Studio", "Adobe Lightroom", "Photoshop", "Capture One"],
    image: "/images/portfolio/sheffield-powerlifting/DSC05342.jpg",
    caseStudy: {
      overview: "A professional sports and portrait photography series showcasing advanced lighting techniques and timing.",
      problem: "Clients needed high-quality imagery that captured the intensity of the sport while maintaining professional aesthetics.",
      solution: "Developed a signature style combining fast shutter techniques with artistic post-processing to freeze action and highlight emotion.",
      technologies: ["DaVinci Resolve Studio", "Adobe Lightroom", "Adobe Photoshop", "Capture One Pro", "Profoto Studio Lighting"],
      features: [
        "Professional studio and location lighting",
        "High-speed action capture",
        "Colour grading for mood and atmosphere",
        "Multiple style variations per session",
        "High-resolution delivery for print and digital",
        "Quick turnaround for client needs"
      ],
      challenges: [
        "Achieving consistent lighting in variable environments",
        "Balancing natural look with professional polish",
        "Capturing split-second moments of action",
        "Maintaining efficiency while ensuring quality"
      ],
      results: [
        "Featured in photography publications",
        "95% client retention rate",
        "Expanded to corporate headshot packages",
        "Recognised by local business community"
      ],
      images: [
        "/images/portfolio/sheffield-powerlifting/DSC04648.jpg",
        "/images/portfolio/sheffield-powerlifting/DSC08037.jpg",
        "/images/portfolio/sheffield-powerlifting/DSC08283.jpg"
      ]
    }
  }
];

// Helper functions to filter projects by category
export const getSoftwareProjects = () => projects.filter(p => p.category === 'software');
export const getDataScienceProjects = () => projects.filter(p => p.category === 'data-science');
export const getVideographyProjects = () => projects.filter(p => p.category === 'videography');
export const getPhotographyProjects = () => projects.filter(p => p.category === 'photography');
export const getCreativeProjects = () => projects.filter(p => p.category === 'videography' || p.category === 'photography');
export const getTechnicalProjects = () => projects.filter(p => p.category === 'software' || p.category === 'data-science');
