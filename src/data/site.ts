export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Project", href: "/projects" },
  { label: "Service", href: "/services" },
] as const;

export const COMPANY = {
  name: "Senthil Associates",
  tagline: "ARCHITECTURE | CONSTRUCTION | INTERIOR DESIGN",
  quotes: [
    "respect nature",
    "Learning from the Past and applying to the FUTURE"
  ],
  address: "RH-273 ,Anandha Nilayam, Abdul Kalam 1st Street, Ellis Nagar, Madurai.",
  phone: "+91-98421-6430",
  email: "Senthilassociates@yahoo.com"
};

export const MISSION = [
  "Creative design",
  "Efficient and effective planning",
  "Attention to details with quality materials",
  "Application of sustainable design principles"
];

export const PROCESS = [
  { step: "01", title: "Understanding", description: "Understanding the requirements of the clients." },
  { step: "02", title: "Development", description: "Detailed development of the design." },
  { step: "03", title: "Discussion", description: "Discussion with clients about the design." },
  { step: "04", title: "Integration", description: "Integration of design with engineering principles." },
  { step: "05", title: "Execution", description: "Project supervision and efficient execution." },
];

export const ARCHITECT = {
  name: "Ar. SENTHIL",
  experience: "More than 19 years of experience.",
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
  { icon: "Compass", title: "Architectural Design", description: "Conceptually strong designs that are innovative and respond to context, constraints, and vision." },
  { icon: "Sofa", title: "Interior Design", description: "Unique and vibrant interior design solutions with fine attention to detail." },
  { icon: "Building2", title: "Design + Built", description: "Efficient and effective planning with quality materials and project supervision." }
] as const;

export const PROJECTS = [
  {
    slug: "ar-senthil-residence",
    title: "Ar. Senthil's Residence",
    location: "Ellis Nagar, Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.webp",
    gallery: ["exterior.webp", "interior-1.png", "interior-2.webp", "interior-3.png"],
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
    gallery: ["exterior.png"]
  },
  {
    slug: "mrs-meenal-residence",
    title: "Mrs. Meenal's Residence",
    location: "Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"]
  },
  {
    slug: "mr-shivalingam-residence",
    title: "Mr. Shivalingam's Residence",
    location: "Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"]
  },
  {
    slug: "mr-karthick-residence",
    title: "Mr. Karthick's Residence",
    location: "Ellis Nagar, Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"]
  },
  {
    slug: "mr-selvam-residence",
    title: "Mr. Selvam's Residence",
    location: "Dindigul",
    categories: ["Architecture Design", "Interior Design"],
    cover: "exterior.png",
    interior_cover: "interior-master-bedroom.webp",
    gallery: ["exterior.png", "interior-master-bedroom.webp", "interior-office.webp"]
  },
  {
    slug: "mr-vairamuthu-residence",
    title: "Mr. Vairamuthu's Residence",
    location: "Gladway, Madurai",
    categories: ["Architecture Design", "Interior Design"],
    cover: "exterior.png",
    interior_cover: "interior-living.webp",
    gallery: ["exterior.png", "interior-living.webp"]
  },
  {
    slug: "kalaimagal-papermill",
    title: "Kalaimagal Papermill",
    location: "Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"]
  },
  {
    slug: "k-narayanan-tower",
    title: "K Narayanan Tower",
    location: "Bypass, Madurai",
    categories: ["Architecture Design"],
    cover: "exterior.png",
    gallery: ["exterior.png"]
  },
  {
    slug: "robust-fitness-studio",
    title: "Robust Fitness Studio",
    location: "Amman Sannathi, Madurai",
    categories: ["Interior Design"],
    cover: "interior.webp",
    gallery: ["interior.webp"]
  },
  {
    slug: "lenin-advocate-office",
    title: "Mr. Lenin Advocate Office",
    location: "Madurai",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    description: "The organization of space allows natural light streaming in from the south and west directions, which at the same time buffer the walls with well-planned storage."
  },
  {
    slug: "mr-vengatesh-residence",
    title: "Mr. Vengatesh's Residence",
    location: "Madurai",
    categories: ["Design + Build", "Interior Design"],
    cover: "built.webp",
    interior_cover: "interior.webp",
    gallery: ["built.webp", "design-render.png", "interior.webp"],
    description: "A contemporary style with traditional architectural home defines with proper use of plot, with enough natural light & ventilation."
  },
  {
    slug: "mr-ramanathan-residence",
    title: "Mr. Ramanathan's Residence",
    location: "Devakottai",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    description: "A beautiful balcony heightens the enjoyment of the outdoors. Large, open-framed windows make the most of this exterior setting."
  },
  {
    slug: "mr-jeyanand-residence",
    title: "Mr. Jeyanand's Residence",
    location: "Melur",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"],
    description: "A contemporary style with enough natural light & ventilation & different geometrical exterior projections."
  },
  {
    slug: "mr-ravi-drug-house",
    title: "Mr. Ravi Drug House",
    location: "Kamarajar Nagar, Madurai",
    categories: ["Design + Build"],
    cover: "built.webp",
    gallery: ["built.webp", "design-render.png"]
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
  { value: "19+", label: "Years of Experience" },
  { value: "IIA", label: "Indian Institute of Architects" },
  { value: "COA", label: "Council of Architecture" },
  { value: "AWARD", label: "BEST ARCHITECT AWARD" }
] as const;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  project: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Their attention to detail and innovative design approach completely transformed our space. Truly a professional team that delivers on their promises.",
    author: "Mr. Senthil",
    role: "Homeowner",
    project: "Ar. Senthil's Residence",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    quote: "Working with them was a seamless experience. The turnkey execution meant we didn't have to worry about a single detail during construction.",
    author: "Mrs. Meenal",
    role: "Client",
    project: "Mrs. Meenal's Residence",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
  }
];
