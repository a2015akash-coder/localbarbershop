import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPinned,
  Star,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { badgeVariants } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";

const CARD_WIDTH = 380;
const GAP = 24;
const SLIDE_DISTANCE = CARD_WIDTH + GAP;
const VISIBLE = 3;

function getInitial(name = "") {
  return name.trim().charAt(0).toUpperCase() || "G";
}

function renderStars(rating = 0) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }, (_, index) => index < rounded);
}

function ReviewCard({ review, mobile = false }) {
  const stars = renderStars(review.rating);

  return (
    <Card
      className={cn(
        "group h-full rounded-[26px] bg-white/92 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-36px_rgba(15,23,42,0.5)]",
        mobile ? "p-5" : "p-6"
      )}
    >
      <div className="flex items-start gap-4">
        {review.authorPhoto ? (
          <img
            src={review.authorPhoto}
            alt={review.authorName}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
            {review.initial || getInitial(review.authorName)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-slate-900">
            {review.authorName}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">
            {review.relativePublishTimeDescription || "Google review"}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
          {stars.map((filled, index) => (
            <Star
              key={index}
              size={12}
              className={filled ? "fill-current" : ""}
            />
          ))}
          <span className="ml-1">{review.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="mt-4 line-clamp-6 text-sm leading-6 text-slate-600">
        {review.text}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="text-xs text-slate-400">From Google Reviews</div>

        {review.authorUri ? (
          <a
            href={review.authorUri}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition hover:text-slate-900"
          >
            Profile <ExternalLink size={12} />
          </a>
        ) : null}
      </div>
    </Card>
  );
}

function CarouselButton({ direction, onClick, label }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={buttonVariants({
        variant: "secondary",
        size: "icon",
        className: "text-slate-700 hover:text-slate-900",
      })}
      aria-label={label}
      type="button"
    >
      <Icon size={18} />
    </button>
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
      } catch (errorValue) {
        if (!ignore) {
          setError(errorValue.message || "Failed to load Google reviews");
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
    if (!isAnimating || !trackRef.current || !canCarousel) return undefined;

    const handleEnd = () => {
      setItems((previous) =>
        offset < 0
          ? [...previous.slice(1), previous[0]]
          : [previous[previous.length - 1], ...previous.slice(0, -1)]
      );
      setOffset(0);
      setIsAnimating(false);
    };

    const element = trackRef.current;
    element.addEventListener("transitionend", handleEnd, { once: true });

    return () => {
      element.removeEventListener("transitionend", handleEnd);
    };
  }, [isAnimating, offset, canCarousel]);

  const desktopItems = useMemo(() => {
    if (!items.length) return [];
    if (items.length <= VISIBLE) return items;
    return items.slice(0, VISIBLE + 1);
  }, [items]);

  return (
    <section className="bg-slate-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className={badgeVariants({ className: "tracking-[0.16em]" })}>
              <MapPinned size={14} />
              Verified Google Reviews
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What clients say about {summary.businessName || "our shop"}
            </h2>

            {loading ? (
              <p className="mt-3 text-sm text-slate-600">
                Loading Google reviews...
              </p>
            ) : error ? (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <Star size={14} className="fill-current text-amber-500" />
                  <span className="font-medium text-slate-900">
                    {summary.rating.toFixed(1)}
                  </span>
                </div>

                <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  {summary.userRatingCount} Google reviews
                </div>

                {summary.googleMapsUri ? (
                  <a
                    href={summary.googleMapsUri}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    View on Google <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            )}
          </div>

          {!loading && !error && canCarousel ? (
            <div className="hidden items-center gap-2 lg:flex">
              <CarouselButton
                direction="left"
                onClick={slidePrev}
                label="Previous review"
              />
              <CarouselButton
                direction="right"
                onClick={slideNext}
                label="Next review"
              />
            </div>
          ) : null}
        </div>

        {!loading && !error && reviews.length > 0 ? (
          <>
            <div className="-mx-4 overflow-x-auto px-4 lg:hidden">
              <div className="flex gap-4 pb-2">
                {reviews.map((review, index) => (
                  <div
                    key={`${review.authorName}-${index}`}
                    className="w-[86vw] max-w-sm flex-shrink-0"
                  >
                    <ReviewCard review={review} mobile />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex gap-6 will-change-transform"
                  style={{
                    transform: `translateX(${offset}px)`,
                    transition: isAnimating
                      ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                  }}
                >
                  {desktopItems.map((review, index) => (
                    <div
                      key={`${review.authorName}-${review.publishTime}-${index}`}
                      className="w-[380px] flex-shrink-0"
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Review content is sourced from Google.
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
