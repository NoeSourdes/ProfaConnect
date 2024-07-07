import { type ReactNode } from "react";

import type { UseEmojiPickerType } from "@udecode/plate-emoji";

export type EmojiPickerSearchBarProps = {
  children: ReactNode;
} & Pick<UseEmojiPickerType, "i18n" | "searchValue" | "setSearch">;

export function EmojiPickerSearchBar({
  children,
  i18n,
  searchValue,
  setSearch,
}: EmojiPickerSearchBarProps) {
  return (
    <div className="flex items-center px-2">
      <div className="relative flex grow">
        <input
          aria-label="Rechercher"
          autoComplete="off"
          className="block w-full appearance-none rounded-lg border-0 bg-secondary px-8 py-2 outline-none"
          onChange={(event) => setSearch(event.target.value)}
          placeholder={"Rechercher"}
          type="text"
          value={searchValue}
        />
        {children}
      </div>
    </div>
  );
}
