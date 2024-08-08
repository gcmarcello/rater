import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton>;
  namespace PrismaJson {
    type CelebrityOptions = {
      image?: string;
    };
    type MovieOptions = {
      duration?: number;
      ageRating?: number;
      image?: string;
    };
    type ShowOptions = {
      duration?: number;
      ageRating?: number;
      image?: string;
    };
  }
}

const prisma = global.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
