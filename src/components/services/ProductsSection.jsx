import { memo } from "react";

const products = [
  {
    title: "Deluxe Grooming Set",
    desc: "Complete grooming essentials for wash, shave, and style.",
    img: "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto:good,e_sharpen:60,dpr_auto,w_600/v1767540191/rs_w_720_h_541_cg_true_oystvt.webp",
  },
  {
    title: "Hair Styling",
    desc: "Professional styling products with the right wax and hold.",
    img: "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto:good,e_sharpen:60,dpr_auto,w_600/v1767540187/rs_w_720_h_541_cg_true_1_wdvier.webp",
  },
  {
    title: "Hair & Body",
    desc: "Shampoo, conditioner, wax, and more for everyday care.",
    img: "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto:good,e_sharpen:60,dpr_auto,w_600/v1767540183/rs_w_720_h_541_cg_true_m_doi2xa.webp",
  },
];


const ProductsSection = memo(function ProductsSection() {
  return (
<section className="bg-white section-spacing">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block mb-3 rounded-full bg-orange-50 px-4 py-1 text-sm font-semibold text-orange-600">
            Products
          </span>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Products We Use & Sell In-Store
          </h2>

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Quality grooming products available at the shop —
            just ask our barbers.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.title}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="450"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {product.desc}
                </p>

                <p className="mt-4 text-sm font-medium text-orange-600">
                  Available in store
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default ProductsSection;
