import {
  FieldValues,
  Path,
  FieldError,
  UseFormRegister,
} from "react-hook-form";

export const InputField = <T extends FieldValues>({
  register,
  errors,
  name: nameProp,
  label,
  placeholder,
  type = "text",
  className,
  children,
}: {
  register: UseFormRegister<T>;
  errors: Partial<Record<keyof T, FieldError>>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={nameProp} className="sr-only">
        {label}
      </label>
      <div className={className}>
        <input
          type={type}
          {...register(nameProp)}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 transition-all duration-200"
        />
        {children}
      </div>
      {errors[nameProp] && (
        <p className="text-red-500 text-sm mt-1">{errors[nameProp]?.message}</p>
      )}
    </div>
  );
};
