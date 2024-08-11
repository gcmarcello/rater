import { UpdateUserDto, updateUserDto } from "@/app/api/(resources)/users/dto";
import { DialogActions, DialogHeader } from "../../_shared/components/Dialog";
import Text from "../../_shared/components/Text";
import {
  Description,
  Details,
  FieldGroup,
  Fieldset,
  Form,
  FormTitle,
} from "../../_shared/form/components/Form";
import { useForm } from "../../_shared/form/hooks/useForm";
import ErrorMessage from "../../_shared/form/components/ErrorMessage";
import { SubmitButton } from "../../_shared/form/components/SubmitButton";
import Label from "../../_shared/form/components/Label";
import Input from "../../_shared/form/components/Input";
import Button from "../../_shared/components/Button";
import useSWR from "swr";
import { fetcher, mutator, updater } from "@/app/libs/swr/fetcher";
import useNextStore from "../../hooks/useNextStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { PublicUser } from "@/app/types/User";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { Spinner } from "../../_shared/components/Spinner";
import { Loading } from "../../_shared/components/Loading";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const auth = useNextStore(useAuthStore, (state) => state);

  const { isLoading } = useSWR<PublicUser, ErrorResponse, any>(
    auth?.getSession()?.id
      ? `/api/users?where=${encodeURI(`{"id":"${auth?.getSession()?.id}"}`)}`
      : null,
    fetcher,
    {
      onError: (error) => {},
      onSuccess: (data) => {
        form.setValue("email", data.email);
        form.setValue("name", data.name);
        data.realName && form.setValue("realName", data.realName);
      },
      throwOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { trigger, error } = useSWRMutation<
    PublicUser,
    ErrorResponse,
    "/api/users",
    UpdateUserDto,
    UpdateUserDto
  >("/api/users", updater<UpdateUserDto>, {
    onSuccess: (data) => {
      toast.success("Salvo com sucesso!");
    },
    throwOnError: false,
  });

  const { Field, ...form } = useForm({
    schema: updateUserDto,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DialogHeader style={{ alignItems: "start" }}>
        <FormTitle>Preferências da conta</FormTitle>
      </DialogHeader>

      <Form
        style={{ gap: "12px" }}
        hform={form}
        onSubmit={(data) => trigger(data)}
      >
        <Fieldset>
          <Text size={20} variant="white">
            Usuário
          </Text>
          <Description>
            Faça a edição do seu nome de usuário e de seu nome.
          </Description>
          <FieldGroup>
            <Field name="name">
              <Label>Nome de Usuário</Label>
              <Input placeholder="Digite seu Nome de Usuário" />
              <ErrorMessage />
            </Field>
            <Field name="realName">
              <Label>Nome Completo</Label>
              <Input placeholder="Digite seu Nome Completo" />
              <ErrorMessage />
            </Field>
          </FieldGroup>
        </Fieldset>

        <Fieldset>
          <Text size={20} variant="white">
            E-mail
          </Text>
          <Description>
            O e-mail não pode ser editado, apenas visualizado.
          </Description>
          <FieldGroup>
            <Field name="email">
              <Label>Email</Label>
              <Input disabled placeholder="Digite seu email" />
              <ErrorMessage />
            </Field>
          </FieldGroup>
        </Fieldset>

        <Fieldset>
          <Text size={20} variant="white">
            Encerramento da conta
          </Text>
          <Description>
            Ao deletar sua conta, todos os seus dados serão permanentemente
            excluídos. Esta ação é irreversível.
          </Description>
          <Button
            style={{
              padding: "16px 28px",
              marginRight: "auto",
              marginTop: "16px",
            }}
            variant="danger"
          >
            Deletar conta
          </Button>
        </Fieldset>
        <ErrorMessage />

        <DialogActions>
          <SubmitButton variant="primary">Salvar Alterações</SubmitButton>
        </DialogActions>
      </Form>
    </>
  );
}
