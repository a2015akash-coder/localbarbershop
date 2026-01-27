import { memo } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PHONE_NUMBER, PHONE_LINK } from "../../constants";


const Card = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
          <Icon size={18} />
        </span>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>

      <div className="mt-5 space-y-2 text-slate-700">
        {children}
      </div>
    </div>
  </div>
);

const ContactInfo = memo(function ContactInfo() {
  const trackCallClick = (location) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_cta_click",
      cta_type: "phone",
      cta_location: location, // contact_page_card
      phone_number: "+61288831729",
      page_path: window.location.pathname,
    });
  };


  return (
    <section className="bg-slate-50 section-spacing">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Contact Details
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Everything you need to know before visiting — location, contact details,
            and opening hours.
          </p>
        </div>

        {/* Uniform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Phone */}
          <Card icon={Phone} title="Phone">
            <a
               href={PHONE_LINK}
              className="text-lg font-semibold text-slate-900 hover:text-orange-600 transition"
              onClick={() => trackCallClick("contact_page_card")}
            >
              (02) 8883 1729
            </a>

            <p className="text-sm text-slate-500">
              Call us for quick questions or availability.
            </p>
          </Card>


          {/* Email */}
          <Card icon={Mail} title="Email">
            <a
              href="mailto:groomingroombarber@gmail.com"
              className="
      font-medium
      text-orange-600
      underline
      underline-offset-4
      break-all
      transition
      hover:text-orange-700
    "
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "email_cta_click",
                  cta_type: "email",
                  cta_location: "contact_page_card",
                  email_address: "groomingroombarber@gmail.com",
                  page_path: window.location.pathname,
                });

               
              }}
            >
              groomingroombarber@gmail.com
            </a>

            <p className="text-sm text-slate-500">
              For general enquiries only.
            </p>
          </Card>


          {/* Opening Hours */}
          <Card icon={Clock} title="Opening Hours">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Mon, Tue, Wed & Fri</span>
                <span className="font-medium">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday</span>
                <span className="font-medium">09:00 – 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">09:00 – 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">09:00 – 16:00</span>
              </div>
            </div>

            <p className="pt-2 text-sm text-slate-500">
              Walk-ins welcome during business hours.
            </p>
          </Card>

          {/* Address */}
          <Card icon={MapPin} title="Address">
            <p className="leading-relaxed">
              90 Wrights Road,<br />
              Kellyville, New South Wales 2155,<br />
              Australia
            </p>
            <p className="text-sm text-slate-500">
              Easy access with nearby parking available.
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
});

export default ContactInfo;
