//@author: Arunima and Afrida
import { useState, useEffect, useContext, useMemo } from 'react';
import Tag from '../components/Tag';
import Chip from '@material-ui/core/Chip';



export default function TagTester() {
    const [tags, setTags] = useState([])

    useEffect(() => {
        //fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/tags/all')
        fetch('http://localhost:80' + '/api/tags/all')
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(error => {
                console.error('There was an error fetching tags!', error);
            });
    }, [])

    return (
        <div>
            <h1>Hello World</h1>
            {tags.map((label, index) => <Chip label={label.acronym} variant="outlined" onDelete={console.log("DELETE")} />)}
        </div>
    )
}


