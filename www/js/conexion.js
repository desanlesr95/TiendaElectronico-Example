var anio="";
var mes="";
var dia="";
var ruta="";
var direccion="";
function fecha() {
  var fech=document.getElementById('fecha').value;
    var j=0;
    for (var i = 0; i < fech.length; i++) {
      if(fech[i]!='-'){
        if(j==0){
          anio+=fech[i];
        }
        else if(j==1){
          mes+=fech[i];
        }
        else if(j==2){
          dia+=fech[i];
        }
    }
    else{
      j++;
    }
  }

}
function recuperar(imagen){
  location.href="grafica.html?archivo="+imagen;
}
function conectar() {
  fecha();
  var xmlhttp;
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var jsonResponse = xmlhttp.responseText;
      var objeto_json = JSON.parse(jsonResponse);
      var s="<br><hr>";
      for(var i = 0; i < objeto_json.imagen.length; i++) {
        s+="<div class='row'>"+
            "<div class='col-1'><img class='img-responsive' src='data:image/jpeg;base64,"+objeto_json.imagen[i]+"'></div>"+
            "<div class='col-off col-2'><h2>Uniformidad:"+objeto_json.uniformidad[i]+"</h2></div>"+
            "<div class='col-3'></div>"+
            "<div class='col-off col-4'><button class='detalles' onclick='recuperar(\""+direccion+objeto_json.ruta[i]+"\")'>Detalles</button></div>"+
          "</div><hr>";
      }
      document.getElementById("txtInformacion").innerHTML= s;
    }
  }
  //direccion="http://192.99.204.36/vision/img_logs/ejemploJson/";
  direccion="http://192.99.204.36/vision/img_logs/"+anio+"/"+mes+"/"+dia+"/";
  ruta=direccion+"index.json";
  xmlhttp.open("GET",ruta);
  xmlhttp.send();
}
function cambiar(){
  fecha();
  var fech=document.getElementById('fecha').value;
  if(fech==""){
      alert("Elige una fecha de evaluacion");
  }
  else {
      location.href="historial.html?ruta="+"http://192.99.204.36/vision/img_logs/"+anio+"/"+mes+"/"+dia+"/"+"index.json";
    }
}
