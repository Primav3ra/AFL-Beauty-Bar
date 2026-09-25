// Integration swap point for Google Reviews. Shaped like a Google Places review (Place Details
// `reviews[]`: author_name, rating, text, relative_time_description, profile_photo_url) so the
// integration only has to map its response into this list. Until then: the one review in the design.
export type Review = {
  author: string;
  /** 1–5, may be fractional. */
  rating: number;
  text: string;
  /** e.g. "6 days ago" (Google's relative_time_description). */
  relativeTime: string;
  /** Reviewer avatar URL; null → initial on a dark disc. */
  photo: string | null;
};

export const reviews: Review[] = [
  {
    author: "Maya K.",
    rating: 4.5,
    text: "AFL is the way to go. The first place I went to botched my lips and then I went to AFL and they made them look so plump and perfect. My cheeks and my chin look snatched and I’m always getting compliments on how natural and good my filler looks. It’s AFL or nothing.",
    relativeTime: "6 days ago",
    photo: null,
  },
];
