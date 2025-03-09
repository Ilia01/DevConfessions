import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData } from "../types/FormData";
import { Form } from "./Form";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas";

export const LoginForm = ({
  handleSubmit: onSubmit,
  isPending,
}: {
  handleSubmit: SubmitHandler<LoginFormData>;
  isPending: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      actionText="Login"
      loadingText="Logging in..."
    >
      <EmailField register={register} errors={errors} />
      <PasswordField register={register} errors={errors} />
    </Form>
  );
};
