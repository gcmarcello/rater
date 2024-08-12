import { LoginDto, loginDto } from "@/app/api/(resources)/auth/dto";
import styled from "styled-components";
import Input from "../../_shared/form/components/Input";
import Label from "../../_shared/form/components/Label";
import {
  Description,
  Details,
  Fieldset,
  Form,
  FormTitle,
} from "../../_shared/form/components/Form";
import ErrorMessage from "../../_shared/form/components/ErrorMessage";
import Text from "../../_shared/components/Text";
import { SubmitButton } from "../../_shared/form/components/SubmitButton";
import {
  DialogActions,
  DialogBody,
  DialogHeader,
} from "../../_shared/components/Dialog";
import { useForm } from "../../_shared/form/hooks/useForm";
import { handleFormError } from "../../_shared/form/functions/formErrors";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Session } from "@/app/types/Session";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import useNextStore from "../../hooks/useNextStore";
import toast from "react-hot-toast";
import { useAuthModalStore } from "../../hooks/useAuthModalStore";
import { useMutation } from "@/app/libs/swr/fetcher";

export default function LoginForm() {
  const { Field, ...form } = useForm({
    schema: loginDto,
    mode: "onChange",
  });

  const auth = useNextStore(useAuthStore, (state) => state);
  const { setIsAuthModalOpen, setModalForm, modalForm } = useAuthModalStore();

  const { trigger } = useMutation<LoginDto, Session>(
    "/api/auth/login",
    "POST",
    {
      onError: (error) => {
        form.setValue("password", "");
        handleFormError(error, form);
      },
      onSuccess: (data) => {
        auth?.login(data);
        setIsAuthModalOpen(false);
        toast.success("Logado com sucesso!");
      },
    }
  );

  return (
    <>
      <DialogHeader>
        <FormTitle>Acesse Sua Conta</FormTitle>
        <Description>Bem vindo de volta! Entre com seus dados.</Description>
      </DialogHeader>
      <Form hform={form} onSubmit={(data) => trigger(data)}>
        <DialogBody>
          <Fieldset>
            <Field name="email">
              <Label>Email</Label>
              <Input placeholder="Digite seu email" />
              <ErrorMessage />
            </Field>
            <Field name="password">
              <Label>Senha</Label>
              <Input placeholder="Digite sua senha" type="password" />
              <ErrorMessage />
            </Field>
          </Fieldset>
          <ErrorMessage />
        </DialogBody>
        <DialogActions>
          <SubmitButton
            style={{ width: "100%" }}
            type="submit"
            $variant="secondary"
          >
            Fazer Login
          </SubmitButton>
          <Details>
            Não tem uma conta ainda?{" "}
            <Text
              href="#"
              onClick={() => {
                setModalForm("signup");
              }}
              $variant="white"
            >
              Clique Aqui.
            </Text>
          </Details>
        </DialogActions>
      </Form>
    </>
  );
}
