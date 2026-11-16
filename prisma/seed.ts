import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required to seed the database.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });
const calculateReadTime = (text: string) => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
const lessons = [
  { title: "Why Do Mood Swings Happen During Your Period?", slug: "why-do-mood-swings-happen-during-your-period", content: `## What is happening?
Before and during a period, hormone levels change as part of the normal cycle. Those changes can influence sleep, appetite, stress, and the brain chemicals connected with mood. You might feel cheerful in the morning and sensitive later, or become annoyed more quickly than usual. Feelings are real even when the cause is temporary. A mood change does not mean you are being dramatic or doing anything wrong.

Two people can have very different experiences, and some people barely notice mood changes. School stress, friendship problems, hunger, or poor sleep can also affect feelings. Avoid blaming every emotion on a period: something upsetting still deserves attention. Learning to name a feeling helps you decide what you need right now, whether that is company, space, a snack, or rest.

## Notice your pattern
Try checking in once a day: name the feeling, give it a number from one to five, and write what was happening around you. A short note such as “tired after school” can reveal a pattern over several cycles. Mood tracking is information, not a test. You do not have to share private notes unless you want help.

For example, record the date, “irritable, three out of five,” and “slept late before a test.” After a few weeks, look for changes alongside your period dates. Do they happen only before bleeding, or throughout the month? There is no need to force a pattern. Irregular early cycles can make patterns harder to see, and that is useful information too.

## Small things that can help
Regular meals, water, a steady bedtime, and a few minutes of gentle movement support your body. A quiet activity, slow breathing, music, or time with a trusted friend can also lower stress. Give yourself permission to pause before replying when emotions feel big. You can still enjoy normal activities while taking extra care of yourself.

Try a short reset: put both feet on the floor, relax your shoulders, and breathe gently in and out a few times. You do not need to hold your breath. Then choose one manageable action, such as drinking water or stepping away from a noisy room. If you snapped at someone, you can apologize while still explaining that you need a break.

## When to ask for support
Tell a parent, caregiver, school counselor, or healthcare professional if sadness, worry, anger, or hopelessness feels overwhelming, lasts beyond your period, or makes school and friendships difficult. Asking for support is a healthy choice. If you ever feel unsafe or think about hurting yourself, tell a trusted adult immediately.

You can begin a conversation with “I have noticed my feelings are harder to manage lately. Can you listen?” Bring your notes if you feel comfortable, but you do not need a diary to deserve help. A professional can help separate cycle-related symptoms from other concerns and suggest support that fits your age and situation.` },
  { title: "Period Cramps 101: What Is Actually Going On?", slug: "period-cramps-101-what-is-actually-going-on", content: `## Why cramps happen
The uterus is a muscle. During a period it gently tightens to help release its lining, and natural chemicals called prostaglandins help coordinate that movement. The tightening can feel like an ache, pressure, or waves of cramps in the lower belly. Some people also notice backache, loose stools, nausea, or tiredness.

Cramps often begin around the start of bleeding, but their timing and strength vary. You may feel them in your lower back or upper legs as well as your belly. Being familiar with your usual pattern helps you notice a change. Severe pain is not something you must accept just because periods are common; getting help is always allowed.

## Comfort measures
Warmth can relax tense muscles, so try a warm shower or a hot-water bottle wrapped in fabric. Drink water, eat regular food, rest when you need to, and try gentle stretches or a short walk if movement feels comfortable. Slow breathing and a supported position can make each wave easier to handle. Never put very hot objects directly on skin.

Choose one comfort measure at a time so you can tell what helps. Keep a heat pack warm rather than hot, check your skin, and follow its instructions. If stretching hurts, stop and try resting instead. You do not have to do sports when you feel unwell, but menstruation itself does not make safe movement forbidden.

## Make a simple plan
Keep a small comfort kit with a pad, spare underwear, water, and anything your caregiver has approved for pain. Mark the first day and the strength of cramps in Bloom. This helps you notice what works and gives a doctor clearer information if you need a check-up.

Write down when the pain started, where you felt it, and whether you could concentrate, walk, or sleep. At school, a simple sentence such as “My cramps are making class difficult; can I see the nurse?” is enough. If you want pain medicine, ask a caregiver or clinician which product and dose are appropriate. Do not take a friend's medicine or guess a dose.

## When pain needs help
Ask a trusted adult for help if pain stops you from normal activities, causes fainting or repeated vomiting, is suddenly much worse, or does not improve with your usual care. A healthcare professional can check the cause and explain safe treatment. You never need to quietly endure severe pain.

Sudden severe belly pain, fever, or feeling faint deserves prompt medical attention, especially if it is different from your usual cramps. Bring your symptom notes to an appointment if possible. The goal is to help you feel comfortable enough to learn, sleep, and enjoy your day, not to prove that you can tolerate pain.` },
  { title: "Why You Crave Chocolate and Carbs Before Your Period", slug: "why-you-crave-chocolate-and-carbs-before-your-period", content: `## Why cravings change
Appetite can shift before a period because hormone changes interact with energy needs, sleep, stress, and emotions. Your body may ask for quick energy, which can make bread, rice, noodles, or chocolate sound especially good. Cravings are common and do not mean you lack willpower.

Sometimes a craving is simply a preference; sometimes it appears when lunch was small or sleep was short. Hunger and enjoyment can exist together. There is no special food that everyone must eat or avoid during menstruation. Your family's usual foods can provide what you need, and you do not need expensive drinks or supplements marketed for periods.

## Build satisfying meals
Try combining a comfort food with something that keeps energy steady: rice with egg and vegetables, toast with peanut butter and fruit, or yogurt with oats. Include protein, carbohydrates, colorful produce, and water across the day. You do not need a perfect plate at every meal; a flexible pattern is enough.

Carbohydrates help fuel your brain and muscles. Protein supports growth, while fats, vitamins, and minerals also have useful jobs. Instead of removing a whole food group, think about what you could add. If you want noodles, adding tofu or egg and a vegetable can make the meal more filling. Choose foods that fit your allergies, culture, and available ingredients.

## Enjoy food without guilt
Chocolate and snacks can fit into a balanced routine. Eat slowly, notice whether you are hungry or seeking comfort, and stop when you feel satisfied. Avoid strict diets or skipping meals to “make up” for a craving. Growing bodies need dependable fuel, especially during school and activities.

Check in kindly with yourself before and after eating. Are you comfortably full, still hungry, or thirsty? Those signals can change across a day. If you ate more than expected, your next step can simply be your next regular meal. You do not need to earn food through exercise. Talk with a trusted adult if rules about food start taking over your thoughts.

## Make school days easier
Pack a snack you actually enjoy, refill your water bottle, and tell a trusted adult if you often feel shaky, dizzy, or unable to concentrate. Persistent appetite changes, weight changes, or distress around food deserve kind support from a caregiver and healthcare professional.

A banana with yogurt, crackers with cheese, or a small sandwich can be practical options when available. If mornings are rushed, prepare part of your snack the night before. Ask a caregiver or school staff member for help if access to meals is difficult. Feeling nourished and supported matters more than following a perfect menu.` },
  { title: "Period Fatigue: Why You Feel So Tired Even After Sleeping", slug: "period-fatigue-why-you-feel-so-tired-even-after-sleeping", content: `## Why energy can dip
Feeling tired before or during a period is common. Hormone changes, cramps, disrupted sleep, emotional stress, and blood loss can all use extra energy. One tired day does not tell you that anything is wrong. Notice whether tiredness follows a predictable part of your cycle and whether rest helps.

Notice how tiredness affects your day: is it hard to wake up, stay focused, or walk between classes? Compare it with your usual energy rather than with a friend. A late night or busy school week may contribute as much as your cycle. Tracking these details helps you explain the problem without having to guess the cause yourself.

## Reset the basics
Aim for a regular bedtime and a wind-down without bright screens. Drink water, eat breakfast and other regular meals, and choose iron-containing foods such as eggs, beans, tofu, leafy greens, meat, or fortified cereals. Vitamin-C foods like oranges can help the body absorb plant iron. Gentle walking and stretching are enough when energy is low.

Most children aged six to twelve need nine to twelve hours of sleep, while teenagers aged thirteen to eighteen generally need eight to ten hours. Give yourself enough time in bed and a fairly consistent wake-up time. A dark, quiet room and putting devices away before bed can help. Energy drinks are not a substitute for sleep, food, or medical advice.

## Plan around your energy
Break homework into small steps, take short movement breaks, and keep period supplies in your bag. Tell a teacher or caregiver when you need a quieter pace. Tracking sleep, bleeding, food, and energy in Bloom can show which habits make school days easier.

Try sorting tasks into what must happen today and what can wait. A short rest between homework tasks can be more useful than pushing until you feel exhausted. Keep enjoyable activities if they feel comfortable, but adjust their length or intensity. You do not need to cancel everything because of a period, and you do not need to ignore your body's need for rest.

## When to get checked
Ask a trusted adult to arrange medical advice if tiredness is severe, lasts most days, comes with dizziness or shortness of breath, or your bleeding is very heavy or prolonged. A clinician can check for anemia and other causes. Do not start iron supplements without an adult and professional guidance.

Anemia means the blood is not carrying oxygen as well as it should; heavy bleeding can be one possible reason. Feeling tired alone does not diagnose it. A healthcare professional may ask about your periods, meals, and sleep and decide whether tests are needed. If you faint or have trouble breathing, get an adult's help straight away.` },
  { title: "Your First Period: What Should You Prepare?", slug: "your-first-period-what-should-you-prepare", content: `## It can be different for everyone
The first period can arrive earlier or later than friends expect. It may begin as a few brown or red spots and last a few days. The first cycles can be irregular while the body finds its rhythm. You do not need to predict the exact date to be prepared.

Menstrual blood comes from the uterus and leaves the body through the vagina. It is different from urine. A little brown blood often means blood has taken longer to leave the body, and it can happen at the start or end of a period. Your experience does not need to match a friend's, and having a period does not change who you are.

## Pack a small kit
Put two or three pads, spare underwear, tissues, and a small zip bag in a pouch. A dark cardigan or extra shorts can help you feel comfortable at school. Show the pouch to a trusted adult so they know what you keep with you. Bloom can remind you to restock supplies.

Before you need the kit, find out where the school toilets and nurse's office are. Choose an adult you could ask for help. If your period starts unexpectedly, you can say “I need a pad and a change of clothes.” A leak is inconvenient, not shameful. Ask for privacy and clean clothes; you have not done anything wrong.

## Use and change a pad
Peel off the backing, place the pad in the center of your underwear, and press the wings underneath if it has them. Change it every few hours or sooner when it feels wet or full. Wrap a used pad in its wrapper or tissue and place it in a bin; do not flush it. Wash your hands before and after.

Pads come in different lengths and absorbencies. Start with something comfortable and change it whenever needed rather than waiting for a leak. Wash the outside genital area gently with water; scented sprays and cleaning inside the vagina are unnecessary and may irritate. You can shower, wash your hair, and do usual activities during a period. Choose what feels comfortable for you.

## Ask questions with confidence
You can ask a parent, caregiver, school nurse, teacher, or healthcare professional for help. Tell an adult if bleeding soaks a pad every hour for several hours, pain is severe, you feel faint, or you are worried. Your period is a normal body process, and support should always feel respectful.

Mark the first day of bleeding in Bloom, then record when it ends. Predictions are estimates, especially while early cycles are irregular; they cannot promise an exact date. If you go about three months without a period after periods have started, or bleeding lasts more than a week, talk with a trusted adult and clinician. You can ask questions even when nothing feels wrong.` },
];
for (const lesson of lessons) await prisma.msLesson.upsert({ where: { slug: lesson.slug }, update: { ...lesson, estimatedReadTime: calculateReadTime(lesson.content), isPublished: true }, create: { ...lesson, estimatedReadTime: calculateReadTime(lesson.content), isPublished: true } });
console.log(`Seeded ${lessons.length} lessons.`);
await prisma.$disconnect();
