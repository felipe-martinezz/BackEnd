import express from "express"
import productsRouter from "./routes/productsRouter.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import views from "./routes/viewsRouter.js"
import { Server } from 'socket.io';
import chatContext from './contexts/chatContext.js';

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=> console.log(`Escuchando en el puerto ${PORT}`));

const io = new Server(server)
const utilidadesChat = new chatContext()
app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Seteo motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

//Vistas
app.use("/", views);
app.use("/api/productos", productsRouter);

//Socket
io.on("connection", async(socket)=>{
    console.log("Socket conectado");
    let chat = await utilidadesChat.getUsers();
    io.emit("chatMessages", chat);

    //Socket chat
    socket.on("message", async(data)=>{
        await utilidadesChat.save(data);
        let chat = await utilidadesChat.getUsers();
        io.emit("chatMessage", chat)
    })

})