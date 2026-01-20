import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, getAllProducts } from "./index";

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;
  
  // Wait for router to be ready
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

  const product = productId ? getProductById(productId) : null;

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
            <p>The product you're looking for doesn't exist.</p>
            <Link href="/products" className="back-btn">
              ← Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - YNM Mega Industries</title>
        <meta name="description" content={product.desc} />
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

        {/* Product Detail Section */}
        <section className="product-detail-section">
          <div className="product-detail-container">
            <div className="product-detail-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <div className="product-image-overlay" />
            </div>

            <div className="product-detail-content">
              <h1 className="product-detail-title">{product.name}</h1>
              <p className="product-detail-description">{product.desc}</p>

              <div className="product-detail-specs">
                <h3>Specifications</h3>
                <ul>
                  {product.specs.map((spec, i) => (
                    <li key={i}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-detail-actions">
                <Link href="/contact" className="product-detail-btn primary">
                  Get Quote
                </Link>
                <Link href="/products" className="product-detail-btn secondary">
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="related-products-section">
          <div className="related-products-container">
            <h2>Explore More Products</h2>
            <p>Discover our full range of manufacturing solutions</p>
            <Link href="/products" className="related-products-btn">
              View All Products
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
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

        /* Product Detail Section */
        .product-detail-section {
          padding: 60px 20px;
        }

        .product-detail-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.15);
          border: 2px solid #E6D3A3;
        }

        .product-detail-image {
          position: relative;
          min-height: 500px;
          background: #F7F3EA;
        }

        .product-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(116, 6, 13, 0.1) 100%);
        }

        .product-detail-content {
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .product-detail-title {
          font-size: 36px;
          font-weight: 800;
          color: #74060D;
          margin: 0 0 20px;
          line-height: 1.2;
        }

        .product-detail-description {
          font-size: 16px;
          color: #5a4a4a;
          line-height: 1.8;
          margin: 0 0 40px;
        }

        .product-detail-specs {
          margin-bottom: 40px;
        }

        .product-detail-specs h3 {
          font-size: 20px;
          font-weight: 700;
          color: #9A1B2E;
          margin: 0 0 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .product-detail-specs ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .product-detail-specs li {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 15px;
          color: #5a4a4a;
          padding: 12px 0;
          border-bottom: 1px solid #E6D3A3;
        }

        .product-detail-specs li:last-child {
          border-bottom: none;
        }

        .product-detail-specs li svg {
          color: #C9A24D;
          flex-shrink: 0;
        }

        .product-detail-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .product-detail-btn {
          padding: 16px 32px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .product-detail-btn.primary {
          background: linear-gradient(135deg, #74060D, #9A1B2E);
          color: #F7F3EA;
          border: 2px solid #C9A24D;
        }

        .product-detail-btn.primary:hover {
          background: linear-gradient(135deg, #9A1B2E, #74060D);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(116, 6, 13, 0.3);
        }

        .product-detail-btn.secondary {
          background: transparent;
          color: #9A1B2E;
          border: 2px solid #E6D3A3;
        }

        .product-detail-btn.secondary:hover {
          color: #74060D;
          border-color: #C9A24D;
          background: #F7F3EA;
        }

        /* Related Products Section */
        .related-products-section {
          padding: 80px 20px;
          text-align: center;
          background: linear-gradient(135deg, #74060D 0%, #9A1B2E 100%);
        }

        .related-products-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .related-products-container h2 {
          font-size: 32px;
          font-weight: 800;
          color: #F7F3EA;
          margin: 0 0 12px;
        }

        .related-products-container p {
          font-size: 16px;
          color: #E6D3A3;
          margin: 0 0 30px;
          font-weight: 500;
        }

        .related-products-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #74060D;
          background: #C9A24D;
          border: 2px solid #E6D3A3;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .related-products-btn:hover {
          background: #E6D3A3;
          color: #9A1B2E;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(201, 162, 77, 0.4);
        }

        /* Product Not Found */
        .product-not-found {
          max-width: 600px;
          margin: 100px auto;
          text-align: center;
          padding: 60px 40px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(116, 6, 13, 0.15);
          border: 2px solid #E6D3A3;
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

        /* Loading State */
        .product-loading {
          max-width: 600px;
          margin: 100px auto;
          text-align: center;
          padding: 60px 40px;
        }

        .product-loading p {
          font-size: 18px;
          color: #9A1B2E;
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 968px) {
          .product-detail-container {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .product-detail-image {
            min-height: 400px;
          }

          .product-detail-content {
            padding: 40px 30px;
          }

          .product-detail-title {
            font-size: 28px;
          }
        }

        @media (max-width: 600px) {
          .product-detail-section {
            padding: 40px 16px;
          }

          .product-detail-content {
            padding: 30px 20px;
          }

          .product-detail-title {
            font-size: 24px;
          }

          .product-detail-actions {
            flex-direction: column;
          }

          .product-detail-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

