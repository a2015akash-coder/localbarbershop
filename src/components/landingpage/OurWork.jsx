import { memo } from "react";
import { Link } from "react-router-dom";
import { badgeVariants } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SectionHeading from "../ui/section-heading";

const SERVICES = [
  {
    title: "Men's Haircuts",
    label: "Precision cuts",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_600,f_auto,q_auto/v1767534115/IMG_5409_shfn4c.jpg",
    alt: "Barbers and customer posing inside The Grooming Room Barbershop in Kellyville",
    imageTitle: "Friendly team at The Grooming Room Barbershop - Kellyville",
    items: [
      "Classic men's haircuts",
      "Modern men's haircuts",
      "Skin and taper fades",
      "Hairline tidy-up and finish",
    ],
  },
  {
    title: "Beard Trims & Beard Shaping",
    label: "Clean beard work",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_600,f_auto,q_auto/v1768167106/WhatsApp_Image_2026-01-11_at_17.25.03_2_f88hyp.jpg",
    alt: "Professional barber cutting men's hair at The Grooming Room Barbershop in Kellyville",
    imageTitle: "Men's beard service in progress - The Grooming Room Kellyville",
    items: [
      "Beard trimming and clean-ups",
      "Beard shaping and line-ups",
      "Short beard maintenance",
      "Full beard maintenance",
    ],
  },
  {
    title: "Grey Hair Colouring Services",
    label: "Subtle colour refresh",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/v1768167322/WhatsApp_Image_2026-01-11_at_17.25.03_vi332u.jpg",
    alt: "Clean fade haircut with coloured top finished at The Grooming Room Barbershop in Kellyville",
    imageTitle: "Clean fade haircut result - Kellyville barber",
    items: [
      "Full grey coverage",
      "Regular grooming maintenance",
      "Personalised consultations",
      "After-care advice",
    ],
  },
];

function OurWork() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Barbering services in Kellyville"
          description="We provide consistent barbering services so you leave well-groomed and comfortable. Our barbers take the time to get the cut right."
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              to="/mens-haircuts-beard-trims-kellyville"
              className="group"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_90px_-42px_rgba(15,23,42,0.65)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    title={service.imageTitle}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 top-0 flex justify-start p-5">
                    <span
                      className={badgeVariants({
                        variant: "dark",
                        className: "tracking-[0.16em]",
                      })}
                    >
                      {service.label}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/65 via-slate-950/0 to-transparent" />
                </div>

                <CardHeader className="pb-4">
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/mens-haircuts-beard-trims-kellyville"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(OurWork);
