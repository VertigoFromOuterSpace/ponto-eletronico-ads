const btnFecharModal = document.getElementById("btn-fechar-dialog"); // constante do botão de fechar o modal
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto"); // constante do botão de abrir o modal
const dialogPonto = document.getElementById("dialog-ponto"); // constante do modal
const confirmacaoModal = document.getElementById("tela-confirmacao");
const mudarOpacidade = document.getElementById("tela-confirmacao");

function confirmacaoPonto() {
    const mensagem = document.getElementById("tela-confirmacao");
    mensagem.classList.add("visivel");
    setTimeout(() => {
        mensagem.classList.remove("visivel");
    }, 5000);
}

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
    
    confirmacaoPonto();

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
});










