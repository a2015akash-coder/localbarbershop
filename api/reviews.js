const GOOGLE_API_BASE = "https://places.googleapis.com/v1/places";

function getInitial(name = "") {
  return name.trim().charAt(0).toUpperCase() || "G";
}

function formatReview(review) {
  const authorName =
    review?.authorAttribution?.displayName?.trim() || "Google user";

  return {
    authorName,
    authorPhoto: review?.authorAttribution?.photoUri || "",
    authorUri: review?.authorAttribution?.uri || "",
    initial: getInitial(authorName),
    rating: Number(review?.rating || 0),
    text: review?.text?.text || "",
    publishTime: review?.publishTime || "",
    relativePublishTimeDescription:
      review?.relativePublishTimeDescription || "",
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({
      error: "Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID",
    });
  }

  try {
    const response = await fetch(`${GOOGLE_API_BASE}/${placeId}`, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,reviews,reviewsUri",
      },
    });

    const rawText = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch Google reviews",
        details: rawText,
      });
    }

    const data = JSON.parse(rawText);

    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map(formatReview).filter((review) => review.text)
      : [];

    res.setHeader(
      "Cache-Control",
      "s-maxage=43200, stale-while-revalidate=86400"
    );

    return res.status(200).json({
      businessName: data?.displayName?.text || "The Grooming Room Barber Shop",
      rating: Number(data?.rating || 0),
      userRatingCount: Number(data?.userRatingCount || 0),
      reviewsUri: data?.reviewsUri || "",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}