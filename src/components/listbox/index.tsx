import { ChevronDown, ChevronUp, Check } from "lucide-react";
import * as BaseListbox from "@radix-ui/react-select";

import "./styles.css";

export const baseClassName = "c-listbox";

interface ListboxProps extends BaseListbox.SelectProps {
  placeholder?: string;
  options?: { value: string; children: React.ReactNode; disabled?: boolean }[];
}

// TODO: Add wrapper to override class name
function Listbox({ options = [], placeholder, ...rest }: ListboxProps) {
  // const customClassName = classnames(`${baseClassName}`, className);

  return (
    <BaseListbox.Root {...rest}>
      <BaseListbox.Trigger className={`${baseClassName}-trigger`}>
        <BaseListbox.Value placeholder={placeholder} />
        <BaseListbox.Icon className={`${baseClassName}-trigger-indicator`}>
          <ChevronDown />
        </BaseListbox.Icon>
      </BaseListbox.Trigger>

      <BaseListbox.Portal>
        <BaseListbox.Content className={`${baseClassName}-content`}>
          <BaseListbox.ScrollUpButton
            className={`${baseClassName}-scroll-button`}
          >
            <ChevronUp />
          </BaseListbox.ScrollUpButton>
          <BaseListbox.Viewport className={`${baseClassName}-list`}>
            {options.map(({ value, children, disabled }) => {
              return (
                <BaseListbox.Item
                  key={value}
                  value={value}
                  className={`${baseClassName}-item`}
                  disabled={disabled}
                >
                  <BaseListbox.ItemIndicator
                    className={`${baseClassName}-item-indicator`}
                  >
                    <Check />
                  </BaseListbox.ItemIndicator>
                  <BaseListbox.ItemText>{children}</BaseListbox.ItemText>
                </BaseListbox.Item>
              );
            })}
          </BaseListbox.Viewport>
          <BaseListbox.ScrollDownButton
            className={`${baseClassName}-scroll-button`}
          >
            <ChevronDown />
          </BaseListbox.ScrollDownButton>
          <BaseListbox.Arrow />
        </BaseListbox.Content>
      </BaseListbox.Portal>
    </BaseListbox.Root>
  );
}

export default Listbox;
