"use client";

import { useSearchDocuments } from "@/src/hooks/documents/use-search-documents";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const SearchComponent = () => {
  const { setSearchZustand } = useSearchDocuments();
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  useEffect(() => {
    setSearchZustand(search);
  }, [search, setSearchZustand]);

  return (
    <div className="w-full border rounded-md flex items-center px-2 mr-3 bg-background">
      <Search width={18} className="text-muted-foreground" />
      <input
        defaultValue={search}
        className="flex h-9 w-full rounded-md border-input bg-background px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
        type="text"
        id="search"
        placeholder="Rechercher un documents"
        onChange={(e) => {
          setSearchZustand(e.target.value);
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};
