import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditCabin } from "services/apiCabins.js";

import Button from "ui/Button";
import FileInput from "ui/FileInput";
import Form from "ui/Form";
import FormRow from "ui/FormRow.jsx";
import Input from "ui/Input";
import Textarea from "ui/Textarea";

CreateCabinForm.propTypes = {
  cabinEdit: PropTypes.object,
};

function CreateCabinForm({ cabinEdit = {} }) {
  const { id: editId, ...editValues } = cabinEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (cabin) => createEditCabin(cabin),
    onSuccess: () => {
      toast.success("A new cabin has been added.");

      reset();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => {
      createEditCabin(cabin, id);
    },
    onSuccess: () => {
      toast.success("Cabin has been edited.");

      reset();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const isWorking = isCreating || isEditing;
  const { errors } = formState;

  function submitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({ cabin: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image });
    }
  }

  function onErrorForm(errors) {
    // another way to handle errors with React Form hook instead of using formState
  }

  return (
    <Form onSubmit={handleSubmit(submitForm, onErrorForm)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "The maximum capacity has to be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "The price has to be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount has to be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
