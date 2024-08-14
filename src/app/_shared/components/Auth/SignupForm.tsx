import { useForm } from "@/app/_shared/components/Form/hooks/useForm";
import { SignupDto, signupDto } from "@/app/api/(resources)/auth/dto";
import { Session } from "inspector";
import toast from "react-hot-toast";
import { useAuthModalStore } from "../../hooks/useAuthModalStore";
import { useMutation } from "../../libs/swr/fetcher";
import { DialogHeader, DialogActions } from "../Dialog";
import ErrorMessage from "../Form/components/ErrorMessage";
import {
  FormTitle,
  Details,
  Form,
  Description,
  Fieldset,
} from "../Form/components/Form";
import { SubmitButton } from "../Form/components/SubmitButton";
import Text from "../Text";
import Input from "../Form/components/Input";
import Label from "../Form/components/Label";

export default function SignupForm() {
  const { Field, ...form } = useForm({
    schema: signupDto,
    mode: "onChange",
  });

  const { setModalForm } = useAuthModalStore();

  const { trigger, error } = useMutation<SignupDto, Session>(
    "/api/auth/signup",
    "POST",
    {
      form,
      onSuccess: () => {
        setModalForm("login");
        toast.success("Cadastrado com sucesso! Você já pode fazer login.", {
          duration: 5000,
        });
      },
    }
  );

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
            $variant="secondary"
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
