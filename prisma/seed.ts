import { PrismaClient } from "@prisma/client";
import { movieSeed } from "./seeds/movies.seed";
import { genreSeed } from "./seeds/genres.seed";
const prisma = new PrismaClient();

async function main() {
  await genreSeed(prisma);
  await movieSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
