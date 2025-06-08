const express = require('express');
const router = express.Router();
const {getImage} = require('../Unsplash/imageGet');
const {getImageLabels} = require('../OpenApi/getImageLabels');
const app=express();
PORT=process.env.PORT || 3000;
app.use(express.json());

router.get('/getImage',async (req,res)=>{
  try{

    const query=req.query.q;
    if(!query){
      return res.status(400).json({error:"Request query is required"});
    }
    else{
      const response=await getImage(query);
      if(response && response.length > 0) {

        const imageUrl=response? response:null;
        const labels=await getImageLabels(imageUrl);
        return res.status(200).json({
          image: imageUrl,
          labels: labels
        });
        
      } else {
        return res.status(404).json({error: 'No images found'});
      }
    }

  }
  catch(error) {
    console.error('Error in /getImage route:', error);
    return res.status(500).json({error: 'Internal server error'});
  }

});




app.use('/VisionSnap/api',router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app; 0