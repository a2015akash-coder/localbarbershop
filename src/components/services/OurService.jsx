import { memo } from "react";

/* ---------------- CLOUDINARY OPTIMISATION ----------------
   f_auto  -> auto format (WebP / AVIF)
   q_auto  -> auto quality
   w_800   -> ideal grid size (retina safe)
   c_limit -> prevent upscaling
---------------------------------------------------------- */

const cdn = (path) =>
  `https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_800,c_limit/${path}`;

const STYLES = [
  {
    title: "Men's Haircut",
    image: cdn("v1767627093/IMG_6223_ur5nnq.jpg"),
    alt: "Men’s haircut in progress at The Grooming Room Barbershop",
    imgTitle: "Men’s Haircut – Kellyville Barbershop",
    description:
      "Classic men’s haircuts finished neatly for work, weekends, and regular upkeep.",
  },
  {
    title: "Beard Trims",
    image: cdn("v1767626521/624158178e487621a677f49a_Parramatta-175_mexn85.jpg"),
    alt: "Professional beard trim with clean lines at The Grooming Room",
    imgTitle: "Beard Trims – The Grooming Room Kellyville",
    description:
      "Basic beard trims with clean lines, tidy edges, and simple shaping on request.",
  },
  {
    title: "Kids’ Haircuts (Ages 0–12)",
    image: cdn("v1767703082/kids_cskrcj.webp"),
    alt: "Kids haircut service in a calm and friendly barbershop setting",
    imgTitle: "Kids’ Haircuts at The Grooming Room",
    description:
      "Children’s haircuts provided in a calm setting with patient service and simple styling.",
  },
  {
    title: "Senior Haircut",
    image: cdn("v1767514076/8922dcc0ec6ea25439b0c033ac1083a3_vovk97.png"),
    alt: "Senior haircut service with classic styling and tidy finish",
    imgTitle: "Senior Haircuts – Kellyville Barbershop",
    description:
      "Senior haircuts offered with straightforward service and attention to comfort and ease.",
  },
  {
    title: "Blowout Taper",
    image: cdn("v1767626520/IMG_2634_i4p6sk.jpg"),
    alt: "Blowout taper haircut with clean blending and added volume",
    imgTitle: "Blowout Taper Haircut",
    description:
      "Blowout taper fade cut for curly hair with clean blending and volume.",
  },
  {
    title: "Taper Fade",
    image: cdn("v1767703060/TAPER_FADE_fckneu.webp"),
    alt: "Taper fade haircut with clean edges and precise finish",
    imgTitle: "Taper Fade Haircut",
    description:
      "Clean taper fades finished with precision and attention to detail.",
  },
  {
    title: "Fade & Hair Design Services",
    image: cdn("v1767626526/25493682304_cipoxh.png"),
    alt: "Fade haircut with custom hair design detail",
    imgTitle: "Fade and Hair Design Services",
    description:
      "Fade variations and hair designs suited to customers wanting sharper detail and defined finishes.",
  },
  {
    title: "Skin Fades",
    image: cdn("v1767703352/FADE_fal5m5.webp"),
    alt: "Skin fade haircut with sharp finish and balanced shape",
    imgTitle: "Skin Fade Haircut",
    description:
      "Clean skin fades tailored to hair type with sharp finish and balanced shape.",
  },
  {
    title: "Hair Colouring",
    image: cdn("v1768167322/WhatsApp_Image_2026-01-11_at_17.25.03_vi332u.jpg"),
    alt: "Men’s hair colouring service performed in barbershop",
    imgTitle: "Men’s Hair Colouring Services",
    description:
      "Men’s hair colouring services for grey coverage, refresh, or full colour change.",
  },
];


const OurService = memo(function OurService() {
  return (
    <section className="bg-white  section-spacing">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl mb-16">


          <h2
            className="font-semibold leading-tight tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              fontSize: "clamp(2.3rem, 4.8vw, 3.3rem)",
            }}
          >
            Our Services
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600">
            Your local barbershop around Hills. Bring a reference or let our
            barbers tailor a look that suits you.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {STYLES.map((style) => (
            <div
              key={style.title}
              className="
                group
                rounded-3xl
                bg-white
                shadow-sm
                hover:shadow-xl
                transition-shadow
                overflow-hidden
              "
            >
              {/* IMAGE — FIXED SIZE, CONSISTENT */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={style.image}
                  alt={style.alt}
                  title={style.imgTitle}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
                  className="
    absolute inset-0
    h-full w-full
    object-cover
    transition-transform duration-500
    group-hover:scale-[1.05]
  "
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {style.title}
                </h3>

                <div className="mt-2 h-[3px] w-10 rounded-full bg-orange-500" />

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
});

export default OurService;