import prisma from "@/app/api/infrastructure/prisma";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const mediaUrl = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=pt-BR`;
const creditsUrl = (id: number) =>
  `https://api.themoviedb.org/3/person/${id}?append_to_response=credits&language=pt-BR`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export async function celebritySeed(movieIds: number[]) {
  let parsedStars = new Set();

  for (const id of movieIds) {
    const movie = await fetch(mediaUrl(id), options).then(
      async (res) => await res.json()
    );
    const starringCredits = movie.credits.cast.slice(0, 10);
    const writerCredits = movie.credits.crew.filter(
      (crewMember: any) =>
        crewMember.job === "Writer" || crewMember.job === "Director"
    );
    console.log(
      `Fetching celebrities for movie: ${movie.title}: ${starringCredits.length} actors, ${writerCredits.length} writers`
    );
    starringCredits.forEach((item: any) => parsedStars.add(item.id));
    writerCredits.forEach((item: any) => parsedStars.add(item.id));
  }

  if (!parsedStars) {
    return;
  }

  console.log(
    "-------------------- STARTING CELEBRITY SEED --------------------"
  );

  const parsedStarsArray = Array.from(parsedStars);

  for (const star of parsedStarsArray) {
    const starData = await fetch(creditsUrl(star as number), options).then(
      async (res) => await res.json()
    );

    console.log(`Seeding celebrity: ${starData.name}`);

    const starredMedia = starData.credits.cast.filter((media: any) =>
      movieIds.includes(media.id)
    );
    const writtenMedia = starData.credits.crew.filter((media: any) =>
      movieIds.includes(media.id)
    );
    const directedMedia = starData.credits.crew.filter((media: any) =>
      movieIds.includes(media.id)
    );

    await prisma.celebrity.create({
      data: {
        id: star as number,
        name: starData.name,
        popularity: starData.popularity,
        birthDate: starData.birthday
          ? dayjs(starData.birthday, "YYYY-MM-DD")?.toISOString()
          : null,
        options: {
          image: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${starData.profile_path}`,
          birthPlace: starData.place_of_birth,
          biography: starData.biography,
        },
      },
    });

    await prisma.castedRole.createMany({
      data: starredMedia?.map((media: any) => ({
        role: media.character,
        celebrityId: star,
        movieId: media.id,
      })),
    });

    await prisma.crew.createMany({
      data: writtenMedia?.map((media: any) => ({
        role: media.job,
        celebrityId: star,
        movieId: media.id,
      })),
    });
  }
}
