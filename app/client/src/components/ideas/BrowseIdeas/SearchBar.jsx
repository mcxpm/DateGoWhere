import { TextInput } from '@mantine/core';
import { MdSearch } from 'react-icons/md';
const SearchBar = ({ ideas, setFilteredIdeas }) => {
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) return setFilteredIdeas(ideas);
        const filteredIdeas = ideas.filter(
            (idea) =>
                idea.title.toLowerCase().includes(query) ||
                idea.description?.toLowerCase().includes(query) ||
                idea.tags?.map((tag) => tag.toLowerCase()).includes(query),
        );
        setFilteredIdeas(filteredIdeas);
    };

    return (
        <TextInput
            label="Search by keywords"
            placeholder="North, South, Park, etc."
            leftSection={<MdSearch />}
            onChange={handleSearchChange}
            size="md"
        />
    );
};
export default SearchBar;
