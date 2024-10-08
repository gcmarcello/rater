import { type DeleteUserDto, deleteUserDto } from "@/app/api/users/dto";
import { useForm } from "@/_shared/components/form/hooks/useForm";
import { Description, Form } from "@/_shared/components/form/components/Form";
import toast from "react-hot-toast";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import useNextStore from "../../hooks/useNextStore";
import { useMutation } from "../../libs/swr/fetcher";
import Alert, { AlertActions } from "../Alert";
import { SubmitButton } from "../form/components/SubmitButton";
import Text from "../Text";
import Checkbox from "../form/components/Checkbox";
import Label from "../form/components/Label";
import Button from "../Button";

export function AccountRemovalModal() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { setIsAccountRemovalModalOpen, isAccountRemovalModalOpen } =
    useGlobalStore();

  const { Field, ...form } = useForm({
    schema: deleteUserDto,
    defaultValues: {
      keepRatings: false,
    },
  });

  const { trigger } = useMutation<DeleteUserDto, any>(`/api/users/`, "DELETE", {
    onSuccess: () => {
      auth?.logout();
      useGlobalStore.setState({
        isProfileModalOpen: false,
        isAccountRemovalModalOpen: false,
      });
      toast.success("Conta deletada com sucesso!");
    },
  });

  return (
    <Alert
      isOpen={isAccountRemovalModalOpen}
      setIsOpen={setIsAccountRemovalModalOpen}
      onClose={() => form.setValue("keepRatings", false)}
    >
      <Text size={20} $variant="white">
        Encerramento da conta
      </Text>
      <Description>
        Tem certeza de que deseja deletar sua conta? Esta ação é irreversível e
        os seus dados pessoais serão permanentemente excluídos.
      </Description>
      <Form hform={form} onSubmit={(data) => trigger(data)}>
        <Field type="checkbox" name="keepRatings">
          <Checkbox />
          <Label>Remover avaliações</Label>
        </Field>
        <AlertActions>
          <Button
            onClick={() => setIsAccountRemovalModalOpen(false)}
            style={{ padding: "16px 28px", flexGrow: 1, width: "100%" }}
            $variant="secondary"
          >
            Cancelar
          </Button>
          <SubmitButton
            style={{ padding: "16px 28px", flexGrow: 1, width: "100%" }}
            $variant="primary"
          >
            Confirmar
          </SubmitButton>
        </AlertActions>
      </Form>
    </Alert>
  );
}
