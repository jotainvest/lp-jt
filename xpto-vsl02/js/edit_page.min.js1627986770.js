function readCookiePuEdit(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for (var i = 0; i < ca.length; i++) {
 var c = ca[i];
 while (c.charAt(0) == ' ') c = c.substring(1, c.length);
 if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
 }
 return null;
}
if (readCookiePuEdit("pu_edit") && peditslug) { var link = document.createElement("a"); link.href = decodeURIComponent(readCookiePuEdit("pu_edit"))+peditslug,link.target="_blank",link.style="display:block;text-align:center",link.innerText="Editar Página",document.body.appendChild(link)}
