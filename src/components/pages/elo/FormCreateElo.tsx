"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { createElo } from "@/service/elo/client";
import { currencyToFloat } from "@/utils/currencyToFloat";
import { formatCurrency } from "@/utils/formatCurrency";
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

const createEloSchema = object().shape({
  name: string().required("Nome é obrigatório"),
  position: string().required("Posição é obrigatório"),
  price: string().required("Preço por tier é obrigatório"),
});

type ICreateEloSchema = InferType<typeof createEloSchema>;

export function FormCreateElo() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push, refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ICreateEloSchema>({
    resolver: yupResolver(createEloSchema),
  });

  const submit = useCallback(
    async (data: ICreateEloSchema) => {
      setIsLoading(true);

      const response = await createElo({
        ...data,
        position: Number(data.position),
        price: currencyToFloat(data.price || "0") || 0,
      });

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        push("/elo");
        refresh();
        await fetch("/api/revalidate/elo");
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
        <Heading>Cadastrar elo</Heading>
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
          <Controller
            control={control}
            name="position"
            render={({ field }) => (
              <TextInput
                {...field}
                type="number"
                label="Posição"
                labelPlacement="outside"
                size="lg"
                placeholder="Digite a posição"
                isInvalid={!!errors.position?.message}
                errorMessage={errors.position?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextInput
                {...field}
                label="Preço"
                type="text"
                labelPlacement="outside"
                size="lg"
                placeholder="Digite um valor"
                onChange={(e) => {
                  setValue("price", formatCurrency(e.target.value));
                }}
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
            onPress={() => push("/elo")}
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
