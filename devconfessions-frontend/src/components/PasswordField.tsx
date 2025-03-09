import {
  FieldValues,
  Path,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import { InputField } from "./InputField";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";

export const PasswordField = <T extends FieldValues>({
  register,
  errors,
  name = "password" as Path<T>,
  label = "Password",
  placeholder = "Password",
}: {
  register: UseFormRegister<T>;
  errors: Partial<Record<keyof T, FieldError>>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name as string} className="sr-only">
        {label}
      </label>
      <InputField
        className="relative"
        register={register}
        errors={errors}
        name={name}
        label={label}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
      >
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          {showPassword ? (
            <MdOutlineVisibility className="h-6 w-6 cursor-pointer" />
          ) : (
            <MdOutlineVisibilityOff className="h-6 w-6 cursor-pointer" />
          )}
        </button>
      </InputField>
    </div>
  );
};
