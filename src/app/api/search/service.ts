import prisma from "@/_shared/infrastructure/prisma";
import { SearchDto } from "./dto";
import { Prisma } from "@prisma/client";
import { MovieWithCelebrities } from "@/_shared/types/Movies";
import { ParsedRequest } from "@/_shared/types/Request";
import { NextRequest } from "next/server";

export class SearchService {
  fullTextSearch({
    table,
    tableAlias,
    searchField,
    where,
    select,
    joins,
    orderBy,
  }: {
    table: string[];
    searchField: string[];
    tableAlias?: string;
    where?: string[] | null;
    select?: string[][] | null;
    joins?: string[] | null;
    orderBy?: string[] | null;
  }) {
    const tableSql = table.map((tableName) => `"${tableName}"`).join(".");

    const searchFieldSql = searchField.map((field) => `"${field}"`).join(".");

    let whereSql =
      `to_tsvector('english', extensions.unaccent(${searchFieldSql})) 
        @@ to_tsquery('english', extensions.unaccent($1))` +
      (where ? " AND " : "");

    if (where && where.length > 0) {
      const extraWhereConditions = where
        .map((condition) => `${condition}`)
        .join(" AND ");
      whereSql += extraWhereConditions;
    }

    const sqlJoins = joins ? joins.join("\n      ") : "";

    const sqlOrderBy = orderBy
      ? orderBy.map((field) => `"${field}"`).join(".")
      : "id";

    const sqlSelect = select
      ? select
          .flatMap((i) => i.map((field) => `"${field}"`).join("."))
          .join(", ")
      : "*";

    const query = `
            SELECT ${sqlSelect}
            FROM ${tableSql} ${tableAlias}
            ${sqlJoins}
            WHERE ${whereSql}
            ORDER BY ${sqlOrderBy} DESC
            LIMIT $2;
          `;

    return query;
  }

  async searchByTitle(request: NextRequest): Promise<MovieWithCelebrities[]> {
    const search = request.nextUrl.searchParams.get("search");
    const genre = request.nextUrl.searchParams.getAll("genre");
    const releaseDate = request.nextUrl.searchParams.get("releaseDate");

    const whereConditions: string[] = [];
    const params: any[] = [];

    if (search) {
      whereConditions.push(`m."title" ILIKE $${params.length + 1}`);
      params.push(`%${search}%`);
    }

    if (genre && genre.length > 0) {
      const genres = genre.map((g) => parseInt(g)).filter((g) => !isNaN(g));
      if (genres.length > 0) {
        whereConditions.push(`g."id" = ANY($${params.length + 1}::int[])`);
        params.push(genres);
      }
    }

    if (releaseDate) {
      whereConditions.push(`m."releaseDate" = $${params.length + 1}`);
      params.push(releaseDate);
    }

    const whereSql =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    const query = `
    SELECT m.*, 
    (
      SELECT json_agg(subquery)
      FROM (
        SELECT c.*
        FROM "public"."CastedRole" cr
        JOIN "public"."Celebrity" c ON c."id" = cr."celebrityId"
        WHERE cr."movieId" = m."id"
        ORDER BY c."popularity" DESC
        LIMIT 2
      ) as subquery
    ) as "celebrities"
    FROM "public"."Movie" m
    JOIN "_GenreToMovie" gm ON gm."B" = m."id"
    JOIN "public"."Genre" g ON g."id" = gm."A"
    ${whereSql}
    GROUP BY m."id"
    ORDER BY m."rating" DESC
    LIMIT 5;
  `;

    return prisma.$queryRawUnsafe(query, ...params);
  }
}
