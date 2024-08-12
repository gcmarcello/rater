import { Movie, PrismaClient } from "@prisma/client";

const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export async function movieSeed(prisma: PrismaClient) {
  console.log("Fetching movies...");
  const movies = await fetch(url, options).then(
    async (res) => await res.json()
  );
  console.log("Fetching Complete. Seeding movies...");
  const parsedMovies = movies.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: new Date(movie.release_date),
    rating: movie.vote_average,
    options: {
      description: movie.overview,
      ageRating: movie.adult ? 18 : 12,
      duration: movie.runtime ?? Math.floor(Math.random() * 130 + 60),
      image: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`,
      poster: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`,
    },
    genres: {
      connect: movie.genre_ids.map((id: number) => ({ id })),
    },
  }));

  for (const movie of parsedMovies) {
    await prisma.movie.create({
      data: movie,
    });
  }
  console.log("Seeding movies complete!");
  return movies.results.map((movie: any) => movie.id);
}
