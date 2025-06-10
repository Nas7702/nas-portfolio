export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  githubLink: string;
  liveLink?: string;
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
  {
    id: "portfolio-website",
    title: "3D Interactive Portfolio",
    description: "A modern portfolio website featuring Three.js animations, scroll-triggered reveals, and smooth page transitions.",
    stack: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
    image: "/next.svg",
    githubLink: "https://github.com/username/portfolio",
    liveLink: "https://portfolio.dev",
    caseStudy: {
      overview: "A cutting-edge portfolio website that showcases modern web technologies with immersive 3D experiences and smooth animations.",
      problem: "Traditional portfolios often fail to engage visitors and showcase technical skills effectively. Static designs don't demonstrate proficiency with modern web technologies.",
      solution: "Created an interactive experience using Three.js for 3D graphics, Framer Motion for smooth transitions, and scroll-triggered animations to create an engaging user journey.",
      technologies: ["Next.js 14", "React Three Fiber", "Framer Motion", "TypeScript", "Tailwind CSS", "Three.js"],
      features: [
        "Interactive 3D geometric shapes with physics",
        "Scroll-triggered reveal animations",
        "Smooth page transitions",
        "Responsive design across all devices",
        "Dark/light mode support",
        "Performance optimized with lazy loading"
      ],
      challenges: [
        "Optimizing Three.js performance on mobile devices",
        "Implementing smooth scroll animations without jank",
        "Balancing visual appeal with accessibility",
        "Managing complex state across animated components"
      ],
      results: [
        "95+ Lighthouse performance score",
        "40% increase in user engagement time",
        "Featured on design showcases",
        "Zero accessibility violations"
      ],
      images: [
        "/next.svg",
        "/vercel.svg",
        "/globe.svg"
      ]
    }
  },
  {
    id: "ecommerce-platform",
    title: "Full-Stack E-commerce Platform",
    description: "Complete e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    image: "/globe.svg",
    githubLink: "https://github.com/username/ecommerce",
    liveLink: "https://shop.example.com",
    caseStudy: {
      overview: "A comprehensive e-commerce platform built for scalability, featuring real-time inventory management and seamless payment processing.",
      problem: "Small businesses need affordable, feature-rich e-commerce solutions without the complexity and cost of enterprise platforms.",
      solution: "Developed a full-stack platform with modern technologies, focusing on performance, user experience, and powerful admin tools.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe API", "Redis", "Docker", "AWS"],
      features: [
        "Real-time inventory management",
        "Secure payment processing with Stripe",
        "Advanced product filtering and search",
        "Order tracking and notifications",
        "Comprehensive admin dashboard",
        "Mobile-first responsive design"
      ],
      challenges: [
        "Implementing real-time inventory updates",
        "Handling concurrent payment processing",
        "Optimizing database queries for large catalogs",
        "Ensuring PCI compliance for payments"
      ],
      results: [
        "Processed $100K+ in transactions",
        "99.9% uptime in production",
        "Sub-2 second page load times",
        "5-star user satisfaction rating"
      ],
      images: [
        "/globe.svg",
        "/vercel.svg",
        "/file.svg"
      ]
    }
  },
  {
    id: "task-management-app",
    title: "Collaborative Task Manager",
    description: "Real-time task management application with team collaboration features and data visualization.",
    stack: ["React", "Express.js", "Socket.io", "MongoDB", "D3.js"],
    image: "/file.svg",
    githubLink: "https://github.com/username/taskmanager",
    liveLink: "https://tasks.example.com",
    caseStudy: {
      overview: "A collaborative task management platform designed to improve team productivity with real-time updates and insightful analytics.",
      problem: "Teams struggle with coordination and visibility into project progress, especially in remote work environments.",
      solution: "Built a real-time collaborative platform with live updates, progress tracking, and data visualization to enhance team coordination.",
      technologies: ["React", "Express.js", "Socket.io", "MongoDB", "D3.js", "JWT Authentication"],
      features: [
        "Real-time collaborative editing",
        "Interactive project timelines",
        "Team performance analytics",
        "Custom notification system",
        "Drag-and-drop task organization",
        "Integration with popular tools"
      ],
      challenges: [
        "Implementing conflict resolution for real-time editing",
        "Scaling WebSocket connections",
        "Creating intuitive data visualizations",
        "Maintaining performance with large datasets"
      ],
      results: [
        "50+ teams using the platform",
        "30% improvement in project completion rates",
        "99% real-time sync accuracy",
        "Featured in productivity tool roundups"
      ],
      images: [
        "/file.svg",
        "/window.svg",
        "/next.svg"
      ]
    }
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generation Tool",
    description: "AI-powered content creation platform with multiple output formats and collaboration features.",
    stack: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Vercel"],
    image: "/vercel.svg",
    githubLink: "https://github.com/username/ai-content-tool",
    liveLink: "https://content.ai.example.com",
    caseStudy: {
      overview: "An intelligent content generation platform that leverages AI to help content creators produce high-quality material efficiently.",
      problem: "Content creators spend excessive time on ideation and initial drafts, limiting their ability to focus on refinement and strategy.",
      solution: "Developed an AI-powered tool that generates various content types while maintaining brand voice and allowing for collaborative editing.",
      technologies: ["Next.js", "OpenAI GPT-4", "Prisma ORM", "PostgreSQL", "Vercel", "Stripe"],
      features: [
        "Multiple content format generation",
        "Brand voice customization",
        "Collaborative editing and review",
        "Content optimization suggestions",
        "Usage analytics and insights",
        "API integration for third-party tools"
      ],
      challenges: [
        "Managing API rate limits and costs",
        "Ensuring content quality and relevance",
        "Implementing real-time collaboration",
        "Balancing AI assistance with human creativity"
      ],
      results: [
        "1000+ active users within 3 months",
        "70% reduction in content creation time",
        "95% user satisfaction rate",
        "$10K MRR achieved in 6 months"
      ],
      images: [
        "/vercel.svg",
        "/globe.svg",
        "/window.svg"
      ]
    }
  },
  {
    id: "weather-dashboard",
    title: "Advanced Weather Dashboard",
    description: "Comprehensive weather application with interactive maps, forecasts, and severe weather alerts.",
    stack: ["Vue.js", "Node.js", "Express", "Weather APIs", "Mapbox"],
    image: "/window.svg",
    githubLink: "https://github.com/username/weather-dashboard",
    liveLink: "https://weather.example.com",
    caseStudy: {
      overview: "A sophisticated weather dashboard providing detailed meteorological data with interactive visualizations and real-time alerts.",
      problem: "Existing weather apps lack comprehensive data visualization and fail to present complex meteorological information in an accessible way.",
      solution: "Created an advanced dashboard with interactive maps, detailed forecasts, and customizable alerts for weather enthusiasts and professionals.",
      technologies: ["Vue.js", "Node.js", "Express", "OpenWeatherMap API", "Mapbox GL JS", "Chart.js"],
      features: [
        "Interactive weather maps with layers",
        "Detailed 14-day forecasts",
        "Severe weather alert system",
        "Historical weather data analysis",
        "Customizable dashboard widgets",
        "Location-based recommendations"
      ],
      challenges: [
        "Processing large meteorological datasets",
        "Creating smooth map interactions",
        "Implementing accurate alert systems",
        "Optimizing for mobile performance"
      ],
      results: [
        "Featured by local meteorologists",
        "50K+ monthly active users",
        "99.5% forecast accuracy rating",
        "Praised for accessibility features"
      ],
      images: [
        "/window.svg",
        "/file.svg",
        "/globe.svg"
      ]
    }
  },
  {
    id: "blockchain-explorer",
    title: "Blockchain Transaction Explorer",
    description: "Real-time blockchain explorer with transaction tracking, analytics, and portfolio management.",
    stack: ["React", "Web3.js", "Node.js", "GraphQL", "PostgreSQL"],
    image: "/globe.svg",
    githubLink: "https://github.com/username/blockchain-explorer",
    liveLink: "https://explorer.blockchain.example.com",
    caseStudy: {
      overview: "A comprehensive blockchain explorer that provides real-time transaction monitoring and portfolio analytics for cryptocurrency users.",
      problem: "Existing blockchain explorers are often complex and don't provide user-friendly interfaces for tracking transactions and portfolio performance.",
      solution: "Developed an intuitive explorer with real-time updates, advanced search capabilities, and integrated portfolio management features.",
      technologies: ["React", "Web3.js", "Node.js", "GraphQL", "PostgreSQL", "WebSocket", "Chart.js"],
      features: [
        "Real-time transaction monitoring",
        "Advanced blockchain analytics",
        "Portfolio tracking and insights",
        "Multi-chain support",
        "Transaction history visualization",
        "Custom alert notifications"
      ],
      challenges: [
        "Handling high-frequency blockchain data",
        "Implementing multi-chain compatibility",
        "Creating responsive data visualizations",
        "Ensuring data accuracy and security"
      ],
      results: [
        "10K+ daily active users",
        "Support for 5+ blockchain networks",
        "Sub-second transaction updates",
        "Recognized by crypto community"
      ],
      images: [
        "/globe.svg",
        "/vercel.svg",
        "/next.svg"
      ]
    }
  }
];
