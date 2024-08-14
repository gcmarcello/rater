import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton>;
  namespace PrismaJson {
    type CelebrityOptions = {
      image?: string;
      birthPlace?: string;
      biography?: string;
    };
    type MovieOptions = {
      description?: string;
      duration?: number;
      ageRating?: number;
      image?: string;
      poster?: string;
      trailer?: string;
    };
    type ShowOptions = {
      description?: string;
      seasonCount?: number;
      duration?: number;
      ageRating?: number;
      image?: string;
      poster?: string;
    };
  }
}

const prisma = global.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
