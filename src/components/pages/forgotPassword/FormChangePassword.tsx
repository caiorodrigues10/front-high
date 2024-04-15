"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { changePassword } from "@/service/users/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";
import { InferType, object, string } from "yup";

const forgotPasswordSchema = object().shape({
  password: string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo de 6 caracteres"),
  confirmPass: string().required("Confirmar senha é obrigatório"),
});

type IForgotPassword = InferType<typeof forgotPasswordSchema>;

export function FormChangePassword({ token }: { token: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const { toast } = useToast();
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const submit = useCallback(
    async (data: IForgotPassword) => {
      const newData = {
        ...data,
        token,
      };

      const response = await changePassword(newData);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        push("/login");
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
    },
    [toast, token, push]
  );

  return (
    <Card
      className="bg-[#313131] p-4 py-7 w-1/2 max-w-[500px] max-md:w-full"
      shadow="sm"
    >
      <CardHeader className="justify-center">
        <Heading size="lg" className="!font-semibold !text-3xl">
          Alterar senha
        </Heading>
      </CardHeader>
      <form onSubmit={handleSubmit(submit)}>
        <CardBody className="gap-4">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextInput
                {...field}
                type={isVisible ? "text" : "password"}
                label="Senha"
                id="inputTest"
                labelPlacement="outside"
                autoComplete="new-password"
                size="lg"
                isInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
                placeholder="Digite sua senha"
                startContent={<IoMdLock className="text-white/60" size={18} />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPass"
            render={({ field }) => (
              <TextInput
                {...field}
                type={isVisibleConfirm ? "text" : "password"}
                label="Confirmar senha"
                autoComplete="newPassword"
                id="inputTest"
                labelPlacement="outside"
                size="lg"
                placeholder="Digite sua senha"
                isInvalid={!!errors.confirmPass?.message}
                errorMessage={errors.confirmPass?.message}
                startContent={<IoMdLock className="text-white/60" size={18} />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityConfirm}
                  >
                    {isVisibleConfirm ? (
                      <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            )}
          />
        </CardBody>
        <CardFooter>
          <Button className="button-primary w-full" type="submit">
            Alterar senha
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
