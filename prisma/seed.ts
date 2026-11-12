import { PrismaClient } from "@prisma/client/extension";
import { randomUUID } from 'node:crypto'
import { create } from "node:domain";
import { text } from "node:stream/consumers";

const prisma = new PrismaClient()

async function main() {
    const unitId = randomUUID()

    const unit1 = await prisma.msUnit.create({
        data: {
            unit_id: unitId,
            title: "Unit 1: Body Changes & Puberty Basics",
            description: "explores the normal physical, hormonal, and emotional transformations that occur as the body grows from childhood into adulthood at its own unique pace.",
            order_index: 1,
            published: true,
            lessons: {
                create: [
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 1: What is Puberty?',
                        summary: 'Describe what is puberty on female and male',
                        estimated_minutes: 10,
                        order_index: 1,
                        published: true,
                        contentBlock: {
                            create: {
                                block_id: randomUUID(),
                                block_type: 'TEXT',
                                body: {
                                    markdown: `##WHAT IS PUBERTY ?
                
                Puberty is a development phase from childhood to sexual maturity. Generally, female usually starts puberty between the ages of 10 - 14. In the other hand, male usually starts puberty between the ages of 12 - 16.
                
                In puberty phase, adolescent will be changed bodily. This bodily changes due to change of hormon. In puberty phase, male and female will be taller.
                
                In some cases, this puberty phase starts prematurely. This is when female starts puberty before 8 years old, and male before 9 years old.
                
                Sometimes, children get confused about what’s happening in their body. Because of that, puberty education is important.

                **Sign puberty of female**
                - Breast development begins
                - Body hair begins to grow in new areas, including the underarm, legs, and pubic area
                - Menstruation begins
                - Voice matures
                
                **Sign puberty of male**
                - Penis and testicles begin to grow
                - Wet dream
                - Body hair begins to grow in new areas, including the underarm, legs, and pubic area
                - Voice deepens
                
                *Source: Halodoc.com*
                                    `.trim()
                                },
                                order_index: 1
                            }
                        },
                    challenges: {
                        create: [
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What is the primary definition of puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'stage of cognitive development in early childhood'},
                                    {id: 'opt_b', text: 'The developmental phase transitioning from childhood to sexual maturity'},
                                    {id: 'opt_c', text: 'The final stage of physical growth in adulthood'},
                                    {id: 'opt_d', text: 'A temporary condition caused by sleep changes'}
                                ],
                                order_index: 1,
                                explanation: 'Puberty is defined as the physiological process and transitional period during which an individual matures sexually and becomes capable of reproduction.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: ' Which of the following is a specific sign of puberty in females?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Voice deepening significantly'},
                                    {id: 'opt_b', text: 'Growth of testicles'},
                                    {id: 'opt_c', text: 'Onset of menstruation'},
                                    {id: 'opt_d', text: 'Facial hair growth'}
                                ],
                                order_index: 2,
                                explanation: 'Because menarche (the onset of menstruation) is a primary female-specific physiological marker of puberty.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What is the typical age range for males to start puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '8 to 10 years old'},
                                    {id: 'opt_b', text: '10 to 12 years old'},
                                    {id: 'opt_c', text: '12 to 16 years old'},
                                    {id: 'opt_d', text: '14 to 18 years old'}
                                ],
                                order_index: 3,
                                explanation: 'Puberty in males typically begins between the ages of 12 and 16 years old.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Puberty in females is classified as precocious (premature) if it starts before what age?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '8 years old'},
                                    {id: 'opt_b', text: '9 years old'},
                                    {id: 'opt_c', text: '10 years old'},
                                    {id: 'opt_d', text: '11 years old'}
                                ],
                                order_index: 4,
                                explanation: 'Because precocious (early) puberty in females is clinically defined as the development of secondary sexual characteristics before 8 years of age.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_a'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What is the main biological trigger driving bodily changes during puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'stage of cognitive development in early childhood'},
                                    {id: 'opt_b', text: 'The developmental phase transitioning from childhood to sexual maturity'},
                                    {id: 'opt_c', text: 'The final stage of physical growth in adulthood'},
                                    {id: 'opt_d', text: 'A temporary condition caused by sleep changes'}
                                ],
                                order_index: 5,
                                explanation: 'Because the onset of puberty is driven by hormonal surges originating from the hypothalamic-pituitary-gonadal (HPG) axis',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 2: Sign of Male Puberty',
                        summary: 'Describe Sign of Male Puberty',
                        estimated_minutes: 10,
                        order_index: 2,
                        published: true,
                        contentBlock: {
                            create: {
                                block_id: randomUUID(),
                                block_type: 'TEXT',
                                body: {
                                    markdown: `##Sign of Male Puberty
                                
                                **1. Change in testicular volume**
                                According to the Indonesian Pediatric Society (IDAI), the initial sign of puberty in boys is not the growth of a mustache, pubic hair, wet dreams, or an Adam's apple, but an increase in testicular volume. Although the exact timing varies for every individual, a boy who shows no increase in testicular volume by age 14 is considered to have delayed puberty. Conversely, if secondary sex characteristics appear before age 9, it is classified as precocious puberty  
                                **2. Experiencing wet dreams**
                                According to the Indonesian Pediatric Society (IDAI), wet dreams is a sign that process spermatogenesis is activated. Wet dreams is ejaculation that occurs during sleep, when testosterone levels rise significantly.
                                **3. Voice Changes**
                                During puberty, adolescent boys experience voice changes where their pitch deepens often referred to as a "voice break." This transition usually occurs between the ages of 11 and 15, progressing gradually over several months, often without them noticing.
                                **4. Height Increase (Growth Spurt)**
                                Adolescent boys undergo a growth spurt during puberty. Peak growth velocity can reach up to 10 cm per year, with an overall total height gain of 25–30 cm throughout puberty. On average, the total height gain during puberty is greater in males than in females.
                                **5. Appearance of Acne**
                                Acne breakouts are a common sign of pubertal development, though not all adolescent boys experience them. To help manage skin health, parents can encourage teens to wash their face regularly and maintain a balanced diet.
                                **6. Growth of Pubic and Body Hair**
                                Another key marker of pubertal progression is the development of fine hair in the pubic and underarm areas. This somatic change is experienced by both adolescent males and females.
                                **7. Muscle Mass Growth**
                                While puberty in females involves an increase in body fat percentage, puberty in males is characterized by a significant increase in muscle mass. Additionally, the chest broadens, taking on a more mature, adult male structure.
                                
                                *Source: Halodoc.com*`.trim()
                                },
                                order_index: 1
                            }
                        },
                    challenges: {
                        create: [
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'According to the Indonesian Pediatric Society (IDAI), what is the true initial sign of puberty in adolescent males?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Growth of a mustache'},
                                    {id: 'opt_b', text: 'Deepening of the voice'},
                                    {id: 'opt_c', text: 'Increase in testicular volume'},
                                    {id: 'opt_d', text: 'First occurrence of a wet dream'}
                                ],
                                order_index: 1,
                                explanation: 'Because according to the Indonesian Pediatric Society (IDAI), the true initial physical sign of male pubertal onset is an increase in testicular volume (exceeding 3 mL), rather than secondary sexual characteristics such as facial hair or voice changes',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'A male is considered to have delayed puberty if he shows no increase in testicular volume by what age?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '12 years old'},
                                    {id: 'opt_b', text: '13 years old'},
                                    {id: 'opt_c', text: '14 years old'},
                                    {id: 'opt_d', text: '15 years old'}
                                ],
                                order_index: 2,
                                explanation: 'Because delayed puberty in males is clinically defined by IDAI and pediatric endocrinology guidelines as the absence of testicular enlargement (testicular volume < 4 mL) by 14 years of age',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Male pubertal development is classified as precocious (premature) if secondary sexual characteristics appear before what age?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '8 years old'},
                                    {id: 'opt_b', text: '9 years old'},
                                    {id: 'opt_c', text: '10 years old'},
                                    {id: 'opt_d', text: '11 years old'}
                                ],
                                order_index: 3,
                                explanation: 'because precocious (premature) puberty in males is defined as the appearance of secondary sexual characteristics before 9 years of age.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What biological process does the occurrence of wet dreams (nocturnal emissions) directly indicate?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'The initiation of the linear growth spurt'},
                                    {id: 'opt_b', text: 'The onset of active spermatogenesis'},
                                    {id: 'opt_c', text: 'The completion of voice changes'},
                                    {id: 'opt_d', text: 'The end of muscle mass growth'}
                                ],
                                order_index: 4,
                                explanation: 'Because nocturnal emissions (wet dreams) occur as a result of active spermatogenesis, signaling the maturation of testicular function and sperm production.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Within what age range do adolescent males typically experience voice changes ("voice breaks")?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '8 to 10 years old'},
                                    {id: 'opt_b', text: '11 to 15 years old'},
                                    {id: 'opt_c', text: '16 to 18 years old'},
                                    {id: 'opt_d', text: '18 to 20 years old'}
                                ],
                                order_index: 5,
                                explanation: 'Because male adolescents typically experience vocal fold enlargement and voice changes (pitch instability or voice breaks) during mid-puberty, typically between 11 and 15 years of age',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 3: Signs of Female Puberty',
                        summary: 'Describe Sign of Female Puberty',
                        estimated_minutes: 10,
                        order_index: 3,
                        published: true,
                        contentBlock: {
                            create: {
                                block_id: randomUUID(),
                                block_type: 'TEXT',
                                body: {
                                    markdown: `##Signs of Female Puberty
                        
                                    **1. Breast Development Begins**
                                    Breast development is typically the first visible sign of puberty in females, usually starting between the ages of 8 and 13. It begins with small, tender bumps called breast buds behind the nipples, which gradually develop into fuller breast tissue over several years.
                                    **2. Growth of Body Hair**
                                    During puberty, it is a completely normal and healthy process for body hair to grow in new areas. Thicker, darker hair begins to grow in the pubic region, underarms, and on the legs.
                                    **3. Growth Spurt and Height Changes**
                                    Females experience a rapid linear growth spurt during early-to-mid puberty. Height growth peaks shortly before menstruation begins, and linear growth generally stops between the ages of 16 and 17 as bone growth plates fuse.
                                    **4. Weight Gain and Body Composition Changes**
                                    Alongside gaining height, gaining weight is a natural, necessary, and healthy part of pubertal development. Driven by estrogen, the body naturally redistributes fat to the hips, thighs, and chest, transitioning the body toward a mature female shape.
                                    **5. Menstruation**
                                    Menstruation—the arrival of the first period (menarche)—usually begins about 2 to 2.5 years after breast development starts, typically between the ages of 11 and 14.
                                    
                                    What Happens: Each month, an egg is released from an ovary (ovulation), while hormones build up a thick, nutrient-rich lining inside the uterus to prepare for a potential pregnancy. If fertilization does not occur, the body breaks down and sheds this inner lining, which leaves the body through the vagina as a mixture of blood and tissue.
                                    
                                    Duration and Cycle Regularity: A normal period lasts between 3 and 7 days. During the first 1 to 2 years after menarche, periods are frequently irregular in frequency and flow volume because the Hypothalamic-Pituitary-Gonadal (HPG) hormonal system is still reaching full maturation.
                                    
                                    Common Symptoms: It is normal to experience mild lower abdominal cramping (caused by uterine contractions), temporary bloating, breast tenderness, fatigue, or slight mood fluctuations before and during a period.
                                    `.trim()
                                },
                                order_index: 1
                            }
                        },
                    challenges: {
                        create: [
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What is typically the first visible sign of puberty in females, and when does it usually start?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Menstruation, between ages 10 and 12'},
                                    {id: 'opt_b', text: 'Breast development (breast buds), between ages 8 and 13'},
                                    {id: 'opt_c', text: 'Underarm hair growth, between ages 14 and 16'},
                                    {id: 'opt_d', text: 'Peak height growth, between ages 6 and 8'}
                                ],
                                order_index: 1,
                                explanation: 'Because the appearance of breast buds (thelarche) is typically the first visible clinical sign of female puberty, usually beginning between ages 8 and 13.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Why does linear height growth in females generally stop between the ages of 16 and 17?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Estrogen stops being produced by the body'},
                                    {id: 'opt_b', text: 'The muscle mass replaces bone growth'},
                                    {id: 'opt_c', text: 'Bone growth plates fuse completely'},
                                    {id: 'opt_d', text: 'Menstruation accelerates body fatigue'}
                                ],
                                order_index: 2,
                                explanation: 'Because elevated estrogen levels promote the closure and fusion of the epiphyseal growth plates in bones, stopping further linear height growth usually between ages 16 and 17',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'How does the hormone estrogen influence body composition changes during female puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'It reduces total body mass and weight'},
                                    {id: 'opt_b', text: 'It redistributes fat to the hips, thighs, and chest'},
                                    {id: 'opt_c', text: 'It prevents muscle tissue growth entirely'},
                                    {id: 'opt_d', text: 'It converts fat tissue into height velocity'}
                                ],
                                order_index: 3,
                                explanation: 'Because estrogen promotes female-pattern fat distribution, accumulating adipose tissue around the hips, thighs, and breasts during puberty',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'How long after initial breast development does menstruation (menarche) typically begin?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '6 months to 1 year'},
                                    {id: 'opt_b', text: '2 to 2.5 years'},
                                    {id: 'opt_c', text: '4 to 5 years'},
                                    {id: 'opt_d', text: 'Immediately at the same time'}
                                ],
                                order_index: 4,
                                explanation: 'Because menarche (the first menstrual period) typically occurs about 2 to 2.5 years after the initial onset of breast development',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Within what age range does the onset of menstruation (menarche) typically occur?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: '8 to 10 years old'},
                                    {id: 'opt_b', text: '11 to 15 years old'},
                                    {id: 'opt_c', text: '16 to 18 years old'},
                                    {id: 'opt_d', text: '18 to 20 years old'}
                                ],
                                order_index: 5,
                                explanation: 'because the global population average and typical physiological age range for the onset of menarche is between 11 and 14 years old.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 4: Personal Hygiene During Puberty',
                        summary: 'Describe How Always Be Hygiene During Puberty',
                        estimated_minutes: 10,
                        order_index: 4,
                        published: true,
                        contentBlock: {
                            create: {
                                block_id: randomUUID(),
                                block_type: 'TEXT',
                                body: {
                                    markdown: `##Personal Hygiene During Puberty
                                    Good personal hygiene during pre-teen and teenage years is essential for both physical health, such as warding off germs through regular handwashing, and building social confidence through clean clothes and fresh breath. As children enter puberty, parents play a vital role by initiating conversations early, modeling good habits, providing privacy in the bathroom, and accommodating specific sensory or learning needs through structured routines, small steps, and visual schedules.

                                    Puberty triggers hormonal shifts and new sweat glands in the armpits and genital areas that contribute to body odour, increased skin oil, acne, and greasy hair. Managing these body changes requires a consistent routine: washing the body daily with mild soap, using antiperspirants to control sweat, changing underwear and cotton socks daily, and dry-cleaning feet thoroughly to prevent odor. Skin care involves washing the face twice daily with gentle cleansers without picking pimples, while scalp care requires massaging shampoo to clear oil buildup. Additionally, brushing twice a day, flossing, visiting the dentist regularly, trimming nails straight across, and changing towels and pillowcases frequently ensure overall health and keep bacteria at bay.

                                    Navigating specific puberty milestones—such as period care, shaving facial hair, and gently cleaning genital areas—requires gentle guidance and patience. Allowing pre-teens and teenagers to choose their own razors, deodorants, and skin care products helps foster independence and reduces resistance. When addressing issues like body odour or acne, parents should speak privately and matter-of-factly to avoid shaming, while consulting a doctor if severe acne, extreme sweat, skin irritation, or overwhelming sensory resistance occurs.
                                    *Source: racingchildern.net.au*`.trim()
                                },
                                order_index: 1
                            }
                        },
                    challenges: {
                        create: [
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Why is handwashing before eating and after using the toilet particularly important for pre-teens and teenagers?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'It prevents skin from becoming oily during puberty'},
                                    {id: 'opt_b', text: 'It is a proven way to fight off germs and avoid sicknesses like gastro or flu'},
                                    {id: 'opt_c', text: 'It stops sweat glands in the hands from producing body odour'},
                                    {id: 'opt_d', text: 'It helps maintain the natural moisture balance of the palm'}
                                ],
                                order_index: 1,
                                explanation: 'Because handwashing with soap and water removes infectious pathogens, effectively preventing gastrointestinal illnesses and respiratory infections like the flu',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What causes body odour (BO) to develop in armpits and genital areas during puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'The body stops producing natural oil glands'},
                                    {id: 'opt_b', text: 'Dead skin cells dry out and irritate the skin surface'},
                                    {id: 'opt_c', text: 'Skin bacteria feed on sweat produced by a new type of sweat gland'},
                                    {id: 'opt_d', text: 'Synthetic clothing fabrics react chemically with clean skin'}
                                ],
                                order_index: 2,
                                explanation: 'Because during puberty, newly activated apocrine sweat glands produce a lipid-rich sweat that harmless skin bacteria break down, resulting in body odor.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What is the primary difference between a deodorant and an antiperspirant?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Antiperspirants control the amount of sweat, while deodorants only cover up odour'},
                                    {id: 'opt_b', text: 'Deodorants stop sweat production, while antiperspirants clean bacteria from the skin'},
                                    {id: 'opt_c', text: 'Antiperspirants are made for clothes, while deodorants are applied to the skin'},
                                    {id: 'opt_d', text: 'Deodorants require a doctor prescription, while antiperspirants are over-the-counter'}
                                ],
                                order_index: 3,
                                explanation: 'Because antiperspirants contain aluminum-based compounds to block sweat ducts and reduce moisture, whereas deodorants contain antimicrobial agents and fragrances to mask or reduce odor',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_a'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Which habit helps prevent smelly feet and shoes in pre-teens and teenagers?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Wearing synthetic fiber socks every day'},
                                    {id: 'opt_b', text: 'Wearing the exact same pair of shoes every day to break them in'},
                                    {id: 'opt_c', text: 'Drying feet completely before putting on shoes and opting for cotton socks'},
                                    {id: 'opt_d', text: 'Washing feet with hot water only and skipping soap'}
                                ],
                                order_index: 4,
                                explanation: 'Because ensuring feet are thoroughly dry inhibits fungal and bacterial growth, while moisture-wicking natural fibers like cotton help keep feet dry and odor-free',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'How should pre-teens and teenagers manage acne-prone skin on their face?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Scrub the skin vigorously with heavy soap twice a day'},
                                    {id: 'opt_b', text: 'Pop whiteheads immediately to release trapped oil'},
                                    {id: 'opt_c', text: 'Wash twice daily with a mild cleanser and avoid picking or popping pimples'},
                                    {id: 'opt_d', text: 'Avoid using sunscreen altogether so pores can breathe'}
                                ],
                                order_index: 5,
                                explanation: 'Because gentle twice-daily cleansing removes excess sebum and dead skin cells, while refraining from picking or popping pimples prevents secondary inflammation and scarring',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 5: Emotional Changes & Mood Swings',
                        summary: 'Describe emotional changes & mood swings during puberty',
                        estimated_minutes: 10,
                        order_index: 5,
                        published: true,
                        contentBlock: {
                            create: {
                                block_id: randomUUID(),
                                block_type: 'TEXT',
                                body: {
                                    markdown: `##Emotional Changes & Mood Swings
                                    Puberty brings intense emotional changes alongside physical ones, often making your mood shift quickly, randomly, and more strongly than ever before. You might experience complex new feelings like confusion, anger, fear, or heightened sensitivity without fully understanding why. These mood swings happen because your body is adjusting to a surge of new hormones while your brain is growing. During this time, the brain regions that process deep and intense emotions develop faster than the prefrontal cortex—the part responsible for regulating emotions, reasoning, and decision-making. As a result, you might feel like your emotions are out of control simply because your brain hasn't fully built the capacity to manage them yet. Beyond biological shifts, your mood is also shaped by everyday pressures such as lack of sleep, school demands, peer pressure, family conflicts, stress, anxiety, feeling self-conscious about physical changes, or feeling overwhelmed by a busy schedule.
                                    
                                    Understanding that these emotional fluctuations are a natural part of growing up can help you navigate them more easily. To cope with the highs and lows, focus on identifying what triggers your moods, maintaining healthy sleep and eating habits, and building positive routines. Give yourself space to process overwhelming feelings, and when facing difficult situations, try working through problem-solving steps rather than feeling completely stuck. It is also helpful to talk openly with trusted adults, friends, or family members who can listen and offer support. However, it is important to recognize the difference between typical pubertal mood swings and more serious mental health concerns like depression. If you notice that a low mood lasts for more than two weeks continuously, if your feelings and behaviors change severely, or if your emotions significantly disrupt your daily life across home, school, and friendships, these are clear signs to reach out to a parent, counselor, or healthcare professional for extra guidance and support.
                                    *source: www.chconline.org*`.trim()
                                },
                                order_index: 1
                            }
                        },
                    challenges: {
                        create: [
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Why might your emotions feel stronger, more intense, or shift rapidly during puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Your body is stopping all hormone production'},
                                    {id: 'opt_b', text: 'Your brain and body are adjusting to physical, social, and hormonal changes'},
                                    {id: 'opt_c', text: 'You are spending too much time sleeping'},
                                    {id: 'opt_d', text: 'Your prefrontal cortex has already fully matured'}
                                ],
                                order_index: 1,
                                explanation: 'Because the rapid surge of sex hormones during puberty, combined with significant neural remodeling and shifting social dynamics, causes heightened emotional intensity and mood variability.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Which part of the brain is usually the LAST to fully develop during puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'The part responsible for processing basic sight and sound'},
                                    {id: 'opt_b', text: 'The part responsible for strengthening intense, complex emotions'},
                                    {id: 'opt_c', text: 'The part responsible for regulating emotions, deep thinking, reasoning, and decision-making'},
                                    {id: 'opt_d', text: 'The part responsible for automatic reflexes like blinking'}
                                ],
                                order_index: 2,
                                explanation: 'Because the prefrontal cortex—the region responsible for impulse control, executive function, complex reasoning, and emotion regulation—matures last, continuing to develop into early adulthood.',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_c'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Why can emotional changes during puberty sometimes make you feel like your emotions are out of control?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'The emotional centers of the brain develop faster than the area that regulates emotions'},
                                    {id: 'opt_b', text: 'Your brain loses the ability to form new memories'},
                                    {id: 'opt_c', text: 'Hormones permanently damage the decision-making parts of the brain'},
                                    {id: 'opt_d', text: 'You completely stop experiencing positive or happy feelings'}
                                ],
                                order_index: 3,
                                explanation: 'because the limbic system (the brain emotional processing center) matures faster during puberty than the prefrontal cortex, creating a temporary developmental imbalance in emotional regulation',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_a'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'Which of the following non-hormonal factors can also heavily impact your mood during puberty?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Reading books and resting'},
                                    {id: 'opt_b', text: 'Lack of sleep, school demands, peer pressure, and stress'},
                                    {id: 'opt_c', text: 'Drinking water regularly'},
                                    {id: 'opt_d', text: 'Eating balanced meals throughout the day'}
                                ],
                                order_index: 4,
                                explanation: 'Because ensuring feet are thoroughly dry inhibits fungal and bacterial growth, while moisture-wicking natural fibers like cotton help keep feet dry and odor-free',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            },
                            {
                                challenge_id: randomUUID(),
                                challenge_type: 'MULTIPLE_CHOICE',
                                question: 'What is a helpful habit you can build to manage intense emotional highs and lows?',
                                question_media: {},
                                option: [
                                    {id: 'opt_a', text: 'Ignoring all your emotions and pretending they do not exist'},
                                    {id: 'opt_b', text: 'Keeping a consistent healthy sleeping and eating routine'},
                                    {id: 'opt_c', text: 'Isolating yourself completely from all friends and family'},
                                    {id: 'opt_d', text: 'Making impulsive decisions whenever you feel angry'}
                                ],
                                order_index: 5,
                                explanation: 'Because maintaining regular sleep hygiene and balanced nutrition stabilizes circadian rhythms and metabolic health, which helps buffer emotional volatility during puberty',
                                
                                key: {
                                    create:{
                                        answer_key: {
                                            correct_option_id: 'opt_b'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                    },
                ]
            }
        }
    }
    );

    const unit2 = await prisma.msUnit.create({
        data : { 
            unit_id: unitId,
            title: "Unit 2: Personal Boundaries & Healthy Friendships",
            description: "teaches students how to recognize and communicate their physical and emotional limits while building respectful, supportive, and safe relationships with peers.",
            order_index: 2,
            published: true,
            lesson: {
                create: [
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 1: Myth vs Fact',
                        summary: 'Describe what is actually myth, and fact',
                        estimated_minutes: 10,
                        order_index: 1,
                        published: true
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 2: Positive Body Image',
                        summary: 'Describe positive body image',
                        estimated_minutes: 10,
                        order_index: 2,
                        published: true,
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 3: Personal Boundaries & Safe Touches',
                        summary: 'Describe personal boundaries & safe touches',
                        estimated_minutes: 10,
                        order_index: 3,
                        published: true,
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 4: Handling Peer Pressure & Bullying',
                        summary: 'Describe how to handling peer pressure & bullying',
                        estimated_minutes: 10,
                        order_index: 4,
                        published: true,
                    },
                    {
                        lesson_id: randomUUID(),
                        title: 'Lesson 5: Digital Safety & Privacy for Teens',
                        summary: 'Describe digital safety & privacy for teens',
                        estimated_minutes: 10,
                        order_index: 5,
                        published: true,
                    },
                ]
            }
        }
    })

    console.log('Berhasil seed:', unit1, unit2);


}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })