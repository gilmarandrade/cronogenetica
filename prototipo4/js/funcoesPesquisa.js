/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//trim completo
function trim(str) {
return str.replace(/^\s+|\s+$/g,"");
}

    function submitenter(myfield,e)
    {
     var textBusca = document.getElementById('search-header').value;
     textBusca = trim(textBusca);
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;
    console.log('keycode:' + keycode +" ,"+ textBusca);
    if (keycode == 13 && textBusca != "")
    {
	   location.href = "pesquisa.html?q="+textBusca;	
   
    //return false;
    }
    else{
    //return true;
    }
   }
