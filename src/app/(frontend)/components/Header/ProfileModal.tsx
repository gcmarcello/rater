import useNextStore from "../../hooks/useNextStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import Dialog from "../../_shared/components/Dialog";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import ProfileForm from "../Profile/ProfileForm";

export default function ProfileModal() {
  const auth = useNextStore(useAuthStore, (state) => state);
  const { isProfileModalOpen, setIsProfileModalOpen } = useGlobalStore();

  return (
    <Dialog
      size="md"
      isOpen={isProfileModalOpen}
      setIsOpen={setIsProfileModalOpen}
    >
      <ProfileForm />
    </Dialog>
  );
}
