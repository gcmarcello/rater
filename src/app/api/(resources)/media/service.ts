import { MovieWithGenres } from "@/app/_shared/types/Movies";
import prisma from "../../infrastructure/prisma";
import { parseNumber } from "../../utils/parseFloat";
import { Media, RecommendedMedia } from "@/app/_shared/types/Media";
import { Movie, Show } from "@prisma/client";

export class MediaService {
  async similarMediaToMovie(movieId: string | number): Promise<Media[]> {
    const movie = await prisma.movie.findUnique({
      where: { id: parseNumber(movieId) },
      include: { genres: true },
    });

    if (!movie) {
      throw { status: 404, message: "Movie not found" };
    }

    const similarMovies = (
      await prisma.movie.findMany({
        where: {
          genres: {
            some: {
              id: {
                in: movie.genres.map((genre) => genre.id),
              },
            },
          },
          NOT: { id: parseNumber(movieId) },
        },
        include: { genres: true },
        take: 5,
      })
    ).map((movie) => ({ ...movie, type: "movie" }));

    const similarShows = (
      await prisma.show.findMany({
        where: {
          genres: {
            some: {
              id: {
                in: movie.genres.map((genre) => genre.id),
              },
            },
          },
        },
        include: { genres: true },
        take: 5,
      })
    ).map((show) => ({ ...show, type: "show" }));

    const similarMedia = [...similarMovies, ...similarShows];

    return this.sortMediaByGenreSimilarity(similarMedia, movie);
  }

  async similarMediaToShow(showId: string | number): Promise<Media[]> {
    const movie = await prisma.movie.findUnique({
      where: { id: parseNumber(showId) },
      include: { genres: true },
    });

    if (!movie) {
      throw { status: 404, message: "Show not found" };
    }

    const similarMovies = (
      await prisma.movie.findMany({
        where: {
          genres: {
            some: {
              id: {
                in: movie.genres.map((genre) => genre.id),
              },
            },
          },
          NOT: { id: parseNumber(showId) },
        },
        take: 5,
        include: { genres: true },
        orderBy: { rating: "desc" },
      })
    ).map((movie) => ({ ...movie, type: "movie" }));

    const similarShows = (
      await prisma.show.findMany({
        where: {
          genres: {
            some: {
              id: {
                in: movie.genres.map((genre) => genre.id),
              },
            },
          },
        },
        take: 5,
        include: { genres: true },
        orderBy: { rating: "desc" },
      })
    ).map((show) => ({ ...show, type: "show" }));

    const similarMedia = [...similarMovies, ...similarShows];

    return this.sortMediaByGenreSimilarity(similarMedia, movie);
  }

  sortMediaByGenreSimilarity(media: Media[], targetMedia: Media): Media[] {
    return media.sort((a, b) => {
      const commonGenresA = a.genres.filter((genre) =>
        targetMedia.genres.includes(genre)
      ).length;
      const commonGenresB = b.genres.filter((genre) =>
        targetMedia.genres.includes(genre)
      ).length;
      return commonGenresB - commonGenresA;
    });
  }
}
