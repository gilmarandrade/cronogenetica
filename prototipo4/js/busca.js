
var ID = function(id){return document.getElementById(id);},
createObj = function(tag){return document.createElement(tag);},
isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
},
buscar = function(texto){
	 
	 
 var div = ID('showResult'),
  i = 0,
  ano, titulo,
  eventosEncontrados = [];
 texto = trim(texto);
 texto = (texto && texto != '') ? texto.toLowerCase() : '';
var anoAnterior=0;
 if(texto == ""){
	//alert("caixa de texto vazia");
	div.innerHTML = '';
 }else{
	
	 for(var n = 0;n < Events.length;n++){
	  var event = Events[n],
	  encontrado = false;
  
          if(isNumber(texto) && event.Ano==texto)
             encontrado = true;
	  //if(event.Titulo.toLowerCase().indexOf(texto) > -1)
	  // encontrado = true;
	  //if(event.Citacao.toLowerCase().indexOf(texto) > -1)
	  //encontrado = true;
          var tags = event.Tags.split(";");
          
          for(var k = 0; k< tags.length; k++){
              console.log(tags[k]);
             if(tags[k].toLowerCase().indexOf(texto) > -1)
                encontrado = true; 
          }
	  
       
	  if(encontrado){
	   eventosEncontrados.push(event);
           div.innerHTML = '';
         }
	}
	 while(i <eventosEncontrados.length){
	  var ev = eventosEncontrados[i];
	  ano = createObj('h1');
	  titulo = createObj('h2');
	  ano.innerHTML = ev.Ano;
          titulo.innerHTML = ev.Titulo;
          titulo.setAttribute('onclick', "showEvent(\""+ ev.Titulo +"\");");
          if(ev.Ano != anoAnterior){  
              div.appendChild(ano);
              anoAnterior = ev.Ano;
          }else{
              
          }
          div.appendChild(titulo);
	  i++;
	 }
	 if(eventosEncontrados.length <= 0){
             div.innerHTML = '';
            titulo.innerHTML = 'Nenhuma not&iacute;cia encontrada com o texto <strong style="color:red">' + texto + '</strong>';
	  div.appendChild(titulo);
	 }
	 
	 //div.appendChild(table);
}
 
 
};

//trim completo
function trim(str) {
return str.replace(/^\s+|\s+$/g,"");
}


function showEvent(ev){
   location.href = "index4-07.html?ev="+encodeURIComponent(ev);
}