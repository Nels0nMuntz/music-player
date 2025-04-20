import { Input, Label, Spinner } from "@/shared/ui";
import { Search } from "lucide-react";
import { useSearchActions, useSearchText, useIsSearching } from "../model/store/searchStore";

export const SearchInput: React.FC = () => {
  const searchText = useSearchText();
  const isSearching = useIsSearching();
  console.log({isSearching});
  
  const setSearchText = useSearchActions().setSearchText;
  return (
    <div className="relative  flex items-center gap-x-1 max-w-80">
      <Search size={20} className="absolute top-1/2 left-1 -translate-y-1/2" />
      <Label htmlFor="tracks-search" className="sr-only">
        Search by title, artist, or album"
      </Label>
      <Input
        id="tracks-search"
        className="pl-7 pr-8 shadow-none focus-visible:right-1 focus-visible:ring-primary focus-visible:border-primary"
        placeholder="Search by title, artist, or album"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {isSearching && (
        <Spinner size="small" className="absolute top-1/2 right-2 -translate-y-1/2" />
      )}
    </div>
  );
};
