"use client";
import { LoadingOverlay } from "@/app/_shared/components/Loading";
import { useFetch } from "@/app/_shared/libs/swr/fetcher";
import { MovieWithGenres } from "@/app/_shared/types/Movies";
import { useRouter } from "next/navigation";

export default function MoviePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading } = useFetch<MovieWithGenres>(
    `/api/movies/${params.id}`,
    {
      onSuccess: (data) => {
        !data && router.push("/404");
      },
    }
  );
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return <></>;
}
