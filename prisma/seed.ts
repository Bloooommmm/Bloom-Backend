import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required to seed the database.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });

function calculateReadTime(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

const lessons = [
  {
    title: "Why Do Mood Swings Happen During Your Period?",
    slug: "why-do-mood-swings-happen-during-your-period",
    content: "Hormone changes can affect serotonin and make emotions feel stronger before and during a period. Rest, gentle movement, and giving yourself room to feel can help.",
  },
  {
    title: "Period Cramps 101: What Is Actually Going On?",
    slug: "period-cramps-101-what-is-actually-going-on",
    content: "Prostaglandins make the uterus contract while it sheds its lining. Heat, warm drinks, hydration, and gentle stretches can help ease the tension.",
  },
  {
    title: "Why You Crave Chocolate and Carbs Before Your Period",
    slug: "why-you-crave-chocolate-and-carbs-before-your-period",
    content: "Energy needs and serotonin changes can make comfort foods more appealing in the luteal phase. Enjoy treats in balance and pair them with nourishing foods.",
  },
  {
    title: "Period Fatigue: Why You Feel So Tired Even After Sleeping",
    slug: "period-fatigue-why-you-feel-so-tired-even-after-sleeping",
    content: "Hormone changes and blood loss can leave you feeling tired. Rest, hydration, and iron-rich foods support your body during this phase.",
  },
];

for (const lesson of lessons) {
  await prisma.msLesson.upsert({
    where: { slug: lesson.slug },
    update: { ...lesson, estimatedReadTime: calculateReadTime(lesson.content), isPublished: true },
    create: { ...lesson, estimatedReadTime: calculateReadTime(lesson.content), isPublished: true },
  });
}

console.log(`Seeded ${lessons.length} lessons.`);
await prisma.$disconnect();
