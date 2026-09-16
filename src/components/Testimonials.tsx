"use client";

import { Star } from "lucide-react";
import { home } from "@/data/content";
import { categories } from "@/data/categories";
import { useT } from "@/lib/locale";
import { SectionHeading } from "./SectionHeading";

interface Review {
  name: string;
  location: string;
  text: string;
  /** Category the quote is about, shown as a small tag on the card. */
  categorySlug?: string;
}

// Each quote stays in the reviewer's own language on purpose — a Bosnian
// card in Bosnian, a German partner in German — so the marquee reads like
// real people, not translated copy. (Gulf customers write in English.)
const REVIEWS: Review[] = [
  {
    name: "Amina Hodžić",
    location: "Sarajevo, BiH",
    text: "Voćar grickalice su dio svake naše porodične večeri. Kvalitet je uvijek isti, godinama unazad.",
    categorySlug: "peanuts",
  },
  {
    name: "Emir Kovačević",
    location: "Tuzla, BiH",
    text: "Puter od kikirikija mi je promijenio doručke. Kremast, bez nepotrebnih dodataka — tačno kako treba.",
    categorySlug: "peanut-butter",
  },
  {
    name: "John Miller",
    location: "SAD",
    text: "Found Voćar snacks at a specialty store and got hooked instantly. The quality really stands out compared to what we usually get here.",
    categorySlug: "chips",
  },
  {
    name: "Selma Bajramović",
    location: "Mostar, BiH",
    text: "Pop Star kokice sa karamelom su hit na svakom filmskom veče kod nas. Djeca ih obožavaju.",
    categorySlug: "popcorn",
  },
  {
    name: "Markus Weber",
    location: "Njemačka",
    text: "Seit zwei Jahren importieren wir Voćar-Produkte für unsere Läden — zuverlässige Lieferung, faire Preise, und die Kunden kommen immer wieder wegen der Waffeln.",
    categorySlug: "wafers",
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
    categorySlug: "peanuts",
  },
  {
    name: "Amela Softić",
    location: "Zenica, BiH",
    text: "Čoko šljive su moja tajna slabost. Prirodne, bez viška šećera, i uvijek svježe.",
    categorySlug: "prunes",
  },
];

function ReviewCard({ review }: { review: Review }) {
  const t = useT();
  const category = categories.find((c) => c.slug === review.categorySlug);

  return (
    <div
      className="flex w-80 shrink-0 flex-col gap-3 rounded-2xl border p-6 shadow-sm"
      style={{ borderColor: "var(--line)", background: "var(--cream)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} fill="var(--amber)" style={{ color: "var(--amber)" }} />
          ))}
        </div>
        {category && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide"
            style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: category.accent }} aria-hidden />
            {t(category.name)}
          </span>
        )}
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
