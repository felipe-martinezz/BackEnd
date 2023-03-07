import express from "express"
import productsRouter from "./routes/productsRouter.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import views from "./routes/viewsRouter.js"
import { Server } from 'socket.io'
import chatContext from "./contexts/chatContext.js";
import db from "./db/sqlite3.js";

//Inicializamos el servidor
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=> console.log(`escuchando en el puerto ${PORT}`));
const io = new Server(server)

//Contexts
let utilidadesChat = new chatContext();

//Lectura de archivos estaticos
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
    console.log("socket conectado");
    let chat = await db('chat').select('*');
    io.emit("chatMessages", chat);

    //Socket chat
    socket.on("message", async(data)=>{
        await db('chat').insert(data);
        let chat = await db('chat').select('*')
        io.emit("chatMessages",chat);
    });
})