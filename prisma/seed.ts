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
    content: "Hormone changes can affect serotonin and make emotions feel stronger before and during a period. This can look like feeling happy, sensitive, tired, or easily annoyed. These feelings are common and do not mean anything is wrong with you. Rest, gentle movement, sleep, and giving yourself room to feel can help. Try writing one sentence about your mood, talking to a trusted adult, or taking a quiet break when emotions feel big.",
  },
  {
    title: "Period Cramps 101: What Is Actually Going On?",
    slug: "period-cramps-101-what-is-actually-going-on",
    content: "Period cramps happen because the uterus gently contracts to release its lining. Natural chemicals called prostaglandins help this process, and they can make cramps feel stronger. A warm compress, warm drink, water, gentle stretching, and rest may help. Tell a trusted adult if pain stops you from doing normal activities, gets worse, or does not improve.",
  },
  {
    title: "Why You Crave Chocolate and Carbs Before Your Period",
    slug: "why-you-crave-chocolate-and-carbs-before-your-period",
    content: "Cravings can change before a period because hormone shifts, energy needs, sleep, and emotions all affect appetite. Chocolate and carbohydrates are okay to enjoy. Try pairing comfort foods with meals that include protein, fruit, vegetables, and water so your body gets steady energy. There is no need to feel guilty about food.",
  },
  {
    title: "Period Fatigue: Why You Feel So Tired Even After Sleeping",
    slug: "period-fatigue-why-you-feel-so-tired-even-after-sleeping",
    content: "Feeling tired before or during a period is common. Hormone changes, sleep changes, cramps, and blood loss can all affect energy. Keep a simple routine: sleep enough, drink water, eat regular meals, choose iron-rich foods, and take gentle movement breaks. If tiredness is severe, lasts most days, or comes with dizziness, tell a trusted adult and healthcare professional.",
  },
  {
    title: "Your First Period: What Should You Prepare?",
    slug: "your-first-period-what-should-you-prepare",
    content: "Your first period can arrive earlier or later than expected, and that is normal. Keep a small pouch with pads, spare underwear, tissues, and a zip bag in your school bag. Learn how to use a pad, change it every few hours or when it feels full, and wrap used products before throwing them away. Ask a trusted adult or school nurse for help whenever you need it.",
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

