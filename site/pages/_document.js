import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Viewport and Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5" />
        
        {/* Performance: DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Performance: Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* Performance: Preload critical font */}
        <link
          rel="preload"
          href="/fonts/Montserrat[wght].ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        
        {/* Cross-platform rendering optimization */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#74060D" />
        <meta name="color-scheme" content="light" />
        
        {/* Windows-specific optimizations */}
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Google Analytics 4 - defer loading for performance */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        
        <link rel="icon" href="/favicon.ico" />
        
        {/* Critical CSS for preventing layout shift */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Prevent layout shift before CSS loads */
              html { 
                scroll-behavior: auto;
                overflow-x: hidden;
              }
              body { 
                margin: 0; 
                overflow-x: hidden;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              /* Ensure smooth rendering on all platforms */
              * {
                -webkit-tap-highlight-color: transparent;
              }
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
