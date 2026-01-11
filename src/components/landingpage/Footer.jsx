import { memo } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { PHONE_NUMBER, PHONE_LINK } from "../../constants";


const LOGO_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_176/v1767516621/logo_nzojy7.webp";

function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <img
              src={LOGO_URL}
              alt="The Grooming Room Barbershop"
              width="176"
              height="44"
              className="h-10 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />

            <p className="mt-4 text-sm text-gray-400 max-w-sm leading-relaxed">
              Professional barber services delivering clean cuts, sharp details,
              and consistent results — trusted by local clients.
            </p>

            {/* SOCIAL ICONS */}
           {/* SOCIAL ICONS */}
<div className="mt-5 flex items-center gap-4">
  <a
    href="https://www.instagram.com/kellyvillebarber/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="
      flex h-9 w-9 items-center justify-center
      rounded-full
      bg-white/5
      text-gray-300
      hover:bg-orange-600 hover:text-white
      transition-colors
    "
  >
    <FaInstagram className="h-4 w-4" />
  </a>

  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="
      flex h-9 w-9 items-center justify-center
      rounded-full
      bg-white/5
      text-gray-300
      hover:bg-orange-600 hover:text-white
      transition-colors
    "
  >
    <FaFacebookF className="h-4 w-4" />
  </a>

  <a
    href="https://www.youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="
      flex h-9 w-9 items-center justify-center
      rounded-full
      bg-white/5
      text-gray-300
      hover:bg-orange-600 hover:text-white
      transition-colors
    "
  >
    <FaYoutube className="h-4 w-4" />
  </a>
</div>

          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Navigation
            </h4>

            <ul className="mt-4 space-y-3 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              Visit Us
            </h4>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Shop 12, Kellyville Plaza<br />
              Kellyville, NSW 2155
            </p>

            <p className="mt-3 text-sm text-gray-400">
              Walk-ins welcome
            </p>

            <a
              href="tel:+911234567890"
              className="
                inline-flex mt-6
                items-center justify-center
                rounded-full
                px-6 py-2.5
                text-sm font-semibold text-white
                bg-orange-600 hover:bg-orange-700
                transition-colors
                shadow-md
              "
            >
               {PHONE_NUMBER}
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} The Grooming Room. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Designed for clarity. Built for performance.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default memo(Footer);
