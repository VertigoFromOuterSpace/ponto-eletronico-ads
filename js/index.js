//TO-DO
//Organizar código
// ajeitar o div da confirmacao e fazê-lo aparecer
// garantir que o código persista para mostrar o histórico

const diaSemana = document.getElementById("dia-semana"); // constante do dia da semana por extenso
const diaMesAno = document.getElementById("dia-mes-ano"); // constante do dia no mês
const horasMinSeg = document.getElementById("hora-min-seg"); // constante do horário
const arrayWeekDay = ["Domingo","Segunda-feira", "Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"]; // array pra definir o dia da semana

const btnFecharModal = document.getElementById("btn-fechar-dialog"); // constante do botão de fechar o modal
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto"); // constante do botão de abrir o modal
const dialogPonto = document.getElementById("dialog-ponto"); // constante do modal

const modalDiaMesAno = document.getElementById("modal-dia-mes-ano"); // constante do dia no mês no modal
const modalHorasMinSeg = document.getElementById("modal-hora-min-seg"); // constante do horário no modal

const confirmacaoModal = document.getElementById("tela-confirmacao");

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
});










function daySemana(){ // usa o array para mostrar o dia da semana
    const date = new Date();
    return arrayWeekDay[date.getDay()]
}

function dataCompleta(){ // função de mostrar a data completa e coloca um 0 à esquerda quando necessário
    const date = new Date();
    return String(date.getDate()).padStart(2,"0") + "/" + String(date.getMonth() + 1).padStart(2,"0") + "/" + date.getFullYear()
}


function horaCompleta(){ // função para mostrar o horário e colocar um 0 à esquerda quando necessário
    const date = new Date();
    const dataHora = date.getHours();
    const dataMinutos = date.getMinutes();
    const dataSegundos = date.getSeconds();

    horarioMais10 = dataHora + ":" + dataMinutos + ":" + dataSegundos; //Horas, Minutos e Segundos são maiores que 10

    horasMenos10 = "0" + dataHora + ":" + dataMinutos + ":" + dataSegundos;
    minutosMenos10 = dataHora + ":" + "0" + dataMinutos + ":" + dataSegundos;
    segundosMenos10 = dataHora + ":" + dataMinutos + ":" + "0" + dataSegundos;

    horasMinutosMenos10 = "0" + dataHora + ":" + "0" + dataMinutos + ":" + dataSegundos;
    horasSegundosMenos10 = "0" + dataHora + ":" + dataMinutos + ":" + "0" + dataSegundos;

    minutosSegundosMenos10 = dataHora + ":" + "0" + dataMinutos + ":" + "0" + dataSegundos;

    horasMinutosSegundosMenos10 = "0" + dataHora + ":" + "0" + dataMinutos + ":" + "0" + dataSegundos;


    if (dataHora < 10 && dataMinutos < 10 && dataSegundos < 10){
        return horasMinutosSegundosMenos10
    }
    else if (dataMinutos < 10 && dataSegundos < 10){
        return minutosSegundosMenos10
    }
    else if (dataHora < 10 && dataSegundos < 10){
        return horasSegundosMenos10
    }
    else if (dataHora < 10 && dataMinutos < 10){
        return horasMinutosMenos10
    }
    else if (dataSegundos < 10){
        return segundosMenos10
    }
    else if (dataMinutos < 10){
        return minutosMenos10
    }
    else if (dataHora < 10){
        return horasMenos10
    }
    else{
        return horarioMais10
    }
}

function atualizarHora(){ //atualiza a hora de acordo
    horasMinSeg.textContent = horaCompleta();
}



function modalDataCompleta(){ // mostra a data no modal
    const date = new Date();

    const diaData = date.getDate();
    const MesData = date.getMonth() + 1;


    dataMais10 = diaData + "/" + MesData + "/" + date.getFullYear(); //data padrão quando dia e mês for mais de 10

    dataDiaMesMenos10 = "0" + diaData + "/" + "0" + MesData + "/" + date.getFullYear();
    dataDiaMenos10 = "0" + diaData + "/" + MesData + "/" + date.getFullYear();
    dataMesMenos10 = diaData + "/" + "0" + MesData + "/" + date.getFullYear();
    
    if (diaData < 10 && MesData < 10){
        return dataDiaMesMenos10;
    }
    else if (date.getMonth() < 10){
        return dataMesMenos10;
    }
    else if (diaData < 10){
        return dataDiaMenos10;
    }
    else{
        return dataMais10;
    }
}

function modalHoraCompleta(){ // mostra o horário no modal
    const date = new Date();
    const dataHora = date.getHours();
    const dataMinutos = date.getMinutes();
    const dataSegundos = date.getSeconds();

    horarioMais10 = dataHora + ":" + dataMinutos + ":" + dataSegundos; //Horas, Minutos e Segundos são maiores que 10

    horasMenos10 = "0" + dataHora + ":" + dataMinutos + ":" + dataSegundos;
    minutosMenos10 = dataHora + ":" + "0" + dataMinutos + ":" + dataSegundos;
    segundosMenos10 = dataHora + ":" + dataMinutos + ":" + "0" + dataSegundos;

    horasMinutosMenos10 = "0" + dataHora + ":" + "0" + dataMinutos + ":" + dataSegundos;
    horasSegundosMenos10 = "0" + dataHora + ":" + dataMinutos + ":" + "0" + dataSegundos;

    minutosSegundosMenos10 = dataHora + ":" + "0" + dataMinutos + ":" + "0" + dataSegundos;

    horasMinutosSegundosMenos10 = "0" + dataHora + ":" + "0" + dataMinutos + ":" + "0" + dataSegundos;


    if (dataHora < 10 && dataMinutos < 10 && dataSegundos < 10){
        return horasMinutosSegundosMenos10
    }
    else if (dataMinutos < 10 && dataSegundos < 10){
        return minutosSegundosMenos10
    }
    else if (dataHora < 10 && dataSegundos < 10){
        return horasSegundosMenos10
    }
    else if (dataHora < 10 && dataMinutos < 10){
        return horasMinutosMenos10
    }
    else if (dataSegundos < 10){
        return segundosMenos10
    }
    else if (dataMinutos < 10){
        return minutosMenos10
    }
    else if (dataHora < 10){
        return horasMenos10
    }
    else{
        return horarioMais10
    }
}

function modalAtualizarHora(){ // atualiza a hora do modal
    modalHorasMinSeg.textContent = "horas: " + modalHoraCompleta();
}

setInterval(atualizarHora, 1000); // atualiza o relógio à cada segundo
setInterval(modalAtualizarHora, 1000); // atualiza o relógio à cada segundo no modal

diaSemana.textContent = daySemana(); //  substitui o dia da semana no html
diaMesAno.textContent = dataCompleta(); // substitui a data no html
modalDiaMesAno.textContent = "data: " + modalDataCompleta(); // substitui a data no modal