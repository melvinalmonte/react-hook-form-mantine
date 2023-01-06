import * as yup from "yup";

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInputs {
  name: string;
  lastName: string;
  radioValue: string;
  checkboxValue: string[];
  selectValue: string;
  privacyData: string;
}

type HookFormProps = {
  submitHandler: (values: IFormInputs) => void;
};
const HookForm = ({ submitHandler }: HookFormProps) => {
  // Validation schema
  const schema = yup
    .object({
      name: yup.string().required("First name is a required field."),
      lastName: yup.string().required("Last name is a required field."),
      radioValue: yup.string().required("Radio is a required field."),
      checkboxValue: yup
        .array()
        .min(1, "Must select at least one item")
        .required(),
      selectValue: yup.string().required("Select one item"),
    })
    .required();
  // Hook form setup.
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<IFormInputs>({
    defaultValues: {
      name: "",
      lastName: "",
      radioValue: "",
      checkboxValue: [],
      selectValue: "",
      privacyData: "false",
    },
    resolver: yupResolver(schema),
  });
  // Submit handler
  const onSubmit: SubmitHandler<IFormInputs> = useCallback(
    (values: IFormInputs) => {
      submitHandler(values);
    },
    [submitHandler]
  );
  return (
    <Paper shadow="xs" p="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              py={10}
              id="name"
              label="First Name:"
              error={errors.name && errors.name.message}
              required={!!errors.name}
              placeholder="Name"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextInput
              py={10}
              id="lastName"
              label="Last Name:"
              error={errors.lastName && errors.lastName.message}
              required={!!errors.lastName}
              placeholder="Last name"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="radioValue"
          render={({ field }) => (
            <RadioGroup
              py={10}
              {...field}
              label="Select your favorite framework/library"
              description="This is anonymous"
              required={!!errors.radioValue}
              error={errors.radioValue && errors.radioValue.message}
            >
              {[
                { name: "react", label: "React" },
                { name: "svelte", label: "Svelte" },
                { name: "ng", label: "Angular" },
                { name: "vue", label: "Vue" },
              ].map((item) => (
                <Radio key={item.name} value={item.name} label={item.label} />
              ))}
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="checkboxValue"
          render={({ field }) => (
            <CheckboxGroup
              py={10}
              {...field}
              label="Select your favorite framework/library"
              description="This is NOT anonymous"
              required={!!errors.checkboxValue}
              error={errors.checkboxValue && errors.checkboxValue.message}
            >
              {[
                { name: "react", label: "React" },
                { name: "svelte", label: "Svelte" },
                { name: "ng", label: "Angular" },
                { name: "vue", label: "Vue" },
              ].map((item) => (
                <Checkbox
                  key={item.name}
                  value={item.name}
                  label={item.label}
                  onChange={() => {
                    if (!field.value.includes(item.name)) {
                      field.onChange([...field.value, item]);
                      return;
                    }
                    const newItem = field.value.filter(
                      (topic) => topic !== item.name
                    );
                    field.onChange(newItem);
                  }}
                />
              ))}
            </CheckboxGroup>
          )}
        />
        <Controller
          control={control}
          name="selectValue"
          render={({ field }) => (
            <Select
              py={10}
              data={[
                { value: "react", label: "React" },
                { value: "svelte", label: "Svelte" },
                { value: "ng", label: "Angular" },
                { value: "vue", label: "Vue" },
              ]}
              label="Select your favorite framework/library"
              description="This is somewhat anonymous"
              error={errors.selectValue && errors.selectValue.message}
              required={!!errors.selectValue}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="privacyData"
          render={({ field }) => (
            <Switch
              {...field}
              onLabel="ON"
              offLabel="OFF"
              color="teal"
              label="I agree to sell my privacy"
            />
          )}
        />

        <Box mt={10}>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Paper>
  );
};

export default HookForm;
