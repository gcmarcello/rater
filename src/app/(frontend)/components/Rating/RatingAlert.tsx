import {
  UpsertRatingDto,
  upsertRatingDto,
} from "@/app/api/(resources)/ratings/dto";
import Alert, {
  AlertActions,
  AlertBody,
  AlertTitle,
} from "../../_shared/components/Alert";
import { useForm } from "../../_shared/form/hooks/useForm";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import { Fieldset, Form } from "../../_shared/form/components/Form";
import { StarRating } from "./StarSlider";
import Textarea from "../../_shared/form/components/Textarea";
import { SubmitButton } from "../../_shared/form/components/SubmitButton";
import Text from "../../_shared/components/Text";
import Label from "../../_shared/form/components/Label";
import { useMutation } from "@/app/libs/swr/fetcher";
import { Movie, Rating } from "@prisma/client";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function RatingAlert() {
  const { toBeRatedMovie, toBeRatedShow, clearToBeRated } = useGlobalStore();

  const { Field, ...form } = useForm({
    schema: upsertRatingDto,
    defaultValues: {
      movieId: toBeRatedMovie?.id,
    },
  });

  const { trigger } = useMutation<UpsertRatingDto, Rating>(
    "/api/ratings",
    "POST",
    {
      onSuccess: () => {
        toast.success("Avaliação enviada com sucesso");
        clearToBeRated();
      },
    }
  );

  useEffect(() => {
    if (toBeRatedMovie) return form.setValue("movieId", toBeRatedMovie.id);

    if (toBeRatedShow) return form.setValue("showId", toBeRatedShow.id);
  }, [toBeRatedMovie, toBeRatedShow, form]);

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
          variant="white"
        >
          Sua avaliação
        </Text>
        <Text size={20} variant="white">
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
              <Textarea />
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
