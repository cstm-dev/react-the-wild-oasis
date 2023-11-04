import Logout from "features/authentication/Logout.jsx";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "ui/ButtonIcon.jsx";
import DarkModeToggle from "ui/DarkModeToggle.jsx";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const naviagte = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => naviagte("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
