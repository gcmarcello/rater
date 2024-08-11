import { SignupDto, signupDto } from "@/app/api/(resources)/auth/dto";
import styled from "styled-components";
import Input from "../../_shared/form/components/Input";
import Label from "../../_shared/form/components/Label";
import {
  Description,
  Details,
  Fieldset,
  Form,
  FormBody,
  FormTitle,
} from "../../_shared/form/components/Form";
import ErrorMessage from "../../_shared/form/components/ErrorMessage";
import Text from "../../_shared/components/Text";
import { SubmitButton } from "../../_shared/form/components/SubmitButton";
import { DialogActions, DialogHeader } from "../../_shared/components/Dialog";
import { useForm } from "../../_shared/form/hooks/useForm";
import { useAuthModalStore } from "../../hooks/useAuthModalStore";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import { mutator } from "@/app/libs/swr/fetcher";
import useSWRMutation from "swr/mutation";
import { handleFormError } from "../../_shared/form/functions/formErrors";
import { Session } from "@/app/types/Session";
import toast from "react-hot-toast";

export default function SignupForm() {
  const { Field, ...form } = useForm({
    schema: signupDto,
    mode: "onChange",
  });

  const { setModalForm } = useAuthModalStore();

  const { trigger, error } = useSWRMutation<
    Session,
    ErrorResponse,
    "/api/auth/signup",
    SignupDto,
    SignupDto
  >("/api/auth/signup", mutator<SignupDto>, {
    onError: (error) => {
      handleFormError(error, form);
    },
    onSuccess: (data: Session) => {
      setModalForm("login");
      toast.success("Cadastrado com sucesso! Você já pode fazer login.", {
        duration: 5000,
      });
    },
    throwOnError: false,
  });

  return (
    <>
      <DialogHeader>
        <FormTitle>Crie sua conta</FormTitle>
        <Description>Insira seus dados para completar o cadastro.</Description>
      </DialogHeader>

      <Form hform={form} onSubmit={(data) => trigger(data)}>
        <Fieldset>
          <Field name="name">
            <Label>Nome</Label>
            <Input />
            <ErrorMessage />
          </Field>
          <Field name="email">
            <Label>Email</Label>
            <Input />
            <ErrorMessage />
          </Field>
          <Field name="password">
            <Label>Senha</Label>
            <Input type="password" />
            <ErrorMessage />
          </Field>
          <Field name="confirmPassword">
            <Label>Confirmar Senha</Label>
            <Input type="password" />
            <ErrorMessage />
          </Field>
        </Fieldset>
        <ErrorMessage />
        <DialogActions>
          <SubmitButton
            style={{ width: "100%" }}
            type="submit"
            variant="secondary"
          >
            Cadastrar
          </SubmitButton>
          <Details>
            Já tem uma conta ainda?{" "}
            <Text
              href="#"
              onClick={() => {
                setModalForm("login");
              }}
              variant="white"
            >
              Clique Aqui.
            </Text>
          </Details>
        </DialogActions>
      </Form>
    </>
  );
}
