"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useTimerContext } from "@/context/TimerContext";
import { confirmCode, createUser, resendCode } from "@/service/users/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import clsx from "clsx";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail } from "react-icons/io";
import { InferType, object, string } from "yup";

const createUserSchema = object().shape({
  email: string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: string().required("Senha é obrigatória"),
  name: string().required("Nome é obrigatório"),
  confirmPass: string().required("Confirmar senha é obrigatório"),
});

type ICreateUser = InferType<typeof createUserSchema>;

export function SingUpForm({
  setActiveLogin,
}: {
  setActiveLogin: Dispatch<SetStateAction<boolean>>;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const { formatTime, startCounter, isRunning } = useTimerContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<ICreateUser>({
    resolver: yupResolver(createUserSchema),
  });

  const {
    handleSubmit: handleSubmitConfirmCode,
    setValue,
    watch,
  } = useForm<{
    code: string;
  }>();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const submit = useCallback(
    async (data: ICreateUser) => {
      setIsLoading(true);

      const response = await createUser(data);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        startCounter();
        setIsCreated(true);
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [startCounter, toast]
  );

  const submitConfirmCode = useCallback(
    async ({ code }: { code: string }) => {
      setIsLoading(true);

      const response = await confirmCode({
        code: Number(code),
        email: getValues("email"),
      });

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        push("/dashboard");
        setIsCreated(true);
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [getValues, push, toast]
  );

  const submitResendCode = useCallback(async () => {
    const response = await resendCode({ email: getValues("email") });

    if (response && response.result === "success") {
      toast({
        description: response.message,
        title: "Sucesso!",
        className: "toast-success",
      });
      startCounter();
    } else {
      toast({
        description: response?.message || "Tente novamente mais tarde!",
        variant: "destructive",
        title: "Erro!",
      });
    }
  }, [getValues, startCounter, toast]);

  return (
    <Card className="bg-[#313131] p-4 py-7" shadow="sm">
      <CardHeader className="justify-center">
        <Heading
          className={clsx("!font-semibold !text-4xl", {
            "!text-3xl": isCreated,
          })}
        >
          {!isCreated ? "Cadastro" : "Confirmar código"}
        </Heading>
      </CardHeader>
      {isCreated ? (
        <form onSubmit={handleSubmitConfirmCode(submitConfirmCode)}>
          <CardBody className="gap-4 w-full overflow-hidden flex justify-center">
            <div className="flex flex-col gap-4">
              <InputOTP onChange={(e) => setValue("code", e)} maxLength={6}>
                <InputOTPGroup className="flex justify-center w-full">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <div className="flex w-full gap-2 justify-center items-center">
                <Link
                  onClick={submitResendCode}
                  isDisabled={isRunning}
                  className="text-center text-sm hover:underline cursor-pointer text-[#D3D3D3]"
                >
                  Reenviar código
                </Link>
                {isRunning && (
                  <p className="flex justify-center text-[#D3D3D3]">
                    {formatTime()}
                  </p>
                )}
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              isDisabled={watch("code")?.length !== 6}
              className="button-primary w-full active:scale-100"
              type="submit"
            >
              Confirmar
            </Button>
          </CardFooter>
        </form>
      ) : (
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
                  autoComplete="new-password"
                  size="lg"
                  placeholder="Digite seu email"
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                  startContent={
                    <IoMdMail className="text-white/60" size={18} />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Nome"
                  labelPlacement="outside"
                  autoComplete="newPassword"
                  size="lg"
                  placeholder="Digite seu nome"
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                  startContent={<User2 className="text-white/60" size={18} />}
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
                  autoComplete="new-password"
                  size="lg"
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  placeholder="Digite sua senha"
                  startContent={
                    <IoMdLock className="text-white/60" size={18} />
                  }
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
                  startContent={
                    <IoMdLock className="text-white/60" size={18} />
                  }
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
          <CardFooter className="flex-col gap-4">
            <Button
              className="button-primary w-full"
              type="submit"
              isLoading={isLoading}
            >
              Cadastrar-se
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
              Entrar
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
