import { memo } from "react";
import {
  ClipboardCheck,
  RotateCw,
  PhoneCall,
  Scissors,
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
            Simple steps. In store. Automatic entry.
          </p>
        </div>

 {/* BENTO GRID */}
<div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-6">

  {/* STEP 1 – TOP LEFT, LARGE */}
  <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-4 lg:row-span-1">
    <StepHeader icon={<ClipboardCheck />} step="STEP 1" />
    <h3 className="mt-4 font-semibold text-slate-900">
      Submit the Entry Form
    </h3>
  <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
  Fill in the short entry form with your details at{" "}
  <a
    href="https://kellyvillebarber.com.au/win"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-orange-600 hover:text-orange-700 underline underline-offset-4"
  >
    kellyvillebarber.com.au/win
  </a>
</p>

  </div>

  {/* STEP 2 – TOP RIGHT, SMALL */}
  <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2 lg:row-span-1">
    <StepHeader icon={<RotateCw />} step="STEP 2" />
    <h3 className="mt-4 font-semibold text-slate-900">
      Spin the Wheel
    </h3>
    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
      At the end of each month, all valid entries go into the draw.
    </p>
  </div>

  {/* STEP 3 – BOTTOM LEFT, SMALL */}
  <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2 lg:row-span-1">
    <StepHeader icon={<PhoneCall />} step="STEP 3" />
    <h3 className="mt-4 font-semibold text-slate-900">
      Get Notified
    </h3>
    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
      Winners receive an SMS or phone call and are announced on social media.
    </p>
  </div>

  {/* STEP 4 – BOTTOM RIGHT, LARGE */}
  <div className="rounded-3xl bg-white p-8 shadow-sm lg:col-span-4 lg:row-span-1">
    <StepHeader icon={<Scissors />} step="STEP 4" />
    <h3 className="mt-4 font-semibold text-slate-900">
      Collect Your Prize
    </h3>
    <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
      Visit the shop, make a purchase, and collect your prize in person.
    </p>
  </div>

</div>



      

      </div>
    </section>
  );
});

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
