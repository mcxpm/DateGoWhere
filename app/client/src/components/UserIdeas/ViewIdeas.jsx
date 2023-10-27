import { useEffect,useState } from 'react';

import useAuth from "../../hooks/use-auth";
import { getIdea, getUserIdeas } from '../../utils/IdeaUtils';

export default function ViewIdeas() {
    const {user, loading} = useAuth();
    const [list, setList] = useState([]);
    const [ideaObjects, setIdeaObjects] = useState([]);

    useEffect(() => {
        if (user) {
            const id = user.uid
            getUserIdeas(id).then(ideasList => {
                setList(ideasList.ideas || []);
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchIdeaObjects = async () => {
            const ideaObjectsArray = [];
            for (const idea of list) {
                const obj = await getIdea(idea);
                const details = obj.data()
                console.log(details)
                ideaObjectsArray.push(obj);
            }
            setIdeaObjects(ideaObjectsArray);
        };

        if (list.length > 0) {
            fetchIdeaObjects();
        }
    }, [list]);

    if (list.length === 0) {
        return  <div className="">empty</div>
    }
    
    if (!user) {
        return <div className="">Please login</div>
    }

    return (
        //can use the ideaobjects array that has the info for all the reviews that a user has
        <div className="">
            {list.map((obj, index) => (
                <p key={index}>{obj}</p>
            ))}
        </div>
    );
}
