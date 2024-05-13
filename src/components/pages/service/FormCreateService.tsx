"use client";
import { Heading } from "@/components/Heading";
import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import { createService } from "@/service/services/client";
import { ICreateService, IRangeValues } from "@/service/services/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { ArrowLeft, Check, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { InferType, object, string } from "yup";

const createServiceSchema = object().shape({
  name: string().required("Nome é obrigatório"),
});

type ICreateServiceSchema = InferType<typeof createServiceSchema>;

interface IRangeValuesWithID extends IRangeValues {
  id: string;
}

export function FormCreateService() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { push, refresh } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [rangeValue, setRangeValue] = useState<IRangeValuesWithID[]>([
    { name: "", id: uuidv4() },
  ]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ICreateServiceSchema>({
    resolver: yupResolver(createServiceSchema),
  });

  const removeItemRangeValues = (id: string) => {
    const newArray = rangeValue.filter((e) => e.id !== id);
    setRangeValue(newArray);
  };

  const submit = useCallback(
    async (data: ICreateServiceSchema) => {
      setIsLoading(true);

      const newData = {
        ...data,
        rangeValues: rangeValue.filter((e) => {
          if (!e.percent && !e.name && !e.value) {
            return;
          }
          return {
            name: e.name,
            percent: e.percent,
            value: e.value,
          };
        }),
      } as ICreateService;

      console.log(newData);

      const response = await createService(newData);

      if (response && response.result === "success") {
        toast({
          description: response.message,
          title: "Sucesso!",
          className: "toast-success",
        });
        push("/service");
        refresh();
        await fetch("/api/revalidate/service");
      } else {
        toast({
          description: response?.message || "Tente novamente mais tarde!",
          variant: "destructive",
          title: "Erro!",
        });
      }
      setIsLoading(false);
    },
    [toast, push, refresh, rangeValue]
  );

  const updateRangeValue = (id: string, field: string, newValue: string) => {
    setRangeValue((prevRangeValue) => {
      return prevRangeValue.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: newValue };
        } else {
          return item;
        }
      });
    });
  };

  return (
    <>
      <Card className="bg-[#313131] p-4 w-2/3 max-lg:w-full" shadow="sm">
        <CardHeader>
          <Heading>Cadastro de serviço</Heading>
        </CardHeader>
        <form onSubmit={handleSubmit(submit)}>
          <CardBody className="flex flex-col gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Nome"
                  type="text"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Digite o nome"
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name?.message}
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
              onPress={() => push("/service")}
            >
              Voltar
            </Button>
            <div className="flex gap-4">
              <Button
                color="secondary"
                type="button"
                radius="full"
                variant="ghost"
                isLoading={isLoading}
                onPress={onOpen}
              >
                Adicionar condição
              </Button>
              <Button
                className="button-primary w-fit"
                type="submit"
                isLoading={isLoading}
                endContent={<Check size={18} />}
              >
                Cadastrar
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        size="3xl"
      >
        <ModalContent className="bg-zinc-800">
          <ModalHeader className="flex flex-col gap-1">
            Adicione condições para o serviço
          </ModalHeader>
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody className="flex gap-4 flex-col">
              {rangeValue.map((e, i) => (
                <div key={i} className="flex gap-4 w-full items-end">
                  <TextInput
                    label="Nome"
                    className="w-full"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Digite o nome"
                    defaultValue={e.name}
                    onChange={(event) =>
                      updateRangeValue(e.id, "name", event.target.value)
                    }
                    errorMessage={!e.name && "O nome é obrigatório"}
                    isInvalid={!!e.name}
                  />
                  <TextInput
                    label="Porcentagem"
                    className="w-full"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Digite a porcentagem"
                    defaultValue={e.percent ? String(e.percent) : ""}
                    onChange={(event) =>
                      updateRangeValue(e.id, "percent", event.target.value)
                    }
                    name={e.id}
                    errorMessage={
                      !e.value && !e.percent && "Preencha valor ou porcentagem"
                    }
                    isInvalid={!!e.value && !!e.percent}
                  />
                  <TextInput
                    label="Valor (R$)"
                    className="w-full"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Digite o valor"
                    defaultValue={e.value ? String(e.value) : ""}
                    onChange={(event) =>
                      updateRangeValue(e.id, "value", event.target.value)
                    }
                    name={e.id}
                    errorMessage={
                      !e.value && !e.percent && "Preencha valor ou porcentagem"
                    }
                    isInvalid={!!e.value && !!e.percent}
                  />

                  <Button
                    color="danger"
                    variant="ghost"
                    radius="full"
                    className={clsx("min-w-10 !p-0 mb-1", {
                      "mb-7": !e.name || (!e.percent && !e.value),
                    })}
                    isDisabled={!rangeValue[1]}
                    onPress={() => removeItemRangeValues(e.id)}
                  >
                    <Trash size={18} />
                  </Button>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                radius="full"
                className="uppercase"
                onPress={() => {
                  onClose();
                }}
              >
                Fechar
              </Button>
              <Button
                className="button-primary"
                radius="full"
                onPress={() => {
                  if (!rangeValue[5]) {
                    setRangeValue((prev) => [
                      ...prev,
                      { name: "", id: uuidv4() },
                    ]);
                  } else {
                    toast({
                      description: "Não é permitido criar mais que 6 faixas!",
                      variant: "destructive",
                      title: "Erro!",
                    });
                  }
                }}
                endContent={<Plus size={16} />}
              >
                Nova condição
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
