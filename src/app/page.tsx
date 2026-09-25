import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { Carousel } from "@/components/Carousel";
import { ClinicSelector } from "@/components/ClinicSelector";
import { FigmaImage } from "@/components/FigmaImage";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { DoubleRule, Eyebrow, btnOutline, btnWhite } from "@/components/blocks";
import { ArrowRight, Star } from "@/components/icons";
import { links } from "@/config/links";
import { treatmentHref } from "@/data/treatments";
import { place } from "@/lib/figma";

// Landing_Page 12:1078 — every section keeps the design's 1440px coordinates.

const logos = ["85:847", "85:849", "85:851", "85:853", "85:855", "85:857"];
const logoNames = ["Dr. Phil", "New York Post", "TLC", "Daily News", "Hollywood Unlocked", "E! News"];

// "Find your starting point" tiles (33:1655) with the On Hover copy from 675:1011.
const goals = [
  { tile: "33:1656", img: "951:4390", title: "Soften lines", link: "Botox and Neurotoxins →", href: treatmentHref("Neurotoxins") },
  { tile: "33:1659", img: "951:4379", title: "Balance my features", link: "Facial Balancing →", href: treatmentHref("Facial Balancing") },
  { tile: "33:1662", img: "951:4387", title: "Improve my skin", link: "Microneedling →", href: treatmentHref("Microneedling") },
  { tile: "33:1665", img: "955:4408", title: "Shape my body", link: "Non-Surgical BBL →", href: treatmentHref("Non-surgical BBL") },
  { tile: "33:1668", img: "955:4401", title: "Reduce unwanted hair", link: "Laser Hair Removal →", href: null },
  { tile: "33:1671", img: "951:4394", title: "Support my wellness", link: "IV Therapy →", href: treatmentHref("IV Therapy") },
];
const rowHeights = [272, 266.5, 268.7];

const beforeAfter = [
  { card: "39:2110", imgs: ["90:1177"], title: "Lip filler", cta: "See More  →", href: treatmentHref("Lip Fillers") },
  { card: "311:69", imgs: ["311:103"], title: "Facial Balancing", cta: "See More →", href: treatmentHref("Facial Balancing") },
  { card: "311:80", imgs: ["311:110", "311:111"], title: "Chin Filler", cta: "See More →", href: null },
  { card: "311:91", imgs: ["311:118"], title: "Lip filler ", cta: "See More", href: treatmentHref("Lip Fillers") },
];

const featured = [
  { card: "90:993", img: "90:1232", title: "Facial Balancing", name: "Facial Balancing" },
  { card: "90:1003", img: "90:1247", title: "Salmon DNA Facial", name: "Salmon DNA Facial" },
  { card: "90:1014", img: "90:1248", title: "Non-surgical BBL", name: "Non-surgical BBL" },
  { card: "90:1024", img: null, title: "Facial Balancing", name: "Facial Balancing" },
];

const chip = "absolute flex h-[26px] items-center bg-black/60 px-2.5 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white";

export default function Home() {
  const hero = place("531:29", "85:684");
  return (
    <>
      {/* Hero 85:684 */}
      <section className="relative mt-px h-[616px] overflow-hidden bg-sand">
        <FigmaImage {...hero} priority sizes="1440px" alt="Inside AFL Beauty Bar Wynwood" />
        <div aria-hidden className="absolute bg-[#462416] opacity-90 blur-[150px]" style={{ left: -680, top: 313, width: 2781, height: 628 }} />
        <div className="absolute top-[257px] left-[98px] w-[559px]">
          <h1 className="text-[60px] leading-[70px] font-semibold tracking-[-2.4px] text-white">
            Still <span className="font-serif text-[70px] font-normal tracking-[-2.8px] italic">thinking</span> about getting it done?
          </h1>
          <p className="mt-[30px] text-xl leading-[28.5px] text-white">Maybe stop thinking about it..</p>
          <div className="mt-[41px] flex gap-[33px]">
            <BookingLink className={`${btnWhite} w-[208.3px] text-black`}>Book Appointment</BookingLink>
            <BookingLink type="virtual" className={`${btnOutline} w-[289px]`}>
              Schedule Virtual Consultation
            </BookingLink>
          </div>
        </div>
        <ClinicSelector className="absolute top-[500px] left-[1133px]" />
      </section>

      {/* Featured in 557:98 */}
      <section className="relative mt-[62px] h-[108px]" aria-label="Featured in">
        <p className="text-center font-lora text-[15px] leading-[11px] font-medium text-black">Featured in</p>
        <div className="absolute inset-x-0 top-8 flex h-[76px] bg-white">
          {logos.map((_, i) => (
            <div key={i} className={`h-full w-[240px] ${i % 3 !== 0 ? "border-l border-[#cccccc]/10" : ""}`} />
          ))}
        </div>
        {logos.map((id, i) => (
          <FigmaImage key={id} {...place(id, "557:98")} alt={logoNames[i]} />
        ))}
      </section>

      {/* Beauty Taking section 33:1649 — left column is sticky while the tiles scroll (note 130:1474). */}
      <section className="mt-[73px] flex pt-[95px] pl-[108.8px]" aria-labelledby="goals-title">
        <div className="w-[459px] shrink-0">
          <div className="sticky top-[120px] pt-0">
            <Eyebrow>/ Find your starting point</Eyebrow>
            <h2 id="goals-title" className="mt-7 w-[406px] text-[50px] leading-[60px] font-medium tracking-[-3px] text-espresso">
              Where Is your Beauty taking you?
            </h2>
            <p className="mt-7 w-[372px] text-[15px] leading-[30px] text-espresso">
              Explore treatments tailored to the areas you want to refine, refresh or enhance.
            </p>
          </div>
        </div>
        <ul className="grid w-[733.5px] grid-cols-[356.8px_356.8px] gap-x-[19.9px] gap-y-[30.3px]">
          {goals.map((g, i) => {
            const inner = (
              <>
                <FigmaImage {...place(g.img, g.tile)} className="transition-transform duration-700 ease-out group-hover:scale-105" />
                <span className="absolute inset-x-0 top-0 h-[193px] bg-gradient-to-b from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute top-[30.4px] left-[24.4px] translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="block text-[17px] leading-[33.9px] font-medium tracking-[-0.5px] text-white">{g.title}</span>
                  <span className="mt-3 block text-[15px] leading-5 font-medium tracking-[-0.4px] text-white/80">{g.link}</span>
                </span>
              </>
            );
            const cls = "group relative block overflow-hidden bg-black";
            const style = { height: rowHeights[Math.floor(i / 2)] };
            return (
              <li key={g.tile}>
                {g.href ? (
                  <Link href={g.href} className={cls} style={style} aria-label={`${g.title} — ${g.link.replace(" →", "")}`}>
                    {inner}
                  </Link>
                ) : (
                  <PlaceholderLink reason="no Laser Hair Removal detail page" className={cls} aria-label={`${g.title} — Laser Hair Removal`}>
                    <span className="block" style={style}>{inner}</span>
                  </PlaceholderLink>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Before/After Section 39:2102 */}
      <section className="relative mt-[98px] h-[936px]" aria-labelledby="ba-title">
        <div className="absolute top-[46px] left-[75.5px] w-[1290px] text-center">
          <h2 id="ba-title" className="text-[50px] leading-[74px] font-medium tracking-[-3px] text-espresso">
            A Little Before. A Lot of After.
          </h2>
          <p className="mx-auto mt-[29px] w-[660px] text-[15px] leading-[30px] text-espresso">
            Because the right treatment can change more than you look. We bring in results that feel effortless, with every detail in its place.
          </p>
        </div>
        <div className="absolute inset-x-0 top-[276px]">
          <Carousel gap={11.86} inset={68} mode="range" barsGap={59} label="Before and after results">
            {beforeAfter.map((c) => (
              <article key={c.card} className="relative h-[509px] w-[386px] bg-paper">
                <div className="absolute top-0 left-[0.5px] h-[336px] w-[386px] overflow-hidden bg-black">
                  {c.imgs.map((id) => (
                    <FigmaImage key={id} {...place(id, c.card)} alt="" />
                  ))}
                  <span className={`${chip} top-[14px] left-3`}>Before</span>
                  <span className={`${chip} top-[181px] left-3`}>After</span>
                </div>
                <h3 className="absolute top-[364px] w-full text-center text-[17px] leading-[19px] font-semibold text-black">{c.title}</h3>
                {c.href ? (
                  <Link href={c.href} className="absolute top-[412px] left-[68px] flex h-[42.9px] w-[251.8px] items-center justify-center rounded-[2.2px] bg-[#221d1d] text-[17px] leading-[14.4px] font-semibold tracking-[-0.5px] whitespace-pre text-paper transition-colors hover:bg-brown">
                    {c.cta}
                  </Link>
                ) : (
                  <PlaceholderLink reason="no Chin Filler detail page" className="absolute top-[412px] left-[68px] flex h-[42.9px] w-[251.8px] items-center justify-center rounded-[2.2px] bg-[#221d1d] text-[17px] leading-[14.4px] font-semibold tracking-[-0.5px] text-paper transition-colors hover:bg-brown">
                    {c.cta}
                  </PlaceholderLink>
                )}
              </article>
            ))}
          </Carousel>
        </div>
        <div className="absolute inset-x-0 top-[897px]">
          <DoubleRule />
        </div>
      </section>

      {/* Treatments 90:910 */}
      <section className="relative h-[989.5px]" aria-labelledby="featured-title">
        <div className="absolute top-[68.4px] left-[67.4px] w-[1278.5px] text-center">
          <h2 id="featured-title" className="mx-auto w-[535px] text-[50px] leading-[60px] font-medium tracking-[-4px] text-espresso">
            Treatments people drive across town for.
          </h2>
          <p className="mx-auto mt-[27.7px] w-[531px] text-[15px] leading-[19.8px] text-espresso">
            Our most requested treatments, because apparently a little drive isn’t going to stop anyone.
          </p>
        </div>
        <div className="absolute inset-x-0 top-[298.7px]">
          <Carousel gap={25.05} inset={112.4} barsGap={32} label="Featured treatments">
            {featured.map((c) => {
              const href = treatmentHref(c.name);
              const slug = href.split("/").pop();
              return (
                <article key={c.card} className="group relative h-[554px] w-[453px] overflow-hidden bg-black">
                  {c.img && <FigmaImage {...place(c.img, c.card)} className="transition-transform duration-700 group-hover:scale-105" alt="" />}
                  <span className="absolute top-[269.3px] left-[0.6px] h-[285px] w-[452px] bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="absolute top-[352.3px] left-[29.6px] flex items-center gap-[11.2px] text-[15px] leading-[12.7px] tracking-[-0.3px] text-white">
                    Injectables · AFL signature treatment <span className="h-px w-[72.6px] bg-white/80" />
                  </p>
                  <h3 className="absolute top-[394.3px] left-[29.6px] text-[17px] leading-[14.4px] font-semibold tracking-[-0.8px] text-white">
                    <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:underline">
                      {c.title}
                    </Link>
                  </h3>
                  <p className="absolute top-[431.4px] left-[30.3px] w-[349px] text-[15px] leading-[21px] tracking-[-0.3px] text-white/70">
                    Strategic filler placement across multiple areas to bring the face into natural harmony.
                  </p>
                  <span className="absolute top-[493px] left-[30px] h-px w-[282px] bg-white/25" />
                  <BookingLink treatment={slug} className="absolute top-[514.5px] left-[30px] z-10 flex items-center gap-[15px] text-[17px] leading-[12px] tracking-[-0.5px] text-white transition-[gap] hover:gap-5">
                    Book now <ArrowRight className="h-[10px] w-[14px]" />
                  </BookingLink>
                </article>
              );
            })}
          </Carousel>
        </div>
      </section>

      {/* Reviews 130:2333 */}
      <section className="relative ml-[9px] h-[705px] w-[1431px] bg-white" aria-labelledby="reviews-title">
        <div className="absolute top-[59px] left-[108px] h-[515px] w-[492px] overflow-hidden bg-black">
          <FigmaImage {...place("130:2356", "130:2342")} alt="AFL client with her results" />
        </div>
        <a id="reviews-title" href={links.googleReviews} target="_blank" rel="noopener noreferrer" className="absolute top-[84px] left-[733px] text-[17px] leading-4 tracking-[-0.3px] text-black hover:underline">
          / Google Reviews
        </a>
        <blockquote className="absolute top-[157px] left-[727px] w-[544px] text-lg leading-[41px] font-medium text-black">
          “AFL is the way to go. The first place I went to botched my lips and then I went to afl and they made them look so plump and perfect. My cheeks and my chin look snatched and I’m always getting compliments on how natural and good my filler looks. It’s afl or nothing ”
        </blockquote>
        <span className="absolute top-[379px] left-[720px] size-[60px] rounded-full bg-[#190e0d]" aria-hidden />
        <span className="absolute top-[419.5px] left-[754.5px] size-[30px] overflow-hidden rounded-full bg-white">
          <FigmaImage {...place("354:85", "354:87")} alt="Google" />
        </span>
        <p className="absolute top-[390px] left-[793px] text-xl leading-[26px] font-bold tracking-[-0.4px] text-black">Maya K.</p>
        <p className="absolute top-[416px] left-[793px] text-[15px] leading-[26px] font-medium tracking-[-0.3px] text-black/50">6 days ago</p>
        <p className="absolute top-[467.4px] left-[730px] flex items-center gap-[14px] text-xl leading-[26px] font-bold tracking-[-0.4px] text-black">
          4.5
          <span className="flex" aria-label="4.5 out of 5 stars">
            {[1, 1, 1, 1, 0.5].map((f, i) => (
              <Star key={i} fill={f} className="size-[24.6px]" />
            ))}
          </span>
        </p>
        <PlaceholderLink reason="reviews 'Learn More' has no target" className="absolute top-[537px] left-[736px] flex items-center gap-1 text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] text-black underline underline-offset-4 hover:text-brown">
          Learn More <ArrowRight className="h-[10px] w-[16px]" />
        </PlaceholderLink>
        {/* Only one review is designed; bars mirror the design (first active). */}
        <div className="absolute top-[638px] left-[595.9px] flex gap-[17px]" aria-hidden>
          <span className="mt-[6px] h-1 w-[43px] bg-black" />
          {[0, 1, 2].map((i) => (
            <span key={i} className="mt-[7px] h-0.5 w-[43px] bg-[#9e9e9e]" />
          ))}
        </div>
      </section>

      {/* CTA 90:1249 */}
      <section className="relative mt-[45px] h-[617px] overflow-hidden bg-black" aria-labelledby="cta-title">
        <FigmaImage {...place("130:1505", "90:1249")} sizes="1440px" />
        <div className="absolute top-[186px] left-[249px] flex w-[943px] flex-col items-center gap-[30px] text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] text-cream">Elevate Your Beauty</p>
          <h2 id="cta-title" className="text-[50px] leading-[61px] font-medium tracking-[-3px] text-white">
            Schedule your consultation or book your appointment online today
          </h2>
          <BookingLink className={`${btnWhite} w-[208.3px] text-cocoa`}>Book Appointment</BookingLink>
        </div>
      </section>
      <div className="h-[7px]" />
    </>
  );
}
