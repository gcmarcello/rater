import { PrismaClient } from "@prisma/client";

const url = "https://api.themoviedb.org/3/genre/movie/list?language=pt";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export async function genreSeed(prisma: PrismaClient) {
  console.log("Fetching genres...");
  const genres = await fetch(url, options).then(
    async (res) => await res.json()
  );
  console.log("Fetching Complete. Seeding genres...");
  await prisma.genre.createMany({
    data: genres.genres,
  });
  console.log("Seeding genres complete!");
}
