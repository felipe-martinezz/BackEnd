class Usuario {
    static contadorGeneral = 0;
    constructor(nombre, apellido, libro = [], mascota = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libro = libro;
        this.mascota = mascota;
        this.contador = 0
    }
    
    getFullName() {
        console.log(`El nombre completo es ${this.nombre} ${this.apellido}`)
    }

    addMascota(nombreMascota) {
        this.mascota.push({ nombre: nombreMascota })
        console.log(`El nombre de la mascota de ${this.nombre} es ${nombreMascota}`)
    }

    countMascotas() {
        this.contador++
        Usuario.contadorGeneral++
        return `El número de mascotas que tiene son ${Usuario.contadorGeneral}`
    }

    addBook(nombreLibro, nombreAutor) {
        this.libro.push({ nombre: nombreLibro, autor: nombreAutor })
        console.log(this.libro)
    }

    getBookNames() {
        return this.libro.map(libros => `Luis está leyendo "${libros.nombre}" `)
    }
}

const luis = new Usuario ("Luis", "Suárez", [], [])


luis.getFullName()
console.log(luis.addMascota("Dawson"))
console.log(luis.countMascotas())
console.log(luis.addBook("No vino, volvió", "Javier Moreira"))
console.log(luis.getBookNames())