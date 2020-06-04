const convertToCSV = function(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }

  return str;
}

const exportCSVFile = function(headers, items, fileTitle) {
  if (headers) {
      items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = this.convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

const exportData = function(fileName){
  const vm = this;
  let headers = {
    name: 'Nombre', // remove commas to avoid errors
    email: "Correo Electrónico".replace(/,/g, ''),
    state: "Estados",
    org: "Sujeto Obligado".replace(/,/g, ''),
};

let rawData = fileName == 'Completados' ? vm.unfilterData : vm.unfilteredTestUsers;

let itemsFormatted = [];

// format the data
rawData.forEach((item) => {
    itemsFormatted.push({
        name: item.name, // remove commas to avoid errors,
        email: item.email.replace(/,/g, ''),
        state: item.state,
        org: item.org.replace(/,/g, '')
    });
});


let fileTitle = fileName; // or 'my-unique-title'

vm.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
}

const mountedFn = function(){
  const vm = this;
  vm.db.collection("metrics").orderBy('state').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          vm.dataArray.push(doc.data().email);
          vm.unfilteredTestUsers.push(doc.data());
          vm.uniqueUsers = [... new Set(vm.dataArray)];
      });
    })
    .catch(function(error) {
        alert('Ocurrió un error inesperado, contacta al administrador:' + error);
    });
  vm.db.collection("testusers").orderBy('state').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        let docData = doc.data();
        docData.docID = doc.id;
        docData.index = vm.completed;
        docData.status = doc.data().hasOwnProperty('status') ? doc.data().status : 'Sin Enviar';
        vm.completedUsers.push(docData.email);
        vm.unfilterData.push(docData);
        vm.filteredUsers =  [... new Set(vm.completedUsers)];
        vm.completed += 1;
          
          
          // console.log(hasDuplicates);
      });
  //     let seen = new Set();
  //     vm.unfilterData.some(function(currentObject) {
  //       if(seen.size === seen.add(currentObject.name).size){
  //         return true;
          
  //       }
  //       else{
  //        //  console.log(currentObject);
  //        vm.filteredUsers.push(currentObject);
  //       }
  //       console.log(vm.unfilterData);
  //  });
    })
    .catch(function(error) {
        alert('Ocurrió un error inesperado, contacta al administrador:' + error);
    });
  

}


// const mountedFn = function(){
//   const vm = this;
//   // vm.db.collection("metrics").orderBy('state').get()
//   //   .then(function(querySnapshot) {
//   //     querySnapshot.forEach(function(doc) {
//   //       let metricsData = doc.data();
//   //       axios.post('http://localhost/sipot/api/metrics', metricsData)
//   //         .then((response) => console.log(response))
//   //         .catch((error) => console.log(error));
//   //     });
//   //   })
//   //   .catch(function(error) {
//   //       alert('Ocurrió un error inesperado, contacta al administrador:' + error);
//   //   });

//   vm.db.collection("testusers").orderBy('state').get()
//     .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc){
//         let testData = doc.data();
//         axios.post('http://localhost/sipot/api/testusers', testData)
//           .then((response) => console.log(response))
//           .catch((error) => console.log(error));
  
          
//       });

//     })
//     .catch(function(error) {
//         alert('Ocurrió un error inesperado, contacta al administrador:' + error);
//     });
  

// }

const updateState = function(dataObj){
  const vm = this; 
  console.log(dataObj);
  vm.unfilterData[dataObj.index].state = dataObj.state;
    let ref = vm.db.collection("testusers").doc(dataObj.docID);
        ref.update({state: dataObj.state})
        .then(() => console.log())
        .catch((error) => console.log(error))

}

const updateStatus = function(testData){
  const vm = this;
    vm.unfilterData[testData.index].status = 'Enviado';
    let ref = vm.db.collection("testusers").doc(testData.docID);
        ref.update({status: 'Enviado'})
        .then(() => console.log())
        .catch((error) => console.log(error))
        
}

const deleteDocument = function(testData){
  const vm = this; 
  vm.dialog = true;
  vm.documentData = testData;
}

const confirmDelete = function(){
  const vm = this;
  vm.unfilterData.splice(vm.documentData.index,1);
  db.collection("testusers").doc(vm.documentData.docID).delete().then(function() {
    console.log("Document successfully deleted!");
    vm.dialog = false;
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}


Vue.component('admin',{

   
        data: () => ({
          participants: 0,
          completed: 0,
          uniqueUsers: [],
          dataArray: [],
          completedUsers: [],
          filteredUsers: [],
          unfilteredTestUsers: [],
          unfilterData: [],
          dialog: false,
          documentData: {},
          headers: [
            {
              text: 'Nombre Completo',
              align: 'start',
              value: 'name',
            },
            { text: 'Correo Eléctronico', value: 'email' },
            { text: 'Sujeto Obligado', value: 'org' },
            { text: 'Estado', value: 'state' },
            { text: 'Estatus', value: 'status' },
            { text: 'Acciones', value: 'actions', sortable: false },
  
          ],
        }),
        methods:{updateState,updateStatus,deleteDocument,confirmDelete,convertToCSV,exportCSVFile,exportData},
        mounted: mountedFn,
  

  template: /*html*/`
  <div>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Admin Capacitación SIPOT</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>Número de Incritos</div>
              <p class="display-1 text--primary">{{uniqueUsers.length}}</p>
              <div class="text--primary">Participantes actuales que se encuentran tomando el curso.</div>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto" style="margin-top: 7px;" max-width="344">
            <v-card-text>
              <div>Curso Completado</div>
              <p class="display-1 text--primary">{{filteredUsers.length}}</p>
              <div class="text--primary">Participantes que han obtenido 100 puntos y han terminado el curso.</div>
            </v-card-text>
          </v-card>
        </v-row>

        
       

<v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Borrar Registro</v-card-title>
          <v-card-text>¿Aceptas que estas a punto de borrar un registro?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="primary darken-1" text @click="confirmDelete">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-container>
      <div style="margin-left: 10px;">
      <v-btn color="green darken-3" dark @click="exportData('Registrados')">Exportar Registrados <v-icon right dark>mdi-file-excel-box</v-icon></v-btn>
      <v-btn color="green darken-3" dark @click="exportData('Completados')">Exportar Completados <v-icon right dark>mdi-file-excel-box</v-icon></v-btn>
      </div>
      <v-spacer></v-spacer>
      <br>
      <v-data-table  :headers="headers" :items="unfilterData" class="elevation-1">
  <template v-slot:item.state="props">
    <v-edit-dialog :return-value.sync="props.item.state" large persistent @save="updateState(props.item)">
        <div>{{ props.item.state }}</div>
        <template v-slot:input>
            <div class="mt-4 title">Actulizar Estado</div>
        </template>
        <template v-slot:input>
            <v-text-field v-model="props.item.state" label="Editar" single-line counter autofocus></v-text-field>
        </template>
    </v-edit-dialog>
  </template>
  <template v-slot:item.actions="{ item }">
    <v-icon  class="mr-2" @click="deleteDocument(item)">delete</v-icon>
    <v-icon  class="mr-2" @click="updateStatus(item)">check</v-icon>
</template>
  </v-data-table>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; DTI - IZAI 2020</span>
    </v-footer>
    
  </div>
                  
                
         `
  })