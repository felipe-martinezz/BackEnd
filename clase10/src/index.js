import express from "express"
import productsRouter from "./routes/productsRouter.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import views from "./routes/viewsRouter.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`Escuchando en el puerto ${PORT}`));

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Seteo motor de vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Vistas
app.use("/", views);
app.use("/api/productos", productsRouter);