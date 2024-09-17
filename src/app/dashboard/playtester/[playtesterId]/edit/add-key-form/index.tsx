"use client";

import { CircleX } from "lucide-react";
import React from "react";
import { useCombobox } from "downshift";
import * as Popover from "@radix-ui/react-popover";

import { addKey } from "../actions";
import { Tables } from "types/supabase";

import "./styles.css";

function getGameKeyFilter(inputValue: string) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return function keyFilter(key: Tables<"game_key">) {
    return !inputValue || key.url?.toLowerCase().includes(lowerCasedInputValue);
  };
}

export default function AddKeyForm({
  playtesterId,
  defaultKeys = [],
}: {
  playtesterId: number;
  defaultKeys?: Tables<"game_key">[];
}) {
  const [items, setItems] = React.useState<Tables<"game_key">[]>(defaultKeys);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      if (inputValue == "") {
        setItems(defaultKeys);
      } else {
        setItems(defaultKeys.filter(getGameKeyFilter(inputValue)));
      }
    },
    items,
    itemToKey(item: Tables<"game_key">) {
      return item?.id;
    },
    itemToString(item: Tables<"game_key">) {
      return item.url?.toString() || "";
    },
  });

  return (
    <form action={addKey} id="addKey" className="c-add-key-form">
      <input
        name="playtesterId"
        type="text"
        value={playtesterId || undefined}
        readOnly
        hidden
      />
      <input
        type="text"
        name="keyId"
        value={selectedItem?.id || ""}
        readOnly
        hidden
      />

      <Popover.Root open={isOpen}>
        <label className="" {...getLabelProps()}>
          Itch.io key
        </label>
        <Popover.Anchor asChild>
          <input placeholder="Itch key" className="" {...getInputProps()} />
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            className="c-add-key-popover-content"
            sideOffset={5}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
            }}
          >
            <div>
              <header className="c-add-key-popover-header | cluster">
                <span>
                  {items.length}/{defaultKeys.length}
                </span>
                <Popover.Close
                  className="c-add-key-popover-close"
                  aria-label="Close"
                  {...getToggleButtonProps()}
                >
                  <CircleX />
                </Popover.Close>
              </header>
              <ul
                className="c-add-key-list"
                data-open={isOpen && items.length}
                {...getMenuProps()}
              >
                {items.map((item, index) => (
                  <li
                    className="c-add-key-row"
                    data-hl={highlightedIndex == index}
                    data-selected={selectedItem == item}
                    key={item.id}
                    {...getItemProps({ item, index })}
                  >
                    <span className="">{item.url?.slice(72)}</span>
                  </li>
                ))}
              </ul>
              {items.length == 0 ? (
                <span className="c-add-key-empty">No items</span>
              ) : null}
            </div>
            <Popover.Arrow className="c-add-key-popover-arrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <button type="submit">Add</button>
    </form>
  );
}
