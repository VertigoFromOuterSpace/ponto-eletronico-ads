const btnFecharEditar = document.getElementById("btn-fechar-editar");
const btnConfirmarEdicao = document.getElementById("btn-confirmar-edicao");
const btnFiltro = document.getElementById("btn-filtrar");
let pontoEmEdicao = null;

// Exibir o relatório completo ao carregar a página
window.onload = function() {
    exibirRelatorio();
};

function exibirRelatorio() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let listaRelatorio = document.getElementById("lista-relatorio");
    listaRelatorio.innerHTML = ""; // Limpar lista

    registros.forEach((ponto, index) => {
        let listItem = document.createElement("li");

        // HTML com botões de Editar e Excluir
        listItem.innerHTML = `
            ${ponto.tipo} - ${ponto.data} ${ponto.hora}
            ${ponto.diaPassado ? "<small>(Ponto no passado)</small>" : ""}
            ${ponto.editado ? "<small>(editado)</small>" : ""}
            <button class="btn-editar" onclick="abrirModalEdicao(${index})">Editar</button>
            <button class="btn-excluir" onclick="alert('Não é possível excluir este ponto')">Excluir</button>
        `;
        listaRelatorio.appendChild(listItem);
    });
}

// Função para abrir o modal de edição e preencher os dados
function abrirModalEdicao(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    pontoEmEdicao = index; // Armazenar o índice do ponto em edição

    // Preencher o modal de edição com os dados do ponto
    let ponto = registros[index];
    document.getElementById("input-data-edicao").value = ponto.data.split("/").reverse().join("-");
    document.getElementById("input-hora-edicao").value = ponto.hora;
    document.getElementById("select-tipo-edicao").value = ponto.tipo;

    // Abrir o modal
    document.getElementById("dialog-editar-ponto").showModal();
}

// Função para salvar a edição
btnConfirmarEdicao.addEventListener("click", () => {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    // Atualizar o ponto em edição com os novos valores do modal
    registros[pontoEmEdicao].data = document.getElementById("input-data-edicao").value.split("-").reverse().join("/");
    registros[pontoEmEdicao].hora = document.getElementById("input-hora-edicao").value;
    registros[pontoEmEdicao].tipo = document.getElementById("select-tipo-edicao").value;
    registros[pontoEmEdicao].editado = true; // Marca o ponto como editado

    // Salvar no localStorage
    localStorage.setItem("registros", JSON.stringify(registros));

    // Fechar o modal
    document.getElementById("dialog-editar-ponto").close();

    // Atualizar o relatório exibido
    exibirRelatorio();
});

// Fechar o modal de edição
btnFecharEditar.addEventListener("click", () => {
    document.getElementById("dialog-editar-ponto").close();
});

// Função de filtro por período
btnFiltro.addEventListener("click", () => {
    let inicio = new Date(document.getElementById("filtro-inicio").value);
    let fim = new Date(document.getElementById("filtro-fim").value);
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    let registrosFiltrados = registros.filter(ponto => {
        let dataPonto = new Date(ponto.data.split("/").reverse().join("-"));
        return dataPonto >= inicio && dataPonto <= fim;
    });

    // Atualizar a lista com os registros filtrados
    exibirRelatorioFiltrado(registrosFiltrados);
});

function exibirRelatorioFiltrado(registros) {
    let listaRelatorio = document.getElementById("lista-relatorio");
    listaRelatorio.innerHTML = ""; // Limpar lista

    registros.forEach((ponto, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            ${ponto.tipo} - ${ponto.data} ${ponto.hora}
            ${ponto.diaPassado ? "<small>(Ponto no passado)</small>" : ""}
            ${ponto.editado ? "<small>(editado)</small>" : ""}
            <button class="btn-editar" onclick="abrirModalEdicao(${index})">Editar</button>
            <button class="btn-excluir" onclick="alert('Não é possível excluir este ponto')">Excluir</button>
        `;
        listaRelatorio.appendChild(listItem);
    });
}
