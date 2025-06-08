const {createApi} = require('unsplash-js');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')});

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});



const getImage = async (query) => {
  try{
    const response=await unsplash.search.getPhotos({
        query: query,
        page: 1,
        perPage: 1,
        orientation: 'landscape',
      });
    
    
    return response && response.response && response.response.results && response.response.results.length > 0
      ? (response.response.results[0].urls?.regular || response.response.results[0])
      : [];

  }
  catch(error) {
    console.error('Error fetching image from Unsplash:', error);
    return [];
  } 
}

module.exports = { getImage };