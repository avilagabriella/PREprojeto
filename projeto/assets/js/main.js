$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });
 
 function sair() {
    window.localStorage.removeItem("userTurmaAtividade");
    window.location.href = "./index.html";
}