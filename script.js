let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

function salvar() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

function adicionarPaciente() {
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const pendencia = document.getElementById("pendencia").checked;

    if (!nome) {
        alert("Digite o nome");
        return;
    }

    pacientes.push({ nome, tipo, pendencia });

    salvar();
    atualizarTudo();

    document.getElementById("nome").value = "";
    document.getElementById("pendencia").checked = false;
}

function atualizarTudo() {
    atualizarTabela(pacientes);
    atualizarDashboard();
}

function atualizarTabela(lista) {
    const tbody = document.getElementById("lista");
    tbody.innerHTML = "";

    lista.forEach((p, i) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.tipo}</td>
            <td class="${p.pendencia ? 'pendente' : 'ok'}">
                ${p.pendencia ? '⚠ Pendência' : 'OK'}
            </td>
            <td>
                <button onclick="remover(${i})">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function atualizarDashboard() {
    document.getElementById("total").innerText = pacientes.length;
    document.getElementById("pendentes").innerText =
        pacientes.filter(p => p.pendencia).length;

    document.getElementById("gestantes").innerText =
        pacientes.filter(p => p.tipo === "gestante").length;

    document.getElementById("criancas").innerText =
        pacientes.filter(p => p.tipo === "crianca").length;
}

function remover(index) {
    pacientes.splice(index, 1);
    salvar();
    atualizarTudo();
}

function filtrar() {
    const filtro = document.getElementById("filtro").value;

    let filtrados = pacientes;

    if (filtro === "pendentes") {
        filtrados = pacientes.filter(p => p.pendencia);
    } else if (filtro === "gestante") {
        filtrados = pacientes.filter(p => p.tipo === "gestante");
    } else if (filtro === "crianca") {
        filtrados = pacientes.filter(p => p.tipo === "crianca");
    }

    atualizarTabela(filtrados);
}

atualizarTudo();