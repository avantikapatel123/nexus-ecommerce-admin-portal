import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <Search size={18} className="search-icon" />
      <input
        type="search"
        className="search-input"
        placeholder="Search catalog by title or category..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
