import axios from 'axios';

export const geoApiOptions = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'x-rapidapi-key': '85948da080msh5e4f17b23a96b26p17c49bjsn2f832648de63',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};
try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
