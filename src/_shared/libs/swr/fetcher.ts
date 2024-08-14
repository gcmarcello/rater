import { ErrorResponse } from "@/_shared/types/ErrorResponse";
import useSWR, { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import {
  FormFields,
  handleFormError,
} from "../../components/Form/functions/formErrors";
import { UseFormReturn } from "../../components/Form/hooks/useForm";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useStore } from "zustand";

function clientSession() {
  const stringSession = localStorage.getItem("auth-storage");
  if (!stringSession) return "false";
  const parsedSession = JSON.parse(stringSession);
  return String(!!parsedSession.state.session);
}

async function handleResponse(r: Response) {
  const parsedResponse = await r.json();

  if (!r.ok) {
    if (
      (parsedResponse as ErrorResponse[]).find((e) => e.refreshSession) &&
      localStorage.getItem("auth-storage")
    )
      window.dispatchEvent(new Event("storage"));
    throw parsedResponse;
  }
  return parsedResponse;
}

async function get(url: string) {
  return fetch(url, {
    headers: {
      "x-client-session": clientSession(),
    },
  }).then(async (r) => handleResponse(r));
}

async function post<T>(url: string, { arg }: { arg: T }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "x-client-session": clientSession(),
    },
  }).then(async (r) => handleResponse(r));
}

async function del<T>(url: string, { arg }: { arg: T }) {
  fetch(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
    headers: {
      "x-client-session": clientSession(),
    },
  }).then(async (r) => handleResponse(r));
}

async function put<T>(url: string, { arg }: { arg: T }) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "x-client-session": clientSession(),
    },
  }).then(async (r) => handleResponse(r));
}

export const useMutation = <I, O>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  options?: SWRMutationConfiguration<O, ErrorResponse, string, I> & {
    form?: UseFormReturn<FormFields<I>>;
  }
) => {
  let methodFn;

  if (method === "POST") methodFn = post;
  if (method === "PUT") methodFn = put;
  if (method === "DELETE") methodFn = del;

  if (!methodFn) throw new Error("Method not allowed");

  return useSWRMutation<O, ErrorResponse, string, I>(url, methodFn, {
    ...options,
    throwOnError: false,
    onError: (error) => {
      options?.onError && options.onError(error, url, {});
      options?.form && handleFormError(error, options.form);
    },
  });
};

export const useFetch = <T>(
  url: string | null,
  options?: SWRConfiguration & {
    throwOnError?: false;
  }
) => {
  return useSWRImmutable<T, ErrorResponse>(url, get, {
    throwOnError: false,
    ...options,
  });
};

export const useFetchMutable = <T>(
  url: string | null,
  options?: SWRConfiguration & {
    throwOnError?: false;
  }
) => {
  return useSWR<T, ErrorResponse>(url, get, {
    throwOnError: false,
    ...options,
  });
};
