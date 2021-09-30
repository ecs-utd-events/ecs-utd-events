//@author: Arunima and Afrida
import { useState, useEffect, useContext, useMemo } from 'react';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



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

    const sorted = tags.sort((a, b) => a.category.toString() < b.category.toString() ? 1 : -1)

    return (
        <div>
            <h1>Hello World</h1>
           
            <Autocomplete
                multiple
                id="tags-standard"
                options={sorted}
                groupBy={(option) => option.category.toString()}
                getOptionLabel={(option) => option.acronym.toString()}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Tags"
            />
        )}
      />
        </div>
    )
}



