import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography , useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from  './styles';
import mapStyles from '../../mapStyles';
//map function
const Map=({coordinates, setCoordinates, setBounds, places, setChildClicked, flightsData})=> {
    //hook
    const classes = useStyles();

    //mediaquery hook : will not allow the max width to go beyond 600px
    const isDesktop = useMediaQuery('(min-width: 600px)');
    return ( 
     <div className= {classes.mapContainer}>
        <GoogleMapReact
            bootstrapURLKeys= {{key : process.env.REACT_APP_GOOGLE_MAP_API_KEY}} 
            defaultCenter= {coordinates}
            center= {coordinates}
            defaultZoom = {14}
            margin = {[50,50,50,50]}
            options={{disableDefaultUI:true, zoomControl : true, styles :mapStyles}}
            onChange= {(event)=>{
                setCoordinates({ lat : event.center.lng, lng : event.center.lng})
                setBounds({ne : event.marginBounds.ne, sw : event.marginBounds.sw}) //bottom left and top right
            }}
            onChildClick={(child)=>
                setChildClicked(child)
            }
            >
            
                {places?.map((place, index)=>(
                    <div
                        className={classes.markerContainer}
                        lat = {Number(place.latitude)}
                        lng = {Number(place.longitude)}
                        key = {(index)}
                        >
                        {isDesktop ? (
                            <Paper elevation= {3} className={classes.paper}>
                                <Typography gutterBottom variant='subtitle2' className={classes.typography}>
                                    {place.name}
                                </Typography>
                                <img className={classes.pointer} 
                                src={place.photo ? place.photo.images.large.url :'https://static-otelico.com/cache/montmartre_apolonia/hotel_paris_montmartre_resto.jpg'}
                                    alt = {place.name}
                                />
                                <Rating size = "small" value = {Number(place.rating)} readOnly/>
                        </Paper>
                           

                        ) :
                        <LocationOnOutlinedIcon color = "primary" fontSize='large'/>
                       
                        }
                    </div>
                ))}


                {flightsData?.list?.map((data,index)=>(
                    <div 
                    key = {index}
                    lat = {data.coord.latitude}
                    lng = {data.coord.longitude}>
                        <img height = {100} src = {'https://i.pinimg.com/474x/6e/ab/0c/6eab0c341dcf276ad9e9420ef4ab527e.jpg'}/>
                    </div>
                ))} 
            </GoogleMapReact>
        </div>  
        );
    }

export default Map;

