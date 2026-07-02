// prisma migrate deploy-г retry-тэй ажиллуулна.
// Үнэгүй тарифын Postgres (Neon гэх мэт) идэвхгүй үедээ унтдаг тул
// эхний холболт амжилтгүй болбол хэдэн секунд хүлээгээд дахин оролдоно.
import { execSync } from "node:child_process";

const MAX_ATTEMPTS = 5;
const WAIT_MS = 10_000;

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  try {
    execSync("npx prisma migrate deploy", { stdio: "inherit" });
    process.exit(0);
  } catch {
    if (attempt === MAX_ATTEMPTS) {
      console.error(`prisma migrate deploy ${MAX_ATTEMPTS} удаа амжилтгүй боллоо.`);
      process.exit(1);
    }
    console.warn(
      `migrate deploy амжилтгүй (оролдлого ${attempt}/${MAX_ATTEMPTS}) — ${WAIT_MS / 1000}с хүлээгээд дахин оролдоно...`
    );
    await new Promise((r) => setTimeout(r, WAIT_MS));
  }
}
