import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // Seed Users
    const user1 = await prisma.user.create({
      data: {
        email: 'test1@sportify.com',
        name: 'Garry Darry',
        password: 'hashed_password', // Use a hashed password here
        active: true,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'test2@sportify.com',
        name: 'Merry Harry',
        password: 'hashed_password', // Use a hashed password here
        active: true,
      },
    });

    // Seed Locations
    const location1 = await prisma.location.create({
      data: {
        name: 'Bar und Sport',
        adress: 'straße 1',
        latitude: 40.7128,
        longitude: -74.0061,
        addedBy: { connect: { id: user1.id } },
        sportsList: ['Soccer', 'Basketball'], // Add sports for location1
      },
    });

    const location2 = await prisma.location.create({
      data: {
        name: 'Stadium am Neckar',
        adress: 'straße 2',
        latitude: 37.7128,
        longitude: -70.1065,
        addedBy: { connect: { id: user1.id } },
        sportsList: ['Tennis', 'Volleyball'], // Add sports for location2
      },
    });

    // Seed Termin (Events)
    await prisma.termin.create({
      data: {
        sport: 'Soccer Match',
        location: { connect: { id: location1.id } },
        startAt: '2024-02-15T19:00:00Z',
        endAt: '2024-02-15T21:00:00Z',
        createdBy: { connect: { id: user1.id } },
      },
    });

    // Seed UsersOnTermin (Relationships)
    await prisma.usersOnTermine.create({
      data: {
        users: { connect: { id: user1.id } },
        termine: { connect: { id: 1 } }, // Assuming Termin with ID 1 was created
      },
    });

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => console.error(e));
