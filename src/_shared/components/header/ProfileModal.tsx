import { useGlobalStore } from "../../hooks/useGlobalStore";
import ProfileForm from "../profile-modal/ProfileForm";
import Dialog from "../Dialog";

export default function ProfileModal() {
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
