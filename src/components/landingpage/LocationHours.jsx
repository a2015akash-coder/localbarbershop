import { memo, useEffect, useRef, useState } from "react";

function LocationHours() {
  const mapRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);

  /* ------------------ LAZY LOAD MAP ------------------ */
  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 max-w-5xl">
          <h2
            className="font-semibold tracking-tight lg:whitespace-nowrap"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              backgroundImage:
                "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Visit Our Kellyville Barbershop
          </h2>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* MAP CARD */}
          <div
            ref={mapRef}
            className="rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100"
          >
            <div className="h-[360px] w-full bg-gray-100">
              {mapVisible ? (
                <iframe
                  title="Google Map – The Grooming Room Barbershop"
                  src="https://www.google.com/maps?q=The+Grooming+Room+Barbershop+Kellyville+NSW+2155&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Loading map…
                </div>
              )}
            </div>

            {/* ADDRESS */}
            <div className="px-6 py-5 flex items-center gap-2 text-sm text-gray-700">

              <span>90 Wrights Rd, Kellyville NSW 2155, Australia</span>
            </div>
          </div>

          {/* HOURS CARD */}
          <div className="rounded-3xl bg-white shadow-md border border-gray-100 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Opening Hours
            </h3>

            <div className="flex items-center gap-2 mb-6 text-green-600 font-medium">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-green-500">
                ✓
              </span>
              Open
            </div>

            <div className="space-y-3 text-gray-800">
              {[
                ["Monday", "9:00 am – 5:30 pm"],
                ["Tuesday", "9:00 am – 5:30 pm"],
                ["Wednesday", "9:00 am – 5:30 pm"],
                ["Thursday", "9:00 am – 9:00 pm"],
                ["Friday", "9:00 am – 5:30 pm"],
                ["Saturday", "9:00 am – 5:00 pm"],
                ["Sunday", "9:00 am - 5:00 pm"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span>{day}</span>
                  <span className={time === "Closed" ? "text-red-600" : ""}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA ROW */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+61288831729"
            className="inline-flex items-center justify-center rounded-full
                       bg-orange-500 px-10 py-4 font-semibold text-white
                       hover:bg-orange-600 transition"
          >
            Call Now
          </a>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full
                       border border-gray-300 px-10 py-4 font-semibold
                       text-gray-900 hover:bg-gray-50 transition"
          >
            Get Directions
          </a>
        </div>



      </div>
    </section>
  );
}

export default memo(LocationHours);
