import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, getAllProducts } from "@/lib/productsCategoriesData";
import { getProductById as getLegacyProduct } from "./index";

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;
  const [activeSpecTab, setActiveSpecTab] = useState("keyFeatures");
  const [hoveredApplication, setHoveredApplication] = useState(null);
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [animatedStats, setAnimatedStats] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    AED: 3.67,
    SAR: 3.75,
    CNY: 7.24,
    JPY: 149.50
  });
  const stepRefs = useRef([]);
  const carouselIntervalRef = useRef(null);
  const statsRef = useRef(null);
  
  // Try enhanced data first, fallback to legacy
  let product = null;
  if (router.isReady && productId) {
    product = getProductById(productId);
    // If product found but missing detailedDescription, use overview or desc
    if (product && !product.detailedDescription) {
      product.detailedDescription = product.overview || product.desc;
    }
    // Ensure statistics object exists (don't overwrite if it already exists)
    if (product && !product.statistics) {
      product.statistics = {};
    }
    if (!product) {
      const legacyProduct = getLegacyProduct(productId);
      if (legacyProduct) {
        // Convert legacy product to enhanced format
        product = {
          ...legacyProduct,
          detailedDescription: legacyProduct.detailedDescription || legacyProduct.overview || legacyProduct.desc,
          heroImage: legacyProduct.image,
          specifications: {
            technical: legacyProduct.specs || [],
            keyFeatures: legacyProduct.specs || [],
            advantages: legacyProduct.specs || []
          },
          detailedSpecs: [
            {
              label: "Country of Origin",
              value: "India",
              icon: "location"
            },
            {
              label: "Manufacturing Location",
              value: "Hyderabad, Telangana, India",
              icon: "location"
            },
            {
              label: "Package Dimensions",
              value: "Varies by product type",
              icon: "dimensions"
            },
            {
              label: "Net Weight",
              value: "Varies by package size",
              icon: "weight"
            },
            {
              label: "Packaging Type",
              value: "Standard industrial packaging",
              icon: "package"
            },
            {
              label: "Quality Standards",
              value: "ISO 9001:2015 Certified",
              icon: "standard"
            },
            {
              label: "Minimum Order Quantity",
              value: "Contact for details",
              icon: "package"
            }
          ],
          pricing: {
            basePriceUSD: 7.00,
            currency: "USD",
            packageSizes: [
              { size: "1L", priceUSD: 8.50, moq: 100 },
              { size: "5L", priceUSD: 7.00, moq: 50 },
              { size: "20L", priceUSD: 6.50, moq: 20 }
            ],
            bulkDiscounts: [
              { minQuantity: 1000, discount: 5 },
              { minQuantity: 5000, discount: 10 },
              { minQuantity: 10000, discount: 15 }
            ],
            shippingCosts: {
              domestic: 0.50,
              international: 1.20
            }
          },
          applicationAreas: [],
          projects: [],
          marketGrowth: legacyProduct.marketGrowth || null,
          manufacturingProcess: [],
          statistics: legacyProduct.statistics || {}
        };
      }
    }
  }

  // Get all images for carousel
  const productImages = useMemo(() => {
    if (!product) return [];
    const images = [];
    
    // If product has a gallery array, use it (prioritize for crash barriers)
    if (product.gallery && product.gallery.length > 0) {
      // Use up to 6 images from the gallery for a richer carousel
      return product.gallery.slice(0, 6);
    }
    
    // Add hero image if available
    if (product.heroImage) {
      images.push(product.heroImage);
    }
    
    // Add main product image
    if (product.image && product.image !== product.heroImage) {
      images.push(product.image);
    }
    
    // Add images from application areas (up to 2 more to make 3-4 total)
    if (product.applicationAreas && product.applicationAreas.length > 0) {
      const appImages = product.applicationAreas
        .slice(0, 2)
        .map(app => app.image)
        .filter(img => img && !images.includes(img));
      images.push(...appImages);
    }
    
    // If we still don't have enough images, add some gallery images
    if (images.length < 3) {
      const galleryImages = [
        "/assets/gallery-manufacturing-facility.jpg",
        "/assets/gallery-production-line.jpg",
        "/assets/gallery-quality-control.jpg",
        "/assets/gallery-warehouse.jpg"
      ];
      galleryImages.forEach(img => {
        if (images.length < 4 && !images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    return images.slice(0, 4); // Limit to 4 images
  }, [product]);

  // Auto-rotate carousel images every 1.5 seconds
  useEffect(() => {
    if (productImages.length <= 1) {
      setCurrentImageIndex(0);
      return;
    }

    carouselIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 1500);

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [productImages]);

  // Set animated stats directly from product data (no JS animation to avoid issues)
  useEffect(() => {
    if (!product || !product.statistics) return;
    
    // Set the final values directly
    setAnimatedStats({
      annualCapacity: product.statistics.annualCapacity || '',
      exportCountries: product.statistics.exportCountries || ''
    });
  }, [product]);

  // Scroll animation for manufacturing steps - must be called before any returns
  useEffect(() => {
    if (!product || !product.manufacturingProcess || product.manufacturingProcess.length === 0) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-step-index') || '0');
          setVisibleSteps(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
          });
        }
      });
    }, observerOptions);

    const currentRefs = stepRefs.current;
    if (currentRefs) {
      currentRefs.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (currentRefs) {
        currentRefs.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.manufacturingProcess]);
  
  if (!router.isReady) {
    return (
      <>
        <Head>
          <title>Loading... - YNM Mega Industries</title>
        </Head>
        <Navbar />
        <main className="product-detail-page">
          <div className="product-loading">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found - YNM Mega Industries</title>
        </Head>
        <Navbar />
        <main className="product-detail-page">
          <div className="product-not-found">
            <h1>Product Not Found</h1>
            <p>The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="back-btn">
              ← Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const allProducts = getAllProducts();
  
  // For MBCB products (cb1, cb2, cb3, cb4, cb5), show other MBCB products
  const mbcbProductIds = ['cb1', 'cb2', 'cb3', 'cb4', 'cb5'];
  const isMBCBProduct = mbcbProductIds.includes(product.id);
  
  const relatedProducts = isMBCBProduct
    ? allProducts.filter(p => mbcbProductIds.includes(p.id) && p.id !== product.id).slice(0, 4)
    : allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  // Use product meta data if available
  const metaTitle = product.meta?.title || `${product.name} - YNM Mega Industries`;
  const metaDescription = product.meta?.description || product.shortDesc || product.desc;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {product.image && <meta property="og:image" content={product.image} />}
        <meta property="og:type" content="product" />
        {product.meta?.slug && <link rel="canonical" href={`https://ynmsafety.com${product.meta.slug}`} />}
      </Head>

      <Navbar />

      <main className="product-detail-page">
        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <div className="product-breadcrumb-content">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="product-hero-section">
          <div className="product-hero-container">
            <div 
              className="product-hero-image"
              onMouseEnter={() => {
                if (carouselIntervalRef.current) {
                  clearInterval(carouselIntervalRef.current);
                }
              }}
              onMouseLeave={() => {
                if (productImages.length > 1) {
                  carouselIntervalRef.current = setInterval(() => {
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
                  }, 1500);
                }
              }}
            >
              {productImages.length > 0 ? (
                <>
                  {productImages.map((imageSrc, index) => (
                    <div
                      key={index}
                      className={`product-carousel-image ${index === currentImageIndex ? 'active' : ''}`}
                    >
                      <Image
                        src={imageSrc}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        priority={index === 0}
                      />
                    </div>
                  ))}
                  <div className="product-hero-overlay" />
                  {productImages.length > 1 && (
                    <div className="product-carousel-indicators">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            if (carouselIntervalRef.current) {
                              clearInterval(carouselIntervalRef.current);
                            }
                            carouselIntervalRef.current = setInterval(() => {
                              setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
                            }, 1500);
                          }}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Image
                    src={product.heroImage || product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <div className="product-hero-overlay" />
                </>
              )}
            </div>
            <div className="product-hero-content">
              <h1 className="product-hero-title">{product.name}</h1>
              <p className="product-hero-description">{product.shortDesc || product.desc}</p>
            </div>
          </div>
        </section>

        {/* Animated Statistics Dashboard */}
        {product.statistics && (
          <section className="product-stats-dashboard-section">
            <div className="product-section-container">
              <div className="stats-dashboard-wrapper" ref={statsRef}>
                <div className="stats-dashboard-header">
                  <h2>Product Performance Metrics</h2>
                  <p>Real-time statistics showcasing our product excellence</p>
                </div>
                <div className="stats-dashboard-grid">
                  {product.statistics.annualCapacity && (
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-value">
                          {product.statistics.annualCapacity}
                        </div>
                        <div className="stat-label">Annual Production Capacity</div>
                      </div>
                      <div className="stat-card-glow" />
                    </div>
                  )}
                  {product.statistics.exportCountries && (
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-value">
                          {product.statistics.exportCountries}
                        </div>
                        <div className="stat-label">Export Countries</div>
                      </div>
                      <div className="stat-card-glow" />
                    </div>
                  )}
                  {product.statistics.qualityStandards && (
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-value">{product.statistics.qualityStandards}</div>
                        <div className="stat-label">Quality Certification</div>
                      </div>
                      <div className="stat-card-glow" />
                    </div>
                  )}
                  {product.statistics.productionSpeed && (
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-value">{product.statistics.productionSpeed}</div>
                        <div className="stat-label">Monthly Production</div>
                      </div>
                      <div className="stat-card-glow" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Description Section */}
        {(product.detailedDescription || product.overview) && (
          <section className="product-description-section">
            <div className="product-section-container">
              <div className="product-description-content">
                {/* Technical Specifications Table - First */}
                {product.overviewPoints && product.overviewPoints.length > 0 && (
                  <div className="overview-specs-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.overviewPoints.map((point, index) => (
                          <tr key={index}>
                            <td>{point.label}</td>
                            <td>{point.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Product Overview Heading - After Table */}
                <h2 className="product-section-title" style={{ marginTop: '40px' }}>Product Overview</h2>

                {/* Description Paragraph - After Heading */}
                <p>{product.detailedDescription || product.overview}</p>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Specifications Section */}
        {product.detailedSpecs && (
          <section className="product-detailed-specs-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Detailed Specifications</h2>
              <p className="product-section-subtitle">
                Complete product information including dimensions, origin, and manufacturing details
              </p>
              
              <div className="detailed-specs-container">
                <div className="detailed-specs-grid">
                  {product.detailedSpecs.map((spec, index) => (
                    <div key={index} className="detailed-spec-item">
                      <div className="spec-item-icon">
                        {spec.icon === "dimensions" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="9" y1="3" x2="9" y2="21" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                          </svg>
                        )}
                        {spec.icon === "location" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        )}
                        {spec.icon === "weight" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 3h12l4 6-10 12L2 9z" />
                            <path d="M11 3L8 9l4 9 4-9-3-6" />
                            <path d="M2 9h20" />
                          </svg>
                        )}
                        {spec.icon === "package" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                          </svg>
                        )}
                        {spec.icon === "standard" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        )}
                        {spec.icon === "warranty" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M9 12l2 2 4-4" />
                          </svg>
                        )}
                        {!spec.icon && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                        )}
                      </div>
                      <div className="spec-item-content">
                        <div className="spec-item-label">{spec.label}</div>
                        <div className="spec-item-value">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pricing & Currency Section */}
        {product.pricing && (
          <section className="product-pricing-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Pricing</h2>
              <p className="product-section-subtitle">
                {product.pricing.basePriceINR 
                  ? `Price per running meter for ${product.pricing.thickness || 't=3mm'} thickness`
                  : 'Competitive pricing in multiple currencies'}
              </p>

              {/* Multi-Currency Pricing Grid - 7x2 layout */}
              <div className="multi-currency-pricing-grid">
                {(() => {
                  // Base price in INR (₹1,900 per running meter)
                  const basePriceINR = product.pricing.basePriceINR || 1900;
                  
                  // 14 currencies with flags (7 per row)
                  const currencyData = [
                    // Row 1
                    { code: 'INR', symbol: '₹', rate: 1, name: 'India', flag: '🇮🇳' },
                    { code: 'USD', symbol: '$', rate: 1/83.12, name: 'USA', flag: '🇺🇸' },
                    { code: 'EUR', symbol: '€', rate: 1/90.50, name: 'Europe', flag: '🇪🇺' },
                    { code: 'GBP', symbol: '£', rate: 1/105.20, name: 'UK', flag: '🇬🇧' },
                    { code: 'AED', symbol: 'د.إ', rate: 1/22.64, name: 'UAE', flag: '🇦🇪' },
                    { code: 'SAR', symbol: '﷼', rate: 1/22.16, name: 'Saudi Arabia', flag: '🇸🇦' },
                    { code: 'AUD', symbol: 'A$', rate: 1/54.50, name: 'Australia', flag: '🇦🇺' },
                    // Row 2
                    { code: 'CAD', symbol: 'C$', rate: 1/61.20, name: 'Canada', flag: '🇨🇦' },
                    { code: 'JPY', symbol: '¥', rate: 1/0.54, name: 'Japan', flag: '🇯🇵' },
                    { code: 'CNY', symbol: '¥', rate: 1/11.45, name: 'China', flag: '🇨🇳' },
                    { code: 'SGD', symbol: 'S$', rate: 1/61.80, name: 'Singapore', flag: '🇸🇬' },
                    { code: 'ZAR', symbol: 'R', rate: 1/4.58, name: 'South Africa', flag: '🇿🇦' },
                    { code: 'MYR', symbol: 'RM', rate: 1/18.70, name: 'Malaysia', flag: '🇲🇾' },
                    { code: 'QAR', symbol: 'ر.ق', rate: 1/22.84, name: 'Qatar', flag: '🇶🇦' }
                  ];

                  return currencyData.map((currency, index) => {
                    const convertedPrice = basePriceINR * currency.rate;
                    
                    return (
                      <div 
                        key={index} 
                        className={`currency-price-card ${index === 0 ? 'highlighted' : ''}`}
                      >
                        <div className="currency-flag-icon">{currency.flag}</div>
                        <div className="currency-code-badge">
                          <span className="currency-code">{currency.code}</span>
                        </div>
                        <div className="currency-price">
                          <span className="currency-symbol">{currency.symbol}</span>
                          <span className="currency-amount">
                            {currency.code === 'INR' 
                              ? convertedPrice.toLocaleString('en-IN') 
                              : currency.code === 'JPY'
                                ? Math.round(convertedPrice).toLocaleString()
                                : convertedPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="currency-unit">per running meter</div>
                        <div className="currency-name">{currency.name}</div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="pricing-note">
                <p><strong>Note:</strong> Prices are for {product.pricing.thickness || 't=3mm'} thickness. Currency conversions are approximate and may vary.</p>
              </div>
            </div>
          </section>
        )}

        {/* Global Availability Map */}
        <section className="product-availability-section">
          <div className="product-section-container">
            <h2 className="product-section-title">Global Availability</h2>
            <p className="product-section-subtitle">
              Our {product.name} is available and exported to {product.statistics?.exportCountries || '25+ countries'} worldwide
            </p>
            
            <div className="availability-map-wrapper">
              <div className="availability-regions">
                {/* Check if product has structured globalAvailability data */}
                {product.globalAvailability && product.globalAvailability.regions ? (
                  // Use dynamic data from product with country flags
                  product.globalAvailability.regions.map((region, index) => {
                    const regionIcons = {
                      'North America': '🌎',
                      'Europe': '🇪🇺',
                      'Asia / Asia Pacific': '🌏',
                      'Asia Pacific': '🌏',
                      'Latin America': '🌎',
                      'Middle East & Africa': '🌍',
                      'Oceania': '🌏'
                    };
                    // Country to flag mapping
                    const countryFlags = {
                      'United States': '🇺🇸', 'Canada': '🇨🇦', 'Mexico': '🇲🇽',
                      'Germany': '🇩🇪', 'United Kingdom': '🇬🇧', 'France': '🇫🇷', 
                      'Italy': '🇮🇹', 'Spain': '🇪🇸', 'Other EU countries': '🇪🇺',
                      'China': '🇨🇳', 'India': '🇮🇳', 'Japan': '🇯🇵', 
                      'South Korea': '🇰🇷', 'Australia': '🇦🇺', 'Indonesia': '🇮🇩',
                      'Thailand': '🇹🇭', 'Malaysia': '🇲🇾', 'Singapore': '🇸🇬',
                      'Brazil': '🇧🇷', 'Argentina': '🇦🇷', 'Colombia': '🇨🇴',
                      'Saudi Arabia': '🇸🇦', 'United Arab Emirates': '🇦🇪', 
                      'South Africa': '🇿🇦', 'Qatar': '🇶🇦', 'Kuwait': '🇰🇼',
                      'New Zealand': '🇳🇿', 'UAE': '🇦🇪'
                    };
                    return (
                      <div key={index} className="region-card">
                        <div className="region-icon">{regionIcons[region.name] || '🌐'}</div>
                        <h3>{region.name}</h3>
                        <div className="region-countries">
                          {region.countries.map((country, countryIndex) => (
                            <span key={countryIndex} className="country-tag">
                              <span className="country-flag">{countryFlags[country] || '🏳️'}</span>
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Fallback to default regions with flags
                  <>
                    <div className="region-card">
                      <div className="region-icon">🌏</div>
                      <h3>Asia Pacific</h3>
                      <div className="region-countries">
                        <span className="country-tag"><span className="country-flag">🇮🇳</span>India</span>
                        <span className="country-tag"><span className="country-flag">🇨🇳</span>China</span>
                        <span className="country-tag"><span className="country-flag">🇯🇵</span>Japan</span>
                        <span className="country-tag"><span className="country-flag">🇸🇬</span>Singapore</span>
                        <span className="country-tag"><span className="country-flag">🇲🇾</span>Malaysia</span>
                        <span className="country-tag"><span className="country-flag">🇹🇭</span>Thailand</span>
                      </div>
                    </div>
                    <div className="region-card">
                      <div className="region-icon">🌍</div>
                      <h3>Middle East</h3>
                      <div className="region-countries">
                        <span className="country-tag"><span className="country-flag">🇦🇪</span>UAE</span>
                        <span className="country-tag"><span className="country-flag">🇸🇦</span>Saudi Arabia</span>
                        <span className="country-tag"><span className="country-flag">🇶🇦</span>Qatar</span>
                        <span className="country-tag"><span className="country-flag">🇰🇼</span>Kuwait</span>
                      </div>
                    </div>
                    <div className="region-card">
                      <div className="region-icon">🌎</div>
                      <h3>Africa</h3>
                      <div className="region-countries">
                        <span className="country-tag"><span className="country-flag">🇰🇪</span>Kenya</span>
                        <span className="country-tag"><span className="country-flag">🇳🇬</span>Nigeria</span>
                        <span className="country-tag"><span className="country-flag">🇿🇦</span>South Africa</span>
                        <span className="country-tag"><span className="country-flag">🇬🇭</span>Ghana</span>
                      </div>
                    </div>
                    <div className="region-card">
                      <div className="region-icon">🌐</div>
                      <h3>Europe</h3>
                      <div className="region-countries">
                        <span className="country-tag"><span className="country-flag">🇬🇧</span>UK</span>
                        <span className="country-tag"><span className="country-flag">🇩🇪</span>Germany</span>
                        <span className="country-tag"><span className="country-flag">🇫🇷</span>France</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="availability-stats">
                <div className="availability-stat">
                  <div className="stat-number">{product.statistics?.exportCountries?.replace(/[^\d+]/g, '') || '25+'}</div>
                  <div className="stat-text">Countries</div>
                </div>
                <div className="availability-stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-text">Active Clients</div>
                </div>
                <div className="availability-stat">
                  <div className="stat-number">99.2%</div>
                  <div className="stat-text">On-Time Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Specifications Section */}
        {product.specifications && (
          <section className="product-specs-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Product Specification</h2>
              <p className="product-section-subtitle">
                Key features and product advantages of our W Beam Crash Barriers
              </p>
              
              {/* Tabs - Key Features and Product Advantages only */}
              <div className="specs-tabs-wrapper">
                <div className="specs-tabs">
                  <button
                    className={`specs-tab ${activeSpecTab === "keyFeatures" ? "active" : ""}`}
                    onClick={() => setActiveSpecTab("keyFeatures")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>Key Features</span>
                  </button>
                  <button
                    className={`specs-tab ${activeSpecTab === "advantages" ? "active" : ""}`}
                    onClick={() => setActiveSpecTab("advantages")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Product Advantages</span>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="specs-content-wrapper">
                <div className="specs-image-container">
                  <div className="specs-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="specs-image-overlay" />
                    <div className="specs-image-badge">
                      {activeSpecTab === "keyFeatures" ? "Features" : "Advantages"}
                    </div>
                  </div>
                </div>
                <div className="specs-list-container">
                  <div className="specs-list-header">
                    <h3>
                      {activeSpecTab === "keyFeatures" ? "Key Features & Benefits" : "Product Advantages"}
                    </h3>
                  </div>
                  <div className="specs-list">
                    {activeSpecTab === "keyFeatures" && product.specifications.keyFeatures && (
                      <div className="specs-grid">
                        {product.specifications.keyFeatures.map((spec, i) => (
                          <div key={i} className="spec-item">
                            <div className="spec-icon feature-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <div className="spec-text">
                              <span>{spec}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeSpecTab === "advantages" && product.specifications.advantages && (
                      <div className="specs-grid">
                        {product.specifications.advantages.map((spec, i) => (
                          <div key={i} className="spec-item">
                            <div className="spec-icon advantage-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                            </div>
                            <div className="spec-text">
                              <span>{spec}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Application Areas Section */}
        {product.applicationAreas && product.applicationAreas.length > 0 && (
          <section className="product-applications-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Application Areas</h2>
              <p className="product-section-subtitle">
                Where our {product.name} provides maximum road safety and protection
              </p>
              
              <div className="applications-grid">
                {product.applicationAreas.map((app) => (
                  <div
                    key={app.id}
                    className="application-card"
                    onMouseEnter={() => setHoveredApplication(app.id)}
                    onMouseLeave={() => setHoveredApplication(null)}
                  >
                    <div className="application-image">
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="application-overlay" />
                    </div>
                    <div className="application-content">
                      <h3>{app.title}</h3>
                      <p>{app.description}</p>
                      {hoveredApplication === app.id && (
                        <div className="application-details">
                          <p>{app.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Our Projects Section */}
        {product.projects && product.projects.length > 0 && (
          <section className="product-projects-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Our Projects</h2>
              <p className="product-section-subtitle">
                See where our {product.name} has been successfully implemented in real-world projects
              </p>
              
              <div className="projects-grid">
                {product.projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      <span className="project-year">{project.year}</span>
                    </div>
                    <div className="project-info">
                      <div className="project-client">
                        <strong>Client:</strong> {project.client}
                      </div>
                      <div className="project-location">
                        <strong>Location:</strong> {project.location}
                      </div>
                      {project.quantity && (
                        <div className="project-quantity">
                          <strong>Quantity:</strong> {project.quantity}
                        </div>
                      )}
                    </div>
                    <p className="project-description">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Market Growth Section */}
        {product.marketGrowth && (
          <section className="product-market-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Market Growth</h2>
              <p className="product-section-subtitle">
                {product.marketGrowth.title || `Industry insights and growth projections for ${product.name}`}
              </p>

              {/* Market Statistics Cards */}
              {product.marketGrowth.marketStats && (
                <div className="market-stats-grid">
                  <div className="market-stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">{product.marketGrowth.marketStats.currentMarketSize}</div>
                    <div className="stat-label">Current Market Size ({product.marketGrowth.marketStats.currentYear})</div>
                  </div>
                  <div className="market-stat-card highlight">
                    <div className="stat-icon">🚀</div>
                    <div className="stat-value">{product.marketGrowth.marketStats.projectedMarketSize}</div>
                    <div className="stat-label">Projected by {product.marketGrowth.marketStats.projectedYear}</div>
                  </div>
                  <div className="market-stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">{product.marketGrowth.cagr}</div>
                    <div className="stat-label">CAGR Growth Rate</div>
                  </div>
                  <div className="market-stat-card">
                    <div className="stat-icon">🛣️</div>
                    <div className="stat-value">{product.marketGrowth.marketStats.highwayKmGlobal}</div>
                    <div className="stat-label">Global Highway Km</div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="market-description-box">
                <p>{product.marketGrowth.description}</p>
              </div>

              {/* Visualizations Grid */}
              <div className="market-viz-grid">
                {/* Regional Distribution Pie Chart */}
                {product.marketGrowth.regionalDistribution && (
                  <div className="viz-card">
                    <h3>Regional Market Share</h3>
                    <div className="pie-chart-wrapper">
                      <svg className="pie-chart" viewBox="0 0 200 200">
                        {(() => {
                          let cumulativePercent = 0;
                          return product.marketGrowth.regionalDistribution.map((item, index) => {
                            const percent = item.value;
                            const startAngle = cumulativePercent * 3.6;
                            cumulativePercent += percent;
                            const endAngle = cumulativePercent * 3.6;
                            
                            const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                            const startY = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                            const endX = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                            const endY = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
                            const largeArcFlag = percent > 50 ? 1 : 0;
                            
                            return (
                              <path
                                key={index}
                                d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                                fill={item.color}
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="2"
                              />
                            );
                          });
                        })()}
                        <circle cx="100" cy="100" r="40" fill="rgba(116, 6, 13, 0.9)" />
                        <text x="100" y="95" textAnchor="middle" fill="#C9A24D" fontSize="12" fontWeight="600">Market</text>
                        <text x="100" y="112" textAnchor="middle" fill="#F7F3EA" fontSize="14" fontWeight="800">Share</text>
                      </svg>
                      <div className="pie-legend">
                        {product.marketGrowth.regionalDistribution.map((item, index) => (
                          <div key={index} className="legend-item">
                            <span className="legend-color" style={{ background: item.color }}></span>
                            <span className="legend-text">{item.region}</span>
                            <span className="legend-value">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Year-wise Growth Bar Chart */}
                {product.marketGrowth.yearlyGrowth && (
                  <div className="viz-card">
                    <h3>Market Size Growth (in Billion USD)</h3>
                    <div className="bar-chart-wrapper">
                      <div className="bar-chart-container">
                        {product.marketGrowth.yearlyGrowth.map((item, index) => {
                          const maxValue = Math.max(...product.marketGrowth.yearlyGrowth.map(y => y.value));
                          const heightPercent = (item.value / maxValue) * 100;
                          return (
                            <div key={index} className="bar-item">
                              <div className="bar-fill" style={{ height: `${heightPercent}%` }}>
                                <span className="bar-value">${item.value}B</span>
                              </div>
                              <span className="bar-label">{item.year}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="growth-trend-line">
                        <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#C9A24D" />
                              <stop offset="100%" stopColor="#F7F3EA" />
                            </linearGradient>
                          </defs>
                          <path d="M 10 85 L 60 75 L 110 60 L 160 45 L 210 28 L 260 10" 
                            stroke="url(#trendGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Growth Factors */}
              {product.marketGrowth.growthFactors && Array.isArray(product.marketGrowth.growthFactors) && (
                <div className="growth-factors">
                  <h3>Key Growth Factors of W-Beam Crash Barriers</h3>
                  <div className="factors-grid">
                    {product.marketGrowth.growthFactors.map((factor, i) => (
                      <div key={i} className="factor-item">
                        <div className="factor-number">{String(i + 1).padStart(2, '0')}</div>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* REMOVED: Additional Visualizations Grid - moved to new layout above */}
        {false && product.marketGrowth && (
                <div className="market-visualizations-grid-DISABLED">
                  {/* Market Segmentation Pie Chart */}
                  {product.marketGrowth.marketSegmentation && (
                    <div className="visualization-card">
                      <div className="viz-header">
                        <h3>Market by Application</h3>
                        <p>2023 Market Share</p>
                      </div>
                      <div className="pie-chart-container">
                        <svg className="pie-chart" viewBox="0 0 200 200">
                          <defs>
                            {product.marketGrowth.marketSegmentation.map((segment, i) => (
                              <linearGradient key={i} id={`pieGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={segment.color} stopOpacity="1" />
                                <stop offset="100%" stopColor={segment.color} stopOpacity="0.7" />
                              </linearGradient>
                            ))}
                          </defs>
                          {(() => {
                            let currentAngle = -90;
                            const total = product.marketGrowth.marketSegmentation.reduce((sum, s) => sum + s.value, 0);
                            return product.marketGrowth.marketSegmentation.map((segment, i) => {
                              const percentage = (segment.value / total) * 100;
                              const angle = (segment.value / total) * 360;
                              const startAngle = currentAngle;
                              const endAngle = currentAngle + angle;
                              const largeArc = angle > 180 ? 1 : 0;
                              
                              const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                              const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                              const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                              const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
                              
                              const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
                              
                              currentAngle = endAngle;
                              
                              return (
                                <path
                                  key={i}
                                  d={pathData}
                                  fill={`url(#pieGradient${i})`}
                                  className="pie-segment"
                                  style={{ transition: 'all 0.3s ease' }}
                                />
                              );
                            });
                          })()}
                          <circle cx="100" cy="100" r="50" fill="rgba(116, 6, 13, 0.9)" />
                          <text x="100" y="95" textAnchor="middle" fill="#F7F3EA" fontSize="18" fontWeight="700">
                            Market
                          </text>
                          <text x="100" y="115" textAnchor="middle" fill="#C9A24D" fontSize="14" fontWeight="600">
                            Share
                          </text>
                        </svg>
                        <div className="pie-legend">
                          {product.marketGrowth.marketSegmentation.map((segment, i) => (
                            <div key={i} className="pie-legend-item">
                              <div className="pie-legend-color" style={{ background: segment.color }}></div>
                              <span className="pie-legend-label">{segment.label}</span>
                              <span className="pie-legend-value">{segment.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Regional Distribution Pie Chart */}
                  {product.marketGrowth.regionalDistribution && (
                    <div className="visualization-card">
                      <div className="viz-header">
                        <h3>Regional Distribution</h3>
                        <p>Global Market Share</p>
                      </div>
                      <div className="pie-chart-container">
                        <svg className="pie-chart" viewBox="0 0 200 200">
                          <defs>
                            {product.marketGrowth.regionalDistribution.map((region, i) => (
                              <linearGradient key={i} id={`regionGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={region.color} stopOpacity="1" />
                                <stop offset="100%" stopColor={region.color} stopOpacity="0.7" />
                              </linearGradient>
                            ))}
                          </defs>
                          {(() => {
                            let currentAngle = -90;
                            const total = product.marketGrowth.regionalDistribution.reduce((sum, r) => sum + r.value, 0);
                            return product.marketGrowth.regionalDistribution.map((region, i) => {
                              const angle = (region.value / total) * 360;
                              const startAngle = currentAngle;
                              const endAngle = currentAngle + angle;
                              const largeArc = angle > 180 ? 1 : 0;
                              
                              const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                              const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                              const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                              const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
                              
                              const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
                              
                              currentAngle = endAngle;
                              
                              return (
                                <path
                                  key={i}
                                  d={pathData}
                                  fill={`url(#regionGradient${i})`}
                                  className="pie-segment"
                                />
                              );
                            });
                          })()}
                          <circle cx="100" cy="100" r="50" fill="rgba(116, 6, 13, 0.9)" />
                          <text x="100" y="95" textAnchor="middle" fill="#F7F3EA" fontSize="16" fontWeight="700">
                            Global
                          </text>
                          <text x="100" y="115" textAnchor="middle" fill="#C9A24D" fontSize="14" fontWeight="600">
                            Market
                          </text>
                        </svg>
                        <div className="pie-legend">
                          {product.marketGrowth.regionalDistribution.map((region, i) => (
                            <div key={i} className="pie-legend-item">
                              <div className="pie-legend-color" style={{ background: region.color }}></div>
                              <span className="pie-legend-label">{region.region}</span>
                              <span className="pie-legend-value">{region.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Year-over-Year Growth Area Chart */}
                  {product.marketGrowth.yearlyGrowth && (
                    <div className="visualization-card">
                      <div className="viz-header">
                        <h3>Year-over-Year Growth</h3>
                        <p>Market Value (USD Billion)</p>
                      </div>
                      <div className="area-chart-container">
                        <svg className="area-chart" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
                          <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#C9A24D" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#74060D" stopOpacity="0.1" />
                            </linearGradient>
                          </defs>
                          {(() => {
                            const maxValue = Math.max(...product.marketGrowth.yearlyGrowth.map(d => d.value));
                            const points = product.marketGrowth.yearlyGrowth.map((data, i) => {
                              const x = 40 + (i * (320 / (product.marketGrowth.yearlyGrowth.length - 1)));
                              const y = 200 - ((data.value / maxValue) * 160);
                              return `${x},${y}`;
                            }).join(' ');
                            
                            const areaPath = `M 40,200 L ${points} L ${40 + (product.marketGrowth.yearlyGrowth.length - 1) * (320 / (product.marketGrowth.yearlyGrowth.length - 1))},200 Z`;
                            
                            return (
                              <>
                                <path d={areaPath} fill="url(#areaGradient)" className="area-path" />
                                <polyline
                                  points={points}
                                  fill="none"
                                  stroke="#C9A24D"
                                  strokeWidth="3"
                                  className="area-line"
                                />
                                {product.marketGrowth.yearlyGrowth.map((data, i) => {
                                  const x = 40 + (i * (320 / (product.marketGrowth.yearlyGrowth.length - 1)));
                                  const y = 200 - ((data.value / maxValue) * 160);
                                  return (
                                    <g key={i}>
                                      <circle cx={x} cy={y} r="5" fill="#74060D" className="area-point" />
                                      <text x={x} y={y - 15} textAnchor="middle" fill="#C9A24D" fontSize="10" fontWeight="600">
                                        {data.value}
                                      </text>
                                      <text x={x} y={230} textAnchor="middle" fill="#E6D3A3" fontSize="9" fontWeight="500">
                                        {data.year}
                                      </text>
                                    </g>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Market Share by Company Type */}
                  {product.marketGrowth.marketShare && (
                    <div className="visualization-card">
                      <div className="viz-header">
                        <h3>Market Share by Company</h3>
                        <p>Industry Distribution</p>
                      </div>
                      <div className="market-share-container">
                        {product.marketGrowth.marketShare.map((item, i) => (
                          <div key={i} className="market-share-item">
                            <div className="market-share-header">
                              <span className="market-share-label">{item.type}</span>
                              <span className="market-share-percentage">{item.share}%</span>
                            </div>
                            <div className="market-share-bar">
                              <div 
                                className="market-share-fill" 
                                style={{ 
                                  width: `${item.share}%`,
                                  background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

        {/* Testing Video Section */}
        {product.testingVideo && product.testingVideo.youtubeId && (
          <section className="product-testing-video-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Product Testing & Quality Assurance</h2>
              <p className="product-section-subtitle">
                {product.testingVideo.description || "Watch our comprehensive testing procedures and quality assurance processes"}
              </p>
              
              <div className="testing-video-container">
                <div className="video-wrapper">
                  <div className="video-embed">
                    <iframe
                      src={`https://www.youtube.com/embed/${product.testingVideo.youtubeId}?rel=0&modestbranding=1&showinfo=0`}
                      title={product.testingVideo.title || "Product Testing Video"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-iframe"
                    />
                  </div>
                  <div className="video-overlay-decoration"></div>
                </div>
                <div className="video-info">
                  <h3>{product.testingVideo.title || "Quality Testing Procedures"}</h3>
                  <p>Our rigorous testing protocols ensure that every product meets international quality standards and exceeds customer expectations.</p>
                  <div className="video-features">
                    <div className="video-feature-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>ISO Certified Testing</span>
                    </div>
                    <div className="video-feature-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>Quality Assurance</span>
                    </div>
                    <div className="video-feature-item">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>Performance Testing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Manufacturing Process Section */}
        {product.manufacturingProcess && product.manufacturingProcess.length > 0 && (
          <section className="product-manufacturing-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Manufacturing Process of MBCB</h2>
              <p className="product-section-subtitle">
                {product.manufacturingProcessIntro || `Our ${product.name} undergoes a meticulous manufacturing process, ensuring precision, durability, and adherence to stringent quality standards.`}
              </p>

              <div className="manufacturing-steps">
                {product.manufacturingProcess.map((step, index) => {
                  const isVisible = visibleSteps.has(index);
                  return (
                    <div
                      key={index}
                      ref={(el) => { 
                        if (stepRefs.current) {
                          stepRefs.current[index] = el;
                        }
                      }}
                      data-step-index={index}
                      className={`manufacturing-step ${isVisible ? 'visible' : ''}`}
                    >
                      <div className="step-connector"></div>
                      <div className="step-number-wrapper">
                        <div className="step-number">{step.step}</div>
                        <div className="step-number-glow"></div>
                      </div>
                      <div className="step-content">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Proof Section - Factory Images & Certificates */}
        <section className="product-proof-section">
          <div className="product-section-container">
            <h2 className="product-section-title">Factory & Quality Proof</h2>
            <p className="product-section-subtitle">
              See our manufacturing facility and quality certifications that ensure premium product quality
            </p>

            {/* Factory Images Gallery */}
            <div className="proof-factory-gallery">
              <div className="factory-gallery-header">
                <h3>Our Manufacturing Facility</h3>
                <p>State-of-the-art production facility ensuring consistent quality</p>
              </div>
              <div className="factory-images-grid">
                <div className="factory-image-card">
                  <div className="factory-image-wrapper">
                    <Image
                      src="/assets/gallery-manufacturing-facility.jpg"
                      alt="Manufacturing Facility"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="factory-image-overlay">
                      <span className="factory-image-label">Production Facility</span>
                    </div>
                  </div>
                </div>
                <div className="factory-image-card">
                  <div className="factory-image-wrapper">
                    <Image
                      src="/assets/gallery-production-line.jpg"
                      alt="Production Line"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="factory-image-overlay">
                      <span className="factory-image-label">Production Line</span>
                    </div>
                  </div>
                </div>
                <div className="factory-image-card">
                  <div className="factory-image-wrapper">
                    <Image
                      src="/assets/gallery-quality-control.jpg"
                      alt="Quality Control"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="factory-image-overlay">
                      <span className="factory-image-label">Quality Control</span>
                    </div>
                  </div>
                </div>
                <div className="factory-image-card">
                  <div className="factory-image-wrapper">
                    <Image
                      src="/assets/gallery-warehouse.jpg"
                      alt="Warehouse"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="factory-image-overlay">
                      <span className="factory-image-label">Warehouse Facility</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates Section */}
            <div className="proof-certificates">
              <div className="certificates-header">
                <h3>Quality Standards</h3>
                <p>Compliance with national and international road safety standards</p>
              </div>
              <div className="certificates-grid">
                <div className="certificate-card">
                  <div className="certificate-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h4>MoRTH 803</h4>
                  <p>Ministry of Road Transport & Highways Section 803 Specifications</p>
                  <button
                    className="certificate-view-btn"
                    onClick={() => window.open('/certificates/morth-803.pdf', '_blank')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Certificate
                  </button>
                </div>
                <div className="certificate-card">
                  <div className="certificate-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h4>ISO 9001:2015</h4>
                  <p>Quality Management System Certification</p>
                  <button
                    className="certificate-view-btn"
                    onClick={() => window.open('/certificates/iso-9001-2015.pdf', '_blank')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Certificate
                  </button>
                </div>
                <div className="certificate-card">
                  <div className="certificate-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h4>EN 1317</h4>
                  <p>European Standard for Road Restraint Systems</p>
                  <button
                    className="certificate-view-btn"
                    onClick={() => window.open('/certificates/en-1317.pdf', '_blank')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Certificate
                  </button>
                </div>
                <div className="certificate-card">
                  <div className="certificate-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </div>
                  <h4>IRC 119</h4>
                  <p>Indian Roads Congress Guidelines for Traffic Safety Barriers</p>
                  <button
                    className="certificate-view-btn"
                    onClick={() => window.open('/certificates/irc-119.pdf', '_blank')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Success Stories Section */}
        <section className="product-success-stories-section">
          <div className="product-section-container">
            <h2 className="product-section-title">Customer Success Stories</h2>
            <p className="product-section-subtitle">
              Real results from satisfied customers who chose {product.name}
            </p>
            
            <div className="success-stories-grid">
              <div className="success-story-card">
                <div className="story-header">
                  <div className="story-company-logo">
                    <Image
                      src="/assets/brand-logos/ntpc%20logo.png"
                      alt="NTPC"
                      width={60}
                      height={60}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="story-meta">
                    <h3>NTPC Power Plant Project</h3>
                    <p className="story-location">Bongaigaon, Assam</p>
                  </div>
                </div>
                <div className="story-content">
                  <div className="story-stats">
                    <div className="story-stat">
                      <div className="story-stat-value">15,000L</div>
                      <div className="story-stat-label">Quantity Supplied</div>
                    </div>
                    <div className="story-stat">
                      <div className="story-stat-value">5+</div>
                      <div className="story-stat-label">Years Protection</div>
                    </div>
                    <div className="story-stat">
                      <div className="story-stat-value">100%</div>
                      <div className="story-stat-label">Satisfaction</div>
                    </div>
                  </div>
                  <p className="story-quote">
                    &quot;YNM&apos;s Industrial Enamel Paint provided exceptional protection for our power generation equipment. 
                    The paint has withstood extreme temperatures and harsh industrial conditions for over 5 years with minimal maintenance.&quot;
                  </p>
                  <div className="story-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#C9A24D">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="success-story-card">
                <div className="story-header">
                  <div className="story-company-logo">
                    <Image
                      src="/assets/brand-logos/prestige%20logo.webp"
                      alt="Prestige Group"
                      width={60}
                      height={60}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="story-meta">
                    <h3>Prestige Group Residential</h3>
                    <p className="story-location">Bangalore, Karnataka</p>
                  </div>
                </div>
                <div className="story-content">
                  <div className="story-stats">
                    <div className="story-stat">
                      <div className="story-stat-value">30,000L</div>
                      <div className="story-stat-label">Quantity Supplied</div>
                    </div>
                    <div className="story-stat">
                      <div className="story-stat-value">10+</div>
                      <div className="story-stat-label">Years Warranty</div>
                    </div>
                    <div className="story-stat">
                      <div className="story-stat-value">500+</div>
                      <div className="story-stat-label">Units Protected</div>
                    </div>
                  </div>
                  <p className="story-quote">
                    &quot;The Exterior Weather Coat has maintained its beautiful finish and protective properties for over 5 years. 
                    Our residents are extremely satisfied with the quality and appearance.&quot;
                  </p>
                  <div className="story-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#C9A24D">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="success-story-card">
                <div className="story-header">
                  <div className="story-company-logo">
                    <Image
                      src="/assets/brand-logos/Tech%20Mahindra%20logo.jpg"
                      alt="Tech Mahindra"
                      width={60}
                      height={60}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="story-meta">
                    <h3>Tech Mahindra Campus</h3>
                    <p className="story-location">Hyderabad, Telangana</p>
                  </div>
                </div>
                <div className="story-content">
                  <div className="story-stats">
                    <div className="story-stat">
                      <div className="story-stat-value">8,000L</div>
                      <div className="story-stat-label">Quantity Supplied</div>
                    </div>
                    <div className="story-stat">
                      <div className="story-stat-value">ISO</div>
                      <div className="story-stat-label">Certified</div>
                    </div>
                    <div className="story-stat">
                      <div className="story-stat-value">24/7</div>
                      <div className="story-stat-label">Protection</div>
                    </div>
                  </div>
                  <p className="story-quote">
                    &quot;YNM&apos;s paint solutions provided excellent protection for our IT infrastructure. 
                    The quality and service exceeded our expectations, and the paint continues to perform excellently.&quot;
                  </p>
                  <div className="story-rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#C9A24D">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="product-section-container">
              <h2 className="product-section-title">Related Products</h2>
              <p className="product-section-subtitle">
                {['cb1', 'cb2', 'cb3', 'cb4', 'cb5'].includes(product.id) 
                  ? 'Explore other Metal Beam Crash Barrier (MBCB) products from our range'
                  : 'Discover other top-quality products from our range'}
              </p>
              
              <div className="related-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="related-product-card"
                  >
                    <div className="related-product-image">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="related-product-content">
                      <h3>{relatedProduct.name}</h3>
                      <p>{relatedProduct.shortDesc || relatedProduct.desc}</p>
                      <span className="related-product-link">
                        View Details
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .product-detail-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #F7F3EA 0%, #E6D3A3 100%);
          padding-top: 100px;
        }

        /* Breadcrumb */
        .product-breadcrumb {
          padding: 20px 0;
          background: rgba(116, 6, 13, 0.05);
          border-bottom: 1px solid #E6D3A3;
        }

        .product-breadcrumb-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .product-breadcrumb-content a {
          color: #9A1B2E;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .product-breadcrumb-content a:hover {
          color: #74060D;
        }

        .product-breadcrumb-content span {
          color: #C9A24D;
        }

        /* Hero Section */
        .product-hero-section {
          position: relative;
          min-height: 500px;
          margin-bottom: 60px;
        }

        .product-hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .product-hero-image {
          position: relative;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
        }

        .product-carousel-image {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .product-carousel-image.active {
          opacity: 1;
          z-index: 1;
        }

        .product-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.3) 0%, transparent 50%);
          z-index: 2;
          pointer-events: none;
        }

        .product-carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 3;
          padding: 10px 15px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 25px;
        }

        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          margin: 0;
        }

        .carousel-dot:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.2);
        }

        .carousel-dot.active {
          background: #C9A24D;
          border-color: #E6D3A3;
          width: 30px;
          border-radius: 5px;
        }

        .product-hero-content {
          padding: 40px 0;
        }

        .product-hero-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #74060D;
          margin: 0 0 20px;
          line-height: 1.2;
        }

        .product-hero-description {
          font-size: 18px;
          color: #5a4a4a;
          line-height: 1.8;
          margin: 0 0 30px;
        }

        .product-hero-stats {
          display: flex;
          gap: 30px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: #C9A24D;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #9A1B2E;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Section Container */
        .product-section-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .product-section-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          color: #74060D;
          margin: 0 0 12px;
          text-align: center;
        }

        .product-section-subtitle {
          font-size: 18px;
          color: #5a4a4a;
          text-align: center;
          margin: 0 0 50px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Description Section */
        .product-description-section {
          padding: 80px 0;
          background: white;
        }

        .product-description-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .product-description-content p {
          font-size: 18px;
          line-height: 1.9;
          color: #1a2744;
          margin: 0;
        }

        /* Overview Specs Table */
        .overview-specs-table {
          margin-top: 40px;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid #E6D3A3;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.02), rgba(201, 162, 77, 0.02));
        }

        .overview-specs-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .overview-specs-table thead tr {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
        }

        .overview-specs-table th {
          padding: 18px 24px;
          text-align: left;
          font-size: 16px;
          font-weight: 700;
          color: #F7F3EA;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .overview-specs-table th:first-child {
          width: 40%;
        }

        .overview-specs-table tbody tr {
          border-bottom: 1px solid #E6D3A3;
          transition: all 0.3s ease;
        }

        .overview-specs-table tbody tr:last-child {
          border-bottom: none;
        }

        .overview-specs-table tbody tr:hover {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
        }

        .overview-specs-table td {
          padding: 16px 24px;
          font-size: 15px;
          color: #1a2744;
        }

        .overview-specs-table td:first-child {
          font-weight: 600;
          color: #74060D;
        }

        @media (max-width: 768px) {
          .overview-specs-table th,
          .overview-specs-table td {
            padding: 12px 16px;
            font-size: 14px;
          }

          .overview-specs-table th:first-child {
            width: 45%;
          }
        }

        /* Pricing Section */
        .product-pricing-section {
          padding: 80px 0;
          background: white;
        }

        .currency-selector-wrapper {
          max-width: 1000px;
          margin: 0 auto 50px;
        }

        .currency-selector {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          padding: 30px;
          border-radius: 20px;
          border: 2px solid #E6D3A3;
        }

        .currency-selector label {
          display: block;
          font-size: 16px;
          font-weight: 700;
          color: #74060D;
          margin-bottom: 16px;
        }

        .currency-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .currency-btn {
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          color: #9A1B2E;
          background: white;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .currency-btn:hover {
          border-color: #C9A24D;
          transform: translateY(-2px);
        }

        .currency-btn.active {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #F7F3EA;
          border-color: #C9A24D;
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.3);
        }

        /* Multi-Currency Pricing Grid - 7x2 layout */
        .multi-currency-pricing-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 14px;
          margin-bottom: 30px;
        }

        .currency-price-card {
          background: white;
          border-radius: 14px;
          padding: 16px 12px;
          text-align: center;
          border: 2px solid #E6D3A3;
          transition: all 0.3s ease;
        }

        .currency-price-card:hover {
          transform: translateY(-3px);
          border-color: #C9A24D;
          box-shadow: 0 8px 20px rgba(116, 6, 13, 0.12);
        }

        .currency-price-card.highlighted {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          border-color: #C9A24D;
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.25);
        }

        .currency-flag-icon {
          font-size: 32px;
          margin-bottom: 8px;
          line-height: 1;
        }

        .currency-code-badge {
          margin-bottom: 8px;
        }

        .currency-code {
          display: inline-block;
          padding: 4px 12px;
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          color: #74060D;
          font-size: 11px;
          font-weight: 800;
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        .currency-price-card.highlighted .currency-code {
          background: rgba(255, 255, 255, 0.2);
          color: #F7F3EA;
        }

        .currency-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 2px;
          margin-bottom: 4px;
        }

        .currency-symbol {
          font-size: 14px;
          font-weight: 700;
          color: #C9A24D;
        }

        .currency-price-card.highlighted .currency-symbol {
          color: #E6D3A3;
        }

        .currency-amount {
          font-size: 22px;
          font-weight: 800;
          color: #74060D;
        }

        .currency-price-card.highlighted .currency-amount {
          color: #F7F3EA;
        }

        .currency-unit {
          font-size: 9px;
          color: #9A1B2E;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .currency-price-card.highlighted .currency-unit {
          color: #E6D3A3;
        }

        .currency-name {
          font-size: 9px;
          color: #5a4a4a;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          font-weight: 600;
        }

        .currency-price-card.highlighted .currency-name {
          color: rgba(255, 255, 255, 0.8);
        }

        .pricing-note {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 12px;
          padding: 16px 24px;
          border: 1px solid #E6D3A3;
        }

        .pricing-note p {
          font-size: 14px;
          color: #5a4a4a;
          margin: 0;
          line-height: 1.6;
        }

        .pricing-note strong {
          color: #74060D;
        }

        @media (max-width: 1200px) {
          .multi-currency-pricing-grid {
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
          }

          .currency-price-card {
            padding: 14px 8px;
          }

          .currency-amount {
            font-size: 18px;
          }

          .currency-flag-icon {
            font-size: 28px;
          }
        }

        @media (max-width: 992px) {
          .multi-currency-pricing-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }

          .currency-amount {
            font-size: 20px;
          }

          .currency-flag-icon {
            font-size: 30px;
          }
        }

        @media (max-width: 768px) {
          .multi-currency-pricing-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .currency-price-card {
            padding: 12px 8px;
          }

          .currency-amount {
            font-size: 18px;
          }

          .currency-flag-icon {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .multi-currency-pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .currency-amount {
            font-size: 20px;
          }

          .currency-flag-icon {
            font-size: 28px;
          }
        }

        /* Featured Price Card for INR-based products - DEPRECATED */
        .featured-price-card {
          max-width: 600px;
          margin: 0 auto 50px;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.3);
        }

        .featured-price-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top right, rgba(201, 162, 77, 0.3) 0%, transparent 60%);
        }

        .featured-price-header {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 30px;
        }

        .featured-price-badge {
          display: inline-block;
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          color: #74060D;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .featured-price-header h3 {
          font-size: 28px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 8px;
        }

        .price-thickness {
          font-size: 14px;
          color: #E6D3A3;
          margin: 0;
        }

        .featured-price-main {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
          margin-bottom: 30px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .featured-price-main .price-currency {
          font-size: 32px;
          font-weight: 700;
          color: #E6D3A3;
        }

        .featured-price-main .price-amount {
          font-size: 56px;
          font-weight: 800;
          color: #F7F3EA;
        }

        .featured-price-main .price-unit {
          font-size: 16px;
          font-weight: 600;
          color: #E6D3A3;
        }

        .featured-price-features {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #F7F3EA;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .price-feature svg {
          color: #C9A24D;
          flex-shrink: 0;
        }

        .pricing-packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 50px;
        }

        .pricing-package-card {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 20px;
          padding: 30px;
          border: 2px solid #E6D3A3;
          transition: all 0.4s ease;
          text-align: center;
        }

        .pricing-package-card:hover {
          transform: translateY(-8px);
          border-color: #C9A24D;
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.2);
        }

        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #E6D3A3;
        }

        .package-size {
          font-size: 28px;
          font-weight: 800;
          color: #74060D;
        }

        .package-moq {
          font-size: 12px;
          color: #9A1B2E;
          font-weight: 600;
        }

        .package-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .price-currency {
          font-size: 20px;
          font-weight: 700;
          color: #C9A24D;
        }

        .price-amount {
          font-size: 36px;
          font-weight: 800;
          color: #74060D;
        }

        .price-unit {
          font-size: 14px;
          color: #9A1B2E;
          font-weight: 600;
        }

        .package-total {
          font-size: 14px;
          color: #5a4a4a;
          margin-bottom: 20px;
        }

        .package-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .package-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #1a2744;
        }

        .package-feature svg {
          color: #C9A24D;
          flex-shrink: 0;
        }

        .stock-availability {
          margin-top: 40px;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 20px;
          padding: 30px;
          border: 2px solid #E6D3A3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .stock-indicator {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stock-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: white;
          border-radius: 30px;
          border: 2px solid #C9A24D;
        }

        .stock-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .stock-status span {
          font-size: 14px;
          font-weight: 700;
          color: #74060D;
        }

        .stock-info {
          font-size: 14px;
          color: #5a4a4a;
        }

        .stock-info strong {
          color: #9A1B2E;
        }

        .stock-actions {
          display: flex;
          gap: 12px;
        }

        .stock-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 30px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .stock-btn.primary {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #F7F3EA;
          border-color: #C9A24D;
        }

        .stock-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.4);
        }

        .stock-btn.secondary {
          background: transparent;
          color: #9A1B2E;
          border-color: #9A1B2E;
        }

        .stock-btn.secondary:hover {
          background: #9A1B2E;
          color: #F7F3EA;
        }

        /* Global Availability Section */
        .product-availability-section {
          padding: 80px 0;
          background: white;
        }

        .availability-map-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .availability-regions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .region-card {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 20px;
          padding: 28px;
          border: 2px solid #E6D3A3;
          transition: all 0.4s ease;
        }

        .region-card:hover {
          transform: translateY(-8px);
          border-color: #C9A24D;
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.2);
        }

        .region-icon {
          font-size: 42px;
          margin-bottom: 14px;
        }

        .region-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 16px;
        }

        .region-countries {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .country-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: white;
          border: 1px solid #E6D3A3;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #9A1B2E;
          transition: all 0.3s ease;
        }

        .country-flag {
          font-size: 14px;
          line-height: 1;
        }

        .country-tag:hover {
          background: #C9A24D;
          color: #74060D;
          border-color: #C9A24D;
          transform: scale(1.05);
        }

        @media (max-width: 992px) {
          .availability-regions {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .availability-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .availability-stat {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          color: #F7F3EA;
        }

        .stat-number {
          font-size: 48px;
          font-weight: 800;
          color: #C9A24D;
          margin-bottom: 8px;
        }

        .stat-text {
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Detailed Specifications Section */
        .product-detailed-specs-section {
          padding: 80px 0;
          background: linear-gradient(180deg, rgba(116, 6, 13, 0.05) 0%, transparent 100%);
        }

        .detailed-specs-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .detailed-specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .detailed-spec-item {
          background: white;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          border: 2px solid #E6D3A3;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(116, 6, 13, 0.08);
        }

        .detailed-spec-item:hover {
          transform: translateY(-4px);
          border-color: #C9A24D;
          box-shadow: 0 12px 40px rgba(116, 6, 13, 0.15);
        }

        .spec-item-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          border-radius: 12px;
          color: #74060D;
        }

        .detailed-spec-item:hover .spec-item-icon {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(201, 162, 77, 0.3);
        }

        .spec-item-content {
          flex: 1;
        }

        .spec-item-label {
          font-size: 13px;
          font-weight: 600;
          color: #9A1B2E;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .spec-item-value {
          font-size: 16px;
          font-weight: 700;
          color: #1a2744;
          line-height: 1.5;
        }

        /* Specifications Section */
        .product-specs-section {
          padding: 80px 0;
          background: linear-gradient(180deg, rgba(116, 6, 13, 0.05) 0%, transparent 100%);
        }

        .specs-tabs-wrapper {
          margin-bottom: 50px;
        }

        .specs-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          background: white;
          padding: 12px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(116, 6, 13, 0.08);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .specs-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9A1B2E;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          justify-content: center;
          min-width: 180px;
        }

        .specs-tab:hover {
          background: rgba(201, 162, 77, 0.1);
          color: #74060D;
        }

        .specs-tab.active {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #F7F3EA;
          border-color: #C9A24D;
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.3);
        }

        .specs-tab svg {
          width: 20px;
          height: 20px;
        }

        .specs-content-wrapper {
          background: white;
          border-radius: 24px;
          box-shadow: 0 15px 50px rgba(116, 6, 13, 0.15);
          overflow: hidden;
          border: 2px solid #E6D3A3;
        }

        .specs-image-container {
          position: relative;
          height: 350px;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.1), rgba(201, 162, 77, 0.1));
        }

        .specs-image {
          position: relative;
          height: 100%;
          width: 100%;
        }

        .specs-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.2) 0%, transparent 50%);
        }

        .specs-image-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(201, 162, 77, 0.95);
          color: #74060D;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .specs-list-container {
          padding: 50px;
        }

        .specs-list-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #C9A24D;
        }

        .specs-list-header h3 {
          font-size: 28px;
          font-weight: 800;
          color: #74060D;
          margin: 0;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .spec-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.03), rgba(201, 162, 77, 0.03));
          border-radius: 16px;
          border: 2px solid #E6D3A3;
          transition: all 0.3s ease;
        }

        .spec-item:hover {
          transform: translateX(8px);
          border-color: #C9A24D;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.08), rgba(201, 162, 77, 0.08));
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.1);
        }

        .spec-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          border-radius: 12px;
          color: #74060D;
        }

        .spec-icon.feature-icon {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #C9A24D;
        }

        .spec-icon.advantage-icon {
          background: linear-gradient(135deg, #9A1B2E, #C9A24D);
          color: #F7F3EA;
        }

        .spec-text {
          flex: 1;
        }

        .spec-text span {
          font-size: 15px;
          line-height: 1.7;
          color: #1a2744;
          display: block;
        }

        /* Application Areas Section */
        .product-applications-section {
          padding: 80px 0;
          background: white;
        }

        .applications-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .application-card {
          position: relative;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(116, 6, 13, 0.1);
          transition: all 0.4s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .application-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.2);
          border-color: #C9A24D;
        }

        .application-image {
          position: relative;
          height: 200px;
        }

        .application-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(116, 6, 13, 0.7) 100%);
        }

        .application-content {
          padding: 24px;
          position: relative;
        }

        .application-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 10px;
        }

        .application-content > p {
          font-size: 14px;
          color: #5a4a4a;
          line-height: 1.6;
          margin: 0;
        }

        .application-details {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 2px solid #E6D3A3;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .application-details p {
          font-size: 13px;
          color: #1a2744;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 992px) {
          .applications-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .applications-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Projects Section */
        .product-projects-section {
          padding: 80px 0;
          background: linear-gradient(180deg, rgba(116, 6, 13, 0.05) 0%, transparent 100%);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 30px rgba(116, 6, 13, 0.1);
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(116, 6, 13, 0.15);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #E6D3A3;
        }

        .project-header h3 {
          font-size: 22px;
          font-weight: 700;
          color: #74060D;
          margin: 0;
        }

        .project-year {
          font-size: 14px;
          font-weight: 600;
          color: #C9A24D;
          background: rgba(201, 162, 77, 0.1);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .project-info {
          margin-bottom: 16px;
        }

        .project-info div {
          font-size: 14px;
          color: #5a4a4a;
          margin-bottom: 8px;
        }

        .project-info strong {
          color: #9A1B2E;
          font-weight: 600;
        }

        .project-description {
          font-size: 15px;
          line-height: 1.7;
          color: #1a2744;
          margin: 0;
        }

        /* Market Growth Section */
        .product-market-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          color: white;
        }

        .product-market-section .product-section-title {
          color: #F7F3EA;
        }

        .product-market-section .product-section-subtitle {
          color: #E6D3A3;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Market Statistics Grid */
        .market-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .market-stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          border: 2px solid rgba(201, 162, 77, 0.2);
          transition: all 0.3s ease;
        }

        .market-stat-card:hover {
          transform: translateY(-5px);
          border-color: #C9A24D;
        }

        .market-stat-card.highlight {
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          border-color: #C9A24D;
        }

        .market-stat-card.highlight .stat-value,
        .market-stat-card.highlight .stat-label {
          color: #74060D;
        }

        .market-stat-card .stat-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .market-stat-card .stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #F7F3EA;
          margin-bottom: 8px;
        }

        .market-stat-card .stat-label {
          font-size: 12px;
          color: #E6D3A3;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Market Description Box */
        .market-description-box {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 40px;
          border-left: 4px solid #C9A24D;
        }

        .market-description-box p {
          font-size: 16px;
          line-height: 1.8;
          color: #E6D3A3;
          margin: 0;
        }

        /* Visualizations Grid */
        .market-viz-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }

        .viz-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          border: 2px solid rgba(201, 162, 77, 0.2);
        }

        .viz-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #F7F3EA;
          margin: 0 0 24px;
          text-align: center;
        }

        /* Pie Chart Styles */
        .pie-chart-wrapper {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .pie-chart {
          width: 180px;
          height: 180px;
          flex-shrink: 0;
        }

        .pie-legend {
          flex: 1;
        }

        .pie-legend .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .pie-legend .legend-color {
          width: 14px;
          height: 14px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .pie-legend .legend-text {
          flex: 1;
          color: #E6D3A3;
        }

        .pie-legend .legend-value {
          font-weight: 700;
          color: #F7F3EA;
        }

        /* Bar Chart Styles */
        .bar-chart-wrapper {
          position: relative;
        }

        .bar-chart-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 200px;
          padding: 0 10px;
          border-bottom: 2px solid rgba(201, 162, 77, 0.3);
        }

        .bar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 50px;
        }

        .bar-fill {
          width: 36px;
          background: linear-gradient(180deg, #C9A24D 0%, #E6D3A3 100%);
          border-radius: 6px 6px 0 0;
          display: flex;
          justify-content: center;
          padding-top: 8px;
          min-height: 30px;
          transition: all 0.3s ease;
        }

        .bar-item:hover .bar-fill {
          background: linear-gradient(180deg, #F7F3EA 0%, #C9A24D 100%);
        }

        .bar-fill .bar-value {
          font-size: 10px;
          font-weight: 700;
          color: #74060D;
          white-space: nowrap;
        }

        .bar-item .bar-label {
          margin-top: 10px;
          font-size: 12px;
          color: #E6D3A3;
          font-weight: 600;
        }

        .growth-trend-line {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          height: 100px;
          pointer-events: none;
        }

        .growth-trend-line svg {
          width: 100%;
          height: 100%;
        }

        /* Growth Factors */
        .growth-factors {
          margin-top: 20px;
        }

        .growth-factors h3 {
          font-size: 22px;
          font-weight: 700;
          color: #F7F3EA;
          margin: 0 0 24px;
          text-align: center;
        }

        .factors-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .factor-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 14px;
          line-height: 1.6;
          color: #E6D3A3;
          padding: 18px 20px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          border: 1px solid rgba(201, 162, 77, 0.2);
          transition: all 0.3s ease;
        }

        .factor-item:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(201, 162, 77, 0.4);
          transform: translateX(5px);
        }

        .factor-number {
          font-size: 18px;
          font-weight: 800;
          color: #C9A24D;
          min-width: 30px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .market-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .market-viz-grid {
            grid-template-columns: 1fr;
          }

          .pie-chart-wrapper {
            flex-direction: column;
          }

          .factors-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .market-stats-grid {
            grid-template-columns: 1fr;
          }

          .market-stat-card .stat-value {
            font-size: 24px;
          }
        }

        /* Legacy chart styles - keeping for backward compatibility */
        .market-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }

        .market-text {
          color: #E6D3A3;
        }

        .market-intro {
          font-size: 18px;
          line-height: 1.9;
          margin: 0 0 40px;
        }

        .market-visual {
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 24px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(201, 162, 77, 0.2);
        }

        .market-chart-container {
          width: 100%;
        }

        .chart-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(201, 162, 77, 0.3);
        }

        .chart-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #F7F3EA;
          margin: 0 0 8px;
        }

        .chart-header p {
          font-size: 14px;
          color: #C9A24D;
          margin: 0;
          font-weight: 600;
        }

        .chart-wrapper {
          position: relative;
          height: 400px;
          margin-bottom: 30px;
        }

        .bar-chart {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 300px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 60px;
          padding: 0 40px;
        }

        .chart-bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 200px;
        }

        .bar-label {
          font-size: 14px;
          font-weight: 700;
          color: #C9A24D;
          margin-bottom: 12px;
        }

        .bar-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          position: relative;
        }

        .bar {
          width: 100%;
          border-radius: 12px 12px 0 0;
          position: relative;
          transition: height 1s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 20px;
        }

        .bar-2023 {
          background: linear-gradient(180deg, #C9A24D 0%, #E6D3A3 100%);
          box-shadow: 0 -8px 25px rgba(201, 162, 77, 0.4);
        }

        .bar-2036 {
          background: linear-gradient(180deg, #74060D 0%, #9A1B2E 100%);
          box-shadow: 0 -8px 25px rgba(116, 6, 13, 0.4);
        }

        .bar-value {
          font-size: 12px;
          font-weight: 700;
          color: white;
          text-align: center;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          backdrop-filter: blur(5px);
        }

        .line-chart {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .growth-line {
          width: 100%;
          height: 100%;
        }

        .growth-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 2s ease-out forwards;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        .chart-data-points {
          position: absolute;
          inset: 0;
        }

        .data-point {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .point-2023 {
          left: 15%;
          top: 65%;
        }

        .point-2036 {
          right: 15%;
          top: 15%;
        }

        .point-marker {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #C9A24D;
          border: 3px solid white;
          box-shadow: 0 0 0 4px rgba(201, 162, 77, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        .point-2036 .point-marker {
          background: #74060D;
          box-shadow: 0 0 0 4px rgba(116, 6, 13, 0.3);
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .point-info {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          padding: 10px 16px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid rgba(201, 162, 77, 0.3);
        }

        .point-year {
          font-size: 12px;
          font-weight: 700;
          color: #C9A24D;
          margin-bottom: 4px;
        }

        .point-value {
          font-size: 11px;
          color: white;
          font-weight: 600;
        }

        .chart-footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(201, 162, 77, 0.2);
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #E6D3A3;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 4px;
        }

        /* Additional Visualizations Grid */
        .market-visualizations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .visualization-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 30px;
          border: 2px solid rgba(201, 162, 77, 0.2);
          transition: all 0.4s ease;
        }

        .visualization-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201, 162, 77, 0.4);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .viz-header {
          text-align: center;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(201, 162, 77, 0.3);
        }

        .viz-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #F7F3EA;
          margin: 0 0 8px;
        }

        .viz-header p {
          font-size: 13px;
          color: #C9A24D;
          margin: 0;
          font-weight: 600;
        }

        /* Pie Chart Styles */
        .pie-chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
        }

        .pie-chart {
          width: 100%;
          max-width: 280px;
          height: auto;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }

        .pie-segment {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .pie-segment:hover {
          opacity: 0.8;
          transform-origin: center;
        }

        .pie-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .pie-legend-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          border: 1px solid rgba(201, 162, 77, 0.2);
          transition: all 0.3s ease;
        }

        .pie-legend-item:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateX(5px);
        }

        .pie-legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .pie-legend-label {
          flex: 1;
          font-size: 14px;
          color: #E6D3A3;
          font-weight: 500;
        }

        .pie-legend-value {
          font-size: 14px;
          color: #C9A24D;
          font-weight: 700;
        }

        /* Area Chart Styles */
        .area-chart-container {
          width: 100%;
          padding: 20px 0;
        }

        .area-chart {
          width: 100%;
          height: auto;
          max-height: 300px;
        }

        .area-path {
          transition: all 0.5s ease;
        }

        .area-line {
          transition: all 0.5s ease;
        }

        .area-point {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .area-point:hover {
          r: 7;
          fill: #C9A24D;
        }

        /* Market Share Styles */
        .market-share-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px 0;
        }

        .market-share-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .market-share-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .market-share-label {
          font-size: 14px;
          color: #E6D3A3;
          font-weight: 600;
        }

        .market-share-percentage {
          font-size: 16px;
          color: #C9A24D;
          font-weight: 700;
        }

        .market-share-bar {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }

        .market-share-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 1s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Testing Video Section */
        .product-testing-video-section {
          padding: 80px 0;
          background: white;
        }

        .testing-video-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          align-items: center;
          margin-top: 40px;
        }

        .video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.2);
          background: #000;
        }

        .video-embed {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
        }

        .youtube-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-overlay-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.1) 0%, transparent 50%);
          pointer-events: none;
          border-radius: 24px;
        }

        .video-info {
          padding: 20px 0;
        }

        .video-info h3 {
          font-size: 28px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 20px;
          line-height: 1.3;
        }

        .video-info > p {
          font-size: 16px;
          line-height: 1.8;
          color: #5a4a4a;
          margin: 0 0 30px;
        }

        .video-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .video-feature-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 12px;
          border: 2px solid #E6D3A3;
          transition: all 0.3s ease;
        }

        .video-feature-item:hover {
          transform: translateX(8px);
          border-color: #C9A24D;
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.1), rgba(201, 162, 77, 0.1));
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.1);
        }

        .video-feature-item svg {
          flex-shrink: 0;
          color: #C9A24D;
          width: 24px;
          height: 24px;
        }

        .video-feature-item span {
          font-size: 15px;
          font-weight: 600;
          color: #74060D;
        }

        /* Manufacturing Process Section */
        .product-manufacturing-section {
          padding: 80px 0;
          background: white;
        }

        .manufacturing-steps {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .manufacturing-steps::before {
          content: '';
          position: absolute;
          left: 60px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #C9A24D, #E6D3A3, #C9A24D);
          border-radius: 2px;
        }

        .manufacturing-step {
          position: relative;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 40px;
          margin-bottom: 50px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .manufacturing-step.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .manufacturing-step:last-child {
          margin-bottom: 0;
        }

        .step-connector {
          position: absolute;
          left: 58px;
          top: 60px;
          bottom: -50px;
          width: 8px;
          background: linear-gradient(180deg, #C9A24D, transparent);
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.8s ease 0.3s;
        }

        .manufacturing-step.visible .step-connector {
          opacity: 1;
        }

        .manufacturing-step:last-child .step-connector {
          display: none;
        }

        .step-number-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-number {
          position: relative;
          z-index: 2;
          font-size: 32px;
          font-weight: 800;
          color: #74060D;
          background: white;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 4px solid #C9A24D;
          box-shadow: 0 8px 25px rgba(116, 6, 13, 0.2);
          transition: all 0.5s ease;
        }

        .manufacturing-step.visible .step-number {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(201, 162, 77, 0.4);
        }

        .step-number-glow {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 162, 77, 0.4), transparent 70%);
          opacity: 0;
          animation: glowPulse 2s ease-in-out infinite;
        }

        .manufacturing-step.visible .step-number-glow {
          opacity: 1;
        }

        @keyframes glowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        .step-content {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          padding: 35px;
          border-radius: 20px;
          border: 2px solid #E6D3A3;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .step-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201, 162, 77, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .manufacturing-step.visible .step-content::before {
          left: 100%;
        }

        .manufacturing-step.visible .step-content {
          border-color: #C9A24D;
          box-shadow: 0 12px 40px rgba(116, 6, 13, 0.15);
          transform: translateX(10px);
        }

        .step-content h3 {
          font-size: 24px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 16px;
          position: relative;
        }

        .step-content p {
          font-size: 16px;
          line-height: 1.8;
          color: #1a2744;
          margin: 0;
          position: relative;
        }

        /* Animated Statistics Dashboard */
        .product-stats-dashboard-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          position: relative;
          overflow: hidden;
        }

        .product-stats-dashboard-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201, 162, 77, 0.15) 0%, transparent 70%);
        }

        .stats-dashboard-wrapper {
          position: relative;
          z-index: 2;
        }

        .stats-dashboard-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .stats-dashboard-header h2 {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 12px;
        }

        .stats-dashboard-header p {
          font-size: 18px;
          color: #E6D3A3;
          margin: 0;
        }

        .stats-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px 30px;
          border: 2px solid rgba(201, 162, 77, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          border-color: rgba(201, 162, 77, 0.6);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .stat-card-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, rgba(201, 162, 77, 0.3), rgba(230, 211, 163, 0.3));
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .stat-card:hover .stat-card-glow {
          opacity: 1;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .stat-card-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          border-radius: 50%;
          color: #74060D;
          margin: 0 auto 24px;
          box-shadow: 0 8px 25px rgba(201, 162, 77, 0.4);
        }

        .stat-card:hover .stat-card-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .stat-card-content {
          text-align: center;
        }

        .stat-value {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          color: #F7F3EA;
          margin-bottom: 12px;
          line-height: 1;
        }

        .stat-label {
          font-size: 14px;
          color: #E6D3A3;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Proof Section */
        .product-proof-section {
          padding: 80px 0;
          background: white;
        }

        .proof-factory-gallery {
          margin-bottom: 80px;
        }

        .factory-gallery-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .factory-gallery-header h3 {
          font-size: 32px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .factory-gallery-header p {
          font-size: 16px;
          color: #5a4a4a;
          margin: 0;
        }

        .factory-images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .factory-image-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(116, 6, 13, 0.15);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .factory-image-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.25);
        }

        .factory-image-wrapper {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .factory-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(116, 6, 13, 0.7) 100%);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .factory-image-card:hover .factory-image-overlay {
          opacity: 1;
        }

        .factory-image-label {
          color: #F7F3EA;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .proof-certificates {
          margin-top: 60px;
        }

        .certificates-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .certificates-header h3 {
          font-size: 32px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .certificates-header p {
          font-size: 16px;
          color: #5a4a4a;
          margin: 0;
        }

        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .certificate-card {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          border: 2px solid #E6D3A3;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .certificate-card:hover {
          transform: translateY(-8px);
          border-color: #C9A24D;
          box-shadow: 0 15px 40px rgba(116, 6, 13, 0.2);
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.1), rgba(201, 162, 77, 0.1));
        }

        .certificate-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #C9A24D, #E6D3A3);
          border-radius: 50%;
          color: #74060D;
          margin-bottom: 24px;
          box-shadow: 0 8px 25px rgba(201, 162, 77, 0.3);
        }

        .certificate-card:hover .certificate-icon {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(201, 162, 77, 0.4);
        }

        .certificate-card h4 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .certificate-card p {
          font-size: 14px;
          color: #5a4a4a;
          line-height: 1.6;
          margin: 0 0 24px;
          flex-grow: 1;
        }

        .certificate-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #74060D;
          background: #C9A24D;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .certificate-view-btn:hover {
          background: #E6D3A3;
          color: #9A1B2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 77, 0.4);
        }

        .certificate-view-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Customer Success Stories Section */
        .product-success-stories-section {
          padding: 80px 0;
          background: white;
        }

        .success-stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .success-story-card {
          background: linear-gradient(135deg, rgba(116, 6, 13, 0.05), rgba(201, 162, 77, 0.05));
          border-radius: 20px;
          padding: 30px;
          border: 2px solid #E6D3A3;
          transition: all 0.4s ease;
        }

        .success-story-card:hover {
          transform: translateY(-8px);
          border-color: #C9A24D;
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.2);
        }

        .story-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 2px solid #E6D3A3;
        }

        .story-company-logo {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          box-shadow: 0 4px 15px rgba(116, 6, 13, 0.1);
        }

        .story-meta h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 4px;
        }

        .story-location {
          font-size: 14px;
          color: #9A1B2E;
          font-weight: 600;
        }

        .story-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .story-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .story-stat {
          text-align: center;
          padding: 16px;
          background: white;
          border-radius: 12px;
          border: 1px solid #E6D3A3;
        }

        .story-stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #C9A24D;
          margin-bottom: 4px;
        }

        .story-stat-label {
          font-size: 11px;
          color: #9A1B2E;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .story-quote {
          font-size: 15px;
          line-height: 1.8;
          color: #1a2744;
          font-style: italic;
          margin: 0;
        }

        .story-rating {
          display: flex;
          gap: 4px;
        }

        /* CTA Section */
        .product-cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
          text-align: center;
        }

        .product-cta-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .product-cta-container h2 {
          font-size: 36px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 16px;
        }

        .product-cta-container p {
          font-size: 18px;
          color: #E6D3A3;
          margin: 0 0 40px;
        }

        .product-cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .product-cta-btn {
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }

        .product-cta-btn.primary {
          background: #C9A24D;
          color: #74060D;
          border: 2px solid #E6D3A3;
        }

        .product-cta-btn.primary:hover {
          background: #E6D3A3;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(201, 162, 77, 0.4);
        }

        .product-cta-btn.secondary {
          background: transparent;
          color: #F7F3EA;
          border: 2px solid #E6D3A3;
        }

        .product-cta-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #C9A24D;
        }

        /* Related Products Section */
        .related-products-section {
          padding: 80px 0;
          background: linear-gradient(180deg, rgba(116, 6, 13, 0.05) 0%, transparent 100%);
        }

        .related-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .related-product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(116, 6, 13, 0.1);
          text-decoration: none;
          transition: all 0.4s ease;
          display: block;
        }

        .related-product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(116, 6, 13, 0.2);
        }

        .related-product-image {
          position: relative;
          height: 200px;
        }

        .related-product-content {
          padding: 24px;
        }

        .related-product-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: #74060D;
          margin: 0 0 12px;
        }

        .related-product-content p {
          font-size: 14px;
          color: #5a4a4a;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .related-product-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #9A1B2E;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .related-product-card:hover .related-product-link {
          color: #C9A24D;
          gap: 12px;
        }

        /* Loading & Not Found */
        .product-loading,
        .product-not-found {
          max-width: 600px;
          margin: 100px auto;
          text-align: center;
          padding: 60px 40px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.15);
        }

        .product-not-found h1 {
          font-size: 32px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 16px;
        }

        .product-not-found p {
          font-size: 16px;
          color: #5a4a4a;
          margin: 0 0 30px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          color: #9A1B2E;
          background: #F7F3EA;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: #E6D3A3;
          color: #74060D;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .product-hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .product-hero-image {
            height: 400px;
          }

          .specs-content-wrapper {
            display: flex;
            flex-direction: column;
          }

          .specs-image-container {
            height: 300px;
          }

          .specs-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .detailed-specs-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
          }

          .market-content {
            grid-template-columns: 1fr;
          }

          .chart-wrapper {
            height: 350px;
          }

          .market-visualizations-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
          }

          .manufacturing-steps::before {
            left: 40px;
          }

          .manufacturing-step {
            grid-template-columns: 80px 1fr;
            gap: 30px;
          }

          .step-number {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }

          .testing-video-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .factory-images-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .certificates-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .stats-dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .success-stories-grid {
            grid-template-columns: 1fr;
          }

          .currency-buttons {
            justify-content: center;
          }

          .pricing-packages-grid {
            grid-template-columns: 1fr;
          }

          .bulk-pricing-calculator {
            padding: 30px 20px;
          }

          .calculator-content {
            grid-template-columns: 1fr;
          }

          .stock-availability {
            flex-direction: column;
          }

          .stock-actions {
            width: 100%;
            flex-direction: column;
          }

          .stock-btn {
            width: 100%;
            justify-content: center;
          }

          .availability-regions {
            grid-template-columns: 1fr;
          }

          .availability-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .product-hero-section {
            margin-bottom: 40px;
          }

          .product-hero-image {
            height: 300px;
          }

          .product-hero-title {
            font-size: 32px;
          }

          .product-section-title {
            font-size: 28px;
          }

          .applications-grid,
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .market-figures {
            grid-template-columns: 1fr;
          }

          .specs-tabs {
            flex-direction: column;
          }

          .specs-tab {
            width: 100%;
          }

          .specs-grid {
            grid-template-columns: 1fr;
          }

          .detailed-specs-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .detailed-spec-item {
            padding: 24px;
          }

          .factors-grid {
            grid-template-columns: 1fr;
          }

          .chart-wrapper {
            height: 300px;
          }

          .bar-chart {
            gap: 30px;
            padding: 0 20px;
          }

          .market-visualizations-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 40px;
          }

          .visualization-card {
            padding: 25px;
          }

          .pie-chart {
            max-width: 240px;
          }

          .area-chart {
            max-height: 250px;
          }

          .testing-video-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .video-info h3 {
            font-size: 24px;
          }

          .video-info > p {
            font-size: 15px;
          }

          .manufacturing-steps::before {
            left: 30px;
          }

          .manufacturing-step {
            grid-template-columns: 60px 1fr;
            gap: 20px;
          }

          .step-number {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .step-connector {
            left: 28px;
          }

          .product-cta-buttons {
            flex-direction: column;
          }

          .product-cta-btn {
            width: 100%;
            justify-content: center;
          }

          .factory-images-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
          }

          .factory-image-wrapper {
            height: 240px;
          }

          .certificates-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
          }

          .certificate-card {
            padding: 30px 20px;
          }

          .factory-gallery-header h3,
          .certificates-header h3 {
            font-size: 28px;
          }

          .stats-dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .stat-card {
            padding: 30px 20px;
          }

          .success-stories-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .story-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .pricing-packages-grid {
            grid-template-columns: 1fr;
          }

          .calculator-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .stock-availability {
            flex-direction: column;
            align-items: flex-start;
          }

          .availability-regions {
            grid-template-columns: 1fr;
          }

          .availability-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
