import express, { Request, Response } from 'express';
import {connection} from "./DB/connection"
import bodyParser from 'body-parser';
import router from './Routers/allinOneRouter';
const app = express();
const port = 8000;


app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded



app.use('/api',router)

connection().then(()=>{
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
})


