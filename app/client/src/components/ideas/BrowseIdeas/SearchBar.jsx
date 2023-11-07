import { TextInput } from '@mantine/core';
import { MdSearch } from 'react-icons/md';
const SearchBar = ({ filter, setQuery, handleSearchAndFilter }) => {
    return (
        <TextInput
            label="Search by keywords"
            placeholder="North, South, Park, etc."
            leftSection={<MdSearch />}
            onChange={(e) => {
                setQuery(e.target.value);
                handleSearchAndFilter(e.target.value, filter);
            }}
            size="md"
        />
    );
};
export default SearchBar;
