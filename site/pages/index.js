import Head from "next/head";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import BrandsSection from "@/components/BrandsSection";
import USPSection from "@/components/USPSection";
import DirectorSection from "@/components/DirectorSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import directorData from "@/lib/directorData";

// Fallback data (used when database is not available)
const fallbackProductData = [
  {
    id: "paints",
    slug: "paints",
    title: "Industrial & Decorative Paints",
    shortTitle: "Paints",
    tagline: "Premium Quality",
    image: "/assets/gallery-manufacturing-facility.jpg",
    description: "Premium Quality Paints",
    subcategories: [
      {
        id: "industrial-paints",
        slug: "industrial-paints",
        title: "Industrial Paints",
        subtitle: "Heavy Duty Coatings",
        description: "High-performance industrial paints designed for machinery, equipment, and structural steel. Excellent corrosion resistance and durability for harsh environments.",
        image: "/assets/gallery-manufacturing-facility.jpg",
        specs: ["Epoxy & Polyurethane", "Anti-corrosive", "High gloss finish", "ISO certified"],
      },
      {
        id: "decorative-paints",
        slug: "decorative-paints",
        title: "Decorative Paints",
        subtitle: "Interior & Exterior",
        description: "Premium decorative paints for residential and commercial spaces. Wide range of colors with excellent coverage and washability.",
        image: "/assets/gallery-warehouse.jpg",
        specs: ["Eco-friendly", "Low VOC", "Weather resistant", "10+ year warranty"],
      },
      {
        id: "wood-coatings",
        slug: "wood-coatings",
        title: "Wood Coatings & Finishes",
        subtitle: "Protective & Aesthetic",
        description: "Specialized wood coatings including varnishes, lacquers, and wood stains for furniture and architectural woodwork.",
        image: "/assets/gallery-production-line.jpg",
        specs: ["UV resistant", "Scratch proof", "Natural finish", "Quick drying"],
      },
    ],
  },
  {
    id: "fabrications",
    slug: "fabrications",
    title: "Metal Fabrications",
    shortTitle: "Fabrications",
    tagline: "Precision Engineering",
    image: "/assets/gallery-warehouse.jpg",
    description: "Precision Metal Fabrications",
    subcategories: [
      {
        id: "structural-steel",
        slug: "structural-steel",
        title: "Structural Steel Works",
        subtitle: "Industrial & Commercial",
        description: "Custom structural steel fabrication for buildings, warehouses, and industrial facilities. Complete design to installation services.",
        image: "/assets/gallery-warehouse.jpg",
        specs: ["Hot rolled steel", "Welded & bolted", "Galvanized options", "Load certified"],
      },
      {
        id: "gates-railings",
        slug: "gates-railings",
        title: "Gates & Railings",
        subtitle: "Security & Aesthetics",
        description: "Premium quality gates, grills, and railings for residential, commercial, and industrial applications. Custom designs available.",
        image: "/assets/gallery-production-line.jpg",
        specs: ["MS & SS options", "Powder coated", "Custom designs", "Anti-rust treated"],
      },
      {
        id: "industrial-equipment",
        slug: "industrial-equipment",
        title: "Industrial Equipment",
        subtitle: "Custom Manufacturing",
        description: "Custom fabrication of industrial equipment including storage tanks, conveyors, platforms, and specialized machinery components.",
        image: "/assets/gallery-manufacturing-facility.jpg",
        specs: ["Heavy duty", "Precision cut", "Assembly ready", "Quality tested"],
      },
    ],
  },
  {
    id: "school-furniture",
    slug: "school-furniture",
    title: "School & Educational Furniture",
    shortTitle: "School Furniture",
    tagline: "Learning Spaces",
    image: "/assets/gallery-manufacturing-facility.jpg",
    description: "Quality Educational Furniture",
    subcategories: [
      {
        id: "student-furniture",
        slug: "student-furniture",
        title: "Student Desks & Chairs",
        subtitle: "Comfortable Learning",
        description: "Ergonomically designed student desks and chairs for all age groups. Durable construction with smooth edges for safety.",
        image: "/assets/gallery-production-line.jpg",
        specs: ["Ergonomic design", "Height adjustable", "Scratch resistant", "Easy maintenance"],
      },
      {
        id: "teacher-furniture",
        slug: "teacher-furniture",
        title: "Teacher Tables & Chairs",
        subtitle: "Professional Workspace",
        description: "Spacious teacher desks and comfortable chairs designed for classroom environment. Multiple storage options available.",
        image: "/assets/gallery-warehouse.jpg",
        specs: ["Spacious desktop", "Built-in storage", "Comfortable seating", "Professional finish"],
      },
      {
        id: "classroom-furniture",
        slug: "classroom-furniture",
        title: "Classroom Accessories",
        subtitle: "Complete Solutions",
        description: "Complete classroom furniture solutions including benches, storage cabinets, bookshelves, and display boards.",
        image: "/assets/gallery-warehouse.jpg",
        specs: ["Modular design", "Space efficient", "Durable materials", "Bulk pricing"],
      },
    ],
  },
];

const fallbackServicesData = [
  {
    id: 1,
    label: "SERVICE 01",
    title: "Paint Manufacturing",
    subtitle: "State-of-the-art production facility",
    description: "Our advanced manufacturing facility produces a comprehensive range of industrial, decorative, and specialty paints. We use cutting-edge technology and premium raw materials to ensure consistent quality and performance.",
    bullets: ["Automated batch processing", "Quality control at every stage", "Custom color matching services"],
    image: "/assets/gallery-manufacturing-facility.jpg",
  },
  {
    id: 2,
    label: "SERVICE 02",
    title: "Metal Fabrication Services",
    subtitle: "Precision engineering for every project",
    description: "Complete metal fabrication services from design to delivery. Our skilled craftsmen and modern equipment deliver high-quality structural steel, gates, railings, and custom industrial equipment.",
    bullets: ["CNC cutting & bending", "Expert welding & assembly", "Surface treatment & finishing"],
    image: "/assets/gallery-manufacturing-facility.jpg",
  },
  {
    id: 3,
    label: "SERVICE 03",
    title: "School Furniture Solutions",
    subtitle: "Complete educational furniture provider",
    description: "End-to-end school furniture solutions from design consultation to bulk manufacturing. We specialize in ergonomic, durable furniture that creates better learning environments for students and teachers.",
    bullets: ["Custom design consultation", "Bulk order manufacturing", "Installation & after-sales support"],
    image: "/assets/gallery-production-line.jpg",
  },
  {
    id: 4,
    label: "SERVICE 04",
    title: "Global Export Services",
    subtitle: "Reliable international shipping",
    description: "We export our premium quality products to markets across Asia, Africa, and the Middle East. Our experienced export team handles all documentation, logistics, and customs clearance for hassle-free delivery.",
    bullets: ["International quality certifications", "Competitive FOB & CIF pricing", "Reliable shipping partnerships"],
    image: "/assets/gallery-warehouse.jpg",
  },
];

const fallbackBrandsData = [
  { id: "1", name: "IndianOil", logo: "/assets/brand-logos/indiaoil%20png.jpg" },
  { id: "2", name: "Ramoji Film City", logo: "/assets/brand-logos/Ramoji%20Film%20City%20logo.png" },
  { id: "3", name: "Prestige Group", logo: "/assets/brand-logos/prestige%20logo.webp" },
  { id: "4", name: "Tech Mahindra", logo: "/assets/brand-logos/Tech%20Mahindra%20logo.jpg" },
  { id: "5", name: "GMR", logo: "/assets/brand-logos/GMR-Group-Logo-Pngsource-RK4JM0FN.png" },
  { id: "6", name: "Tom Tailor", logo: "/assets/brand-logos/tom-tailor-sportswear%20logo.png" },
  { id: "7", name: "NCC Limited", logo: "/assets/brand-logos/ncc%20logo.png" },
  { id: "8", name: "NSL Group", logo: "/assets/brand-logos/NSL%20logo.png" },
  { id: "9", name: "HCL", logo: "/assets/brand-logos/hcl%20logo.png" },
  { id: "10", name: "Alekhya Homes", logo: "/assets/brand-logos/alekhya-homes-2023-logo.png" },
  { id: "11", name: "GVK EMRI", logo: "/assets/brand-logos/gvk-logo.png" },
  { id: "12", name: "NTPC", logo: "/assets/brand-logos/ntpc%20logo.png" },
  { id: "13", name: "Power Grid", logo: "/assets/brand-logos/POWERGRID%20logo.png" },
  { id: "14", name: "Hyundai Glovis", logo: "/assets/brand-logos/Hyundai_Glovis_logo.png" },
  { id: "15", name: "NPCI International", logo: "/assets/brand-logos/NPCI_logo.png" },
  { id: "16", name: "BSCPL Infrastructure", logo: "/assets/brand-logos/bscpl-logo.png" },
  { id: "17", name: "AT&T", logo: "/assets/brand-logos/att-logo-transparent.png" },
  { id: "18", name: "Aparna Constructions", logo: "/assets/brand-logos/aparna%20constructions.png" },
];

const fallbackTestimonialsData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Industrial Coatings Ltd",
    role: "Procurement Director",
    rating: 5,
    text: "YNM Mega Industries supplied excellent industrial paints for our manufacturing facility. Consistent quality and great technical support.",
    photo: "/assets/team-member-01.png",
    rotation: 1.5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Elite Constructions",
    role: "Project Manager",
    rating: 5,
    text: "Outstanding metal fabrication work for our commercial project. The structural steel work was delivered on time with excellent quality.",
    photo: "/assets/team-member-02.png",
    rotation: -1.5,
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "Delhi Public School",
    role: "Administration Head",
    rating: 5,
    text: "We furnished our entire new campus with YNM school furniture. Excellent quality, ergonomic design, and very competitive pricing.",
    photo: "/assets/team-member-03.png",
    rotation: 1.2,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    company: "Export Trading Co.",
    role: "Import Manager - Kenya",
    rating: 5,
    text: "Reliable export partner for paints and furniture. Their documentation and shipping process is smooth and professional.",
    photo: "/assets/team-member-04.png",
    rotation: -1.2,
  },
  {
    id: 5,
    name: "Vikram Singh",
    company: "Sunrise Builders",
    role: "Site Engineer",
    rating: 5,
    text: "Custom fabrication work for our residential towers was exceptional. Gates, railings, and structural work - all top quality.",
    photo: "/assets/team-member-05.png",
    rotation: 1.5,
  },
  {
    id: 6,
    name: "Ananya Gupta",
    company: "Modern Interiors",
    role: "Design Consultant",
    rating: 5,
    text: "The quality of decorative paints from YNM is unmatched. Our clients love the finish and durability. Highly recommended!",
    photo: "/assets/team-member-06.png",
    rotation: -1.2,
  },
  {
    id: 7,
    name: "Mohammed Rafiq",
    company: "Gulf Imports LLC",
    role: "CEO - Dubai",
    rating: 5,
    text: "Seamless export process and premium products. YNM has been our trusted supplier for 3 years. Excellent quality control.",
    photo: "/assets/team-member-07.png",
    rotation: 1.3,
  },
  {
    id: 8,
    name: "Kavitha Menon",
    company: "Kendriya Vidyalaya",
    role: "Principal",
    rating: 5,
    text: "Durable and safe school furniture for our students. The ergonomic designs have improved classroom comfort significantly.",
    photo: "/assets/team-member-08.png",
    rotation: -1.5,
  },
  {
    id: 9,
    name: "Suresh Naidu",
    company: "Steel Works India",
    role: "Operations Manager",
    rating: 5,
    text: "Precision metal fabrication at its best. YNM delivered complex structural components that met all our specifications perfectly.",
    photo: "/assets/team-member-09.png",
    rotation: 1.2,
  },
  {
    id: 10,
    name: "Deepika Joshi",
    company: "African Trade Corp",
    role: "Sourcing Head - Nigeria",
    rating: 5,
    text: "Best supplier for African markets. Competitive pricing, reliable shipping, and products that meet international standards.",
    photo: "/assets/team-member-10.png",
    rotation: -1.3,
  },
  {
    id: 6,
    name: "Rahul Deshpande",
    company: "Interior Solutions",
    role: "Design Director",
    rating: 5,
    text: "YNM's decorative paints and wood coatings are premium quality. Our clients love the finish and durability.",
    photo: "/assets/gallery-manufacturing-facility.jpg",
    rotation: -1.0,
  },
  {
    id: 7,
    name: "Neha Singh",
    company: "State Education Board",
    role: "Infrastructure Coordinator",
    rating: 5,
    text: "Bulk order of 5000+ student desks and chairs delivered perfectly. Great durability and the students find them comfortable.",
    photo: "/assets/gallery-warehouse.jpg",
    rotation: 1.0,
  },
  {
    id: 8,
    name: "Karthik Rao",
    company: "Gulf Traders LLC",
    role: "Import Director - UAE",
    rating: 4,
    text: "Excellent export partner for the Middle East market. Quality products, competitive pricing, and reliable delivery timelines.",
    photo: "/assets/gallery-warehouse.jpg",
    rotation: -0.8,
  },
];

export default function Home({ productData, brandsData, testimonialsData, heroData, navLinks, uspData, footerData }) {
  return (
    <>
      <Head>
        <title>YNM Mega Industries Pvt Ltd | Manufacturing & Export</title>
        <meta 
          name="description" 
          content="YNM Mega Industries Pvt Ltd - Leading manufacturer and exporter of premium paints, metal fabrications, and school furniture. Quality products for global markets."
        />
      </Head>
      <Hero heroData={heroData} navLinks={navLinks} />
      <USPSection uspData={uspData} />
      <ProductsSection productData={productData} />
      <BrandsSection brandsData={brandsData} />
      <DirectorSection directorData={directorData} />
      <TestimonialsSection testimonialsData={testimonialsData} />
      <Footer footerData={footerData} />
    </>
  );
}

export async function getStaticProps() {
  const productData = fallbackProductData;
  const brandsData = fallbackBrandsData;
  const testimonialsData = fallbackTestimonialsData;
  const heroData = null;
  const navLinks = null;
  const uspData = null;
  const footerData = null;

  return {
    props: {
      productData,
      brandsData,
      testimonialsData,
      heroData,
      navLinks,
      uspData,
      footerData,
    },
  };
}
