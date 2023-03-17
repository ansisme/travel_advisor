import React, {useState, useEffect} from 'react';

//imports from material-ui
import { CssBaseline, Grid } from '@material-ui/core';

//importing components
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

//importing for rendering data from api=> api folder => index.js
import { getPlacesData} from './api';

const App = () => {         
    //useStates
    const [places,setPlaces] = useState([]);
    const [childClick, setChildClicked] = useState(null);
    const [coordinates,setCoordinates] = useState({});
    const [bounds, setBounds]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType]= useState('restaurants');
    const [rating, setRating]= useState(0);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    // const [flightsData, setFlightsData]= useState([]);
   
    //useEffect for fetching data from api
    //show the user's coordinates ony at the starting, so we have depenedency array empty
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(( {coords: {latitude,longitude}})=>{
            setCoordinates({lat : latitude , lng : longitude});
        })},[]);


    useEffect(()=>{
        const filteredPlaces = places.filter((place)=>place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    },[rating]);


    useEffect(() => {
        if(bounds.sw && bounds.ne)
        setIsLoading(true);
        // getFlightsData(coordinates.lat, coordinates.lng )
        // .then((data)=>setFlightsData(data))
        getPlacesData(type,bounds.sw, bounds.ne )
        .then((data)=> {
           
            setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
        });
}, [type, bounds]);

    return ( 
    <div>
        <h1>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing = { 3 } style = {{ width: '100%' } } >
            <Grid item xs = { 12 } md = { 4 }  >
                <List 
                places = {filteredPlaces.length ? filteredPlaces : places}
                childClick = {childClick}
                isLoading = {isLoading}
                type = {type}
                setType = {setType}
                rating = {rating}
                setRating = {setRating}
                />

        </Grid> 
            <Grid item xs = { 12 } md = { 8 } >
                <Map
                    
                    setCoordinates = {setCoordinates}
                    setBounds = {setBounds} 
                    coordinates = {coordinates}
                    places = {filteredPlaces.length ? filteredPlaces : places} //to get a card component 
                    setChildClicked = {setChildClicked}
                    // flightsData = {flightsData}
        />
        </Grid>
     </Grid>
 </h1> 
</div>
    )
}

export default App;