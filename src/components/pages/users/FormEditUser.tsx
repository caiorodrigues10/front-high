"use client";
import { Heading } from "@/components/Heading";
import { SelectInput } from "@/components/SelectInput";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { editUser } from "@/service/users/client";
import { IPermissions, IUser } from "@/service/users/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SelectItem,
} from "@nextui-org/react";
import { ArrowLeft, Save, Shield, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail } from "react-icons/io";
import { InferType, object, string } from "yup";

const editUserSchema = object().shape({
  email: string().required("E-mail é obrigatório").email("E-mail inválido"),
  name: string().required("Nome é obrigatório"),
  password: string().test("is-filled", "Senha é obrigatória", function (value) {
    return this.parent.confirmPass ? !!value : true;
  }),
  confirmPass: string().test(
    "is-filled",
    "Confirmar senha é obrigatório",
    function (value) {
      return this.parent.password ? !!value : true;
    }
  ),
  userPermissionsId: string().required("Permissão do usuário é obrigatório"),
});

type IEditUser = InferType<typeof editUserSchema>;

export function FormEditUser({
  permissions,
  user,
}: {
  permissions: IPermissions[];
  user: IUser;
}) {
  const { toast } = useToast();
  const { push, refresh } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditUser>({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      userPermissionsId: user.userpermissions.id,
    },
  });

  const submit = useCallback(
    async (data: IEditUser) => {
      setIsLoading(true);

      const response = await editUser(data, user.id);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        await fetch("/api/revalidate/users");
        refresh();
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [toast, user, refresh]
  );

  return (
    <Card className="bg-[#313131] p-4 w-2/3 max-lg:w-full" shadow="sm">
      <CardHeader>
        <Heading>Edição de usuário</Heading>
      </CardHeader>
      <form onSubmit={handleSubmit(submit)}>
        <CardBody className="flex flex-col gap-4">
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
                readOnly
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
            name="userPermissionsId"
            render={({ field }) => (
              <SelectInput
                {...field}
                size="lg"
                label="Permissões"
                startContent={<Shield className="text-white/60" size={18} />}
                labelPlacement="outside"
                placeholder="Escolha uma permissão"
                defaultSelectedKeys={[field.value]}
                className="w-full"
                isInvalid={!!errors.userPermissionsId?.message}
                errorMessage={errors.userPermissionsId?.message}
              >
                {permissions.map((e) => (
                  <SelectItem key={e.id} value={e.id} className="!text-white">
                    {e.description}
                  </SelectItem>
                ))}
              </SelectInput>
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
        <CardFooter className="flex gap-4 justify-between">
          <Button
            color="secondary"
            type="button"
            radius="full"
            variant="ghost"
            isLoading={isLoading}
            startContent={<ArrowLeft size={16} />}
            onPress={() => push("/users")}
          >
            Voltar
          </Button>
          <Button
            className="button-primary w-fit"
            type="submit"
            isLoading={isLoading}
            endContent={<Save size={18} />}
          >
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
