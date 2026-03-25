import { memo } from "react";
import { Instagram } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";
import SectionHeading from "../ui/section-heading";

const INSTAGRAM_POSTS = [
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623830/IMG_5409_ekbe6v.jpg",
    url: "https://www.instagram.com/p/DTB6HjvE47M/",
    alt: "Men's fade haircut at The Grooming Room Barbershop in Kellyville",
    title: "Men's fade haircut - Kellyville barber",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767727364/Screenshot_2026-01-07_005210_pv3px4.png",
    url: "https://www.instagram.com/p/DMEIIn6zdhw/",
    alt: "Kids haircut with hair design at The Grooming Room Barbershop in Kellyville",
    title: "Children's haircut with design - Kellyville",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623811/d75d709523594830b53c9e370e44421a_bqfp1k.png",
    url: "https://www.instagram.com/p/DSUIS_3E308/",
    alt: "Classic men's haircut at The Grooming Room Barbershop in Kellyville",
    title: "Classic men's haircut - Kellyville barber",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623965/IMG_2628_wzzrmi.jpg",
    url: "https://www.instagram.com/reel/DR3cJdwk6bz/",
    alt: "Entrance of The Grooming Room Barbershop at Kellyville Village Shopping Centre",
    title: "The Grooming Room Barbershop entrance - Kellyville",
  },
];

function InstagramSection() {
  return (
    <section className="bg-white section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Instagram"
          title="Follow The Grooming Room on Instagram"
          description="View recent haircuts, beard trims, and shop updates."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label="View Instagram post"
            >
              <Card className="overflow-hidden p-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_90px_-42px_rgba(15,23,42,0.65)]">
                <div className="relative overflow-hidden rounded-[22px]">
                  <img
                    src={post.image}
                    alt={post.alt}
                    title={post.title}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition group-hover:bg-slate-950/35">
                    <div className="rounded-full bg-white/92 p-3 text-slate-900 opacity-0 shadow-lg transition group-hover:opacity-100">
                      <Instagram size={22} />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://www.instagram.com/kellyvillebarber/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "xl",
              className:
                "bg-[linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)] text-white shadow-[0_20px_60px_-30px_rgba(129,52,175,0.9)] hover:-translate-y-0.5",
            })}
          >
            <Instagram size={20} />
            Follow @groomingbarbershop
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(InstagramSection);
