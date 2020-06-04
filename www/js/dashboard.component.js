const sendAnswers = function(){
  const vm = this;
  vm.correctAnswers.forEach((element,index) => {
    if(element === vm.answers[index])
      vm.grade = vm.grade + 10;
  });
  if(vm.grade >= 100){
    vm.dialog.status = true;
    vm.dialog.title = 'Felicidades, Obtuviste 100 puntos!';
    vm.dialog.bodyText = 'Tu contancia de curso será enviada al correo con el cual te has registrado';
    
  }
  else{
    vm.dialog.status = true;
    vm.dialog.title = 'Lograste ' + vm.grade + ' puntos!';
    vm.dialog.bodyText = 'Al obtener esta calificación no es posible generar contancia, revisa los módulos y vuelve a intentar ';
    vm.step = 1;
  }
}

const sendToIzai = function(){
  const vm = this;
  const userData = JSON.parse(localStorage.getItem('userData'));
  userData.action = 'testusers';
  axios.post('api/', userData)
    .then((response) =>  self.location = 'https://izai.org.mx/')
    .catch((error) => console.log(error));
}

const mountedFn = function(){
  const vm = this;
  if(localStorage.getItem('userData') === null){
    vm.introDialog = true;
  }
  else{
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData.hasOwnProperty('state')){ 
      localStorage.clear();
      location.reload();
    }
  }
}

const startCourse = function(){
  const vm = this;
  const userData = {
    name: vm.name,
    email: vm.email,
    org: vm.org,
    state: vm.state,
    action: 'metrics'
  }
  localStorage.setItem("userData", JSON.stringify(userData));
  axios.post('api/', userData)
    .then((response) =>  vm.introDialog = false)
    .catch((error) => console.log(error));

  
  
}


Vue.component('dashboard',{

   
        props: {
          source: String,
        },
    
        data: () => ({
          drawer: null,
          step: 1,
          introDialog: null,
          email: "",
          name: "",
          org: "",
          state: "",
          aviso: false,
          questions: [
            {
              questionText: "1. Una vez que ingresas al Sistema de Portales de Obligaciones de Transparencia (SIPOT), ¿cuáles son las denominaciones de las pestañas que ofrece el menú principal del usuario Administrador de sujeto obligado?",
              answerA: "a) Unidades Administrativas / Carga de Información / Opciones Avanzadas / Reportes",
              answerB: "b) Administración de Información / Carga de Archivos / Opciones Avanzadas / Reportes",
              answerC: "c) Unidades Administrativas / Carga de Archivos / Copia/Borra Información / Reportes"
            },
            {
              questionText: "2. ¿Cuáles son las tres opciones de menú o los tres apartados del SIPOT para el usuario Administrador de unidad administrativa?",
              answerA: "a) Bitácora de Carga / Carga de Archivos / Administración de Información",
              answerB: "b) Administración de Información / Copia/Borra Información / Generador de Reportes",
              answerC: "c) Carga de Archivos / Administración de Información / Copia/Borra Información"
            },
            {
              questionText: "3. Las opciones para cargar nuevos registros a la plataforma son tres: 1) la opción Altas del apartado de Carga de Archivos, 2) la opción “Copiar” de la pestaña de Opciones Avanzadas, y:",
              answerA: "a) La opción “Cambio” del apartado Carga de Archivos",
              answerB: "b) La opción “Cambio de responsabilidad” de la pestaña de Opciones Avanzadas",
              answerC: "c) La opción “Agregar” del apartado de Administración de Información"
            },
            {
              questionText: "4. ¿Cuáles son las tres funciones que se pueden realizar con los formatos contenidos en los archivos de Excel?",
              answerA: "a) Carga y modificación de registros y cambio de responsabilidad",
              answerB: "b) Carga, modificación y borrado de registros en el apartado de Carga de Archivos",
              answerC: "c) Altas, Bajas y Cambios en la opción de Administración de información"
            },
            {
              questionText: "5. De las siguientes alternativas de respuesta, indique cuáles son los tipos de campo que contienen los formatos de Excel que se descargan del SIPOT:",
              answerA: "a) Catálogo, fecha, moneda (número), alfanumérico, tabla y URL",
              answerB: "b) Fecha, catalogo, moneda (número), texto, memo y clave",
              answerC: "c) Texto, fecha, catálogo, memo, porcentaje y cantidad"
            },
            {
              questionText: "6. ¿Qué tipo de dato se captura en la columna del campo tipo tabla en la hoja principal del formato de Excel denominada “Reporte de Formatos” (donde se capturan los registros principales)?",
              answerA: "a) Alfanumérico",
              answerB: "b) Texto",
              answerC: "c) Número"
            },
            {
              questionText: "7. ¿Cuál de las siguientes opciones tiene los dos tipos de relación correcta que reconoce el SIPOT entre registros primarios y registros secundarios?",
              answerA: "a) De un primario a uno o varios secundarios y de uno o varios secundarios a un primario",
              answerB: "b) De un primario a uno o varios secundarios y de un secundario a uno o varios primarios",
              answerC: "c) De varios primarios a varios secundarios y de un secundario a un primario"
            },
            {
              questionText: "8. En las opciones de descarga desde el apartado de Administración de Información, una de ellas genera el archivo de Excel de manera inmediata (al vuelo), es decir, no se remite por correo y sí descarga todos los registros primarios y secundarios que se visualizan en pantalla. Esta opción está limitada a un número de registros, tanto principales como secundarios, debido a que ocupa mucha memoria en el proceso; indique cuál de las siguientes opciones contiene el límite de registros correcto:",
              answerA: "a) 1,500 registros principales y 30,000 secundarios",
              answerB: "b) 2,000 registros principales y 50,000 secundarios",
              answerC: "c) 1,000 registros principales y 30,000 secundarios"
            },
            {
              questionText: "9. El copiado y borrado de las Opciones Avanzadas realiza la copia y baja de registros por:",
              answerA: "a) El procesamiento de archivos Excel",
              answerB: "b) Un proceso del propio Sistema",
              answerC: "c) El uso de un servicio web"
            },
            {
              questionText: "10. ¿Quiénes son los responsables de generar el expediente electrónico que contiene los comprobantes de carga y modificación de los registros en el SIPOT, así como el respaldo de éstos y las copias de los archivos digitales que se relacionan con los registros a través de un hipervínculo?",
              answerA: "a) Las áreas encargadas de publicar y actualizar la información en el SIPOT",
              answerB: "b) La Unidad de Transparencia",
              answerC: "c) El Administrador de sujeto obligado"
            },
          ],
          answers: [],
          correctAnswers: ['a','c','c','b','a','c','b','c','b','a'],
          grade: 0,
          dialog: {
            status: false,
            bodyText: "",
            title: ""
          },
          states: ["Aguascalientes","Baja California","Baja California Sur","Campeche","Coahuila de Zaragoza","Colima","Chiapas","Chihuahua","Ciudad de México","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","México","Michoacán de Ocampo","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz de Ignacio de la Llave","Yucatán","Zacatecas"]
        }),
        methods:{sendAnswers,sendToIzai,startCourse},
        mounted: mountedFn,
  

  template: /*html*/`
  <div>
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Capacitación SIPOT</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        
      >
      <v-stepper v-model="step">
        <v-stepper-header style="flex-wrap: nowrap;">
          <v-stepper-step :complete="step > 1" step="1">Módulo 1</v-stepper-step>
    
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 2" step="2">Módulo 2</v-stepper-step>
    
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 3" step="3">Módulo 3.1</v-stepper-step>
          
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 4" step="4">Módulo 3.2</v-stepper-step>
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 5" step="5">Módulo 4</v-stepper-step>
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 6" step="6">Módulo 5</v-stepper-step>
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 7" step="7">Módulo 6</v-stepper-step>
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 8" step="8">Módulo 7</v-stepper-step>
          <v-divider></v-divider>
    
          <v-stepper-step :complete="step > 9" step="9">Módulo 8</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step  step="10">Cuestionario</v-stepper-step>

        </v-stepper-header>
    
        <v-stepper-items>

          <v-stepper-content step="1">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/GGh_Z21IaYg" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 2">Siguiente Módulo</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/M14kpYz0yV8" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 3">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 1">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/IGSEusAr4Bg" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 4">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 2">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="4">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/ibhYUFdAisg" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 5">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 3">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="5">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/VFir0htjY8k" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 6">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 4">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="6">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/gTKix2TPhGQ" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 7">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 5">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="7">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/UKKuHHr-qA8" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 8">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 6">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="8">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/p7qGE-t1iDI" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 9">Siguiente Módulo</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 7">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="9">
            <v-card flat align="center">
              <iframe width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/rUsAaINR4Jo" 
                      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen>
              </iframe>
              <v-card-actions>
                <v-btn color="primary" @click="step = 10">Iniciar Cuestionario</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple" dark @click="step = 8">Regresar al Módulo Anterior</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          <v-stepper-content step="10">
            <v-card flat align="center">

              <template v-for="(question, index) in questions">

                <p class="text-justify">{{question.questionText}}</p>
              

              <v-radio-group v-model="answers[index]" column>
                <v-radio :label="question.answerA" value="a"></v-radio>
                <v-radio :label="question.answerB" value="b"></v-radio>
                <v-radio :label="question.answerC" value="c"></v-radio>
              </v-radio-group>
            </template>
             
              <v-card-actions>
                <v-btn color="primary" @click="sendAnswers">Enviar Resultados</v-btn>
              </v-card-actions>
            </v-card>
    
            
          </v-stepper-content>
    
          
        </v-stepper-items>
      </v-stepper>

      </v-stepper>

      <v-dialog v-model="dialog.status" max-width="290">
        <v-card>
          <v-card-title class="headline">{{dialog.title}}</v-card-title>
          <v-card-text>{{dialog.bodyText}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="grade < 100" color="green darken-1" text @click="dialog.status = false">Entendido</v-btn>
            <v-btn v-else color="green darken-1" text @click="sendToIzai">Entendido</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="aviso" persistent>
        <v-card>
          <v-card-title class="headline">Aviso de Privacidad Integral de Capacitaciones Virtuales</v-card-title>
          <v-card-text> El Instituto Zacatecano de Transparencia, Acceso a la Información y Protección de Datos Personales (IZAI), La Dirección de Capacitación y Vinculación con la Sociedad del con domicilio en Avenida Universidad 113, Lomas del Patrocinio, 98068 Zacatecas, Zacatecas, es el responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Zacatecas y demás normatividad aplicable.

          ¿Qué datos personales recabamos y para qué fines? Sus datos personales serán utilizados con la finalidad de integrar un sistema de registro y control de personas que tomarán los cursos del IZAI, para la emisión de constancias de asistencia y para generar estadísticas e informes sobre los talleres en mención. Para las finalidades anteriores, se recabarán los siguientes datos personales: nombre completo, sexo, edad, correo electrónico, entidad federativa en la que reside, e institución u organización a la que pertenece. Se informa que no se recabarán datos personales sensibles. 
         
         El IZAI organiza el referido evento con fundamento en los artículos 42, fracciones V, XII, XIV y XX, de la Ley General de Transparencia y Acceso a la Información Pública; 144, fracción VII y 159 de la Ley de Transparencia y Acceso a la Información Pública del Estado de Zacatecas, 40 fracción I y II del Reglamento Interior del Instituto Zacatecano de Transparencia, Acceso a la Información y Protección de Datos Personales.
         
         
         ¿Dónde puedo ejercer mis derechos ARCO? Usted podrá ejercer sus derechos de acceso, rectificación, cancelación u oposición de sus datos personales (derechos ARCO) directamente ante la Unidad de Transparencia de este Instituto, ubicada en Avenida Universidad 113, Lomas del Patrocinio, 98068 Zacatecas, Zacatecas, con número telefónico (492) 9251621, o bien, a través de la Plataforma Nacional de Transparencia (http://www.plataformadetransparencia.org.mx/) o en el correo electrónico transparencia@izai.org.mx. Si desea conocer más información sobre el procedimiento para el ejercicio de estos derechos, puede acudir a la Unidad de Transparencia, enviar un correo electrónico a la dirección antes señalada.
         
         Transferencia de datos personales. Se informa que no se realizarán transferencias de datos personales, salvo aquéllas que sean necesarias para atender requerimientos de información de una autoridad competente, que estén debidamente fundados y motivados. 
         
         Portabilidad de Datos Personales. La portabilidad de datos personales no impone obligación alguna al responsable de almacenar, preservar, guardar, mantener o conservar todos los datos personales en su posesión en un formato estructurado comúnmente utilizado, solo para efecto de garantizar ésta.
         
         Por lo anterior, en razón del procedimiento de que se trata, para el cumplimiento de las atribuciones establecidas en la ley de la materia y los Lineamientos que establecen los parámetros, modalidades y procedimientos para la portabilidad de datos personales no es aplicable el presente apartado.
         
         Cambios al aviso de privacidad. En caso de que exista un cambio en este aviso de privacidad, lo haremos de su conocimiento a través de este formulario de registro, o bien, podrá ser consultado en las instalaciones del IZAI, directamente en la Dirección de Capacitación, Promoción y Vinculación con la Sociedad. 
         
         Fecha de elaboración o última actualización: 14 de abril de 2020.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" @click="aviso = false">Acepto</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="introDialog"  max-width="290" persistent>
        <v-card>
          <v-card-title class="headline">Bievenido</v-card-title>
          <v-card-text>Para Ininiar con el curso, por favor escribe los datos que se presentan enseguida.</v-card-text>
          <v-card-subtitle>
            <v-text-field v-model="name" label="Nombre Completo"></v-text-field>
            <v-text-field v-model="email" label="Correo electrónico"></v-text-field>
            <v-text-field v-model="org" label="Sujeto Obligado"></v-text-field>
            <v-select :items="states" label="Estado" v-model="state">
            
        ></v-select>
          </v-card-subtitle>
          <b><p align="center" @click="aviso = true" style="font-size: 13px;cursor: pointer;">Aviso de Privacidad</p></b>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="state == '' || name == '' || org == '' || email == ''"  
                    color="purple" 
                    :dark="state != '' && name != '' && org != '' && email != ''" 
                    @click="startCourse">Iniciar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      

  
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; Dirección de Técnologías - IZAI 2020</span>
    </v-footer>
    
  </div>
                  
                
         `
  })