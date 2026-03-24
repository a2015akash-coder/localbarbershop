import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const CARD_WIDTH = 380;
const GAP = 32;
const SLIDE_DISTANCE = CARD_WIDTH + GAP;
const VISIBLE = 3;

function getAvatarColors(name = "") {
  const palettes = [
    "bg-pink-100 text-pink-700",
    "bg-orange-100 text-orange-700",
    "bg-yellow-100 text-yellow-700",
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash + name.charCodeAt(i)) % palettes.length;
  }

  return palettes[hash];
}

function renderStars(rating = 0) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function ReviewCard({ review, mobile = false }) {
  const avatarClass = getAvatarColors(review.authorName);
  const avatarSize = mobile ? "h-18 w-18 text-lg" : "h-20 w-20 text-xl";
  const bodyText = mobile
    ? "text-sm text-slate-600 leading-relaxed"
    : "text-base text-slate-600 leading-relaxed";

  return (
    <div
      className={`rounded-3xl bg-white ${
        mobile ? "p-7" : "p-9"
      } shadow-sm text-center`}
    >
      {review.authorPhoto ? (
        <img
          src={review.authorPhoto}
          alt={review.authorName}
          className={`mx-auto mb-5 ${avatarSize} rounded-full object-cover`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={`mx-auto mb-5 flex ${avatarSize} items-center justify-center rounded-full font-semibold ${avatarClass}`}
        >
          {review.initial}
        </div>
      )}

      <div className="mb-3 text-orange-500 text-lg tracking-wide">
        {renderStars(review.rating)}
      </div>

      <p className={bodyText}>“{review.text}”</p>

      <div className="mt-4 font-semibold text-slate-900">{review.authorName}</div>

      <div className="mt-1 text-xs text-slate-500">
        {review.relativePublishTimeDescription || "Google review"}
      </div>

      {review.authorUri ? (
        <a
          href={review.authorUri}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
        >
          View profile <ExternalLink size={12} />
        </a>
      ) : null}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    businessName: "",
    rating: 0,
    userRatingCount: 0,
    googleMapsUri: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    let ignore = false;

    async function loadReviews() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/reviews");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load Google reviews");
        }

        const incomingReviews = Array.isArray(data.reviews) ? data.reviews : [];

        if (!ignore) {
          setSummary({
            businessName: data.businessName || "",
            rating: Number(data.rating || 0),
            userRatingCount: Number(data.userRatingCount || 0),
           googleMapsUri: data.googleMapsUri || "",
          });
          setReviews(incomingReviews);
          setItems(incomingReviews);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load Google reviews");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      ignore = true;
    };
  }, []);

  const canCarousel = items.length > VISIBLE;

  const slideNext = () => {
    if (isAnimating || !canCarousel) return;
    setIsAnimating(true);
    setOffset(-SLIDE_DISTANCE);
  };

  const slidePrev = () => {
    if (isAnimating || !canCarousel) return;
    setIsAnimating(true);
    setOffset(SLIDE_DISTANCE);
  };

  useEffect(() => {
    if (!isAnimating || !trackRef.current || !canCarousel) return;

    const handleEnd = () => {
      setItems((prev) =>
        offset < 0
          ? [...prev.slice(1), prev[0]]
          : [prev[prev.length - 1], ...prev.slice(0, -1)]
      );
      setOffset(0);
      setIsAnimating(false);
    };

    const el = trackRef.current;
    el.addEventListener("transitionend", handleEnd, { once: true });

    return () => {
      el.removeEventListener("transitionend", handleEnd);
    };
  }, [isAnimating, offset, canCarousel]);

  const desktopItems = useMemo(() => {
    if (!items.length) return [];
    if (items.length <= VISIBLE) return items;
    return items.slice(0, VISIBLE + 1);
  }, [items]);

  if (!loading && !error && reviews.length === 0) {
    return (
      <section className="cv-auto bg-orange-50 section-spacing">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <h2
              className="font-semibold tracking-tight"
              style={{
                fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
                backgroundImage:
                  "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              What Our Clients Say
            </h2>

            <p className="mt-3 text-base text-slate-600">
              Google reviews are temporarily unavailable.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cv-auto bg-orange-50 section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
              backgroundImage:
                "linear-gradient(90deg, #0f172a 0%, #a88c3a 60%, #e6c35c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What Our Clients Say
          </h2>

          {loading ? (
            <p className="mt-3 text-base text-slate-600">
              Loading Google reviews...
            </p>
          ) : error ? (
            <p className="mt-3 text-base text-red-600">{error}</p>
          ) : (
            <div className="mt-3 space-y-2">
              <p className="text-base text-slate-600">
                Rated {summary.rating.toFixed(1)}★ on Google by{" "}
                {summary.userRatingCount}+ locals for consistent results.
              </p>

              {summary.googleMapsUri  ? (
                <a
                  href={summary.googleMapsUri}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  View all reviews on Google <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          )}
        </div>

        {!loading && !error && reviews.length > 0 ? (
          <>
            <div className="lg:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory">
              <div className="flex gap-4 pb-6">
                {reviews.map((review, index) => (
                  <div
                    key={`${review.authorName}-${index}`}
                    className="snap-center flex-shrink-0 w-[85vw] max-w-sm"
                  >
                    <ReviewCard review={review} mobile />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="overflow-hidden py-8">
                <div
                  ref={trackRef}
                  className="flex gap-8 will-change-transform"
                  style={{
                    transform: `translateX(${offset}px)`,
                    transition: isAnimating
                      ? "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                  }}
                >
                  {desktopItems.map((review, index) => (
                    <div
                      key={`${review.authorName}-${review.publishTime}-${index}`}
                      className="flex-shrink-0 w-[380px]"
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              </div>

              {canCarousel ? (
                <>
                  <button
                    onClick={slidePrev}
                    className="absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-md hover:bg-orange-50 transition flex items-center justify-center"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={slideNext}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-md hover:bg-orange-50 transition flex items-center justify-center"
                    aria-label="Next review"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              ) : null}
            </div>

            <p className="mt-4 text-xs text-slate-500">Reviews from Google.</p>
          </>
        ) : null}
      </div>
    </section>
  );
}