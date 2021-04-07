import { useState, useEffect, useContext, useMemo } from 'react';

import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Slider, TextField, ValueLabel } from '@material-ui/core';

import { AllOrgContext } from '../providers/AllOrgProvider';
import '../styles/components.css';

function sortTagsAlphabetically(tagsArr) {
    var sortedArr = tagsArr;
    sortedArr.sort((a, b) => a.name.localeCompare(b.name))
    return sortedArr;
}

function getTimeFromRangeMinutes(value, index) {
    if (value === 0 || value === 1440) {
        return "12:00 AM"
    }
    var minutes = value % 60
    var hours = Math.floor(value / 60)
    var minuteString = "";
    var hoursString = "";
    switch (minutes) {
        case 0: minuteString = "00"; break;
        default: minuteString = minutes.toString();
    }

    if (hours > 13) {
        hours = hours % 12;
    }
    hoursString = hoursString.concat(hours.toString());
    return hoursString + ":" + minuteString + " " + (value >= 720 ? 'PM' : 'AM');
}

function filterEvents(orgFilterValue, tagsFilterValue, timeFilterValue, allEvents, setFilteredEvents) {
    if (allEvents == null || allEvents.length === 0) {
        return;
    }
    var filteredEvents = allEvents
    if (orgFilterValue != null) {
        filteredEvents = filteredEvents.filter(event => event.extendedProps.org.includes(orgFilterValue.uId))
    }
    if (tagsFilterValue.length > 0) {
        filteredEvents = filteredEvents.filter(event => {
            if (event.extendedProps.tags == null)
                return false
            else
                return tagsFilterValue.some(tag => event.extendedProps.tags.includes(tag.name))
        })
    }
    if (timeFilterValue[0] > 0) {
        filteredEvents = filteredEvents.filter(event => {
            if (event.allDay != null && event.allDay) {
                return true;
            }
            const startTime = new Date(new Date(event.start).toLocaleString())
            const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes()
            return timeFilterValue[0] <= startTimeMinutes;
        })
    }
    if (timeFilterValue[1] < 1440) {
        filteredEvents = filteredEvents.filter(event => {
            if (event.allDay != null && event.allDay) {
                return true;
            }
            const endTime = new Date(new Date(event.end).toLocaleString())
            const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes()
            return timeFilterValue[1] >= endTimeMinutes;
        })
    }
    return filteredEvents;
}


export default function HomeFilters({ setFilteredEvents, allEvents }) {
    const [tags, setTags] = useState([]);
    const [timeFilterValue, setTimeFilterValue] = useState([0, 1440])
    const [committedTimeFilterValue, setCommittedTimeFilterValue] = useState([0, 1440])
    const [orgFilterValue, setOrgFilterValue] = useState(null)
    const [tagsFilterValue, setTagsFilterValue] = useState([])
    const [organizations, setOrganizations] = useState([])
    const orgs = useContext(AllOrgContext);

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/tags/all')
            .then(response => response.json())
            .then(data => sortTagsAlphabetically(data))
            .then(sortedTags => setTags(sortedTags))
            .catch(error => {
                console.error('There was an error fetching tags!', error);
            });
    }, [])

    useEffect(() => {
        if (orgs != null) {
            setOrganizations(orgs);
        }
    }, [orgs])

    useEffect(() => {
        const filteredEvents = filterEvents(orgFilterValue, tagsFilterValue, committedTimeFilterValue, allEvents, setFilteredEvents);
        setFilteredEvents(filteredEvents);
    }, [committedTimeFilterValue, orgFilterValue, tagsFilterValue, allEvents])

    return (
        <Row className="home-page-filters mx-1 mt-2">
            <Col xs={12} sm={4} className="d-flex align-items-end pl-2 pr-0">
                <Autocomplete
                    loading={organizations.length === 0}
                    options={organizations.sort((a, b) => a.name.localeCompare(b.name))}
                    renderInput={(params) => <TextField style={{}} {...params} label="organization" margin="normal" />}
                    getOptionLabel={(org) => org.name}
                    onChange={(e, value, _) => setOrgFilterValue(value)}
                    clearOnEscape
                />
            </Col>
            <Col className="d-flex align-items-end">
                <Autocomplete
                    loading={tags.length === 0}
                    options={tags}
                    renderInput={(params) => <TextField {...params} label="tags" margin="normal" />}
                    getOptionLabel={(tag) => tag.name}
                    multiple
                    onChange={(e, value, _) => setTagsFilterValue(value)}
                    classes={{
                        tag: "MuiChip-root custom-tag filter-tag",
                    }}
                />
            </Col>
            <Col className="align-items-end pr-0">
                <Row style={{ width: '100%' }}>
                    <Slider
                        min={0}
                        max={1440}
                        step={15}
                        value={timeFilterValue}
                        onChange={(_, newValue) => setTimeFilterValue(newValue)}
                        onChangeCommitted={(_, newValue) => { setCommittedTimeFilterValue(newValue); setTimeFilterValue(newValue); }}
                        getAriaValueText={getTimeFromRangeMinutes}
                        valueLabelDisplay="auto"
                        valueLabelFormat={getTimeFromRangeMinutes}
                    />
                </Row>
                <Row style={{ width: '100%' }}>
                    <Col xs={6} className="d-flex justify-content-start px-0">start time</Col>
                    <Col xs={6} className="d-flex justify-content-end px-0">end time</Col>
                </Row>
            </Col>
        </Row>
    )
}