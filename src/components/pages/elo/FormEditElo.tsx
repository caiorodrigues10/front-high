"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { editElo } from "@/service/elo/client";
import { IElo } from "@/service/elo/types";
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

const editEloSchema = object().shape({
  name: string().required("Nome é obrigatório"),
  position: string().required("Posição é obrigatório"),
});

type IEditEloSchema = InferType<typeof editEloSchema>;

export function FormEditElo({ elo }: { elo: IElo }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push, refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditEloSchema>({
    resolver: yupResolver(editEloSchema),
    defaultValues: {
      name: elo.name,
      position: String(elo.position),
    },
  });

  const submit = useCallback(
    async (data: IEditEloSchema) => {
      setIsLoading(true);
      const response = await editElo(
        { ...data, position: Number(data.position) },
        elo.id
      );

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        await fetch("/api/revalidate/elo");
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
    [toast, refresh, elo]
  );

  return (
    <Card className="bg-[#313131] p-4 w-2/3 max-lg:w-full" shadow="sm">
      <CardHeader>
        <Heading>Editar elo</Heading>
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
        </CardBody>
        <CardFooter className="flex gap-4 justify-between">
          <Button
            className="w-fit text-white hover:text-black"
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
            endContent={<Save size={18} />}
          >
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
