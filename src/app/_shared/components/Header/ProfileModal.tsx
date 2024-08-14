import useNextStore from "../../hooks/useNextStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import ProfileForm from "../Profile/ProfileForm";
import Dialog from "../Dialog";

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
