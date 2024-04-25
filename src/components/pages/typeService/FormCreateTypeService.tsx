"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { createTypeService } from "@/service/typeService/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const createTypeServiceSchema = object().shape({
  name: string().required("Nome é obrigatório"),
});

type ICreateTypeServiceSchema = InferType<typeof createTypeServiceSchema>;

export function FormCreateTypeService() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push, refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateTypeServiceSchema>({
    resolver: yupResolver(createTypeServiceSchema),
  });

  const submit = useCallback(
    async (data: ICreateTypeServiceSchema) => {
      setIsLoading(true);

      const response = await createTypeService(data);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        push("/typeService");
        refresh();
        await fetch("/api/revalidate/typeService");
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [toast, push, refresh]
  );

  return (
    <Card className="bg-[#313131] p-4 w-2/3 max-lg:w-full" shadow="sm">
      <CardHeader>
        <Heading>Cadastro de tipo de serviço</Heading>
      </CardHeader>
      <form onSubmit={handleSubmit(submit)}>
        <CardBody className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                label="Nome"
                labelPlacement="outside"
                size="lg"
                placeholder="Digite o nome"
                isInvalid={!!errors.name?.message}
                errorMessage={errors.name?.message}
              />
            )}
          />
        </CardBody>
        <CardFooter className="flex gap-4 justify-between">
          <Button
            className="w-fit text-white hover:text-black"
            type="button"
            radius="full"
            variant="ghost"
            isLoading={isLoading}
            startContent={<ArrowLeft size={16} />}
            onPress={() => push("/typeService")}
          >
            Voltar
          </Button>

          <Button
            className="button-primary w-fit"
            type="submit"
            isLoading={isLoading}
            endContent={<Check size={18} />}
          >
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
