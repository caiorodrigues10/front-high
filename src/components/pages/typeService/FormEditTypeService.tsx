"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { editTypeService } from "@/service/typeService/client";
import { ITypeService } from "@/service/typeService/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const editTypeServiceSchema = object().shape({
  name: string().required("Nome é obrigatório"),
});

type IEditTypeServiceSchema = InferType<typeof editTypeServiceSchema>;

export function FormEditTypeService({
  typeService,
}: {
  typeService: ITypeService;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push, refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditTypeServiceSchema>({
    resolver: yupResolver(editTypeServiceSchema),
    defaultValues: {
      name: typeService.name,
    },
  });

  function currencyToFloat(valor: string) {
    const clearValue = valor.replace(/[^\d.,]/g, "");

    const valueWithDot = clearValue.replace(",", ".");

    const floatValue = parseFloat(valueWithDot);

    return floatValue;
  }

  const submit = useCallback(
    async (data: IEditTypeServiceSchema) => {
      setIsLoading(true);
      const response = await editTypeService(data, typeService.id);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        await fetch("/api/revalidate/typeService");
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
    [toast, refresh, typeService]
  );

  return (
    <Card className="bg-[#313131] p-4 w-2/3 max-lg:w-full" shadow="sm">
      <CardHeader>
        <Heading>Editar tipo de serviço</Heading>
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
            endContent={<Save size={18} />}
          >
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
