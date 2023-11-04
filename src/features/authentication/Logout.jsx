import useLogout from "features/authentication/useLogout.js";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "ui/ButtonIcon.jsx";
import SpinnerMini from "ui/SpinnerMini.jsx";

function Logout() {
  const { mutate: logout, isLoading: isLoadingLogout } = useLogout();

  return (
    <ButtonIcon disabled={isLoadingLogout} onClick={logout}>
      {!isLoadingLogout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
