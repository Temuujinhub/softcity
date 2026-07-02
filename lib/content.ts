import { prisma } from "./prisma";
import { CONTENT_DEFAULTS, type ContentKey } from "./content-defaults";

export { CONTENT_DEFAULTS, parseSlides, type ContentKey } from "./content-defaults";

/** Бүх контентын түлхүүрүүдийг DB-ийн утгаар давхарлаж буцаана. */
export async function getContent(): Promise<Record<ContentKey, string>> {
  const result = { ...CONTENT_DEFAULTS } as Record<ContentKey, string>;
  try {
    const rows = await prisma.siteSettings.findMany({
      where: { key: { in: Object.keys(CONTENT_DEFAULTS) } },
    });
    for (const row of rows) {
      if (row.key in result && row.value.trim() !== "") {
        result[row.key as ContentKey] = row.value;
      }
    }
  } catch {
    // DB unavailable → defaults
  }
  return result;
}
