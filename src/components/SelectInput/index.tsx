import { Select, SelectProps } from "@nextui-org/react";

export function SelectInput({ children, isInvalid, ...rest }: SelectProps) {
  return (
    <Select
      {...rest}
      isInvalid={isInvalid}
      classNames={{
        trigger: "bg-[#181818] text-white data-[hover=true]:!bg-[#1d1d1d]",
        listboxWrapper: "max-h-[400px]",
        value: "!text-white",
        label: `!text-white !font-normal !text-sm ${isInvalid && "!top-1/3"}`,
        innerWrapper: "[&>span]:!text-sm",
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
      {children}
    </Select>
  );
}
