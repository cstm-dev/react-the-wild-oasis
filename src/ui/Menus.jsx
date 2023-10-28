import useOutsideClick from "hooks/useOutsideClick.js";
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

Menus.propTypes = {
  children: PropTypes.node,
};

Menu.propTypes = {
  children: PropTypes.node,
};

Toggle.propTypes = {
  id: PropTypes.number,
};

List.propTypes = {
  children: PropTypes.node,
  id: PropTypes.number,
};

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  function handleClose() {
    setOpenId("");
  }

  function handleOpen(id) {
    setOpenId(id);
  }

  return (
    <MenusContext.Provider
      value={{ openId, handleClose, handleOpen, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

// BUG Toggle won't close and 20 re-renders
function Toggle({ id }) {
  const { openId, handleClose, handleOpen, setPosition } =
    useContext(MenusContext);

  // console.log(`openId: ${openId}`);
  // console.log(`id: ${id}`);

  function handleClick(e) {
    const rectPos = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rectPos.width - rectPos.x,
      y: 8 + rectPos.height + rectPos.y,
    });

    openId === "" || openId !== id ? handleOpen(id) : handleClose();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { openId, position, handleClose } = useContext(MenusContext);
  const { selector } = useOutsideClick(handleClose);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={selector}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick }) {
  const { handleClose } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    handleClose();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
