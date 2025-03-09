import {
  FieldError,
  FieldValues,
  Path,
  useForm,
  UseFormRegister,
} from "react-hook-form";

export const Field = <T extends FieldValues>({
  register,
  formState,
  name: nameProp,
  label,
  type = "text",
  placeholder,
}: {
  register: UseFormRegister<T>;
  formState: ReturnType<typeof useForm>["formState"];
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
}) => {
  const name = nameProp as Path<T>;
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name as string} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        {...register(name as Path<T>)}
        placeholder={placeholder}
        className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-900"
      />
      {formState.errors[name as string] && (
        <p className="text-red-500 text-sm mt-1">
          {(formState.errors[name as string] as FieldError)?.message}
        </p>
      )}
    </div>
  );
};
