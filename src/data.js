// All site content lives here. Edit freely.
export const me = {
  name: "Arvin Fuentes",
  role: "Software Engineer",
  tagline:
    "I build web platforms and backend systems, from enterprise ERPs to award-winning campaign sites.",
  highlights: ["React", "Next.js", "Flutter", "Spring Boot", "Node.js", "Docker"],
  location: "Manila, Philippines",
  status: "Open to opportunities",
  cv: "/Arvin-Fuentes-CV.pdf",
  email: "arvinfuentes.ba@gmail.com",
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/arvin-fuentes-6a985227b" }],
};

export const jobs = [
  {
    company: "TBWA\\SMP (Santiago Mangada Puno)",
    dates: "April 2026 – Present",
    wide: true,
    items: [
      {
        title: "AOY 2026 Website",
        href: "https://aoy.com.ph/",
        text: "Awarding website for creative agencies across the Philippines (Agency of the Year 2026). Sole developer, building and managing it.",
      },
      {
        title: "4A's Website",
        href: "https://4asphilippines.com/pitch-policy/",
        text: "Maintain and develop the WordPress site for 4A's Philippines.",
      },
      {
        title: "Nissan Electrification 2026",
        href: "https://www.nissan.ph/latest-news/electrification.html",
        text: "Campaign site for the first launch of Nissan's new EVs in the Philippines, with visuals built in Adobe AEM.",
      },
      {
        title: "TBWA\\SMP Website",
        href: "https://www.tbwa-smp.com/",
        text: "Spearheaded the new rebranding.",
      },
      {
        title: "Products of Peace",
        href: "https://www.productsofpeace.ph/",
        text: "Co-developed the website using modern frontend techniques.",
      },
      {
        title: "Bottle It Back",
        text: "Chrome/Edge extension for TBWA\\SMP and Planet Water Foundation that turns AI usage into clean-water donations. Recognized on the 2026 awards circuit.",
      },
    ],
  },
  {
    company: "Galena Scale Technologies Corp.",
    role: "Software Engineer",
    dates: "October 2024 – March 2026",
    wide: true,
    items: [
      {
        title: "ERP System",
        text: "Architected an ERP for 15+ departments using Spring Boot and Spring Data JPA, with multi-role access and all RESTful APIs built independently.",
      },
      {
        title: "POS System",
        text: "Led the full SDLC from team coordination to QA. Built the backend with Spring Boot, JPA/Hibernate, and Spring Data.",
      },
      {
        title: "Change Management System",
        text: "ITIL-based platform with automated risk analysis, impact assessment, and stakeholder tracking.",
      },
      {
        title: "Flutter Development (TestForce)",
        text: "Designed and integrated APIs for a cross-platform mobile app serving an international client.",
      },
      {
        title: "Web Development (Galena Scale)",
        text: "Led the design and build of a high-performance, responsive corporate website.",
      },
      {
        title: "Robotics",
        text: "Built a library notice device that measures decibels in an area.",
      },
    ],
  },
  {
    company: "Liemg Language Center",
    role: "Software Developer",
    dates: "April 2023 – September 2024",
    items: [
      {
        title: "Apartment Management",
        text: "Automated full-stack platform that centralizes leasing, maintenance, and operational data.",
      },
      {
        title: "Attendance Tracker",
        text: "Java (Swing/JDBC) app with a MySQL backend that replaced manual logging, with automated reports, real-time tracking, and admin roles.",
      },
      { title: "Network Technician", text: "Network support for multiple apartment buildings." },
    ],
  },
  {
    company: "Tcup Zone",
    role: "Software Developer",
    dates: "March 2022 – February 2023",
    items: [
      {
        title: "Inventory Management System",
        text: "Full-stack system with a Java backend and vanilla HTML, CSS, and JavaScript frontend. Improved stock efficiency by 80% and customer response.",
      },
      { title: "Technician", text: "Technical support for company hardware and software." },
    ],
  },
];

export const skills = {
  "Front end": ["React", "Flutter", "Next.js", "WordPress"],
  "Back end": ["Node.js", "Django", "Laravel", "Spring Boot"],
  Database: ["MySQL", "SQLite", "MongoDB", "PostgreSQL"],
  Tools: ["Docker", "Git", "Postman"],
  Languages: ["PHP", "Python", "C#", "C++", "JavaScript", "Java"],
  "Soft skills": [
    "Application Design",
    "Client Relations",
    "Communication",
    "Problem Solving",
    "Quality Assurance",
    "Project Management",
    "Time Management",
    "Calm under pressure",
  ],
};

export const education = {
  school: "St. Louis College of Valenzuela",
  degree: "Graduate, Cum Laude, 2025",
  points: [
    "Simplicio Gamboa Sr. Foundation Scholar (IT Group Inc.)",
    "Awarded scholarship for academic excellence",
    "Recognized for consistent high academic performance",
    "Best in Program, Best in Computer Science, Best in Mathematics",
  ],
};

export const certs = [
  {
    group: "FreeCodeCamp",
    items: [
      { title: "Back End Development and APIs" },
      { title: "Data Visualization" },
      { title: "Front End Development Libraries" },
      { title: "Scientific Computing in Python" },
      { title: "JavaScript Algorithms and Data Structures" },
      { title: "Legacy Front End" },
      { title: "Responsive Web Design" },
      { title: "Data Management" },
    ],
  },
  {
    group: "Training and bootcamps",
    items: [
      { title: "Firebase 101", by: "University of Caloocan" },
      { title: "Robotics Certification", by: "University of the East" },
      { title: "Cyber security Bootcamp", by: "SkillLogic" },
      { title: "Radio Access Network", by: "USAID from the American people" },
      { title: "Cloud Computing", by: "USAID from the American people" },
      { title: "Fiber Optic Technologies", by: "TerraHertz" },
      { title: "Technical Pitch", by: "Galena Scale Technologies Corp." },
      { title: "Full-Stack Web Dev", by: "Galena Scale Technologies Corp." },
    ],
  },
];

export const projects = [
  {
    slug: "bottle-it-back",
    title: "Bottle It Back",
    badge: "2026 award-circuit recognition",
    desc: "Chrome and Edge extension built at TBWA\\SMP with Planet Water Foundation. It tracks prompts across AI tools, estimates the hidden water cost of data-center cooling, and lets users offset it in seconds ($0.05 per 500 ml bottle).",
    tags: ["Browser extension", "Chrome", "Edge", "Social impact"],
    href: "https://bit.ly/bottleitback",
    cta: "Get the extension",
  },
  {
    slug: "automated-parking-management",
    title: "Automated Parking Management",
    desc: "Sensor-driven parking system built for a client. IoT hardware detects each vehicle at entry, records it automatically, tracks how long it stays, and shows the payment due at exit, with no manual ticketing.",
    tags: ["IoT sensors", "Auto-detection", "Time tracking", "Payment display"],
  },
  {
    slug: "aoy-2026-website",
    title: "AOY 2026 Website",
    desc: "Awarding site for the Philippines' Agency of the Year 2026, serving creative agencies nationwide. Designed, built, and managed end to end as the sole developer.",
    tags: ["Sole developer", "TBWA\\SMP"],
    href: "https://aoy.com.ph/",
    cta: "Visit site",
  },
  {
    slug: "4as-website",
    title: "4A's Philippines Website",
    desc: "Maintain and extend the WordPress site of the Association of Accredited Advertising Agencies of the Philippines.",
    tags: ["WordPress", "Maintenance"],
    href: "https://4asphilippines.com/pitch-policy/",
    cta: "Visit site",
  },
  {
    slug: "nissan-electrification-2026",
    title: "Nissan Electrification 2026",
    desc: "Launch campaign for Nissan's first EVs in the Philippines, with high-impact visuals authored in Adobe Experience Manager.",
    tags: ["Adobe AEM", "Campaign"],
    href: "https://www.nissan.ph/latest-news/electrification.html",
    cta: "View campaign",
  },
  {
    slug: "products-of-peace",
    title: "Products of Peace",
    desc: "Co-developed a modern, performant frontend for a TBWA\\SMP campaign site.",
    tags: ["Frontend", "Team build"],
    href: "https://www.productsofpeace.ph/",
    cta: "Visit site",
  },
  {
    slug: "tbwa-smp-website",
    title: "TBWA\\SMP Website",
    desc: "Led the development behind the agency's rebrand.",
    tags: ["Rebrand", "Web"],
    href: "https://www.tbwa-smp.com/",
    cta: "Visit site",
  },
  {
    slug: "erp-system",
    title: "ERP System",
    desc: "Architected an ERP serving 15+ departments with multi-role access control. Designed and built every RESTful API independently.",
    tags: ["Spring Boot", "Spring Data JPA", "REST"],
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    desc: "Full-stack inventory platform for Tcup Zone that improved stock efficiency by 80% and sped up customer response.",
    tags: ["Java", "HTML", "CSS", "JavaScript"],
  },
];

export const stats = [
  { n: 4, suffix: "+", label: "years building software" },
  { n: 15, suffix: "+", label: "departments on one ERP" },
  { n: 80, suffix: "%", label: "stock efficiency gain" },
];
