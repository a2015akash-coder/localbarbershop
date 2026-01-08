import { memo } from "react";
import { Instagram } from "lucide-react";

/* ------------------ INSTAGRAM POSTS ------------------ */
const INSTAGRAM_POSTS = [
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623830/IMG_5409_ekbe6v.jpg",
    url: "https://www.instagram.com/p/DTB6HjvE47M/",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767727364/Screenshot_2026-01-07_005210_pv3px4.png",
    url: "https://www.instagram.com/p/DMEIIn6zdhw/",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623811/d75d709523594830b53c9e370e44421a_bqfp1k.png",
    url: "https://www.instagram.com/p/DSUIS_3E308/",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623965/IMG_2628_wzzrmi.jpg",
    url: "https://www.instagram.com/reel/DR3cJdwk6bz/",
  },
];

function InstagramSection() {
  return (
   <section className="bg-slate-50 section-spacing">

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
       {/* HEADER */}
<div className="mb-16 text-center">
  <h2 className="flex items-center justify-center gap-3 font-semibold tracking-tight text-gray-900"
      style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
    <Instagram size={36} className="text-[#E1306C]" />
    Follow The Grooming Room on Instagram
  </h2>

  <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
    View recent haircuts, beard trims, and shop updates.

  </p>
</div>


        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl"
              aria-label="View Instagram post"
            >
              <img
                src={post.image}
                alt="Instagram post from The Grooming Room Barbershop"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition">
                <Instagram
                  size={34}
                  className="text-white opacity-0 group-hover:opacity-100 transition"
                />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
       {/* CTA */}
<div className="mt-16 text-center">
  <a
    href="https://www.instagram.com/kellyvillebarber/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 rounded-full px-10 py-4 font-semibold text-white transition-transform hover:scale-[1.03]"
    style={{
      background:
        "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
    }}
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
