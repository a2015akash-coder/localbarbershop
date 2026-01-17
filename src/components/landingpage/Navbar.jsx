import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PHONE_NUMBER, PHONE_LINK } from "../../constants";

const LOGO_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_300/v1768612130/IMG_4966_lxnwpl.png";

/* Explicit label → route mapping (SEO-safe) */
const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/mens-haircuts-beard-trims-kellyville" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact", to: "/contact" },
  { label: "Win", to: "/win" },
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

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-colors duration-300
        ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10"
            : "bg-black"
        }
      `}
    >
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* MAIN BAR */}
        <div className="relative flex h-23 items-center w-full">

          {/* LOGO — LEFT (PROMINENT, ATTACHED) */}
          <Link to="/" className="flex items-center shrink-0">
  <img
    src={LOGO_URL}
    alt="The Grooming Room Barbershop"
    className="
      h-20 md:h-24
      w-auto
      object-contain
    "
    loading="eager"
    decoding="async"
  />
</Link>


          {/* CENTER NAV (DESKTOP) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
            <ul className="flex items-center gap-12 text-[15px] font-medium text-gray-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="
                      relative transition-colors
                      hover:text-white
                      after:absolute after:-bottom-1 after:left-0
                      after:h-[2px] after:w-0 after:bg-orange-500
                      after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + MOBILE — RIGHT */}
          <div className="ml-auto flex items-center gap-4">

            {/* DESKTOP CTA */}
            <a
              href={PHONE_LINK}
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

            {/* MOBILE CTA */}
            <a
              href={PHONE_LINK}
              className="
                md:hidden
                rounded-full px-5 py-2.5
                text-sm font-semibold text-white
                bg-[#FF7A00]
              "
            >
              {PHONE_NUMBER}
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              className="
                md:hidden
                rounded-lg p-2.5
                text-gray-300
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

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-white/10 py-6">
            <ul className="flex flex-col gap-5 text-[15px] font-medium text-gray-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
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
