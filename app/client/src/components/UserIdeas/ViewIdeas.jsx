import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Progress, Anchor, Text, Group, Button} from '@mantine/core';

import useAuth from '../../hooks/use-auth';
import { getIdea, getUserIdeas } from '../../utils/IdeaUtils';
import { useNavigate } from 'react-router-dom';

export default function ViewIdeas() {
    const navigate = useNavigate();
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
                ideaObjectsArray.push({id: obj.id, ...details});
            }
            console.log(ideaObjectsArray)
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

    const ideas = ideaObjects.map((obj, index) => {
        
    return (
            
           
            <Table.Tr key={index} style={{ backgroundColor: obj.isPublished ? 'white' : 'lightgray' }}>

            <Table.Td style = {{fontWeight: 'bold'}}>
                {obj.title}
            </Table.Td>



            <Table.Td>
                {obj.isPublished.toString()}
            </Table.Td>
            
            <Table.Td>
                {obj.isPublic.toString()}
            </Table.Td>

            <Table.Td>0</Table.Td>
            <Table.Td>
            <Button radius="md" variant="outline" color="rgba(255, 130, 130, 1)" style={{ flex: 1, marginRight:"3px"}} onClick={() => {navigate(`/ideas/view/${obj.id}`);}}>View</Button>
            <Button radius="md" variant="outline" color="rgba(255, 130, 130, 1)" style={{ flex: 1 ,marginRight:"50px"}} /*onClick={() => {navigate(`/ideas/view/${obj.id}`);}}*/>Edit</Button>
            <Button radius="md" variant="filled" color="rgba(207, 52, 52, 1)" style={{ flex: 1 }} /*onClick={() => {navigate(`/ideas/view/${obj.id}`);}}*/>DELETE</Button>
            </Table.Td>
        </Table.Tr>
    );    
        });
        
    return (
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date Title</Table.Th>

                <Table.Th>Published?</Table.Th>
                <Table.Th>Public?</Table.Th>
                <Table.Th>Likes</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{ideas}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      );
    
}

