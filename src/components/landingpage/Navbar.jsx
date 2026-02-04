import { memo, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { PHONE_NUMBER, PHONE_LINK } from "../../constants";

const LOGO_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_300/v1768612130/IMG_4966_lxnwpl.png";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/mens-haircuts-beard-trims-kellyville" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact" },
  { label: "Promotions", to: "/monthly-draw-kellyville-barber" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackCallClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "call_cta_click",
        cta_type: "phone",
        cta_location: location,
        phone_number: PHONE_NUMBER,
        page_path: window.location.pathname
      });
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-colors duration-300
        ${scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-black"
        }
      `}
    >
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 bg-white text-black px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>

      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-23 items-center w-full">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={LOGO_URL}
              alt="The Grooming Room Barbershop"
              className="h-20 md:h-24 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
            <ul className="flex items-center gap-12 text-[15px] font-medium text-gray-200">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `
                        relative transition-colors
                        ${isActive ? "text-white" : "text-gray-200"}
                        hover:text-white
                        after:absolute after:-bottom-1 after:left-0
                        after:h-[2px] after:bg-orange-500
                        after:transition-all after:duration-300
                        ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                      `
                    }
                    aria-current={({ isActive }) =>
                      isActive ? "page" : undefined
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-4">

            {/* Desktop CTA */}
            <a
              href={PHONE_LINK}
              onClick={() => trackCallClick("navbar_desktop")}
              className="
                hidden md:inline-flex
                items-center justify-center
                rounded-full px-8 py-3.5
                text-sm font-semibold text-white
                bg-[#FF7A00] hover:bg-[#FF6A00]
                transition-colors shadow-md
              "
            >
              {PHONE_NUMBER}
            </a>

            {/* Mobile CTA */}
            <a
              href={PHONE_LINK}
              onClick={() => trackCallClick("navbar_mobile")}
              className="
                md:hidden
                rounded-full px-5 py-2.5
                text-sm font-semibold text-white
                bg-[#FF7A00]
              "
            >
              {PHONE_NUMBER}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="
                md:hidden
                rounded-lg p-2.5
                text-gray-200
                hover:bg-white/10
                transition
              "
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    open
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-white/10 py-6"
          >
            <ul className="flex flex-col gap-5 text-[15px] font-medium text-gray-200">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `${isActive ? "text-white" : "text-gray-200"} hover:text-white transition`
                    }
                    aria-current={({ isActive }) =>
                      isActive ? "page" : undefined
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navbar);
