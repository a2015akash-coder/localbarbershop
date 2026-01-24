import { memo } from "react";
import {
  Scissors,
  QrCode,
  ClipboardCheck,
  RotateCw,
  PhoneCall,
} from "lucide-react";

const HowToEnterDraw = memo(function HowToEnterDraw() {
  return (
    <section className="bg-[#FFF7ED] py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            How to Enter the Monthly Draw
          </h2>
          <p className="mt-2 text-slate-600">
            Simple steps. In-store. Automatic entry.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* STEP 1 */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <StepHeader icon={<Scissors />} step="STEP 1" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Get Groomed
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Visit <strong>The Grooming Room Barbershop</strong> for any eligible service — haircut, beard trim, colouring, or grooming.
            </p>
          </div>

          {/* STEP 3 – WIDE */}
          <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-2">
            <StepHeader icon={<ClipboardCheck />} step="STEP 3" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Submit the Entry Form
            </h3>
            <p className="mt-2 max-w-xl text-sm text-slate-600 leading-relaxed">
              Fill in the short entry form with your details so we can contact
              you if you win. This only takes a moment and ensures your entry
              is valid.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <StepHeader icon={<QrCode />} step="STEP 2" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Scan the QR Code
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              After your service, scan the QR code available at the counter.
            </p>
          </div>

          {/* STEP 4 */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <StepHeader icon={<RotateCw />} step="STEP 4" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Spin the Wheel
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              At the end of each month, winners are randomly selected.
            </p>
          </div>

          {/* STEP 5 */}
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <StepHeader icon={<PhoneCall />} step="STEP 5" />
            <h3 className="mt-4 font-semibold text-slate-900">
              Get Notified
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Winners receive a phone call and are announced on social media.
            </p>
          </div>
        </div>

        {/* FOOTNOTE */}
        <p className="mt-10 max-w-3xl text-xs text-slate-500">
          One entry per purchase. Monthly draw. Winners selected at random and
          contacted directly by The Grooming Room Barbershop.
        </p>

      </div>
    </section>
  );
});

/* STEP HEADER COMPONENT */
function StepHeader({ icon, step }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
        {icon}
      </div>
      <span className="text-xs font-semibold tracking-wide text-orange-600">
        {step}
      </span>
    </div>
  );
}

export default HowToEnterDraw;
