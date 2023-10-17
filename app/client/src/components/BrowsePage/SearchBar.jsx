import { TextInput } from '@mantine/core';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
const SearchBar = ({ posts, setSearchResults }) => {
    const handleSearchChange = (e) => {
        const upperSearch = e.target.value.toLowerCase();
        if (!upperSearch) return setSearchResults(posts);
        const resultsArray = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(upperSearch) ||
                post.country.toLowerCase().includes(upperSearch) ||
                post.description.toLowerCase().includes(upperSearch),
        );
        setSearchResults(resultsArray);
    };

    return (
        <TextInput
            label="Search by keywords"
            placeholder="North, South, Park, etc."
            leftSection={<PiMagnifyingGlassBold />}
            onChange={handleSearchChange}
            size="md"
        />
    );
};
export default SearchBar;
