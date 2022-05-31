const express = require("express");
const cors  = require("cors");
const connect_to_mongo = require("./db");

connect_to_mongo();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/userdet',require('./routes/userdet'));

if(process.env.NODE_ENV === 'production')
{
 app.use(express.static("../build"));   
}
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Megamind app listening on port ${port}`)
  })

  