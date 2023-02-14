import axios from 'axios';
export const getPlacesData = async(type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat, //tr= top right
                bl_longitude: sw.lng, //bl= bottom left
                tr_longitude: ne.lng,

            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'Access-Control-Allow-Origin': '*',
            }
        });
        return data;
    } catch (error) {
        console.log(error.message)
    }
}


// export const getFlightsData = async(lat, lng) => {
//     try {
//         const { data } = await axios.get('https://nearby-airport.p.rapidapi.com/airport/nearby', {
//             params: {
//                 longitude: lng,
//                 latitude: lat,
//             },
//             headers: {
//                 'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
//                 'X-RapidAPI-Host': 'nearby-airport.p.rapidapi.com',
//                 'Access-Control-Allow-Origin': '*',
//             }
//         });
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }