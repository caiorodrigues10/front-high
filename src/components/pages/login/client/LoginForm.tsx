"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { TimerProvider } from "@/context/TimerContext";
import { login } from "@/service/auth/client";
import { ILogin } from "@/service/auth/types";
import { addCookie } from "@/utils/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail } from "react-icons/io";
import { InferType, object, string } from "yup";
import { RecoveryPassword } from "./RecoveryPassword";

const loginSchema = object().shape({
  email: string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: string().required("Senha é obrigatória"),
});

type ILoginSchema = InferType<typeof loginSchema>;

export function LoginForm({
  setActiveLogin,
}: {
  setActiveLogin: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submit = useCallback(
    async (data: ILogin) => {
      setIsLoading(true);

      const response = await login(data);
      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        addCookie({
          expirationDays: 1,
          name: "high.token",
          value: response.data.token,
        });
        addCookie({
          expirationDays: 1,
          name: "high.name",
          value: response.data.user.name,
        });
        addCookie({
          expirationDays: 1,
          name: "high.accessLevel",
          value: response.data.user.tagPermission,
        });
        addCookie({
          expirationDays: 1,
          name: "high.email",
          value: response.data.user.email,
        });
        push("/dashboard");
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [toast]
  );

  return (
    <Card className="bg-[#313131] p-4 py-7" shadow="sm">
      <CardHeader className="justify-center">
        <Heading size="lg" className="!font-semibold !text-4xl">
          Login
        </Heading>
      </CardHeader>
      <form onSubmit={handleSubmit(submit)}>
        <CardBody className="gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                {...field}
                type="email"
                label="Email"
                labelPlacement="outside"
                size="lg"
                placeholder="Digite seu email"
                isInvalid={!!errors.email?.message}
                errorMessage={errors.email?.message}
                startContent={<IoMdMail className="text-white/60" size={18} />}
              />
            )}
          />
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
                size="lg"
                placeholder="Digite sua senha"
                isInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
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
          <TimerProvider>
            <RecoveryPassword />
          </TimerProvider>
        </CardBody>
        <CardFooter className="flex-col gap-4">
          <Button
            className="button-primary w-full"
            type="submit"
            isLoading={isLoading}
          >
            Entrar
          </Button>
          <div className="flex w-full justify-between items-center">
            <Divider className="w-5/12 bg-[#595959]" />
            <p className="w-1/12 text-[#595959] text-xs text-center">OU</p>
            <Divider className="w-5/12 bg-[#595959]" />
          </div>

          <Button
            className="button-primary w-full"
            onPress={() => setActiveLogin((prev) => !prev)}
          >
            Cadastrar-se
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
