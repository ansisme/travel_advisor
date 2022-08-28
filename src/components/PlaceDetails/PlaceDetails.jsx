import React from 'react';
import { Typography, Box,Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
const PlaceDetails=({place,selected, refProp}) =>
{

    const classes = useStyles();

    if (selected) refProp?.current?.scrollIntoView({behaviour: 'smooth', block : 'start'})
    return (
        <Card elevation = {6}> 
            <CardMedia
                style = {{height : 300}}
                image={place.photo ? place.photo.images.large.url :'https://static-otelico.com/cache/montmartre_apolonia/hotel_paris_montmartre_resto.jpg' }
                title={place.name}

            />
            
        <CardContent >
        
            <Typography gutterBottom variable = "h5">
                <strong>{place.name}</strong>
            </Typography>
            <Box display = "flex" justifyContent="space-between">
                <Rating value ={Number(place.rating)} readOnly/>
                <Typography gutterBottom variable = "subtitle1">out of {place.num_reviews} reviews</Typography>
            </Box>
            <Box display = "flex" justifyContent="space-between">
                <Typography variant = "subtitle1">Price</Typography>
                <Typography gutterBottom variable = "subtitle1">{place.price_level}</Typography>
            </Box>
            <Box display = "flex" justifyContent="space-between">
                <Typography variant = "subtitle1">Ranking</Typography>
                <Typography gutterBottom variable = "subtitle1">{place.ranking}</Typography>
            </Box>
            {
                place?.awards?.map((award) => (
                    <Box my = {1} display="flex" justifyContent="space-between">
                        <img src = {award.images.small} alt = {award.display_name}/>
                        <Typography variant = "subtitle2" color ="textSecondary" >{award.display_name}</Typography>
                    </Box>
                   ))
                   // my => m for margin and y form top and bottom y axis 
            }
            {
                place?.cuisine?.map(({name})=>{
                    <Chip key = {name} size ="small" label={name} className={classes.chip} />
                })
            }
            {
                place?.address&&(
                    <Typography gutterBottom variant="subtitle2" color= "textSecondary" className={classes.subtitle}>
                    <LocationOnIcon/>{place.address}
                    </Typography>
                )
            }
            {
                place?.phone&&(
                    <Typography gutterBottom variant="subtitle2" color= "textSecondary" className={classes.spacing}>
                    <PhoneIcon/>{place.phone}
                    </Typography>
                )
            }
            <CardActions>
                <Button size = "small" color="primary" onClick={()=>(window.open(place.web_url, '_blank'))}>
                    Trip Advisor
                </Button>
                <Button size = "small" color="primary" onClick={()=>(window.open(place.website, '_blank'))}>
                    Website
                </Button>
                        
            </CardActions>
        </CardContent>
        </Card>
         
    );
}
export default PlaceDetails;