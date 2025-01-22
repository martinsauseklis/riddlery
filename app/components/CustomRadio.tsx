import { Radio, cn } from "@heroui/react";

export default function CustomRadio(props) {
  const { children, ...otherProps } = props;
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-center      ",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
          "w-1/3 h-fit"
        ),
        wrapper: cn("hidden"),
      }}
    >
      {children}
    </Radio>
  );
}