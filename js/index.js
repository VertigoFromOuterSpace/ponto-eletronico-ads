const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horasMinSeg = document.getElementById("hora-min-seg");
const arrayWeekDay = ["Domingo","Segunda-feira", "Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];


function daySemana(){
    const date = new Date();
    return arrayWeekDay[date.getDay()]
}

function dataCompleta(){
    const date = new Date();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function horaCompleta(){
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function atualizarHora(){
    horasMinSeg.textContent = horaCompleta();
}

setInterval(atualizarHora, 1000);


diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();
