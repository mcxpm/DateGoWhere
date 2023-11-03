import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAuth from '../../hooks/use-auth';
import { getIdea, getUserIdeas } from '../../utils/IdeaUtils';

export default function ViewIdeas() {
    const { id } = useParams();
    const { user, loading } = useAuth();
    const [list, setList] = useState([]);
    const [ideaObjects, setIdeaObjects] = useState([]);

    useEffect(() => {
        if (user) {
            // const id = user.uid;
            getUserIdeas(id).then((ideasList) => {
                setList(ideasList.ideas || []);
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchIdeaObjects = async () => {
            const ideaObjectsArray = [];
            for (const idea of list) {
                const obj = await getIdea(idea);
                const details = obj.data();
                ideaObjectsArray.push(details);
            }
            setIdeaObjects(ideaObjectsArray);
        };

        if (list.length > 0) {
            fetchIdeaObjects();
        }
    }, [list]);

    if (loading) {
        return <div>loading</div>;
    }

    if (!user) {
        return <div className="">Please login</div>;
    }

    if (list.length === 0) {
        return <div className="">empty</div>;
    }

    return (
        <div className="">
            {id}
            {ideaObjects.map((obj, index) => (
                <div key={index}>
                    {JSON.stringify(obj)}
                    <p>Created by: {obj.createdBy}</p>
                    <p>Is Published: {obj.isPublished.toString()}</p>
                    <p>Is Public: {obj.isPublic.toString()}</p>
                </div>
            ))}
        </div>
    );
}
