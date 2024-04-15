"use client";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { useTimerContext } from "@/context/TimerContext";
import { forgotPassword } from "@/service/users/client";
import { ISendEmailForgotPassword } from "@/service/users/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdMail } from "react-icons/io";
import { InferType, object, string } from "yup";

const forgotPasswordSchema = object().shape({
  email: string().required("E-mail é obrigatório").email("E-mail inválido"),
});

type IForgotPassword = InferType<typeof forgotPasswordSchema>;

export function RecoveryPassword() {
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { formatTime, startCounter, isRunning } = useTimerContext();
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const submit = useCallback(
    async (data: ISendEmailForgotPassword) => {
      setIsLoading(true);
      const response = await forgotPassword(data);

      if (response && response.result === "success") {
        startCounter();
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
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

  return (
    <>
      <div className="flex w-full justify-end">
        <Link
          className="text-[#D3D3D3] text-xs hover:underline cursor-pointer"
          onClick={onOpen}
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          !isRunning && reset();
        }}
      >
        <ModalContent className="bg-zinc-800">
          <ModalHeader className="flex flex-col gap-1">
            Recuperar senha
          </ModalHeader>
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody className="flex gap-4 flex-row items-end">
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
                    className={clsx({ "w-10/12": isRunning })}
                    placeholder="Digite seu email"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    startContent={
                      <IoMdMail className="text-white/60" size={18} />
                    }
                    disabled={isRunning}
                  />
                )}
              />

              {isRunning && (
                <h1 className="pb-3 w-2/12 flex justify-center">
                  {formatTime()}
                </h1>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                radius="full"
                className="uppercase"
                onPress={() => {
                  onClose();
                  !isRunning && reset();
                }}
              >
                Fechar
              </Button>
              <Button
                className="button-primary"
                type="button"
                onPress={() =>
                  !isRunning && submit({ email: getValues("email") })
                }
                isLoading={isLoading}
                disabled={isRunning}
              >
                Enviar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
