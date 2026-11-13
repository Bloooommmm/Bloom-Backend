import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function calculateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const lessonsData = [
  {
    title: 'Why Do Mood Swings Happen During Your Period?',
    slug: 'why-do-mood-swings-happen-during-your-period',
    content: `Ever felt like crying over a cute puppy video and then getting annoyed five minutes later for no reason? You are definitely not alone, and you are not "overreacting."
    
Right before and during the start of your period, your estrogen and progesterone levels drop sharply. These hormones directly interact with serotonin—the chemical in your brain responsible for keeping your mood stable, calm, and happy. When serotonin dips, your emotional sensitivity goes up.

What helps? Give yourself permission to feel your emotions without judgment, get enough sleep, and try light movement like stretching or a short walk to give your brain a natural endorphin boost.`,
    isPublished: true,
  },
  {
    title: 'Period Cramps 101: What Is Actually Going On?',
    slug: 'period-cramps-101-what-is-actually-going-on',
    content: `Period cramps (medically called dysmenorrhea) happen because your uterus is doing a workout. Every month, your uterus builds up a soft lining, and when it isn't needed, your body sheds it.

To help push that lining out, your body releases natural chemicals called prostaglandins. These chemicals tell your uterine muscles to contract. Higher levels of prostaglandins mean stronger contractions—which is why some days feel like mild tightness while others feel like deep aches.

A heating pad on your lower belly, warm herbal tea, and gentle stretches can help relax those muscles and ease the tension.`,
    isPublished: true,
  },
  {
    title: 'Why You Crave Chocolate and Carbs Before Your Period',
    slug: 'why-you-crave-chocolate-and-carbs-before-your-period',
    content: `If all you want right now is chocolate, fries, or warm noodles, there is actual science behind it. During the luteal phase (the week or so before your period), your body burns slightly more energy than usual, making you hungrier.

At the same time, lower serotonin levels make your brain crave quick sources of comfort and energy—like sugar and carbohydrates—because carbs help your brain produce a quick burst of serotonin.

You don't have to deny your cravings! Enjoy your favorite treats in balance, and try pairing them with foods rich in magnesium (like dark chocolate, bananas, or nuts) which also help ease cramps.`,
    isPublished: true,
  },
  {
    title: 'Period Fatigue: Why You Feel So Tired Even After Sleeping',
    slug: 'period-fatigue-why-you-feel-so-tired-even-after-sleeping',
    content: `Feeling completely drained during the first few days of your period is super common. Your body is using extra energy to shed its uterine lining, while hormone levels are at their lowest point in your cycle.

Plus, losing blood—especially if your flow is on the heavier side—can temporarily lower your iron levels, leaving you feeling sluggish or foggy.

Listen to your body: take short naps if you need them, stay hydrated, and include iron-rich foods like spinach, eggs, beans, or lean meat in your meals.`,
    isPublished: true,
  },
];

async function main() {
  console.log('Start seeding the lesson...');

  for (const item of lessonsData) {
    const estimatedReadTime = calculateReadTime(item.content);

    const lesson = await prisma.msLesson.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        content: item.content,
        estimatedReadTime,
        isPublished: item.isPublished,
      },
      create: {
        title: item.title,
        slug: item.slug,
        content: item.content,
        estimatedReadTime,
        isPublished: item.isPublished,
      },
    });

    console.log(`Seeded: ${lesson.title} (${lesson.estimatedReadTime} min read)`);
  }

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error('An error occured: ', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });