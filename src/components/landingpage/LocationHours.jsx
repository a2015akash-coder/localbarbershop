import { memo, useEffect, useRef, useState } from "react";
import { Clock3, MapPin } from "lucide-react";
import {
  DIRECTIONS_LINK,
  PHONE_LINK,
  PHONE_NUMBER,
} from "../../constants";
import { badgeVariants } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";
import SectionHeading from "../ui/section-heading";

const OPENING_HOURS = [
  ["Monday", "9:00 am - 5:30 pm"],
  ["Tuesday", "9:00 am - 5:30 pm"],
  ["Wednesday", "9:00 am - 5:30 pm"],
  ["Thursday", "9:00 am - 9:00 pm"],
  ["Friday", "9:00 am - 5:30 pm"],
  ["Saturday", "9:00 am - 5:00 pm"],
  ["Sunday", "9:00 am - 4:00 pm"],
];

function LocationHours() {
  const mapRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return undefined;

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

  const trackCallClick = (location) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "call_cta_click",
        cta_type: "phone",
        cta_location: location,
        phone_number: PHONE_NUMBER,
        page_path: window.location.pathname,
      });
    }
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Location & Hours"
          title="Visit our Kellyville barbershop"
          className="mb-10 max-w-4xl"
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div ref={mapRef} className="h-full">
            <Card className="h-full overflow-hidden p-3">
              <div className="h-[360px] w-full overflow-hidden rounded-[24px] bg-gray-100">
                {mapVisible ? (
                  <iframe
                    title="Google Map - The Grooming Room Barbershop"
                    src="https://www.google.com/maps?q=The+Grooming+Room+Barbershop+Kellyville+NSW+2155&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Loading map...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 px-4 pb-2 pt-5 text-sm text-slate-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--muted)] text-slate-900">
                  <MapPin size={18} />
                </div>
                <span>90 Wrights Rd, Kellyville NSW 2155, Australia</span>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Opening Hours
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Walk-ins welcome during regular trading hours.
                </p>
              </div>

              <div
                className={badgeVariants({
                  variant: "success",
                  className: "tracking-[0.16em]",
                })}
              >
                This week
              </div>
            </div>

            <div className="mt-6 space-y-3 text-slate-800">
              {OPENING_HOURS.map(([day, time]) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded-2xl bg-[var(--muted)]/55 px-4 py-3 text-sm"
                >
                  <span className="font-medium">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-[24px] bg-[var(--brand-accent-soft)] px-4 py-4 text-sm text-[var(--brand-accent-strong)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white">
                <Clock3 size={18} />
              </div>
              Trading hours may change on public holidays, so it is worth checking
              before visiting.
            </div>
          </Card>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_LINK}
            className={buttonVariants({ variant: "accent", size: "xl" })}
            onClick={() => trackCallClick("maps_section_home")}
          >
            Call Now
          </a>

          <a
            href={DIRECTIONS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", size: "xl" })}
            onClick={() => {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "directions_cta_click",
                cta_location: "maps_section_home",
                destination: "google_maps",
                page_path: window.location.pathname,
              });
            }}
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(LocationHours);
