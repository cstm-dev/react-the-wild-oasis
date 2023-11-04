import { useForm } from "react-hook-form";
import Button from "ui/Button";
import Form from "ui/Form";
import FormRow from "ui/FormRow";
import Input from "ui/Input";

import useGetCurrentUser from "features/authentication/useGetCurrentUser.js";
import useUpdateCurrentUser from "features/authentication/useUpdateCurrentUser.js";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const {
    data: { email },
  } = useGetCurrentUser();
  const { mutate: updateCurrentUser, isLoading: isUpdating } =
    useUpdateCurrentUser();

  function onSubmit({ password }) {
    updateCurrentUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        value={email}
        autoComplete="username"
        hidden
        readOnly
      />

      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm new password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
