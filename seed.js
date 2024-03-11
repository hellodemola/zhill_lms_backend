import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const naira = await prisma.currencies.upsert({
    where: { id: 1 },
    update: {},
    create: {
        name: 'naira',
        short_code: 'NRN',
        symbol: 'N'
    },
  })

  const dollar = await prisma.currencies.upsert({
    where: { id: 2 },
    update: {},
    create: {
        name: 'dollar',
        short_code: 'USD',
        symbol: '$'
    },
  })


  console.log({ dollar, naira })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
