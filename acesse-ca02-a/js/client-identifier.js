function getCookie(t){for(var e=t+"=",o=decodeURIComponent(document.cookie).split(";"),i=0;i<o.length;i++){for(var r=o[i];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(e))return r.substring(e.length,r.length)}return""}$(document).ready((function(){var t=getCookie("COOKIE_EMP_U")||null;if(console.log(t),null!==t){$(".briteform .boxInput, .briteform .btn-submit").hide(),$(".titleForm").html("<b>Clique no botão</b> abaixo para participar:"),$(".briteform").attr("action","https://ws.empiricus.com.br/hash/subscribe"),$('input[name="emailAddress"').attr("name","emailHash").val(t),$(".btOpenForm.showModal").addClass("btClient").removeClass("showModal");var e=$(".boxFloatButton .btClient").clone(!0);$(e).insertAfter(".btn-submit").css("margin-bottom","10px")}$(".btClient").click((function(){dataLayer.push({event:"cliqueBotaoLP"}),$(".modalForm").hide().removeClass("activated"),$(".briteform").submit()}))}));