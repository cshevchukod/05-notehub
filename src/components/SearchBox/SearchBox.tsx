import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (search: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    300,
  );

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearch}
    />
  );
}
