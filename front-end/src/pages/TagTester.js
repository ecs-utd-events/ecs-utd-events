//@author: Arunima and Afrida
import { useState, useEffect, useContext, useMemo } from 'react';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
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
            {/* <Autocomplete
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
            /> */}

        <Row className="home-page-filters mx-1 mt-2">
            {/* organizations filter */}
            <Col xs={12} sm={4} className="d-flex align-items-end pl-2 pr-0">
            <Autocomplete
                name="tags"
                options={sorted}
                groupBy={(option) => option.category.toString()}
                getOptionLabel={(option) => option.acronym.toString()}
                //onChange={(e, value, _) => setOrgFilterValue(getOrgIds(value))}
                loading={tags.length === 0}
                renderInput={(params) => 
                    <TextField 
                        style={{}} 
                        {...params} 
                        margin="small" 
                    />}
                getOptionSelected={(option, value) => option.acronym === value.acronym}
                limitTags={1}
                
                // clearOnEscape
                multiple
            />
            </Col>
        </Row>
        </div>
    )
}



