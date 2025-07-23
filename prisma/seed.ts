import { PrismaClient } from '@prisma/client';
import { Users, Building, Brain, Shield, Target } from 'lucide-react';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.corporateService.deleteMany();
  
  // Corporate Services data
  const corporateServicesData = [
    {
      icon: 'Users',
      category: 'Coaching',
      title: 'Executive Coaching',
      description:
        'One-on-one leadership development for senior executives and high-potential leaders.',
      features: [
        'Personalized development plans',
        '360-degree feedback',
        'Leadership assessment',
        'Strategic thinking enhancement',
      ],
      calendlyLink:
        'https://calendly.com/infinitecoachingspace/chemistry-discovery-session?back=1&month=2025-07',
    },
    {
      icon: 'Target',
      category: 'Coaching',
      title: 'Career Coaching',
      description:
        'Professional development support for career transitions and advancement.',
      features: [
        'Career pathway planning',
        'Skills assessment',
        'Interview preparation',
        'Personal branding',
      ],
    },
    {
      icon: 'Users',
      category: 'Coaching',
      title: 'Team Coaching',
      description:
        'Collaborative coaching to enhance team dynamics and collective performance.',
      features: [
        'Team assessment',
        'Communication improvement',
        'Conflict resolution',
        'Collaboration enhancement',
      ],
    },
    {
      icon: 'Building',
      category: 'DEI',
      title: 'Inclusive Leadership Training',
      description:
        'Develop leaders who can create and sustain inclusive work environments.',
      features: [
        'Unconscious bias awareness',
        'Cultural competency',
        'Inclusive decision-making',
        'Equity strategies',
      ],
    },
    {
      icon: 'Shield',
      category: 'DEI',
      title: 'Unconscious Bias Workshop',
      description:
        'Interactive sessions to recognize and address unconscious biases in the workplace.',
      features: [
        'Bias identification',
        'Impact assessment',
        'Mitigation strategies',
        'Action planning',
      ],
    },
    {
      icon: 'Target',
      category: 'DEI',
      title: 'Psychological Safety & Allyship Training',
      description:
        'Create environments where all team members feel safe to contribute authentically.',
      features: [
        'Safety assessment',
        'Allyship skills',
        'Inclusive communication',
        'Trust building',
      ],
    },
    {
      icon: 'Brain',
      category: 'Workplace Mindfulness',
      title: 'Mindfulness Programs',
      description:
        'Comprehensive mindfulness training to reduce stress and improve focus.',
      features: [
        'Meditation techniques',
        'Stress reduction',
        'Focus improvement',
        'Emotional regulation',
      ],
    },
    {
      icon: 'Users',
      category: 'Team Building',
      title: 'Team Building Workshops',
      description:
        'Engaging activities designed to strengthen team bonds and collaboration.',
      features: [
        'Trust exercises',
        'Communication games',
        'Problem-solving challenges',
        'Relationship building',
      ],
    },
  ];

  // Insert corporate services
  for (const service of corporateServicesData) {
    await prisma.corporateService.create({
      data: service,
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
