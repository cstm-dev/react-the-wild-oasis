import useLogin from "features/authentication/useLogin.js";
import { useState } from "react";
import Button from "ui/Button";
import Form from "ui/Form";
import FormRowVertical from "ui/FormRowVertical";
import Input from "ui/Input";
import SpinnerMini from "ui/SpinnerMini.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading: isLoadingLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoadingLogin}
          placeholder="Enter your email"
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoadingLogin}
          placeholder="Enter your password"
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isLoadingLogin}>
          {!isLoadingLogin ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
