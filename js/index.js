//TO-DO
//Organizar código
// ajeitar o div da confirmacao e fazê-lo aparecer
// garantir que o código persista para mostrar o histórico

const btnFecharModal = document.getElementById("btn-fechar-dialog"); // constante do botão de fechar o modal
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto"); // constante do botão de abrir o modal
const dialogPonto = document.getElementById("dialog-ponto"); // constante do modal
const divAlerta = document.getElementById("div-alerta");
const btnFecharDivAlerta = document.getElementById("btn-fechar-div-alerta");
const botaoHistoricoDetalhes = document.getElementById("btn-historico-detalhes");
const dialogHistorico = document.getElementById("dialog-historico");
const listaHistoricoPontos = document.getElementById("lista-historico-pontos");
const btnFecharHistorico = document.getElementById("btn-fechar-historico");
const btnModalOpcoes = document.getElementById("btn-opcoes");
const btnFecharOpcoes = document.getElementById("btn-fechar-opcoes");
const modalPontoPassado = document.getElementById("btn-ponto-dia-passado");
const fecharModalPontoPassado = document.getElementById("btn-fechar-dia-passado");
const btbConfirmarPontoPassado = document.getElementById("btn-confirmar-dia-passado");
const btnRelatorioMarcacoes = document.getElementById("btn-relatorio-marcacoes");
const fecharRelatorioMarcacoes = document.getElementById("btn-fechar-relatorio");
const visualizarRelatorio = document.getElementById("btn-ver-relatorio");

let proxPonto = {
    "Entrada":"Intervalo",
    "Intervalo":"Volta-Intervalo",
    "Volta-Intervalo":"Saida",
    "Saida":"Entrada"
}

let pontoEmEdicao = null;



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
});


btnFecharModal.addEventListener("click", function() { // ler o botão para fechar o modal
    dialogPonto.close();
});


const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", () => {

    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;

    let ponto = {
        "data":data,
        "hora":hora,
        "tipo":tipoPonto,
        "editado": false 
    }

    // Recuperar registros anteriores
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(ponto); // Adicionar novo registro
    localStorage.setItem("registros", JSON.stringify(registros)); // Salvar no localStorage

    console.log(localStorage)
    dialogPonto.close();

    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");


    btnFecharDivAlerta.addEventListener("click", function () {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    });


    setTimeout(() => {
        divAlerta.classList.remove("show");
        divAlerta.classList.add("hidden");
    }, 5000);
});


// Função para abrir o modal de edição
function abrirModalEdicao(index) {
    let registros = JSON.parse(localStorage.getItem("registros"));
    pontoEmEdicao = index;

    // Preencher os valores atuais no modal de edição
    document.getElementById("input-data-edicao").value = registros[index].data.split("/").reverse().join("-");
    document.getElementById("input-hora-edicao").value = registros[index].hora;
    document.getElementById("select-tipo-edicao").value = registros[index].tipo;

    // Abrir o modal de edição
    document.getElementById("dialog-editar-ponto").showModal();
}

// Função para salvar as alterações feitas no ponto
document.getElementById("btn-confirmar-edicao").addEventListener("click", () => {
    let registros = JSON.parse(localStorage.getItem("registros"));

    // Atualizar o ponto em edição com os novos valores
    registros[pontoEmEdicao].data = document.getElementById("input-data-edicao").value.split("-").reverse().join("/");
    registros[pontoEmEdicao].hora = document.getElementById("input-hora-edicao").value;
    registros[pontoEmEdicao].tipo = document.getElementById("select-tipo-edicao").value;
    registros[pontoEmEdicao].editado = true; // Marca o ponto como editado

    // Salvar as alterações no localStorage
    localStorage.setItem("registros", JSON.stringify(registros));

    // Fechar o modal de edição
    document.getElementById("dialog-editar-ponto").close();

    // Atualizar o histórico exibido
    exibirHistorico();
});

// Função para exibir o histórico de pontos no modal
botaoHistoricoDetalhes.addEventListener("click", () => {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    listaHistoricoPontos.innerHTML = ""; // Limpar lista
    
    registros.forEach((ponto, index) => {
        let listItem = document.createElement("li");

        // Adicionar conteúdo do ponto com três pontinhos e opção de alterar
        listItem.innerHTML = `
            ${ponto.tipo} - ${ponto.data} ${ponto.hora}
            <span class="tres-pontinhos">...</span>
            <div class="menu-opcoes hidden">
                <button onclick="abrirModalEdicao(${index})">Alterar</button>
            </div>
            ${ponto.editado ? "<small>(editado)</small>" : ""}
        `;

        // Adicionar eventos para mostrar e esconder o menu de opções
        const tresPontinhos = listItem.querySelector('.tres-pontinhos');
        const menuOpcoes = listItem.querySelector('.menu-opcoes');

        tresPontinhos.addEventListener('click', function() {
            // Alterna a visibilidade do menu de opções
            menuOpcoes.classList.toggle('hidden');
        });

        listaHistoricoPontos.appendChild(listItem);
    });

    dialogHistorico.showModal(); // Mostrar modal
});

// Abrir modal do histórico ao clicar no botão
botaoHistoricoDetalhes.addEventListener("click", () => {
    exibirHistorico();
    dialogHistorico.showModal(); // Mostrar modal
});

// Fechar modal do histórico
btnFecharHistorico.addEventListener("click", () => {
    dialogHistorico.close();
});

// Fechar modal de edição
document.getElementById("btn-fechar-editar").addEventListener("click", () => {
    document.getElementById("dialog-editar-ponto").close();
});

btnModalOpcoes.addEventListener("click", function() {
    document.getElementById("dialog-opcoes").showModal();
});

btnFecharOpcoes.addEventListener("click", function() {
    document.getElementById("dialog-opcoes").close();
});

modalPontoPassado.addEventListener("click", function() {
    document.getElementById("dialog-ponto-dia-passado").showModal();
    document.getElementById("dialog-opcoes").close();
});

fecharModalPontoPassado.addEventListener("click", function() {
    document.getElementById("dialog-ponto-dia-passado").close();
});

btbConfirmarPontoPassado.addEventListener("click", function() {
    let data = document.getElementById("input-data-dia-passado").value;
    let hora = document.getElementById("input-hora-dia-passado").value;
    let tipoPonto = document.getElementById("select-tipo-dia-passado").value;
    let justificativa = document.getElementById("input-justificativa-dia-passado").value;
    let arquivo = document.getElementById("input-upload-dia-passado").files[0];

    if (new Date(data) > new Date()) {
        alert("Não é permitido marcar uma data futura.");
        return;
    }

    let ponto = {
        "data": data.split("-").reverse().join("/"),
        "hora": hora,
        "tipo": tipoPonto,
        "editado": false,
        "diaPassado": true, // Marca o ponto como registrado no passado
        "justificativa": justificativa,
        "arquivo": arquivo ? arquivo.name : null // Armazena o nome do arquivo
    };

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(ponto);
    localStorage.setItem("registros", JSON.stringify(registros));

    // Fechar o modal e atualizar histórico
    document.getElementById("dialog-ponto-dia-passado").close();
    exibirHistorico();
});

btnRelatorioMarcacoes.addEventListener("click", function() {
    document.getElementById("dialog-relatorio-marcacoes").showModal();
    document.getElementById("dialog-opcoes").close();
});

fecharRelatorioMarcacoes.addEventListener("click", function() {
    document.getElementById("dialog-relatorio-marcacoes").close();
});

visualizarRelatorio.addEventListener("click", function() {
    window.location.href = "relatorio.html"; // Redireciona para uma página de relatório separada
});