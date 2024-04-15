"use client";
import { ChartLine } from "@/components/Charts/ChartLine";
import { Heading } from "@/components/Heading";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

export function CardService() {
  return (
    <Card className="bg-[#2C2C2C] border border-[#545454] px-4 py-2 col-span-8">
      <CardHeader className="flex justify-between w-full items-center gap-16">
        <Heading size="sm">Serviços</Heading>
        <Select
          size="sm"
          defaultSelectedKeys={["year"]}
          className="w-[110px]"
          classNames={{
            trigger: "bg-[#181818] text-white data-[hover=true]:!bg-[#1d1d1d]",
            listboxWrapper: "max-h-[400px]",
            value: "!text-white",
          }}
          listboxProps={{
            itemClasses: {
              title: "text-white",
              base: [
                "bg-[#181818]",
                "rounded-md",
                "!text-zinc-300",
                "text-default-500",
                "data-[hover=true]:!bg-[#242424]",
                "data-[hover=true]:!text-white",
                "data-[focus-visible=true]:ring-default-500",
                "data-[selectable=true]:focus:bg-[#1d1d1d]",
              ],
            },
          }}
          popoverProps={{
            classNames: {
              content: "p-0 border-small border-divider bg-[#181818]",
            },
          }}
        >
          <SelectItem key={"year"} value={"year"}>
            1 ano
          </SelectItem>
          <SelectItem key={"mouth"} value={"mouth"}>
            1 mês
          </SelectItem>
          <SelectItem key={"week"} value={"week"}>
            1 semana
          </SelectItem>
          <SelectItem key={"day"} value={"day"}>
            1 dia
          </SelectItem>
        </Select>
      </CardHeader>
      <CardBody className="w-full h-[300px]">
        <ChartLine />
      </CardBody>
    </Card>
  );
}
