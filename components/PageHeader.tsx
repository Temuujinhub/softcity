import Link from "next/link";

interface Props {
  label: string;
  title: string;
  intro?: string;
  backHref?: string;
  backLabel?: string;
}

/** Дотоод хуудасны Gehl-маягийн том гарчигтай толгой хэсэг. */
export default function PageHeader({ label, title, intro, backHref, backLabel }: Props) {
  return (
    <section className="pt-36 pb-14 sm:pt-44 sm:pb-20 border-b border-[#e7e2d9]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {backHref && (
          <Link
            href={backHref}
            className="inline-block text-xs text-[#8a8479] hover:text-[#141414] transition-colors mb-6"
          >
            ← {backLabel || "Буцах"}
          </Link>
        )}
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#c4734a" }}>
          {label}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 text-lg sm:text-xl text-[#55504a] leading-relaxed max-w-2xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
