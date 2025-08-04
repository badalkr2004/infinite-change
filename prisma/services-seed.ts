import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.mindfulnessService.deleteMany({});
  await prisma.counsellingService.deleteMany({});
  await prisma.beyondWordsService.deleteMany({});
  await prisma.corporateService.deleteMany({});

  console.log("Cleared existing services data");

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
      serviceLink:
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

  const corporateServicesData = [
    {
      icon: "Users",
      category: "Coaching",
      title: "Executive Coaching",
      description:
        "One-on-one leadership development for senior executives and high-potential leaders.",
      features: [
        "Personalized development plans",
        "360-degree feedback",
        "Leadership assessment",
        "Strategic thinking enhancement",
      ],
      serviceLink:
        "https://calendly.com/infinitecoachingspace/chemistry-discovery-session?back=1&month=2025-07",
    },
    {
      icon: "Target",
      category: "Coaching",
      title: "Career Coaching",
      description:
        "Professional development support for career transitions and advancement.",
      features: [
        "Career pathway planning",
        "Skills assessment",
        "Interview preparation",
        "Personal branding",
      ],
    },
    {
      icon: "Users",
      category: "Coaching",
      title: "Team Coaching",
      description:
        "Collaborative coaching to enhance team dynamics and collective performance.",
      features: [
        "Team assessment",
        "Communication improvement",
        "Conflict resolution",
        "Collaboration enhancement",
      ],
    },
    {
      icon: "Building",
      category: "DEI",
      title: "Inclusive Leadership Training",
      description:
        "Develop leaders who can create and sustain inclusive work environments.",
      features: [
        "Unconscious bias awareness",
        "Cultural competency",
        "Inclusive decision-making",
        "Equity strategies",
      ],
    },
    {
      icon: "Shield",
      category: "DEI",
      title: "Unconscious Bias Workshop",
      description:
        "Interactive sessions to recognize and address unconscious biases in the workplace.",
      features: [
        "Bias identification",
        "Impact assessment",
        "Mitigation strategies",
        "Action planning",
      ],
    },
    {
      icon: "Target",
      category: "DEI",
      title: "Psychological Safety & Allyship Training",
      description:
        "Create environments where all team members feel safe to contribute authentically.",
      features: [
        "Safety assessment",
        "Allyship skills",
        "Inclusive communication",
        "Trust building",
      ],
    },
    {
      icon: "Brain",
      category: "Workplace Mindfulness",
      title: "Mindfulness Programs",
      description:
        "Comprehensive mindfulness training to reduce stress and improve focus.",
      features: [
        "Meditation techniques",
        "Stress reduction",
        "Focus improvement",
        "Emotional regulation",
      ],
    },
    {
      icon: "Users",
      category: "Team Building",
      title: "Team Building Workshops",
      description:
        "Engaging activities designed to strengthen team bonds and collaboration.",
      features: [
        "Trust exercises",
        "Communication games",
        "Problem-solving challenges",
        "Relationship building",
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

  // Insert Corporate Services
  for (const service of corporateServicesData) {
    await prisma.corporateService.create({
      data: service,
    });
  }
  console.log(`Added ${corporateServicesData.length} corporate services`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
