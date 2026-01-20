import { useMemo, useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const navConfig = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "clients", href: "/clients" },
  { key: "about", href: "/about" },
  { key: "team", href: "/our-team" },
  { key: "foreignCollaborations", href: "/foreign-collaborations" },
  { key: "investor", href: "/investor-relations" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { t } = useLanguage();
  const navLinks = useMemo(() => navConfig.map(({ key, href }) => ({ label: t?.nav?.[key] || key, href })), [t]);
  const [logoError, setLogoError] = useState(false);

  return (
    <nav id="navbar" className="standalone-navbar">
      <Link href="/" className="nav-brand">
        <div className="nav-logo-wrapper hero-logo-heartbeat">
          {!logoError ? (
            <Image
              src="/assets/logo-navbar.jpg"
              alt="YNM Mega Industries logo"
              width={50}
              height={50}
              className="nav-logo-new"
              priority
              onError={() => setLogoError(true)}
              unoptimized
            />
          ) : (
            <div className="nav-logo-fallback" style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #C9A24D 0%, #E6D3A3 100%)',
              borderRadius: '8px',
              color: '#74060D',
              fontWeight: 700,
              fontSize: '14px',
              border: '2px solid #74060D'
            }}>
              YNM
            </div>
          )}
        </div>
      </Link>

      <div className="nav-links">
        {navLinks.map((link, index) => {
          const isExternal =
            link.href &&
            (link.href.startsWith("http://") || link.href.startsWith("https://"));
          const target = link.target || (isExternal ? "_blank" : undefined);
          const sep = index > 0 ? <span className="nav-sep" aria-hidden="true" /> : null;

          // Links with dropdown
          if (link.hasDropdown && link.dropdownItems) {
            return (
              <Fragment key={link.id || index}>
                {sep}
                <div className="nav-dropdown-wrapper">
                  <Link
                    href={link.href || "#"}
                    className="nav-link nav-link-dropdown"
                  >
                    {link.label}
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <div className="nav-dropdown">
                    {link.dropdownItems.map((item, idx) => (
                      <Link key={idx} href={item.href} className="nav-dropdown-item">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </Fragment>
            );
          }

          if (isExternal || target === "_blank") {
            return (
              <Fragment key={link.id || index}>
                {sep}
                <a
                  href={link.href || "#"}
                  className="nav-link"
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </Fragment>
            );
          }

          return (
            <Fragment key={link.id || index}>
              {sep}
              <Link
                href={link.href || "#"}
                className="nav-link"
              >
                {link.label}
              </Link>
            </Fragment>
          );
        })}
        <span className="nav-sep" aria-hidden="true" />
        <LanguageSelector />
      </div>
    </nav>
  );
}
