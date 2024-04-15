"use client";
import { Heading } from "@/components/Heading";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import Image from "next/image";

export function CardJobers() {
  return (
    <Card className="bg-[#2C2C2C] border border-[#545454] px-4 py-2 col-span-4">
      <CardHeader className="flex justify-between w-full items-center gap-16">
        <Heading size="sm">Top Jobers</Heading>
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
      <CardBody className="flex flex-col gap-4">
        {[
          {
            name: "Lucas Coelho",
            services: 50,
            position: 1,
            image: "",
            positionProgress: "up",
          },
          {
            name: "Lucas Coelho",
            services: 30,
            position: 2,
            image: "",
            positionProgress: "down",
          },
          {
            name: "Lucas Coelho",
            services: 20,
            position: 3,
            image: "",
            positionProgress: "n/d",
          },
          {
            name: "Lucas Coelho",
            services: 19,
            position: 4,
            image: "",
            positionProgress: "n/d",
          },
          {
            name: "Lucas Coelho",
            services: 5,
            position: 5,
            image: "",
            positionProgress: "n/d",
          },
        ].map((e, i) => (
          <div className="flex w-full justify-between items-center" key={i}>
            <div className="flex gap-4 w-full items-center">
              <Image
                src={e.image || "/user-default.png"}
                height={40}
                width={40}
                alt="Imagem do usuário"
                className="rounded-full h-[40px]"
              />
              <div className="flex flex-col gap-1">
                <Heading className="!font-semibold">{e.name}</Heading>
                <p className="text-[#848484]">{e.services} serviços</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Heading
                size={e.position !== 1 ? "md" : "lg"}
                className={clsx({ "text-[#B7B7B7] ": e.position !== 1 })}
              >
                {e.position}°
              </Heading>
              {e.positionProgress === "up" && (
                <ChevronUp size={24} color="#2CAF00" />
              )}
              {e.positionProgress === "down" && (
                <ChevronDown size={24} color="#FF5959" />
              )}
              {e.positionProgress === "n/d" && (
                <Minus size={24} color="#6E6E6E" />
              )}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
