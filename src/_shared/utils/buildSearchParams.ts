export function buildSearchQuery(
  search: string | null,
  releaseDate: { start: string | null; end: string | null },
  genre: number[] | null
): string | null {
  if (!search) return null;

  const params: string[] = [];

  if (search) {
    params.push(`search=${search}`);
  }

  if (releaseDate.start || releaseDate.end) {
    params.push(
      `releaseDate="${encodeURIComponent(
        JSON.stringify({
          dateStart: releaseDate.start ?? null,
          dateEnd: releaseDate.end ?? null,
        })
      )}"`
    );
  }

  if (genre) {
    genre.forEach((genre) => {
      params.push(`genre=${encodeURIComponent(genre.toString())}`);
    });
  }

  return `/api/search?${params.join("&")}`;
}
