export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
] as const;

export const COMPANY = {
  name: "Senthil Associates",
  tagline: "ARCHITECTURE | CONSTRUCTION | INTERIOR DESIGN",
  quotes: [
    "respect nature",
    "Learning from the Past and applying to the FUTURE"
  ],
  address: "RH-273, Anandha Nilayam, Abdul Kalam 1st Street, Ellis Nagar, Madurai 625016, Tamil Nadu.",
  phone: "+91-98421-64380",
  email: "Senthilassociates@yahoo.com"
};

export const MISSION = [
  "Creative design",
  "Efficient and effective planning",
  "Attention to details with quality materials",
  "Application of sustainable design principles"
];

export const PROCESS = [
  {
    "step": "01",
    "title": "Visit Project",
    "description": "We visit the site to evaluate its potential and discuss your unique design needs."
  },
  {
    "step": "02",
    "title": "Planning Design",
    "description": "We create a detailed plan to blend functionality with aesthetics seamlessly."
  },
  {
    "step": "03",
    "title": "Project Sketch",
    "description": "We present initial sketches and concepts to bring your ideas to life visually."
  },
  {
    "step": "04",
    "title": "Start Working",
    "description": "Our team begins transforming your spaces with precision and attention to detail."
  }
];

export const ARCHITECT = {
  name: "Ar. SENTHIL",
  experience: "25+ years of experience,",
  education: [
    "B.Arch., (April- 2000) Thiagarajar College of Engineering, Madurai",
    "M.Arch (General) (June- 2016) from R.V.S. School of Architecture, Coimbatore"
  ],
  associations: [
    "Treasurer of Indian Institute of Architects (IIA) Madurai center",
    "Member of the Council of Architecture (COA)",
    "Member of Institute of Indian Interior Designers (IIID)"
  ],
  philosophy: [
    "Conceptually strong designs",
    "Innovative design",
    "Performative buildings",
    "Responding to context",
    "Responding to constraints",
    "Responding to client requirements",
    "Responding to architectural vision",
    "Fine detail attention",
    "Unique design solutions",
    "Vibrant design solutions"
  ]
};



export const SERVICES = [
  {
    "icon": "Compass",
    "title": "Architectural Design",
    "description": "Carefully planned, functional spaces tailored to your lifestyle. Residences, apartments, commercial buildings, offices, institutions, hospitals, resorts and industries."
  },
  {
    "icon": "Sofa",
    "title": "Interior Design",
    "description": "Elegant, timeless interiors where every detail matters. Residences, apartments, villas, offices, retail, hospitality, commercial and healthcare spaces."
  },
  {
    "icon": "Leaf",
    "title": "Landscape Design",
    "description": "Thoughtful landscapes that connect people with nature. Residential, campus, institutional, commercial, indoor, recreational and public spaces."
  },
  {
    "icon": "Building2",
    "title": "Design + Build",
    "description": "Efficient planning, quality materials and project supervision, from initial design to execution."
  }
] as const;

export const PROJECTS = [
{
  "slug": "mr-ganesh-kumar-residence",
  "title": "Mr. Ganesh Kumar’s Residence",
  "location": "Nagamalai Pudhukottai, Madurai",
  "categories": [
    "Architecture Design",
    "Interior Design"
  ],
  "cover": "exterior.webp",
  "interior_cover": "interior.webp",
  "gallery": [
    "exterior.webp",
    "interior.webp",
    "exterior-perspective.webp",
    "04.GF KIDS ROOM 02.png",
    "06.GF OFFICE.png",
    "08.FF DRESS.png",
    "10.FAMILY HALL CABINET.png"
  ],
  "facts": {
    "Plot facing": "East",
    "Type": "Residence",
    "No. of floors": "G+1"
  },
  "description": "This east-facing home combines brick cladding and Vastu-aligned planning with premium materials, refined finishes and integrated services. The double-height living room features a grill walkway. The open, welcoming living area connects smoothly with nearby zones, while a courtyard brings light and a sense of openness. On the terrace, a signature cut-out pergola, a refined grey theme, glass handrails, patterned tiles and elegant lighting complete the design."
},
  {
    slug: "ar-senthil-residence",
    title: "Anandha Nilayam — Ar. Senthil's Residence",
    description: "An east-facing mixed-use building in Ellis Nagar, Madurai, bringing together an office, parlour and residence across ground plus two floors.",
    location: "Ellis Nagar, Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.webp",
    gallery: [
      "exterior.webp",
      "interior-1.png",
      "interior-2.webp",
      "interior-3.png",
      "anandha-nilayam-1.webp",
      "anandha-nilayam-2.webp",
      "anandha-nilayam-3.webp",
      "anandha-nilayam-4.webp",
      "anandha-nilayam-5.webp",
      "anandha-nilayam-6.webp",
      "anandha-nilayam-7.webp",
      "anandha-nilayam-8.webp",
      "anandha-nilayam-9.webp",
      "anandha-nilayam-10.webp",
      "anandha-nilayam-11.webp"
    ],
    facts: {
      "Site area": "1540 sq.ft",
      "Site dimension": "22'0\" x 70'0\"",
      "Ground floor built-up": "1540 sq.ft",
      "First floor built-up": "1540 sq.ft",
      "Second floor built-up": "400 sq.ft",
      "Total built-up area": "3480 sq.ft",
      "Plot facing": "East",
      "Type": "Office, Parlour and Residence",
      "Year of completion": "2019",
      "No. of floors": "G+2"
    }
  },
  {
    slug: "senthil-singampunari",
    title: "Mr. Senthil's Residence",
    location: "Singampunari",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"],
    facts: {
      "Type": "Residential Architecture",
      "Location": "Singampunari",
      "Discipline": "Architecture Design",
      "Status": "Completed"
    },
    description: "A distinct residential landmark designed with thoughtful space optimization, natural ventilation, and contemporary architectural aesthetics in Singampunari."
  },
  {
    slug: "mrs-meenal-residence",
    title: "Mrs. Meenal's Residence",
    location: "Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"],
    facts: {
      "Type": "Private Residence",
      "Location": "Madurai",
      "Discipline": "Architecture Design",
      "Status": "Completed"
    },
    description: "A modern private residence planned around generous natural lighting, open living zones, and elegant exterior massing in Madurai."
  },
  {
    slug: "mr-shivalingam-residence",
    title: "Mr. Shivalingam's Residence",
    location: "Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"],
    facts: {
      "Type": "Family Residence",
      "Location": "Madurai",
      "Discipline": "Architecture Design",
      "Status": "Completed"
    },
    description: "An elegantly composed family home blending Vastu-conscious spatial organization with contemporary facade detailing in Madurai."
  },
  {
    slug: "mr-karthick-residence",
    title: "Mr. Karthick's Residence",
    location: "Ellis Nagar, Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"],
    facts: {
      "Type": "Urban Residence",
      "Location": "Ellis Nagar, Madurai",
      "Discipline": "Architecture Design",
      "Status": "Completed"
    },
    description: "A bespoke urban residence featuring efficient multi-level space planning, climate-responsive fenestration, and clean geometric lines in Ellis Nagar, Madurai."
  },
  {
    slug: "mr-selvam-residence",
    title: "Mr. Selvam's Residence",
    location: "Dindigul",
    categories: ["Architecture Design", "Interior Design"],
    cover: "exterior.png",
    interior_cover: "interior-master-bedroom.webp",
    gallery: ["exterior.png", "interior-master-bedroom.webp", "interior-office.webp"],
    facts: {
      "Type": "Residence & Interiors",
      "Location": "Dindigul",
      "Discipline": "Architecture & Interior Design",
      "Status": "Completed"
    },
    description: "An expansive residence incorporating integrated architectural planning and bespoke interior styling, tailored for luxurious and serene family living in Dindigul."
  },
  {
    slug: "mr-vairamuthu-residence",
    title: "Mr. Vairamuthu's Residence",
    location: "Gladway, Madurai",
    categories: ["Architecture Design", "Interior Design"],
    cover: "exterior.png",
    interior_cover: "interior-living.webp",
    gallery: ["exterior.png", "interior-living.webp"],
    facts: {
      "Type": "Residential Architecture & Interior",
      "Location": "Gladway, Madurai",
      "Discipline": "Architecture & Interior Design",
      "Status": "Completed"
    },
    description: "Harmonizing interior luxury with striking exterior architecture, this home maximizes cross-ventilation, daylight, and custom living room interior finishes in Gladway, Madurai."
  },
  {
    slug: "kalaimagal-papermill",
    title: "Kalaimagal Papermill",
    location: "Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"],
    facts: {
      "Type": "Industrial / Mill Facility",
      "Location": "Madurai",
      "Discipline": "Industrial Architecture",
      "Status": "Completed"
    },
    description: "A purpose-built industrial and commercial facility engineered for streamlined production flow, structural resilience, and natural high-volume ventilation in Madurai."
  },
  {
    slug: "k-narayanan-tower",
    title: "K Narayanan Tower",
    location: "Kalavasal, Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"],
    facts: {
      "Type": "Commercial Tower",
      "Location": "Kalavasal, Madurai",
      "Discipline": "Commercial Architecture",
      "Status": "Completed"
    },
    description: "A prominent commercial landmark commanding the Kalavasal junction, designed for flexible corporate offices, retail efficiency, and modern urban appeal."
  },
  {
    slug: "robust-fitness-studio",
    title: "Robust Fitness Studio",
    location: "Amman Sannathi, Madurai",
    categories: ["Interior Design"],
    cover: "interior.webp",
    gallery: ["interior.webp"],
    facts: {
      "Type": "Fitness & Commercial Interior",
      "Location": "Amman Sannathi, Madurai",
      "Discipline": "Interior Design",
      "Status": "Completed"
    },
    description: "A high-energy, dynamic fitness interior designed with motivational lighting, acoustic zoning, heavy-load floor durability, and optimized athlete circulation in Madurai."
  },
  {
    slug: "lenin-advocate-office",
    title: "Mr. Lenin Advocate Office",
    location: "Othakadai, Madurai",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    facts: {
      "Type": "Commercial Law Office",
      "Location": "Othakadai, Madurai",
      "Discipline": "Design + Build",
      "Status": "Completed"
    },
    description: "The organization of space allows natural light streaming in from the south and west directions, which at the same time buffer the walls with well-planned storage."
  },
  {
    slug: "mr-vengatesh-residence",
    title: "Mr. Vengadesh Advocate — Residence",
    location: "Kadachanendal, Madurai",
    facts: { "Site area": "1815 sq.ft", "Total built-up area": "2419 sq.ft", "Site dimension": "33'0\" x 55'0\"", "Plot facing": "South", "No. of floors": "G+1", "Type": "Residence" },
    categories: ["Design + Build", "Interior Design"],
    cover: "built.webp",
    interior_cover: "interior.webp",
    gallery: [
      "built.webp",
      "vengatesh-elevation-site.webp",
      "design-render.png",
      "interior.webp",
      "vengatesh-living-staircase.webp",
      "vengatesh-courtyard.webp",
      "vengatesh-foyer.webp",
      "vengatesh-hall.webp",
      "client-detail-1.webp",
      "client-detail-2.webp",
      "client-detail-3.webp",
      "client-detail-4.webp"
    ],
    description: "The programme reflects the family’s belief in Vastu and includes three bedrooms with essential facilities. Exposed brick and RCC come together in an honest, textural expression; exposed brickwork eliminates the need for plaster or surface treatments. The design responds to the local climate, with an open-ceiling verandah forming a welcoming, courtyard-like entrance. A sloping roof gives the home its recognisable silhouette. Open-plan living flows into the dining space, anchored by a floating staircase connecting both levels with elegance and transparency."
  },
  {
    slug: "mr-ramanathan-residence",
    title: "Mr. Ramanathan's Residence",
    location: "Devakottai",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    facts: {
      "Type": "Residential Architecture",
      "Location": "Devakottai",
      "Discipline": "Design + Build",
      "Status": "Completed"
    },
    description: "A beautiful balcony heightens the enjoyment of the outdoors. Large, open-framed windows make the most of this exterior setting."
  },
  {
    slug: "mr-jeyanand-residence",
    title: "Mr. Jeyanand's Residence",
    location: "Melur",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    facts: {
      "Type": "Contemporary Residence",
      "Location": "Melur",
      "Discipline": "Design + Build",
      "Status": "Completed"
    },
    description: "A contemporary style with enough natural light & ventilation & different geometrical exterior projections."
  },
  {
    slug: "mr-ravi-drug-house",
    title: "Mr. Ravi Drug House",
    location: "Kamarajar Nagar, Madurai",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    facts: {
      "Type": "Commercial & Warehouse Facility",
      "Location": "Kamarajar Nagar, Madurai",
      "Discipline": "Design + Build",
      "Status": "Completed"
    },
    description: "A comprehensive turnkey pharmaceutical distribution facility and commercial space engineered for seamless inventory logistics, climate control, and structural longevity in Madurai."
  }
];

export const DETAILED_PROJECT = {
  slug: "senthil-residence",
  name: "Ar. SENTHIL’s RESIDENCE",
  location: "Ellis Nagar, Madurai",
  projectType: "Office, Parlour and Residence",
  siteArea: "1540 sq.ft",
  siteDimension: "22’0”X70’0”",
  builtUpArea: {
    groundFloor: "1540 sq.ft",
    firstFloor: "1540 sq.ft",
    secondFloor: "400 sq.ft",
    total: "3480 sq.ft"
  },
  plotFacing: "EAST",
  yearOfCompletion: "2019",
  numberOfFloors: "G+2",
  image: "https://images.unsplash.com/photo-1780632778329-2b965030cedb?q=80&w=1600&auto=format&fit=crop"
};

export const WORK_DRAWINGS = [
  {
    category: "Architectural Drawings",
    image: "/assets/drawings/architectural.jpg",
    items: [
      "CONCEPT PLANS",
      "APPROVAL DRAWING",
      "CONCEPT VIEW",
      "SECTIONS",
      "ELEVATIONS ( 4 Sides)",
      "WORKING DRAWING @ Sill level",
      "WORKING DRAWING @ Lintel level",
      "WORKING DRAWING above lintel",
      "2D PRESENTATION PLAN",
      "MARKING DRAWING",
      "BANK ESTIMATE DETAIL/ABSTRACT"
    ]
  },
  {
    category: "Structural Drawings",
    image: "/assets/drawings/structural.jpg",
    items: [
      "FOOTING DETAIL DRAWING",
      "COLUMN DETAIL DRAWING",
      "EARTH BEAM DETAIL",
      "RCC MATT CONCRETE DETAIL",
      "ROOF BEAM DETAIL DRAWING",
      "ROOF SLAB DETAIL DRAWING",
      "LOFT DRAWING"
    ]
  },
  {
    category: "Services Drawings",
    image: "/assets/drawings/services.jpg",
    items: [
      "ELECTRICAL DRAWING - Roof Point",
      "ELECTRICAL DRAWING - Detailed",
      "ELECTRICAL DRAWING - Wall Elevation",
      "ELECTRICAL DRAWING - UPS Drawing",
      "PLUMBING DRAWING",
      "SUMP DETAIL DRAWING",
      "SEPTIC TANK DETAIL DRAWING",
      "WATER TANK DETAIL"
    ]
  },
  {
    category: "Interior & Finish Drawings",
    image: "/assets/drawings/interior.jpg",
    items: [
      "TILE LAYOUT",
      "TOILET WALL TILE DETAIL DRAWING",
      "KITCHEN WALL TILE DRAWING",
      "WOOD DRAWING - DOORS DESIGN",
      "WOOD DRAWING - WINDOWS",
      "GRILL DRAWING - GATE DESIGN",
      "GRILL DRAWING - WINDOWS",
      "INTERIOR CUPBOARD DETAIL",
      "REFLECTED FALSE CEILING DETAIL",
      "INTERIOR COLOR IDEA",
      "EXTERIOR COLOR IDEA"
    ]
  },
  {
    category: "Exterior & Supervision",
    image: "/assets/drawings/exterior.jpg",
    items: [
      "COMPOUND WALL DETAIL",
      "LANDSCAPE DETAIL DRAWING",
      "3D VIEWS- INTERIOR",
      "3D VIEWS- EXTERIOR",
      "WALKTHROUGH VIDEO",
      "SUPERVISION BY ARCHITECT @ REGULAR INTERVALS"
    ]
  }
];

export const STATS = [
  {
    "value": "25+",
    "label": "Years of Experience"
  },
  {
    "value": "200+",
    "label": "Projects Completed"
  },
  {
    "value": "500+",
    "label": "Happy Clients"
  },
  {
    "value": "5+",
    "label": "Ongoing Projects"
  }
] as const;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  project: string;
  image: string;
};

// Client project summaries, not attributed testimonial quotations.
export const TESTIMONIALS: Testimonial[] = [
  {
    "quote": "An office designed around natural light and well-planned storage.",
    "author": "Mr. Lenin Advocate",
    "role": "Office client",
    "project": "Office, Othakadai",
    "image": "/assets/client/lenin-portrait.webp"
  },
  {
    "quote": "Architecture begins with understanding the people who use a space.",
    "author": "Dr. Praveen Kumar",
    "role": "Client",
    "project": "Senthil Associates",
    "image": "/assets/client/praveen-portrait.webp"
  },
  {
    "quote": "Interior design for a residence in Iyer Bungalow.",
    "author": "Mr. Devarajan",
    "role": "Residential client",
    "project": "Residence, Iyer Bungalow",
    "image": "/assets/client/devarajan-portrait.webp"
  }
];
