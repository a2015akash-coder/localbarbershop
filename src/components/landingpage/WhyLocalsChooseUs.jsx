import { memo } from "react";
import { PHONE_LINK, PHONE_NUMBER } from "../../constants";

const FEATURES = [
  {
    title: "4.4★ Rating · 200+ Reviews",
    subtitle:
      "Rated 4.4 stars on Google by 200+ local customers. Known for consistent results, professional barbering, and a friendly experience.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1768167196/WhatsApp_Image_2026-01-11_at_17.25.04_tmugsj.jpg",
    alt: "Customers waiting inside The Grooming Room Barbershop at Kellyville Village Shopping Centre",
    imageTitle: "The Grooming Room Barbershop – Kellyville Village",
  },
  {
    title: "Experienced & Professional",
    subtitle:
      "Full service barbering in Kellyville including precision haircuts, hairline tidy ups, skin fades, beard trims, and light styling.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804237/rs_w_730_h_730_cg_true_m_1_nh3xdo.webp",
    alt: "Professional barber performing a clean fade haircut at The Grooming Room Barbershop in Kellyville",
    imageTitle: "Clean fade haircut service – Kellyville barber",
  },
  {
    title: "Soon to Be a Man",
    subtitle:
      "Children’s haircuts for ages zero to twelve with simple styles, tidy finishes, optional hair art, and complimentary lollies.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804241/rs_w_730_h_730_cg_true_m_uxntcz.webp",
    alt: "Happy child after a fresh haircut at The Grooming Room Barbershop in Kellyville",
    imageTitle: "Children’s haircut at The Grooming Room Barbershop",
  },
  {
    title: "Free Parking",
    subtitle:
      "Located in Kellyville Village Shopping Centre with free parking, plus Coles, Woolworths, Aldi, and nearby dining options.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804242/rs_w_730_h_730_cg_true_k61xmd.webp",
    alt: "Kellyville Village Shopping Centre with free parking near The Grooming Room Barbershop",
    imageTitle: "Free parking at Kellyville Village Shopping Centre",
  },
];


function WhyLocalsChooseUs() {
  const trackCallClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "call_cta_click",
        cta_type: "phone",
        cta_location: location, // what to expect
        phone_number: PHONE_NUMBER,
        page_path: window.location.pathname,
      });
    }
  };
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 max-w-3xl">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              backgroundImage:
                "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What to Expect
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            We focus on the basics done right — quality haircuts, friendly service,
            and a clean, relaxed space that keeps locals coming back.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-slate-50">
          {FEATURES.map((item, i) => (
            <div
              key={i}
              className="
                group rounded-3xl bg-white
                shadow-md hover:shadow-xl
                transition-all duration-500 ease-out
                hover:-translate-y-1
                overflow-hidden
                flex flex-col
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  title={item.imageTitle}
                  className="
    h-full w-full object-cover
    transition-transform duration-700 ease-out
    group-hover:scale-[1.06]
  "
                  loading="lazy"
                  decoding="async"
                />

              </div>

              {/* TEXT */}
              <div className="px-5 py-5">
                <h3 className="text-base font-semibold text-gray-900 text-center whitespace-nowrap">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed text-left">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA ROW */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={PHONE_LINK}
            className="
              inline-flex items-center justify-center rounded-full
              bg-orange-500 px-10 py-4 font-semibold text-white
              hover:bg-orange-600 transition
              
            "
            onClick={() => trackCallClick("homepage2_cta")}

          >
            Call Now
          </a>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center rounded-full
              px-10 py-4 font-semibold
              bg-[#FFF3E6]  text-[#7A3E00]  hover:bg-[#FFE6CF] transition
            "
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(WhyLocalsChooseUs);