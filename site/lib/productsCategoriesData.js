// All products organized under Manufacturing (all products are manufactured and exported)
export const productsData = {
  manufacturing: {
    title: "What We Manufacture",
    description: "Premium quality products manufactured in-house with strict quality control. All our products are exported to 15+ countries worldwide.",
    icon: "🏭",
    categories: {
      paints: {
        title: "Paints",
        description: "High-quality industrial and decorative paints for every surface. Durable, vibrant, and eco-friendly formulations for long-lasting protection.",
        icon: "🎨",
        products: [
          {
            id: "p1",
            name: "Hot Thermoplastic Paint",
            desc: "Premium hot thermoplastic road marking paint for highways and roads. Excellent durability and retro-reflective properties.",
            image: "/assets/product-industrial-paint.png",
            specs: ["High durability", "Retro-reflective", "Weather resistant", "Long service life"]
          },
          {
            id: "p2",
            name: "Cold Plastic Paint",
            desc: "High-performance cold plastic road marking paint. Easy application with superior adhesion and visibility.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Easy application", "Superior adhesion", "High visibility", "Durable finish"]
          },
          {
            id: "p3",
            name: "Water Base Paint",
            desc: "Eco-friendly water-based paint for road markings and traffic applications. Low VOC and environmentally safe.",
            image: "/assets/product-epoxy-floor-coating.png",
            specs: ["Eco-friendly", "Low VOC", "Water-based", "Environmentally safe"]
          }
        ]
      },
      "road-safety-furniture": {
        title: "Road Safety Furniture",
        description: "Essential road safety equipment including guardrails, bollards, and traffic barriers designed for maximum durability and safety compliance.",
        icon: "🛣️",
        products: []
      },
      "crash-barriers": {
        title: "Metal Beam Crash Barriers",
        description: "High-strength metal beam crash barriers and W-beam guardrails for highways and expressways. Engineered for maximum impact resistance.",
        icon: "🛡️",
        products: [
          {
            id: "cb1",
            slug: "w-beam-crash-barrier-manufacturers",
            name: "W Beam Crash Barrier",
            shortDesc: "High-performance metal beam crash barriers engineered for highways, expressways & critical road safety applications.",
            desc: "High-performance metal beam crash barriers engineered for highways, expressways & critical road safety applications.",
            image: "/assets/metal beam crash barrier ynm safety.png",
            heroImage: "/assets/metal beam crash barrier for highway ynm safety.png",
            specs: ["W-beam profile", "Hot-dip galvanized", "IS 5986 certified", "MoRTH compliant", "High tensile strength", "2.7mm/3.0mm thickness"],
            overview: "YNM Safety is a trusted W beam crash barrier manufacturer delivering high-quality metal beam crash barriers designed to provide maximum roadside safety and impact resistance. Our W beam crash barriers are widely installed on highways, expressways, bridges, medians, and sharp curves to prevent vehicles from veering off the roadway and to minimize collision severity. Manufactured using premium-grade galvanized steel, YNM Safety's metal beam crash barriers comply with national and international road safety standards. The unique W-profile absorbs and dissipates kinetic energy during impact, reducing vehicle damage and safeguarding passengers. As one of the leading W beam crash barrier manufacturers in India, we ensure consistent quality, long service life, and corrosion resistance even in harsh weather conditions. Our metal beam crash barrier manufacturing process follows strict quality control norms, making YNM Safety a preferred choice for government projects, infrastructure developers, and EPC contractors seeking reliable and cost-effective road safety solutions.",
            detailedDescription: "YNM Safety is a trusted W beam crash barrier manufacturer delivering high-quality metal beam crash barriers designed to provide maximum roadside safety and impact resistance. Our W beam crash barriers are widely installed on highways, expressways, bridges, medians, and sharp curves to prevent vehicles from veering off the roadway and to minimize collision severity. Manufactured using premium-grade galvanized steel, YNM Safety's metal beam crash barriers comply with national and international road safety standards. The unique W-profile absorbs and dissipates kinetic energy during impact, reducing vehicle damage and safeguarding passengers. As one of the leading W beam crash barrier manufacturers in India, we ensure consistent quality, long service life, and corrosion resistance even in harsh weather conditions. Our metal beam crash barrier manufacturing process follows strict quality control norms, making YNM Safety a preferred choice for government projects, infrastructure developers, and EPC contractors seeking reliable and cost-effective road safety solutions.",
            
            // Overview Technical Points (displayed below overview paragraph)
            overviewPoints: [
              { label: "Product Type", value: "W Beam Crash Barrier" },
              { label: "Material", value: "High-grade galvanized steel" },
              { label: "Beam Thickness", value: "3mm" },
              { label: "Surface Finish", value: "Hot-dip galvanized (as per IS standards)" },
              { label: "Length", value: "3.0 m / 4.0 m (standard)" },
              { label: "Post Type", value: "C-post / Sigma post" },
              { label: "Net Weight", value: "25 KG / RM" },
              { label: "Quality Standards", value: "MoRTH 803, ISO 9001:2015, EN 1317, IRC 119" }
            ],
            
            // Detailed Specifications for spec table
            // Technical Specifications Table (as per image)
            detailedSpecs: [
              {
                label: "Country of Origin",
                value: "India",
                icon: "location"
              },
              {
                label: "Manufacturing Location",
                value: "Telangana, Delhi, MP, Kolkata and Gujarat",
                icon: "location"
              },
              {
                label: "Net Weight",
                value: "25 KG / RM",
                icon: "weight"
              },
              {
                label: "Packing Type",
                value: "Bundled with steel straps / As per export standard packing",
                icon: "package"
              },
              {
                label: "Quality Standards",
                value: "MoRTH 803, ISO 9001:2015, EN 1317, IRC 119",
                icon: "standard"
              },
              {
                label: "Minimum Order Quantity (MOQ)",
                value: "100 meters / 1 metric ton / Project-based",
                icon: "package"
              },
              {
                label: "HS Code",
                value: "73089090",
                icon: "standard"
              }
            ],
            
            // Specifications for tabs
            specifications: {
              technical: [
                "Product Type: W Beam Crash Barrier",
                "Material: High-grade galvanized steel",
                "Beam Thickness: 3mm",
                "Surface Finish: Hot-dip galvanized (as per IS standards)",
                "Standard Length: 3.0 m / 4.0 m",
                "Post Type: C-post / Sigma post",
                "Net Weight: 25 KG / RM",
                "Impact Performance: High energy absorption",
                "Compliance: MoRTH 803, IRC 119, EN 1317",
                "Quality Standards: MoRTH 803, ISO 9001:2015, EN 1317, IRC 119",
                "HS Code: 73089090"
              ],
              keyFeatures: [
                "Manufactured by experienced metal beam crash barrier manufacturers",
                "High tensile steel for superior impact resistance",
                "Proven W-profile design for energy absorption",
                "Hot-dip galvanized coating for corrosion protection",
                "Easy installation and low maintenance",
                "Suitable for highways, expressways & bridge approaches",
                "Long service life in extreme weather conditions"
              ],
              advantages: [
                "Enhances road safety by preventing vehicle rollovers",
                "Reduces accident severity and roadside fatalities",
                "Cost-effective solution for large infrastructure projects",
                "Trusted W beam crash barrier manufacturer – YNM Safety",
                "Consistent quality for bulk supply and exports",
                "Meets government and international safety norms"
              ]
            },
            
            features: [
              "Manufactured by experienced metal beam crash barrier manufacturers",
              "High tensile steel for superior impact resistance",
              "Proven W-profile design for energy absorption",
              "Hot-dip galvanized coating for corrosion protection",
              "Easy installation and low maintenance",
              "Suitable for highways, expressways & bridge approaches",
              "Long service life in extreme weather conditions"
            ],
            advantages: [
              "Enhances road safety by preventing vehicle rollovers",
              "Reduces accident severity and roadside fatalities",
              "Cost-effective solution for large infrastructure projects",
              "Trusted W beam crash barrier manufacturer – YNM Safety",
              "Consistent quality for bulk supply and exports",
              "Meets government and international safety norms"
            ],
            technicalSpecs: {
              "Product Type": "W Beam Crash Barrier",
              "Material": "High-grade galvanized steel",
              "Beam Thickness": "3mm",
              "Surface Finish": "Hot-dip galvanized (as per IS standards)",
              "Length": "3.0 m / 4.0 m (standard)",
              "Post Type": "C-post / Sigma post",
              "Impact Performance": "High energy absorption",
              "Compliance": "MoRTH 803, IRC 119, EN 1317",
              "Country of Origin": "India",
              "Manufacturing Location": "Telangana, Delhi, MP, Kolkata and Gujarat",
              "Net Weight": "25 KG / RM",
              "Packing Type": "Bundled with steel straps / As per export standard packing",
              "Quality Standards": "MoRTH 803, ISO 9001:2015, EN 1317, IRC 119",
              "MOQ": "100 meters / 1 metric ton / Project-based",
              "HS Code": "73089090"
            },
            
            // Application Areas with images
            applicationAreas: [
              {
                id: "app1",
                title: "Highways & Expressways",
                description: "High-performance W beam crash barriers by YNM Safety ensure maximum safety on high-speed highways and expressways.",
                image: "/assets/metal beam crash barrier for highway ynm safety.png",
                details: "YNM Safety, a trusted metal beam crash barrier manufacturer, supplies durable W beam crash barriers designed to withstand high-impact collisions. These barriers enhance road safety and reduce accident severity on national and international highways."
              },
              {
                id: "app2",
                title: "Curves & Sharp Bends",
                description: "YNM Safety W beam crash barriers provide reliable protection at dangerous curves and sharp bends.",
                image: "/assets/metal beam crash barrier Sharp Bends  &  corners ynm safey.png",
                details: "Engineered for impact absorption, our galvanized W beam crash barriers help control vehicle deviation on accident-prone curves. They significantly improve driver safety in sharp turns and hilly terrains."
              },
              {
                id: "app3",
                title: "Bridges & Flyovers",
                description: "Robust W beam crash barriers from YNM Safety safeguard vehicles on bridges and flyovers.",
                image: "/assets/metal beam crash barrier s ynm safety at Bridges.png",
                details: "As leading W beam crash barrier manufacturers in India, we deliver strong edge protection systems for elevated roads. Our barriers prevent vehicle fall-offs and ensure long-term structural safety."
              },
              {
                id: "app4",
                title: "Roadside Hazards & Embankments",
                description: "YNM Safety's metal beam crash barriers protect vehicles from roadside hazards and embankments.",
                image: "/assets/metal beam crash barrier Hazards at ynm safety.png",
                details: "Our W beam crash barriers are widely installed near culverts, slopes, and embankments to reduce accident impact. They act as a reliable safety shield in high-risk roadside zones."
              },
              {
                id: "app5",
                title: "Medians & Central Dividers",
                description: "YNM Safety W beam crash barriers are ideal for medians and central dividers.",
                image: "/assets/metal beam crash barrier Central Dividers from ynm safety.jpeg",
                details: "Designed to prevent cross-median collisions, our galvanized W beam crash barriers improve traffic separation and road discipline. They are commonly used on multi-lane highways and urban roads."
              },
              {
                id: "app6",
                title: "Mountain & Ghat Roads",
                description: "YNM Safety provides W beam crash barriers for safe travel on mountain and ghat roads.",
                image: "/assets/ghat road w beam barrier ynm safety.png",
                details: "Built for extreme terrain, our metal beam crash barriers perform reliably on steep slopes and narrow roads. They enhance safety on winding ghat sections and high-altitude routes."
              }
            ],
            
            applications: [
              {
                title: "Highways & Expressways",
                short: "High-performance W beam crash barriers by YNM Safety ensure maximum safety on high-speed highways and expressways.",
                hover: "YNM Safety, a trusted metal beam crash barrier manufacturer, supplies durable W beam crash barriers designed to withstand high-impact collisions. These barriers enhance road safety and reduce accident severity on national and international highways.",
                image: "/assets/metal beam crash barrier for highway ynm safety.png"
              },
              {
                title: "Curves & Sharp Bends",
                short: "YNM Safety W beam crash barriers provide reliable protection at dangerous curves and sharp bends.",
                hover: "Engineered for impact absorption, our galvanized W beam crash barriers help control vehicle deviation on accident-prone curves. They significantly improve driver safety in sharp turns and hilly terrains.",
                image: "/assets/metal beam crash barrier Sharp Bends  &  corners ynm safey.png"
              },
              {
                title: "Bridges & Flyovers",
                short: "Robust W beam crash barriers from YNM Safety safeguard vehicles on bridges and flyovers.",
                hover: "As leading W beam crash barrier manufacturers in India, we deliver strong edge protection systems for elevated roads. Our barriers prevent vehicle fall-offs and ensure long-term structural safety.",
                image: "/assets/metal beam crash barrier s ynm safety at Bridges.png"
              },
              {
                title: "Roadside Hazards & Embankments",
                short: "YNM Safety's metal beam crash barriers protect vehicles from roadside hazards and embankments.",
                hover: "Our W beam crash barriers are widely installed near culverts, slopes, and embankments to reduce accident impact. They act as a reliable safety shield in high-risk roadside zones.",
                image: "/assets/metal beam crash barrier Hazards at ynm safety.png"
              },
              {
                title: "Medians & Central Dividers",
                short: "YNM Safety W beam crash barriers are ideal for medians and central dividers.",
                hover: "Designed to prevent cross-median collisions, our galvanized W beam crash barriers improve traffic separation and road discipline. They are commonly used on multi-lane highways and urban roads.",
                image: "/assets/metal beam crash barrier Central Dividers from ynm safety.jpeg"
              },
              {
                title: "Mountain & Ghat Roads",
                short: "YNM Safety provides W beam crash barriers for safe travel on mountain and ghat roads.",
                hover: "Built for extreme terrain, our metal beam crash barriers perform reliably on steep slopes and narrow roads. They enhance safety on winding ghat sections and high-altitude routes.",
                image: "/assets/ghat road w beam barrier ynm safety.png"
              }
            ],
            
            // Pricing Information
            pricing: {
              basePriceINR: 1900,
              currency: "INR",
              unit: "per running meter",
              thickness: "t=3mm",
              displayPrice: "₹1,900 per running meter (t=3mm)",
              packageSizes: [
                { size: "100 meters", priceINR: 1900, moq: 100 },
                { size: "500 meters", priceINR: 1850, moq: 500 },
                { size: "1000 meters", priceINR: 1800, moq: 1000 }
              ],
              bulkDiscounts: [
                { minQuantity: 500, discount: 3 },
                { minQuantity: 1000, discount: 5 },
                { minQuantity: 5000, discount: 8 },
                { minQuantity: 10000, discount: 10 }
              ]
            },
            
            gallery: [
              "/assets/metal beam crash barrier ynm safety.png",
              "/assets/w beam crash barries ynm safety.webp",
              "/assets/ynm safety metal beam crash barriers.png",
              "/assets/metal beam crash barrier for highway ynm safety.png",
              "/assets/metal beam crash barrier Central Dividers from ynm safety.jpeg",
              "/assets/metal beam crash barrier Hazards at ynm safety.png",
              "/assets/metal beam crash barrier s ynm safety at Bridges.png",
              "/assets/metal beam crash barrier Sharp Bends  &  corners ynm safey.png",
              "/assets/ghat road w beam barrier ynm safety.png"
            ],
            
            // Our Projects / Clients
            projects: [
              {
                id: "proj1",
                title: "BEKEM INFRA PROJECTS PVT. LTD - Hyderabad Highway Project",
                client: "BEKEM INFRA PROJECTS PVT. LTD",
                location: "Hyderabad",
                description: "Supplied 20,000 meters of W-Beam Crash Barriers for highway safety infrastructure development project in Hyderabad. Our high-quality galvanized steel barriers provided excellent impact resistance and long-term durability for this critical road safety installation.",
                quantity: "20,000 mts",
                year: "2024"
              },
              {
                id: "proj2",
                title: "ANUSHA PROJECTS PRIVATE LIMITED - Hyderabad Expressway Project",
                client: "ANUSHA PROJECTS PRIVATE LIMITED",
                location: "Hyderabad",
                description: "Delivered 15,360 meters of W-Beam Crash Barriers for expressway median and roadside protection in Hyderabad. The installation enhanced road safety standards and reduced accident severity on this busy expressway corridor.",
                quantity: "15,360 mts",
                year: "2024"
              },
              {
                id: "proj3",
                title: "VRIDDHI INFRATECH INDIA PRIVATE LIMITED - Hyderabad Infrastructure Project",
                client: "VRIDDHI INFRATECH INDIA PRIVATE LIMITED",
                location: "Hyderabad",
                description: "Supplied 28,500 meters of W-Beam Crash Barriers for comprehensive highway safety infrastructure project in Hyderabad. Our metal beam crash barriers were installed across bridges, curves, and high-risk zones, ensuring maximum protection for road users.",
                quantity: "28,500 mts",
                year: "2024"
              }
            ],
            
            meta: {
              title: "W Beam Crash Barrier Manufacturer in India | YNM Safety",
              description: "Leading W beam crash barrier manufacturer in India. YNM Safety offers durable metal beam crash barriers for highways & expressways.",
              slug: "/w-beam-crash-barrier-manufacturers"
            },
            
            // Market Growth Information
            marketGrowth: {
              title: "W-Beam Crash Barrier Market Growth – Global Outlook",
              description: "The global W-beam crash barrier market is growing steadily due to large-scale investments in road safety infrastructure, national highway expansion, and strict government regulations aimed at reducing road fatalities. Rising demand for metal beam crash barriers across highways, expressways, bridges, and urban roads has positioned manufacturers like YNM Safety as key contributors to this growth. With strong adoption in Asia-Pacific, the Middle East, Africa, and North America, the market is expected to register a CAGR of 4–6%, driven by new installations and replacement of outdated safety barriers.",
              cagr: "4-6%",
              growthFactors: [
                "Government mandates for road safety and crash protection systems",
                "Rapid construction of highways, expressways, and smart roads worldwide",
                "Growing demand for galvanized steel W-beam crash barriers due to durability and cost efficiency",
                "Increasing vehicle density and focus on accident impact mitigation",
                "Upgradation of old guardrails with high-performance metal beam crash barriers",
                "Strong presence of reliable manufacturers like YNM Safety – W-Beam Crash Barrier Manufacturers"
              ],
              // Market Statistics
              marketStats: {
                currentMarketSize: "$2.8B",
                projectedMarketSize: "$4.2B",
                currentYear: "2024",
                projectedYear: "2030",
                highwayKmGlobal: "65M+",
                annualInstallations: "12,000+",
                roadsafetySpending: "$180B"
              },
              // Regional Distribution for Pie Chart
              regionalDistribution: [
                { region: "Asia Pacific", value: 35, color: "#74060D" },
                { region: "North America", value: 25, color: "#9A1B2E" },
                { region: "Europe", value: 20, color: "#C9A24D" },
                { region: "Middle East & Africa", value: 12, color: "#D4A853" },
                { region: "Latin America", value: 8, color: "#E8C97A" }
              ],
              // Year-wise Growth Data for Bar Chart
              yearlyGrowth: [
                { year: "2021", value: 2.1 },
                { year: "2022", value: 2.3 },
                { year: "2023", value: 2.5 },
                { year: "2024", value: 2.8 },
                { year: "2025", value: 3.1 },
                { year: "2026", value: 3.4 }
              ]
            },
            
            // Global Availability - Structured by Region
            globalAvailability: {
              regions: [
                {
                  name: "North America",
                  countries: ["United States", "Canada", "Mexico"]
                },
                {
                  name: "Europe",
                  countries: ["Germany", "United Kingdom", "France", "Italy", "Spain", "Other EU countries"]
                },
                {
                  name: "Asia / Asia Pacific",
                  countries: ["China", "India", "Japan", "South Korea", "Australia", "Indonesia", "Thailand", "Malaysia"]
                },
                {
                  name: "Latin America",
                  countries: ["Brazil", "Argentina", "Colombia", "Mexico"]
                },
                {
                  name: "Middle East & Africa",
                  countries: ["Saudi Arabia", "United Arab Emirates", "South Africa"]
                },
                {
                  name: "Oceania",
                  countries: ["Australia", "New Zealand"]
                }
              ]
            },
            
            performanceMetrics: "100,000 running meters/month",
            
            statistics: {
              annualCapacity: "1,200,000 rm",
              exportCountries: "25+",
              qualityStandards: "ISO 9001:2015",
              productionSpeed: "100,000 rm"
            },
            
            // Manufacturing Process
            // Manufacturing Process - 9 Steps
            manufacturingProcessIntro: "Our Metal Beam Crash Barriers are manufactured through a controlled, quality-driven process to ensure maximum strength, durability, and compliance with national and international road safety standards.",
            manufacturingProcess: [
              {
                step: "01",
                title: "Raw Material Procurement & Inspection",
                description: "High-quality steel coils are sourced from certified suppliers. Each batch undergoes chemical and mechanical testing to ensure conformity with IS, ASTM, and MoRTH specifications."
              },
              {
                step: "02",
                title: "Steel Coil Slitting & Cutting",
                description: "Steel coils are precision-slit and cut into required widths and lengths based on W-Beam, Thrie-Beam, or Double W-Beam specifications to maintain dimensional accuracy."
              },
              {
                step: "03",
                title: "Cold Roll Forming",
                description: "The cut steel sheets are passed through advanced roll-forming machines to achieve the exact crash barrier profile with uniform thickness and consistent geometry."
              },
              {
                step: "04",
                title: "Punching & Slot Formation",
                description: "Computer-controlled punching machines create bolt holes and slots with high precision to ensure easy installation and perfect alignment at site."
              },
              {
                step: "05",
                title: "End Finishing & Edge Trimming",
                description: "Barrier ends are trimmed, deburred, and finished to eliminate sharp edges, improving safety during handling and installation."
              },
              {
                step: "06",
                title: "Surface Preparation (Degreasing & Pickling)",
                description: "Formed beams are thoroughly cleaned through degreasing and pickling processes to remove oil, rust, and impurities, ensuring superior coating adhesion."
              },
              {
                step: "07",
                title: "Hot-Dip Galvanizing",
                description: "The beams are hot-dip galvanized as per IS 4759 / ASTM A123 standards, providing a uniform zinc coating for long-term corrosion resistance in harsh environments."
              },
              {
                step: "08",
                title: "Quality Testing & Inspection",
                description: "Finished barriers undergo strict quality checks, including coating thickness, dimensional accuracy, mechanical strength, and visual inspection before approval."
              },
              {
                step: "09",
                title: "Packing, Storage & Dispatch",
                description: "Approved crash barriers are securely bundled, labeled, and stored in covered areas. Products are then dispatched with proper documentation to ensure safe and timely delivery."
              }
            ]
          },
          {
            id: "cb2",
            name: "Thrie Beam",
            desc: "Heavy-duty thrie-beam guardrails for high-speed highways and bridges. Enhanced strength and durability.",
            image: "/assets/product-structural-steel.png",
            specs: ["Thrie-beam profile", "Extra strength", "Bridge applications", "Long span capability"]
          },
          {
            id: "cb3",
            name: "Double W Beam",
            desc: "Double W-beam crash barrier system for maximum protection on high-risk road sections.",
            image: "/assets/product-structural-steel.png",
            specs: ["Double W-beam design", "Maximum protection", "Heavy-duty construction", "IS certified"]
          },
          {
            id: "cb4",
            name: "Roller Crash Barrier",
            desc: "Advanced roller crash barrier system with energy-absorbing rollers for enhanced safety.",
            image: "/assets/product-custom-metal-enclosure.png",
            specs: ["Energy absorbing", "Roller system", "Enhanced safety", "Easy installation"]
          },
          {
            id: "cb5",
            name: "Attenuator",
            desc: "Crash attenuator systems for terminal end treatments and impact absorption.",
            image: "/assets/product-custom-metal-enclosure.png",
            specs: ["Impact absorption", "Terminal treatment", "Safety compliance", "Durable design"]
          }
        ]
      },
      signages: {
        title: "Signages",
        description: "Retro-reflective sign boards and traffic signages for roads and highways. High visibility and weather-resistant for optimal safety.",
        icon: "🚦",
        products: [
          {
            id: "sg1",
            name: "Gantry",
            desc: "Overhead gantry signages for highways and expressways. High-visibility overhead traffic guidance systems.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Overhead installation", "High visibility", "Weather resistant", "Durable construction"]
          },
          {
            id: "sg2",
            name: "Cantilever",
            desc: "Cantilever signages mounted on single support posts. Ideal for road sides and median installations.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Single post support", "IRR 2000 compliant", "Multiple sizes", "Easy installation"]
          },
          {
            id: "sg3",
            name: "Canopy",
            desc: "Canopy signages for covered areas and overhead installations. Weather-protected signage solutions.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Weather protected", "High visibility", "Custom sizes", "Long service life"]
          },
          {
            id: "sg4",
            name: "Informatory Signages",
            desc: "Informatory signages providing directions, distances, and important information to road users.",
            image: "/assets/product-exterior-weather-coat.png",
            specs: ["Informational", "Retro-reflective", "Weatherproof", "IS certified"]
          }
        ]
      },
      fabrication: {
        title: "Fabrication",
        description: "Custom steel and metal fabrication solutions. From structural components to precision-engineered parts for all industrial needs.",
        icon: "⚙️",
        products: []
      },
      furniture: {
        title: "School Furniture",
        description: "Ergonomic and durable furniture for educational institutions. Desks, chairs, and complete classroom solutions built to last.",
        icon: "🪑",
        products: []
      }
    }
  }
};

// Helper function to get all products with their IDs for routing
export function getAllProducts() {
  const allProducts = [];
  Object.values(productsData.manufacturing.categories).forEach((category) => {
    category.products.forEach((product) => {
      allProducts.push(product);
    });
  });
  return allProducts;
}

// Helper function to get product by ID or slug
export function getProductById(id) {
  const allProducts = getAllProducts();
  // Try to find by id first
  let product = allProducts.find((p) => p.id === id);
  // If not found, try to find by slug
  if (!product) {
    product = allProducts.find((p) => p.slug === id);
  }
  return product;
}

// Helper function to get product by slug
export function getProductBySlug(slug) {
  const allProducts = getAllProducts();
  return allProducts.find((p) => p.slug === slug);
}
