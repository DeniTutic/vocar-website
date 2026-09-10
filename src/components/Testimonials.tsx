"use client";

import { Star } from "lucide-react";
import { home } from "@/data/content";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";

interface Review {
  name: string;
  location: string;
  text: string;
}

// Illustrative customer quotes for this concept redesign — not real
// submissions. Mostly Bosnian voices, plus a few export-market customers
// (see the presence map above) commenting on specific products, the range
// overall, and — for the German import partner — the business relationship.
const REVIEWS: Review[] = [
  {
    name: "Amina Hodžić",
    location: "Sarajevo, BiH",
    text: "Voćar grickalice su dio svake naše porodične večeri. Kvalitet je uvijek isti, godinama unazad.",
  },
  {
    name: "Emir Kovačević",
    location: "Tuzla, BiH",
    text: "Puter od kikirikija mi je promijenio doručke. Kremast, bez nepotrebnih dodataka — tačno kako treba.",
  },
  {
    name: "John Miller",
    location: "SAD",
    text: "Found Voćar snacks at a specialty store and got hooked instantly. The quality really stands out compared to what we usually get here.",
  },
  {
    name: "Selma Bajramović",
    location: "Mostar, BiH",
    text: "Pop Star kokice sa karamelom su hit na svakom filmskom veče kod nas. Djeca ih obožavaju.",
  },
  {
    name: "Markus Weber",
    location: "Njemačka",
    text: "We've been importing Voćar products for our stores for two years now — reliable delivery, fair pricing, and customers keep coming back for the wafers.",
  },
  {
    name: "Adnan Delić",
    location: "Banja Luka, BiH",
    text: "Kupujem Voćar proizvode još od djetinjstva. Isti ukus, ista pouzdanost — to se rijetko nađe danas.",
  },
  {
    name: "Yusuf Al-Rashid",
    location: "UAE",
    text: "The peanuts are perfectly roasted every time. My family stocks up on them whenever we visit Bosnia.",
  },
  {
    name: "Amela Softić",
    location: "Zenica, BiH",
    text: "Čoko šljive su moja tajna slabost. Prirodne, bez viška šećera, i uvijek svježe.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="flex w-80 shrink-0 flex-col gap-3 rounded-2xl border p-6 shadow-sm"
      style={{ borderColor: "var(--line)", background: "var(--cream)" }}
    >
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="var(--amber)" style={{ color: "var(--amber)" }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-auto pt-1">
        <div className="text-sm font-semibold" style={{ color: "var(--forest-deep)" }}>
          {review.name}
        </div>
        <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
          {review.location}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const t = useT();
  const track = [...REVIEWS, ...REVIEWS];

  return (
    <section className="overflow-hidden py-20 sm:py-28" style={{ background: "var(--beige)" }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={t(home.testimonialsEyebrow)} title={t(home.testimonialsTitle)} align="center" />
      </div>

      <div
        className="relative mt-12 w-full overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div className="flex w-max gap-6 [animation:marquee-left_50s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
