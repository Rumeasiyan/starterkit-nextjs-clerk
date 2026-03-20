import 'dotenv/config';
import prisma from '../lib/prisma';

async function testDatabase() {
    console.log('Testing Prisma PostgreSQL connection...\n');

    try {
        const userCount = await prisma.user.count();
        console.log(`Connected to database. Current users: ${userCount}`);

        const email = `starterkit-${Date.now()}@example.com`;
        const newUser = await prisma.user.create({
            data: {
                email,
                name: 'StarterKit Test User',
            },
        });

        console.log(`Created test user: ${newUser.email}`);

        await prisma.user.delete({
            where: { id: newUser.id },
        });

        console.log('Deleted test user');
        console.log('\nDatabase test completed successfully.');
    } catch (error) {
        console.error('Database test failed.');
        console.error(error);
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect();
    }
}

void testDatabase();
