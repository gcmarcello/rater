import prisma from "@/_shared/infrastructure/prisma";

export class ShowService {
  async updateShowRating(id: number) {
    const show = await prisma.show.findUnique({
      where: { id },
      include: { Rating: true },
    });
    if (!show) {
      throw new Error("show not found");
    }
    const newRatingAverage =
      show.Rating.reduce((acc, rating) => acc + rating.rating, 0) /
      show.Rating.length;

    return await prisma.show.update({
      where: { id },
      data: { rating: newRatingAverage },
    });
  }
}
