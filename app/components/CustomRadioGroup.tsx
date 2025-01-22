import { RadioGroup } from "@heroui/react";

export default function CustomRadioGroup(props) {

  const { children, ...otherProps } = props;

  return <RadioGroup {...otherProps}>{children}</RadioGroup>;
}
