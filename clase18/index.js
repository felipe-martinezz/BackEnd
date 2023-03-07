import mongoose, { mongo } from "mongoose";

// Configurar mongoose para no mostrar warnings de protocolos deprecados
mongoose.set("strictQuery", false);

//Productos
const productos = [
    {
        "title": "CAMISETA GOLDEN STATE WARRIORS CITY 2021/2022",
        "price": 2790,
        "thumbnail": "https://cdn.shopify.com/s/files/1/0567/6639/8509/products/GSWNegra_480x480.jpg?v=1644344617",
        "id": 0
    },

    {
       "title": "CAMISETA MEMPHIS GRIZZLIES 2021/2022",
       "price": 2790,
       "thumbnail": "https://cdn.shopify.com/s/files/1/0567/6639/8509/products/52df31e160af14b5e4ad8950f8ae1508_480x480.jpg?v=1656439416",
       "id": 1
    },

    {
       "title": "CAMISETA LOS SUNS LOCAL 2020/2021",
       "price": 2790,
       "thumbnail": "https://cdn.shopify.com/s/files/1/0567/6639/8509/products/gdgdgd_480x480.jpg?v=1644345207",
       "id": 2
    },

    {
        "title": "CAMISETA TRAIL BLAZERS LOCAL 2021/2022",
        "price": 2990,
        "thumbnail": "https://cdn.shopify.com/s/files/1/0567/6639/8509/products/gdgdgd_480x480.jpg?v=1644345207",
        "id": 3
     },

     {
        "title": "CAMISETA MIAMI HEAT RETRO 2010/2011",
        "price": 3490,
        "thumbnail": "https://cdn.shopify.com/s/files/1/0567/6639/8509/products/gdgdgd_480x480.jpg?v=1644345207",
        "id": 4
     }
];

//Defino esquma y modelo para interactuar con la db

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
});

const productsDAO = mongoose.model("productos", productsSchema);

//Mensajes

const mensajes = [
  {
    user: "felipe@correo.com",
    message: "Buen dia!",
    date: "04/03/2023, 13:24:44",
  },
  {
    user: "juancito@correo.com",
    message: "hola a todos",
    date: "04/03/2023, 13:24:45",
  },
  {
    user: "franco@correo.com",
    message: "hola grupo",
    date: "04/03/2023, 13:24:47",
  },
  {
    user: "pablo@correo.com",
    message: "bienvenidos",
    date: "04/03/2023, 13:24:47",
  },
  {
    user: "ana@correo.com",
    message: "hola!",
    date: "28/12/2022, 13:24:48",
  },
];

const mensajesSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, requried: true },
  date: { type: String, required: true },
});

const mensajesDAO = mongoose.model("mensajes", mensajesSchema);

//conexion a la BD
await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  serverSelectionTimeoutMS: 5000,
});
console.log("BASE DE DATOS CONECTADA !");

//Escritura de la base de datos
const inserciones = [];

for (const producto of productos) {
  inserciones.push(productsDAO.create(producto));
}

const result = await Promise.allSettled(inserciones);

const rejected = result.filter((r) => r.status == "rejected");
if (rejected.length > 0) {
  console.log(`hay ${rejected.length} errores`);
} else {
  console.log("todo correcto");
}

//Escritura de la base de datos mensajes
const insercionesMensajes = [];

for (const mensaje of mensajes) {
  insercionesMensajes.push(mensajesDAO.create(mensaje));
}

const resultMensajes = await Promise.allSettled(insercionesMensajes);

const rejectedMensajes = resultMensajes.filter((r) => r.status == "rejected");
if (rejectedMensajes.length > 0) {
  console.log(`Hay ${rejected.length} errores en los mensajes`);
} else {
  console.log("Todo correcto con los mensajes");
}

//Traemos y mostramos ambas colecciones

productsDAO.find(function (err, productos) {
  if (err) return console.log(err);
  console.log(productos);
});

mensajesDAO.find(function (err, mensajes) {
  if (err) return console.log(err);
  console.log(mensajes);
});

//AGREGAMOS UN ITEM A CADA COLECCION

let mensajeNuevo = new mensajesDAO({
  user: "federico@correo.com",
  message: "hola!, Me agregaron",
  date: "04/03/2023, 13:26:48",
});

mensajeNuevo.save(function (err) {
  if (err) return console.error(err);
});

let productoNuevo = new productsDAO({
  title: "Kangol bermuda Casual Black ",
  price: 19000,
  thumbnail:
    "https://cdn.shopify.com/s/files/1/0809/2599/products/ecom_tienda_0620_046_708x943.jpg?v=1592297542",
  stock: 6,
});

productoNuevo.save(function (err) {
  if (err) return console.error(err);
});

//TRAER PRODUCTOS CON PRICE < 3000
productsDAO.find({ price: { $lt: 3000 } }, function (err, productos) {
  if (err) return console.log(err);
  console.log(`PRODUCTOS POR MENOS DE 3000 ${productos}`);
});

//TRAER PRODUCTOS CON PRICE >3000 <3500
productsDAO.find({price: {$gte: 3000, $lte: 3500}}, function(err, productos){
  if(err) return console.log(err);
  console.log(`PRODUCTOS ENTRE 3000 Y 3500 ${productos}`);
});

//TRAER PRODUCOTS > 3500
productsDAO.find({price: {$gt: 3500 }}, function(err, productos){
  if (err) return console.log(err);
  console.log(`PRODUCTOS POR MAS DE 3500 ${productos}`);
});

//TRAER EL TERCER PRODUCTOS MAS BARATO
productsDAO.find({},{_id:0,title:1}).sort({price:1}).limit(1).skip(2);

//CAMBIAR LOS STOCK A 10
productsDAO.updateMany({},{$set: {stock: 10}},function(err){
  if (err) return console.log(err);
  console.log("STOCKS ACTUALIZADOS CON EXITO");
});

//CAMBIAR STOCK A 0 PARA PRODUCTOS CON VALOR >4000
productsDAO.find({price: {$gt: 4000}},{$set:{stock: 0}}, function(err){
  if (err) return console.log(err);
  console.log('STOCK A 0 PARA >4000');
});

//BORRAR PRODUCTOS CON PRECIO MENOR A 2800
productsDAO.deleteMany({price: {$lt: 2800}},function(err, productos){
  if (err) return console.log(err);
  console.log(productos);
});

//CERRAMOS LA CONEXION
//await mongoose.disconnect();