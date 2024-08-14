import {
  upsertRatingDto,
  UpsertRatingDto,
} from "@/app/api/(resources)/ratings/dto";
import { Rating } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "@/app/_shared/components/Form/hooks/useForm";
import { Fieldset, Form } from "@/app/_shared/components/Form/components/Form";
import toast from "react-hot-toast";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { useMutation } from "../../libs/swr/fetcher";
import Alert, { AlertTitle, AlertBody, AlertActions } from "../Alert";
import { SubmitButton } from "../Form/components/SubmitButton";
import { StarRating } from "./StarSlider";
import Text from "../Text";
import Label from "../Form/components/Label";
import Textarea from "../Form/components/Textarea";

export function RatingAlert() {
  const { toBeRatedMovie, toBeRatedShow, clearToBeRated, ratings, setRatings } =
    useGlobalStore();

  const { Field, ...form } = useForm({
    schema: upsertRatingDto,
  });

  const { trigger } = useMutation<UpsertRatingDto, Rating>(
    "/api/ratings",
    "POST",
    {
      onSuccess: (data) => {
        const updatedRating = ratings?.findIndex((r) => r.id === data.id);
        if (updatedRating > -1) {
          const newRatings = [...ratings];
          newRatings[updatedRating] = data;
          setRatings(newRatings);
        }
        toast.success("Avaliação enviada com sucesso");
        clearToBeRated();
      },
    }
  );

  useEffect(() => {
    if (toBeRatedMovie) {
      form.setValue("movieId", toBeRatedMovie.id);

      const movieRating = ratings?.find((r) => r.movieId === toBeRatedMovie.id);
      if (movieRating) {
        form.setValue("rating", movieRating.rating);
        form.setValue("comment", movieRating.comment ?? undefined);
      }
    } else if (toBeRatedShow) {
      const showRating = ratings?.find((r) => r.showId === toBeRatedShow?.id);
      if (showRating) {
        form.setValue("rating", showRating.rating);
        form.setValue("comment", showRating.comment ?? undefined);
      }
    }
  }, [toBeRatedMovie, toBeRatedShow, ratings]);

  return (
    <Alert
      isOpen={Boolean(toBeRatedMovie || toBeRatedShow)}
      setIsOpen={clearToBeRated}
    >
      <AlertTitle>
        <Text
          style={{
            fontWeight: 400,
            color: "rgba(234, 179, 8, 1)",
            marginBottom: 8,
          }}
          size={20}
          $variant="white"
        >
          Sua avaliação{" "}
          {ratings.find((r) => r.movieId === toBeRatedMovie?.id)?.rating}
        </Text>
        <Text size={20} $variant="white">
          {toBeRatedMovie?.title}
        </Text>
      </AlertTitle>
      <Form hform={form} onSubmit={(data) => trigger(data)}>
        <AlertBody>
          <Fieldset>
            <Field name="rating">
              <StarRating />
            </Field>
            <Field name="comment">
              <Label>Comentário</Label>
              <Textarea rows={12} />
            </Field>
          </Fieldset>
        </AlertBody>
        <AlertActions>
          <SubmitButton style={{ width: "100%" }}>Avaliar</SubmitButton>
        </AlertActions>
      </Form>
    </Alert>
  );
}
