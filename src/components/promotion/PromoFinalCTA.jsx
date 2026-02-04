import { memo } from "react";
import { Phone, MapPin, Globe } from "lucide-react";

const PromoFinalCTA = memo(function PromoFinalCTA() {
  return (
    <section className="bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-screen-md px-4 text-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          📍 Visit The Grooming Room Barbershop
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-4 h-px w-20 bg-orange-200" />

        {/* Contact Info */}
        <div className="mt-6 space-y-4 text-base text-slate-700">

          <p className="flex items-center justify-center gap-2">
            <Phone size={18} className="text-orange-500" />
            <a
              href="tel:0451856618"
              className="font-medium hover:text-orange-600 transition"
            >
              0451 856 618
            </a>
          </p>



          <p className="flex items-center justify-center gap-2 text-slate-600">
            <MapPin size={18} className="text-orange-500" />
            <span>
              90 Wrights Road, Kellyville NSW 2155, Australia
            </span>
          </p>


          <p className="flex items-center justify-center gap-2 text-slate-600">

            <span>
              Visit us for a haircut, beard trim, or grooming service. Eligible services include entry into the monthly draw.

            </span>
          </p>
        </div>

        {/* Primary CTA */}


      </div>
    </section>
  );
});

export default PromoFinalCTA;
