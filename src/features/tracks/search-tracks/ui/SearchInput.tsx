import { Search } from "lucide-react";
import { useSearchText } from "@/shared/model";
import { Input, Label, Spinner } from "@/shared/ui";
import { useIsSearching, useSettingsActions } from "@/shared/model/stores/settingsStore";

export const SearchInput: React.FC = () => {
  const searchText = useSearchText();
  const isSearching = useIsSearching();
  const { setSearchText } = useSettingsActions();
  return (
    <div className="relative  flex items-center gap-x-1 xs:max-w-[320px] w-full">
      <Search size={20} className="absolute top-1/2 left-1 -translate-y-1/2" />
      <Label htmlFor="tracks-search" className="sr-only">
        Search by title, artist, or album"
      </Label>
      <Input
        id="tracks-search"
        className="w-full pl-7 pr-8 border border-primary bg-white shadow-none focus-visible:right-1 focus-visible:ring-primary focus-visible:border-primary"
        placeholder="Search by title, artist, or album"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        data-testid="search-input"
      />
      {isSearching && (
        <Spinner size="small" className="absolute top-1/2 right-2 -translate-y-1/2" />
      )}
    </div>
  );
};
