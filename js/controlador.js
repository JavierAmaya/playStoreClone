//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
  
  console.log(categorias);
})();

/// local storage

var localStorage = window.localStorage;
// guardar en local storage
//JSON.stringify convertir de json a cadena
//localStorage.setItem('aplicaciones',JSON.stringify(categorias));

//leer de local storage
// JSON.parse convertir de cadena a JSON
//console.log(JSON.parse(localStorage.getItem('aplicaciones')));


/*
    si local storage esta vacio entonces guardar

    if (localStorage.getItem('aplicaciones') == ''){
        localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));
    } else { // sino esta vacio, entonces se guarda lo que esta en el local storage
        aplicaciones = JSON.parse(localStorage.getItem('aplicaciones'));
    }
 */




function generarAplicacionesLocalS() {
    var localStorage = window.localStorage;
    // guardar en local storage
    //JSON.stringify convertir de json a cadena
    localStorage.setItem('aplicaciones',JSON.stringify(categorias));

    //leer de local storage
    // JSON.parse convertir de cadena a JSON

    let apps = JSON.parse(localStorage.getItem('aplicaciones'));
    
    let estrellas = '';
    let contadorCat = -1;
    document.getElementById('aplicaciones').innerHTML='';
    apps.forEach(element => {
        contadorCat+=1;
        element.aplicaciones.forEach( (item, indice) => {
            estrellas = '';
            for (let i = 0; i < item.calificacion; i++) {
                estrellas +='<i class="fas fa-star"></i>'
            }

            for (let i = 0; i < (5-item.calificacion); i++) {
                estrellas +='<i class="far fa-star"></i>'
            }

            document.getElementById('aplicaciones').innerHTML += 
                `<div class="col-xl-2 col-md-3 col-sm-6 margin-cards">
                        <div class="card">
                            <img class="card-img-top img-card" onClick="mostrarModal(${item.codigo})"; src="${item.icono}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">${item.desarrollador}</p>
                                <p class="card-text">
                                    ${estrellas}
                                </p>
                                <p class="card-text"><small class="text-muted"><strong>$45</strong></small></p>
                            </div>
                            <div class="card-footer">
                              <small class="text-muted"><button type="button" class="btn btn-outline-danger btn-sm" onclick="eliminar(${indice},${contadorCat})"><i class="far fa-trash-alt"></i></button></small>
                            </div>

                        </div>
                </div>`
            ;
        });    

    });


    /*
        si local storage esta vacio entonces guardar

        if (localStorage.getItem('aplicaciones') == ''){
            localStorage.setItem('aplicaciones', JSON.stringify(aplicaciones));
        } else { // sino esta vacio, entonces se guarda lo que esta en el local storage
            aplicaciones = JSON.parse(localStorage.getItem('aplicaciones'));
        }
    */
}

// funciones para la modal crear nueva app
function selectImagenes() {
    for (let i = 0; i < 50; i++) {
        document.getElementById('img').innerHTML += `
                <option value="img/app-icons/${i}.webp">Imagen ${i}</option>
        `;
        
    }
}
selectImagenes();
generarAplicacionesLocalS();

function categoriaSeleccionadaModal(idCat) {
    console.log('categoria seleccionada',idCat);
    document.getElementById('cat_new_app').value = idCat;
    document.getElementById("cat_new_app").setAttribute('readonly', true);
    document.getElementById("cat_new_app").setAttribute('value', idCat);
}





function guardar() {

    const app = {
        app: "",
        calificacion:  document.getElementById('select-calificacion').value,
        codigo: "",
        comentarios:  [],
        desarrollador:  document.getElementById('nameDevelopment').value,
        descargas: "",
        descripcion: "",
        icono: document.getElementById('img').value,
        imagenes: "",
        instalada: "",
        nombre: document.getElementById('nameApp').value,
        categoria : document.getElementById('cat_new_app').value
    }

    console.log(app);
    
    categorias[app.categoria].aplicaciones.push(app);

    localStorage.setItem('aplicaciones', JSON.stringify(categorias));
    generarAplicacionesLocalS();
    generarCategorias();
    $('#modalNuevaApp').modal('hide');
}


function eliminar(indice, icategoria) {
    console.log('eliminar',indice);

    //let aplics = JSON.parse(localStorage.getItem('aplicaciones'));

    console.log(categorias[icategoria].aplicaciones[indice]);
    categorias[icategoria].aplicaciones.splice(indice,1);
    //console.log(aplics);
    //localStorage.setItem('aplicaciones',aplics);
    generarCategorias();
    generarAplicacionesLocalS();
}

function appsCat() {
   let indice = document.getElementById('select-cate').value; 
   let estrellas = '';
   let contadorCat = indice;
   //cambia el valor en la modal nueva app
   categoriaSeleccionadaModal(indice);

   document.getElementById('aplicaciones').innerHTML = '';

    categorias[indice].aplicaciones.forEach(element => {
        console.log(element);
        estrellas = '';

        for (let i = 0; i < element.calificacion; i++) {
            estrellas +='<i class="fas fa-star"></i>'
        }
        for (let i = 0; i < (5-element.calificacion); i++) {
            estrellas +='<i class="far fa-star"></i>'
        }
        document.getElementById('aplicaciones').innerHTML += 
            `<div class="col-xl-2 col-md-3 col-sm-6 margin-cards">
                    <div class="card">
                        <img class="card-img-top img-card" onClick="mostrarModal(${element.codigo})"; src="${element.icono}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${element.nombre}</h5>
                            <p class="card-text">${element.desarrollador}</p>
                            <p class="card-text">
                                ${estrellas}
                            </p>
                            <p class="card-text"><small class="text-muted"><strong>$45</strong></small></p>
                        </div>
                        <div class="card-footer">
                          <small class="text-muted"><button type="button" class="btn btn-outline-danger btn-sm" onclick="eliminar(${indice},${contadorCat})"><i class="far fa-trash-alt"></i></button></small>
                        </div>
                    </div>
            </div>`
        ;
    });


}

/// utilizando IndexDB

// Ejemplo IndexDB




/*  Mi ejemplo de forma 1
var request = self.indexedDB.open('AppStore',1);

request.onsuccess = event =>{
    var cats = categorias;

    console.log('variable cats', cats);

    var db = event.target.result;

    var transaction = db.transaction('categorias','readwrite');

    transaction.onsuccess = event => {
        console.log('peticion de transaccion completada');
    }

    var appStoreStore = transaction.objectStore ('categorias');

    cats.forEach(categoria => {
        var db_op_req = appStoreStore.add(categoria);

        db_op_req.onsuccess = ()=>{
            console.log(event.target.result == categoria.nombreCategoria);
        }
    });

    appStoreStore.count().onsuccess = (event) => {
        console.log('cantidad de items',event.target.result);
    };

    var datafromDB = transaction.objectStore('categorias');
    console.log('data from db', datafromDB);
    
};

request.onerror = function(event) {
    console.log('[onerror]', request.error);
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var appStoreStore = db.createObjectStore('categorias', {keyPath: 'key',autoIncrement: true});
};

*/


// Mi ejemplo de forma 2


const indexedDB = window.indexedDB;

let db ;
cleanIndexDB();

const conexion = indexedDB.open('AppStore',1);

conexion.onsuccess = () =>{
    db = conexion.result;[]

    console.log('base de datos abierta',db);
    setAllCats();

};

// funcion cuando se cree la base de datos 
conexion.onupgradeneeded = (e) =>{
    db = e.target.result;
    console.log('base de datos creada', db);

    const StoreCategorias = db.createObjectStore('categorias', {keyPath: 'key',autoIncrement: true} );

    //generarCategorias();
};

conexion.onerror = (error) => {
    console.log('error ', error);
};

const getAllItems = () => {
    const transaccion = db.transaction(['categorias'],'readonly'); 
    const coleccionObjetos = transaccion.objectStore('categorias');
    const conexion = coleccionObjetos.openCursor();

    console.log('lista de tareas');

    conexion.onsuccess = (e) => {
        const cursor = e.target.result;


        if (cursor) {
            cursor.continue();
            
        }else if ( cursor == undefined) {
            console.log('no hay tareas en la lista');
        }
    }

}


const setAllCats= () => {
    var dataCategorias = categorias;

    const transaccion = db.transaction('categorias','readwrite'); 
    const coleccionObjetos = transaccion.objectStore('categorias');

    dataCategorias.forEach(element => {
        const conexion = coleccionObjetos.add(element);
    });

    getAllItems();
    generarCategorias();
}

const setItem = (info) => {

    const transaccion = db.transaction('categorias','readwrite'); 
    const coleccionObjetos = transaccion.objectStore('categorias');
    const conexion = coleccionObjetos.add(info);
    getAllItems();
}

const getItem = (key) => {
    const transaccion = db.transaction(['categorias'],'readonly'); 
    const coleccionObjetos = transaccion.objectStore('categorias');
    const conexion = coleccionObjetos.get(key);

    conexion.onsuccess = (e) => {
        console.log(conexion.result);
    }


} // solo nos devuelve un registro



function generarCategorias() {

    const transaccion = db.transaction(['categorias'],'readonly'); 
    const coleccionObjetos = transaccion.objectStore('categorias');
    const conexion = coleccionObjetos.openCursor();

    console.log('lista de categorias');
    document.getElementById('select-cate').innerHTML='';
    document.getElementById('select-cate').innerHTML= `
    <option selected>Seleccione una Categoria</option>
    `;
    let valCat = -1;

    conexion.onsuccess = (e) => {
        const cursor = e.target.result;  
        
        if(cursor){
            cursor.continue();

            document.getElementById('select-cate').innerHTML+=`
                <option value="${valCat+=1}">${cursor.value.nombreCategoria}</option>
            `;
          

        } else {
            console.log('all items display')
        }
    }

    

    
}


function mostrarModal(codigo) {
    $('#modalApp').modal('show');

    let cats = JSON.parse(localStorage.getItem('aplicaciones'));

    document.getElementById('imgs-carousel').innerHTML = '';
    
    cats.forEach(aplis => {
        aplis.aplicaciones.forEach(element => {

            if (element.codigo == codigo) {
                // imagenes del carousel
                element.imagenes.forEach((imgs, index) => {
                    if (index == 0) {
                        document.getElementById('imgs-carousel').innerHTML = `
                         <div class="carousel-item active">
                             <img class="d-block w-100" src="./${imgs}" alt="First slide">
                         </div>
                        `;
                    }else {
                        document.getElementById('imgs-carousel').innerHTML += `
                            <div class="carousel-item">
                                <img class="d-block w-100" src="./${imgs}" alt="First slide">
                            </div>
                        `;  
                    }
                });  

                // nombre de la app
                document.getElementById('nameAppModal').innerHTML = `
                    ${element.nombre}
                `;

                //nombre del desarrollador
                document.getElementById('idAppDevModal').innerHTML = `
                    ${element.desarrollador}
                `;

                /// para los comentarios
                document.getElementById('comentarioAppModal').innerHTML = '';
                element.comentarios.forEach(coments => {
                    document.getElementById('comentarioAppModal').innerHTML += `
                        <div class="col-2">
                            <img class="ss-modal" src="./img/user.webp" alt="imagenusuario">
                        </div>
                        <div id="comentarioAppModal" class="col-10">
                            <!-- aqui van los comentarios-->
                            <div>
                                <h6>${coments.usuario}</h6>
                                <p>${coments.comentario}</p>
                            </div>
                        </div>
                        <hr class="ss-modal">
                    `;
                });
               
                // para las estrellitas
                estrellas = '';

                for (let i = 0; i < element.calificacion; i++) {
                    estrellas +='<i class="fas fa-star"></i>'
                }
                for (let i = 0; i < (5-element.calificacion); i++) {
                    estrellas +='<i class="far fa-star"></i>'
                }

                document.getElementById('stars').innerHTML = `
                    <p class="card-text">
                      ${estrellas}
                    </p>
                `;

                // para el icono de la imagen

                document.getElementById('icon-img-modal').innerHTML = `
                    <img class="ss-modal" src="./${element.icono}" alt="icono imagen">
                `;

                //botoncito de instalar
                document.getElementById('buttons-mod-app').innerHTML = '';
                document.getElementById('buttons-mod-app').innerHTML = `
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                `;

                if (element.instalada == false) {
                    document.getElementById('buttons-mod-app').innerHTML += `
                      <button id="instalar-modal" type="button" class="btn btn-primary">Instalar</button>
                    `;
                }else {
                    console.log('app ya instalada');
                }

            }

        });
        
    });
}

function cleanIndexDB() {

    var req = indexedDB.deleteDatabase('AppStore');

    req.onsuccess = function () {
        console.log("Deleted database successfully");
    };
    req.onerror = function () {
        console.log("Couldn't delete database");
    };
    req.onblocked = function () {
        console.log("Couldn't delete database due to the operation being blocked");
    };
}