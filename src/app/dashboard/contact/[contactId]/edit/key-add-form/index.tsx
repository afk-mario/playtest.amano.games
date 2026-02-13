"use client";

import { CircleX, CirclePlus } from "lucide-react";
import React, { useActionState } from "react";
import { useCombobox } from "downshift";
import * as Popover from "@radix-ui/react-popover";

import { addKey } from "../actions";
import { Tables } from "types/supabase";

import "./styles.css";
import Spinner from "components/spinner";

interface GameKeyWithGame extends Omit<Tables<"game_key">, "game"> {
  game: Tables<"game">;
}

function getGameKeyFilter(inputValue: string) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return function keyFilter(key: GameKeyWithGame) {
    return !inputValue || key.url?.toLowerCase().includes(lowerCasedInputValue);
  };
}

export default function KeyAddForm({
  playtesterId,
  defaultKeys = [],
}: {
  playtesterId: number;
  defaultKeys?: GameKeyWithGame[];
}) {
  const [items, setItems] = React.useState<GameKeyWithGame[]>(defaultKeys);
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
    itemToKey(item: GameKeyWithGame) {
      return item?.id;
    },
    itemToString(item: GameKeyWithGame) {
      return item.url?.toString() || "";
    },
  });
  const [, action, pending] = useActionState(addKey, false);

  return (
    <form action={action} id="addKey" className="c-add-key-form">
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

      <div className="c-key-field">
        <Popover.Root open={isOpen}>
          <label className="" {...getLabelProps()}>
            Itch.io Key
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
                  {...getMenuProps({}, { suppressRefError: true })}
                >
                  {items.map((item, index) => (
                    <li
                      className="c-add-key-row"
                      data-hl={highlightedIndex == index}
                      data-selected={selectedItem == item}
                      key={item.id}
                      {...getItemProps({ item, index })}
                    >
                      <span className="">{item.game?.name} - </span>
                      <span className="">{item.id}</span>
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
      </div>

      <button className="c-button" type="submit" disabled={pending}>
        {pending ? <Spinner /> : <CirclePlus />} Add
      </button>
    </form>
  );
}
