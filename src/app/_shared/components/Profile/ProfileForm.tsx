import { UpdateUserDto, updateUserDto } from "@/app/api/(resources)/users/dto";
import { useForm } from "@/app/_shared/components/Form/hooks/useForm";
import {
  Description,
  Fieldset,
  Form,
} from "@/app/_shared/components/Form/components/Form";
import toast from "react-hot-toast";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import useNextStore from "../../hooks/useNextStore";
import { useFetch, useFetchMutable, useMutation } from "../../libs/swr/fetcher";
import { PublicUser } from "../../types/User";
import { DialogHeader, DialogActions } from "../Dialog";
import ErrorMessage from "../Form/components/ErrorMessage";
import { FormTitle, FieldGroup } from "../Form/components/Form";
import { SubmitButton } from "../Form/components/SubmitButton";
import { Loading } from "../Loading";
import { AccountRemovalModal } from "./AccountRemovalModal";
import Text from "../Text";
import Label from "../Form/components/Label";
import Input from "../Form/components/Input";
import Button from "../Button";
import { useEffect } from "react";

export default function ProfileForm() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { setIsAccountRemovalModalOpen, isProfileModalOpen } = useGlobalStore();

  const { isLoading, data } = useFetch<PublicUser>(
    auth?.getSession()?.id ? `/api/users` : null,
    {
      onSuccess: (data) => {
        form.setValue("email", data.email);
        form.setValue("name", data.name);
        data.realName && form.setValue("realName", data.realName);
        sessionStorage.setItem("user", JSON.stringify(data));
      },
      throwOnError: false,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (!data) return;
    form.setValue("email", data.email);
    form.setValue("name", data.name);
    data.realName && form.setValue("realName", data.realName);
  }, []);

  const { Field, ...form } = useForm({
    schema: updateUserDto,
    defaultValues: {
      email: data?.email,
      name: data?.name,
      realName: data?.realName ?? "",
    },
  });

  const { trigger, error } = useMutation<UpdateUserDto, PublicUser>(
    "/api/users",
    "PUT",
    {
      form,
      onSuccess: (data) => toast.success("Salvo com sucesso!"),
    }
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <AccountRemovalModal />
      <DialogHeader style={{ alignItems: "start" }}>
        <FormTitle>Preferências da conta</FormTitle>
      </DialogHeader>

      <Form
        style={{ gap: "12px" }}
        hform={form}
        onSubmit={(data) => trigger(data)}
      >
        <Fieldset>
          <Text size={20} $variant="white">
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
          <Text size={20} $variant="white">
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
          <Text size={20} $variant="white">
            Encerramento da conta
          </Text>
          <Description>
            Ao deletar sua conta, todos os seus dados serão permanentemente
            excluídos. Esta ação é irreversível.
          </Description>
          <Button
            onClick={() => setIsAccountRemovalModalOpen(true)}
            style={{
              padding: "16px 28px",
              marginRight: "auto",
              marginTop: "16px",
            }}
            $variant="danger"
          >
            Deletar conta
          </Button>
        </Fieldset>
        <ErrorMessage />

        <DialogActions>
          <SubmitButton $variant="primary">Salvar Alterações</SubmitButton>
        </DialogActions>
      </Form>
    </>
  );
}
