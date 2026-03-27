const BUSINESS = {
  name: "The Grooming Room Barber Shop",
  url: "https://thegroomingroom.com.au",
  phone: "+61 2 8883 1729",
  image:
    "https://res.cloudinary.com/drzxhdreo/image/upload/f_auto,q_auto/v1/localbarbershop/hero",
  address: {
    "@type": "PostalAddress",
    streetAddress: "90 Wrights Road",
    addressLocality: "Kellyville",
    addressRegion: "NSW",
    postalCode: "2155",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.7346,
    longitude: 150.9553,
  },
};

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    image: BUSINESS.image,
    address: BUSINESS.address,
    geo: BUSINESS.geo,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Credit Card, EFTPOS",
    areaServed: {
      "@type": "Place",
      name: "Kellyville, NSW",
    },
  };
}

export function getServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: BUSINESS.name,
    url: BUSINESS.url + "/mens-haircuts-beard-trims-kellyville",
    telephone: BUSINESS.phone,
    address: BUSINESS.address,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Barber Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Men's Haircut",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Beard Trim & Shaping",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Skin Fade",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hair Colouring",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kids Haircut",
          },
        },
      ],
    },
  };
}

export function getBlogPostJsonLd(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
    url: `${BUSINESS.url}/blogs/${blog.slug}`,
    ...(blog.coverImage && { image: blog.coverImage }),
    datePublished: blog.publishedAt?.seconds
      ? new Date(blog.publishedAt.seconds * 1000).toISOString()
      : undefined,
    author: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
  };
}
