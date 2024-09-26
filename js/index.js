//TO-DO
//Organizar código
// ajeitar o div da confirmacao e fazê-lo aparecer
// garantir que o código persista para mostrar o histórico

const btnFecharModal = document.getElementById("btn-fechar-dialog"); // constante do botão de fechar o modal
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto"); // constante do botão de abrir o modal
const dialogPonto = document.getElementById("dialog-ponto"); // constante do modal
const divAlerta = document.getElementById("div-alerta");


let proxPonto = {
    "Entrada":"Intervalo",
    "Intervalo":"Volta-Intervalo",
    "Volta-Intervalo":"Saida",
    "Saida":"Entrada"
}



navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude)
});


btnRegistrarPonto.addEventListener("click", function(){ // ler o botão para mostrar o modal
    let dialogSelect = document.getElementById("select-tipos-ponto");
    let tipoUltimoPonto = localStorage.getItem("tipoUltimoPonto");

    dialogSelect.value = proxPonto[tipoUltimoPonto];

    dialogPonto.showModal();
} );

btnFecharModal.addEventListener("click", function() { // ler o botão para fechar o modal
    dialogPonto.close();
})



const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", () => {

    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;

    let ponto = {
        "data":data,
        "hora":hora,
        "tipo":tipoPonto,
        "id": 1
    }

    

    localStorage.setItem("registro", JSON.stringify(ponto));
    localStorage.setItem("tipoUltimoPonto", tipoPonto);


    console.log(localStorage)
    dialogPonto.close();

    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");

    setTimeout(() => {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    }, 5000);
});