import axios from "axios";

const API_URL = 'https://api.bluelytics.com.ar/v2/latest';

const cotizacion = {

    async getDolarBlue () {
        try {
            const response = await axios.get(API_URL)
            return response.data.blue.value_sell
        }
        catch(error){
            console.log(`Error fetching details for cotizacion:`, error)
        }
    },

        
}


export default cotizacion;