import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'admin@ayari-dentiste.tn' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin@2024!', 12);
    await prisma.admin.create({
      data: {
        name: 'Dr Mohamed Ben Othman Ayari',
        email: 'admin@ayari-dentiste.tn',
        hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });
    console.log('✅ Admin seeded');
  } else {
    console.log('ℹ️  Admin already exists');
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          patientName: 'Sarra Ben Amor',
          rating: 5,
          review: 'Excellent cabinet, personnel très professionnel et accueillant. Je recommande vivement!',
          service: 'Orthodontie',
          approved: true,
        },
        {
          patientName: 'Mohamed Trabelsi',
          rating: 5,
          review: 'Le Dr Ayari est très compétent et rassurant. Les résultats sont parfaits.',
          service: 'Implantologie',
          approved: true,
        },
        {
          patientName: 'Amira Mansour',
          rating: 5,
          review: 'Traitement orthodontique impeccable. Cabinet moderne avec les dernières technologies.',
          service: 'Orthodontie',
          approved: true,
        },
      ],
    });
    console.log('✅ Testimonials seeded');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.analytics.upsert({
    where: { date: today },
    create: {
      date: today,
      totalVisits: 0,
      uniqueVisitors: 0,
      bookingCount: 0,
      contactMessagesCount: 0,
    },
    update: {},
  });
  console.log('✅ Analytics record ensured');

  console.log('🌱 Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
