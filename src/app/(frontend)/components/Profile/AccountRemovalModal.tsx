import {
  type DeleteUserDto,
  deleteUserDto,
} from "@/app/api/(resources)/users/dto";
import Alert, { AlertActions } from "../../_shared/components/Alert";
import Button from "../../_shared/components/Button";
import Text from "../../_shared/components/Text";
import Checkbox from "../../_shared/form/components/Checkbox";
import { Description, Form } from "../../_shared/form/components/Form";
import { useForm } from "../../_shared/form/hooks/useForm";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import useSWRMutation from "swr/mutation";
import { ErrorResponse } from "@/app/types/ErrorResponse";
import toast from "react-hot-toast";
import Label from "../../_shared/form/components/Label";
import useNextStore from "../../hooks/useNextStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { SubmitButton } from "../../_shared/form/components/SubmitButton";
import { useMutation } from "@/app/libs/swr/fetcher";

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
