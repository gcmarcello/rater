export const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    const parsedResponse = await r.json();
    if (!r.ok) throw parsedResponse;
    return parsedResponse;
  });

export async function mutator<T>(url: string, { arg }: { arg: T }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then(async (r) => {
    const parsedResponse = await r.json();
    if (!r.ok) throw parsedResponse;
    return parsedResponse;
  });
}

export const deleter = (url: string) =>
  fetch(url, {
    method: "DELETE",
  }).then(async (r) => {
    const parsedResponse = await r.json();
    if (!r.ok) throw parsedResponse;
    return parsedResponse;
  });

export async function updater<T>(url: string, { arg }: { arg: T }) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  }).then(async (r) => {
    const parsedResponse = await r.json();
    if (!r.ok) throw parsedResponse;
    return parsedResponse;
  });
}
