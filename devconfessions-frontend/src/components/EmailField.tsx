import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
import { InputField } from "./InputField";

export const EmailField = <T extends FieldValues>({
  register,
  errors,
  name = "email" as Path<T>,
  label = "Email",
  placeholder = "Email",
}: {
  register: UseFormRegister<T>;
  errors: Partial<Record<keyof T, FieldError>>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
}) => (
  <InputField
    register={register}
    errors={errors}
    name={name}
    label={label}
    placeholder={placeholder}
  />
);
