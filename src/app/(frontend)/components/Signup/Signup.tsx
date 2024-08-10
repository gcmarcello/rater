import { signupDto } from "@/app/api/auth/dto";
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
import { DialogHeader } from "../../_shared/components/Dialog";
import { useForm } from "../../_shared/form/hooks/useForm";

export default function LoginForm() {
  const { Field, ...form } = useForm({
    schema: signupDto,
    mode: "onChange",
  });

  return (
    <>
      <DialogHeader>
        <FormTitle>Acesse Sua Conta</FormTitle>
        <Description>Bem vindo de volta! Entre com seus dados.</Description>
      </DialogHeader>

      <Form hform={form} onSubmit={(data) => console.log(data)}>
        <FormBody>
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
          <Fieldset>
            <SubmitButton type="submit" variant="secondary">
              Fazer Login
            </SubmitButton>
          </Fieldset>
          <ErrorMessage />
        </FormBody>
      </Form>
    </>
  );
}
