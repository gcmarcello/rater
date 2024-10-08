import toast from "react-hot-toast";

import { useAuthModalStore } from "../../hooks/useAuthModalStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import useNextStore from "../../hooks/useNextStore";
import { useMutation } from "../../libs/swr/fetcher";
import { DialogHeader, DialogBody, DialogActions } from "../Dialog";
import ErrorMessage from "../form/components/ErrorMessage";
import {
  FormTitle,
  Details,
  Description,
  Fieldset,
  Form,
} from "../form/components/Form";
import { SubmitButton } from "../form/components/SubmitButton";
import Text from "../Text";
import { Session } from "../../types/Session";
import Label from "../form/components/Label";
import Input from "../form/components/Input";
import { useForm } from "../form/hooks/useForm";
import { LoginDto, loginDto } from "@/app/api/auth/dto";

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
      form,
      onError: (error) => {
        form.setValue("password", "");
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
