import useGetCurrentUser from "features/authentication/useGetCurrentUser.js";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "ui/Spinner.jsx";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

function ProtectedRoute({ children }) {
  const { isLoading: isLoadingCurrentUser, isAuthenticated } =
    useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingCurrentUser) navigate("/login");
  }, [isAuthenticated, navigate, isLoadingCurrentUser]);

  if (isLoadingCurrentUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
}

export default ProtectedRoute;
