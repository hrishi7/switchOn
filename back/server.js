const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

const socketIo = require("socket.io");

const TimeStamp = require('./models/TimeStamp')

const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//connect to database
connectDB();

const app = express();

app.use(cors());
//body parser
app.use(express.json())


const PORT = process.env.PORT || 8081;

const server = app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

const io = socketIo(server);

app.set('socket',io);

const timestamp = require('./routes/timestamp');
const auth = require('./routes/auth');

app.use('/api/timestamp', timestamp);
app.use('/api/auth', auth);



io.on('connection', socket=>{
    console.log("New client connected");
      pipeline = [
        {
          $match : {"operationType" : "insert" }
        }
      ];
      // Define change stream
      const changeStream = TimeStamp.watch(pipeline);
      // start listen to changes
      changeStream.on("change", function(event) {
        socket.emit("FromServer",event.fullDocument);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
})



//Handle unhandled promise rejection
process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    //close server & exit process
    server.close(()=> process.exit(1));
})
