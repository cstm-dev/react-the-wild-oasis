import useSignup from "features/authentication/useSignup.js";
import { useForm } from "react-hook-form";
import Button from "ui/Button";
import Form from "ui/Form";
import FormRow from "ui/FormRow";
import Input from "ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { mutate: signup, isLoading: isLoadingSignup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required." })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "The password needs a minimum of 8 characters.",
            },
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password ||
              "Your password doesn't match with the one you already provided.",
          })}
          disabled={isLoadingSignup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isLoadingSignup}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoadingSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
