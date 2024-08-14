-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "extensions";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- CreateEnum
CREATE TYPE "public"."CrewRole" AS ENUM ('DIRECTOR', 'WRITER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL DEFAULT extensions.uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "realName" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Celebrity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "popularity" DOUBLE PRECISION,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Celebrity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "directorId" INTEGER,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Show" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "movieId" INTEGER,
    "showId" INTEGER,
    "userId" UUID NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CastedRole" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "movieId" INTEGER,
    "showId" INTEGER,
    "celebrityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CastedRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Crew" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "movieId" INTEGER,
    "showId" INTEGER,
    "celebrityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_GenreToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."_GenreToShow" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_showId_key" ON "public"."Rating"("userId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_movieId_key" ON "public"."Rating"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "CastedRole_movieId_celebrityId_role_key" ON "public"."CastedRole"("movieId", "celebrityId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "public"."_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "public"."_GenreToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToShow_AB_unique" ON "public"."_GenreToShow"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToShow_B_index" ON "public"."_GenreToShow"("B");

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_showId_fkey" FOREIGN KEY ("showId") REFERENCES "public"."Show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CastedRole" ADD CONSTRAINT "CastedRole_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CastedRole" ADD CONSTRAINT "CastedRole_showId_fkey" FOREIGN KEY ("showId") REFERENCES "public"."Show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CastedRole" ADD CONSTRAINT "CastedRole_celebrityId_fkey" FOREIGN KEY ("celebrityId") REFERENCES "public"."Celebrity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Crew" ADD CONSTRAINT "Crew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Crew" ADD CONSTRAINT "Crew_showId_fkey" FOREIGN KEY ("showId") REFERENCES "public"."Show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Crew" ADD CONSTRAINT "Crew_celebrityId_fkey" FOREIGN KEY ("celebrityId") REFERENCES "public"."Celebrity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GenreToShow" ADD CONSTRAINT "_GenreToShow_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GenreToShow" ADD CONSTRAINT "_GenreToShow_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
