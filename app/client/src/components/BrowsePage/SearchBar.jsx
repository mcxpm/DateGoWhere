import { PiMagnifyingGlassBold } from 'react-icons/pi';
const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault();

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
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                    autoComplete="on"
                />
                <button className="search-button">
                    <PiMagnifyingGlassBold size={15} color="black" />
                </button>
            </form>
        </header>
    );
};
export default SearchBar;
