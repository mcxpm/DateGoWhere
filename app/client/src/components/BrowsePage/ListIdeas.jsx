import Idea from './Idea';

const ListIdeas = ({ searchResults }) => {
    const results = searchResults.map((idea) => <Idea key={idea.id} idea={idea} />);

    const content = results?.length ? (
        results
    ) : (
        <article>
            <p>No Date Ideas Found</p>
        </article>
    );

    return <> {content}</>;
};
export default ListIdeas;
