import { Input, InputProps } from "@nextui-org/react";

export function TextInput({ ...rest }: InputProps) {
  const styles = {
    label: "!text-white text-sm",
    input: [
      "bg-transparent",
      "!text-white/90 text-sm",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    inputWrapper: [
      "shadow-xl",
      "!bg-[#181818]",
      "hover:!bg-[#161616]",
      "focus-within:!bg-[#161616]",
      "!cursor-text",
    ],
  };

  return <Input {...rest} classNames={{ ...styles }} />;
}