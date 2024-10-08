// CONSTANTES
const diaSemana = document.getElementById("dia-semana"); // constante do dia da semana por extenso
const diaMesAno = document.getElementById("dia-mes-ano"); // constante do dia no mês
const horasMinSeg = document.getElementById("hora-min-seg"); // constante do horário
const arrayWeekDay = ["Domingo","Segunda-feira", "Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"]; // array pra definir o dia da semana
const modalDiaMesAno = document.getElementById("modal-dia-mes-ano"); // constante do dia no mês no modal
const modalHorasMinSeg = document.getElementById("modal-hora-min-seg"); // constante do horário no modal
// FUNÇÕES
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
        return String(date.getDate()).padStart(2,"0") + "/" + String(date.getMonth() + 1).padStart(2,"0") + "/" + date.getFullYear()
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