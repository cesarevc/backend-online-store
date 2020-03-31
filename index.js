import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes'

//connection with MongoDB
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsystem';
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true})
.then(mongoose => console.log('BD on port 27017'))
.catch(err => console.log(err));

//Server express
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});