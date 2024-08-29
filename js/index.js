const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horasMinSeg = document.getElementById("hora-min-seg");

const date = new Date();

function dataCompleta(){
    const date = new Date() + "/" + date.getMonth() + "/" + date.getFullYear();
}

diaMesAno.textContent = dataCompleta();