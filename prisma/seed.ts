import { PrismaClient } from "@prisma/client";
import { movieSeed } from "./seeds/movies.seed";
import { genreSeed } from "./seeds/genres.seed";
import { celebritySeed } from "./seeds/celebrity.seed";
const prisma = new PrismaClient();

async function main() {
  await genreSeed(prisma);
  const movies = await movieSeed(prisma);
  const celebrities = await celebritySeed(movies);
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
