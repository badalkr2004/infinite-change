import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.mindfulnessService.deleteMany({});
  await prisma.counsellingService.deleteMany({});
  await prisma.beyondWordsService.deleteMany({});

  console.log('Cleared existing services data');

  // Seed Mindfulness Services
  const mindfulnessServices = [
    {
      title: "Adult Mindfulness Programs",
      description:
        "Comprehensive mindfulness training for professionals seeking to reduce stress and improve focus.",
      duration: "8-week program",
      level: "All levels",
      features: [
        "Meditation techniques",
        "Stress reduction",
        "Focus improvement",
        "Emotional regulation",
        "Work-life balance",
      ],
    },
    {
      title: "Children's Mindfulness",
      description:
        "Age-appropriate mindfulness practices to help children develop emotional intelligence and coping skills.",
      duration: "6-week program",
      level: "Ages 6-16",
      features: [
        "Age-appropriate techniques",
        "Emotional awareness",
        "Self-regulation",
        "Confidence building",
        "Social skills",
      ],
    },
  ];

  // Seed Counselling Services
  const counsellingServices = [
    {
      title: "Beginner's MBSR Program",
      description:
        "Introduction to Mindfulness-Based Stress Reduction for those new to mindfulness practices.",
      duration: "4-week program",
      level: "Beginner",
      features: [
        "Basic meditation",
        "Breathing techniques",
        "Body awareness",
        "Stress management",
        "Foundation building",
      ],
      calendlyLink:
        "https://calendly.com/infinitecoachingspace/mindfulness-mbsr-for-beginners?month=2025-08&date=2025-08-22",
    },
    {
      title: "Intermediate MBSR Program",
      description:
        "Advanced mindfulness techniques for those with some experience in meditation and stress reduction.",
      duration: "6-week program",
      level: "Intermediate",
      features: [
        "Advanced techniques",
        "Deeper practices",
        "Mindful movement",
        "Cognitive awareness",
        "Integration skills",
      ],
    },
    {
      title: "Advanced MBSR Program",
      description:
        "Comprehensive program for experienced practitioners seeking to deepen their mindfulness journey.",
      duration: "8-week program",
      level: "Advanced",
      features: [
        "Expert guidance",
        "Complex practices",
        "Leadership skills",
        "Teaching preparation",
        "Personal mastery",
      ],
    },
  ];

  // Seed Beyond Words Services
  const beyondWordsServices = [
    {
      title: "Transformational Coaching",
      description:
        "Deep, holistic coaching that addresses all aspects of personal and professional transformation.",
      features: [
        "Life purpose discovery",
        "Values alignment",
        "Goal achievement",
        "Mindset shifts",
        "Sustainable change",
      ],
    },
    {
      title: "Unlock Your Potential",
      description:
        "Intensive program designed to help you discover and unleash your hidden talents and capabilities.",
      features: [
        "Strength assessment",
        "Talent development",
        "Confidence building",
        "Skill enhancement",
        "Performance optimization",
      ],
    },
    {
      title: "A Journey of Discovery",
      description:
        "Guided exploration of self-awareness, personal growth, and life direction.",
      features: [
        "Self-exploration",
        "Personal insights",
        "Growth planning",
        "Direction finding",
        "Purpose clarification",
      ],
    },
  ];

  // Insert Mindfulness Services
  for (const service of mindfulnessServices) {
    await prisma.mindfulnessService.create({
      data: service,
    });
  }
  console.log(`Added ${mindfulnessServices.length} mindfulness services`);

  // Insert Counselling Services
  for (const service of counsellingServices) {
    await prisma.counsellingService.create({
      data: service,
    });
  }
  console.log(`Added ${counsellingServices.length} counselling services`);

  // Insert Beyond Words Services
  for (const service of beyondWordsServices) {
    await prisma.beyondWordsService.create({
      data: service,
    });
  }
  console.log(`Added ${beyondWordsServices.length} beyond words services`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
