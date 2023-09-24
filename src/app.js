import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import path from "path";
import { Server } from 'socket.io';
import __dirname from './utils.js'
import { router as productsRoute } from './routes/productsRoute.js';
import { router as cartRoute } from './routes/cartRoute.js';
// import { router as viewsRouter } from './routes/views.router.js';
import { router as chatRouter } from './routes/chat.router.js';
import { messagesModel } from "./dao/models/messages.model.js"; 

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(`${__dirname}/views`));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(`${__dirname}/public`)));

mongoose.connect('mongodb+srv://UriAg:Uri_Aguero1812@cluster0.w3yos4e.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=AtlasApp')
.then(()=>console.log('DB connected'))
.catch(err=>{
  console.log('error connecting to DB: '+err)
  process.exit()
})
app.use('/api/products', productsRoute);
app.use('/api/carts', cartRoute);
app.use('/chat', chatRouter);
// app.use('/realTimeProducts', viewsRouter)

let messages = [];
io.on('connection', socket=>{
  socket.on('isConnected', user=>{
    io.emit('messageLogs', messages);
    socket.broadcast.emit('newUserConection', {user});
  })

  socket.on('message', async data=>{
    try {

      const bdExists = await messagesModel.find();
      if(bdExists.length > 0){

        const emailExists = await messagesModel.findOne({'usersMessages':{$elemMatch:{userEmail: data.userEmail}}});
        if(emailExists){
          await messagesModel.updateOne({'usersMessages':{$elemMatch:{userEmail:data.userEmail}}},
          {$push:{'usersMessages.$.messages':data.messages}});
          messages.push(data);
          return io.emit('messageLogs', messages);
        }

        await messagesModel.updateOne({}, {$push:{'usersMessages':data}});
        
        messages.push(data);
        return io.emit('messageLogs', messages);
      }
      // console.log(data)
      await messagesModel.create({usersMessages:[data]});
      messages.push(data);
      io.emit('messageLogs', messages);
    } catch (error) {
      return console.log('Error'+error)
    }
  })
})