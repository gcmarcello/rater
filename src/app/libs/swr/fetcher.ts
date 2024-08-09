export const fetcher = (url: string) =>
  fetch(url)
    .then(async (r) => {
      const parsedResponse = await r.json();
      if (!r.ok) throw parsedResponse;
      return parsedResponse;
    })
    .catch((e) => console.error(e));
