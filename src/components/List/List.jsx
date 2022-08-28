import React, {useState, useEffect, createRef} from 'react';
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles';

//importing CARD functionality from place details component
import PlaceDetails from '../PlaceDetails/PlaceDetails';
//pasing the places data from the fetched data through api -> index.js of api folder
const List=({places, childClick, isLoading, type, setType, rating, setRating})=>{
    const classes = useStyles();

    // const [type, setType]= useState('restaurants');
    // const [rating, setRating]= useState(0);
    
    //usestate
    const [elRefs, setElRefs] = useState([]);

    //useeffect 
    useEffect(()=>{
        const refs = Array(places?.length).fill().map((_,index) =>  elRefs[index] || createRef());
        setElRefs(refs);
    },[places]);
    
    //this will be shown in the website
    return ( 
        <div className = {classes.container}>
            <Typography variant = "h5">Restaurants, Hotels, and Attractions around you !!</Typography>
            {isLoading ?(
                <div className = {classes.loading}>
                <CircularProgress size = "5rem" />
                </div>
            ) : ( <>
            <FormControl className = {classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select 
                    value = {type}
                    onChange = {(event)=>{
                        setType(event.target.value);
                    }} >
                        <MenuItem value = "restaurants">Restaurants</MenuItem>
                        <MenuItem value = "hotels">Hotels</MenuItem>
                        <MenuItem value = "attractions">Attractions</MenuItem>
                    </Select>
            </FormControl>

            <FormControl className = {classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select 
                    value = {rating}
                    onChange = {(event)=>{
                        setRating(event.target.value);
                    }} >
                        <MenuItem value = {0}>All</MenuItem>
                        <MenuItem value = {3}>Above 3.0 </MenuItem>
                        <MenuItem value = {4}>Above 4.0 </MenuItem>
                        <MenuItem value = {4.5}>Above 4.5</MenuItem>
                 
                    </Select>
            </FormControl>


            <Grid container spacing = {3} className = {classes.list} >
                    
                        {places?.map((place, index)=>
                        (
                            <Grid ref = {elRefs[index]} item key={index} xs={12}>
                                <PlaceDetails 
                                    place= {place}
                                    selected = {Number(childClick)===index}
                                    refProp = {elRefs[index]}
                                />
                            </Grid> 
                        ))};
                         
            </Grid>
            </>
            )};
        </div>
    );
}
export default List;