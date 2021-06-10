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


/*function generarAplicaciones() {
    let estrellas = '';
    
     categorias.forEach(app => {
        app.aplicaciones.forEach(element => {
        
         estrellas = '';
            for (let i = 0; i < element.calificacion; i++) {
                estrellas +='<i class="fas fa-star"></i>'
            }

            for (let i = 0; i < (5-element.calificacion); i++) {
                estrellas +='<i class="far fa-star"></i>'
            }
            document.getElementById('aplicaciones').innerHTML += 
                `<div class="col-xl-2 col-md-3 col-sm-6 margin-cards">
                        <div class="card" onClick="mostrarModal()";>
                            <img class="card-img-top img-card" src="${element.icono}" alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">${element.nombre}</h5>
                            <p class="card-text">${element.desarrollador}</p>
                            <p class="card-text">
                                ${estrellas}
                            </p>
                            <p class="card-text"><small class="text-muted"><strong>$45</strong></small></p>
                            </div>
                        </div>
                </div>`
            ;
       });
    });
}*/


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
                            <img class="card-img-top img-card" onClick="mostrarModal()"; src="${item.icono}" alt="Card image cap">
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

function selectImagenes() {
    for (let i = 0; i < 50; i++) {
        document.getElementById('img').innerHTML += `
                <option value="img/app-icons/${i}.webp">Imagen ${i}</option>
        `;
        
    }
}
selectImagenes();


function generarCategorias() {
    let valCat = -1;
    categorias.forEach(element => {
        document.getElementById('select-cate').innerHTML+=`
            <option value="${valCat+=1}">${element.nombreCategoria}</option>

        `;
    });
    
}

function generarCategoriasModal() {
    let valCat = -1;
    categorias.forEach(element => {
        document.getElementById('select-cate-modal').innerHTML+=`
            <option value="${valCat+=1}">${element.nombreCategoria}</option>

        `;
    });
}
generarCategorias();
//generarAplicaciones();
generarCategoriasModal();
generarAplicacionesLocalS();

function mostrarModal() {
    $('#modalApp').modal('show');
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
        categoria : document.getElementById('select-cate-modal').value
    }

    console.log(app);
    
    categorias[app.categoria].aplicaciones.push(app);

    localStorage.setItem('aplicaciones', JSON.stringify(categorias));
    generarAplicacionesLocalS();
    $('#modalNuevaApp').modal('hide');
}


function eliminar(indice, icategoria) {
    console.log('eliminar',indice);

    //let aplics = JSON.parse(localStorage.getItem('aplicaciones'));

    console.log(categorias[icategoria].aplicaciones[indice]);
    categorias[icategoria].aplicaciones.splice(indice,1);
    //console.log(aplics);
    //localStorage.setItem('aplicaciones',aplics);
    generarAplicacionesLocalS();
}

function appsCat() {
   let indice = document.getElementById('select-cate').value; 
   let estrellas = '';
   let contadorCat = indice;

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
                        <img class="card-img-top img-card" onClick="mostrarModal()"; src="${element.icono}" alt="Card image cap">
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