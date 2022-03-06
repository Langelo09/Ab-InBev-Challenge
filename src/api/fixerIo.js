import Axios from 'axios'

const host = process.env.VUE_APP_ROOT_API
const ApiKey = process.env.VUE_APP_ROOT_APIKEY

const getDataFixer = async(date) => {
    return await Axios.get(`${host}/${date}?access_key=${ApiKey}&symbols=MXN,USD,AUD,CAD,PLN,NZD,CHF,GBP,DOP,EUR`)
}

export default getDataFixer