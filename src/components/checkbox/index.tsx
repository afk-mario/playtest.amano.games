import type { ReactNode } from "react";
import classnames from "classnames";
import * as BaseCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import "./styles.css";

export const baseClassName = "c-checkbox";

function Checkbox({
  className,
  label,
  checked,
  ...rest
}: Omit<BaseCheckbox.CheckboxProps, "children"> & {
  label?: ReactNode;
}) {
  const customClassName = classnames(`${baseClassName}`, className);

  return (
    <BaseCheckbox.Root className={`${customClassName}`} {...rest}>
      <BaseCheckbox.Indicator
        forceMount
        className={`${customClassName}-indicator`}
      >
        {checked === "indeterminate" ? (
          <Minus />
        ) : (
          <Check className={`${baseClassName}-indicator-icon`} />
        )}
      </BaseCheckbox.Indicator>
      {label ? (
        <label
          className={`${baseClassName}-label | cluster`}
          data-disabled={rest.disabled}
        >
          <span>{label}</span>
        </label>
      ) : null}
    </BaseCheckbox.Root>
  );
}

export default Checkbox;
