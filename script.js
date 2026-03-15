// ===== DADOS DAS ENTREGAS =====
const dadosEntregas = {
    "Novo Hamburgo": {
        classe: "city-novo-hamburgo",
        bairros: [
            { nome: "Primavera", valor: 3.00 }, 
            { nome: "Petrópolis", valor: 5.00 },
            { nome: "Rincão", valor: 5.00 }, 
            { nome: "Rio Branco", valor: 5.00 },
            { nome: "Vila Rosa", valor: 5.00 }, 
            { nome: "Centro", valor: 6.00 },
            { nome: "Operário", valor: 6.00 }, 
            { nome: "Ideal", valor: 6.00 },
            { nome: "Pátria Nova", valor: 8.00 }, 
            { nome: "Guarani", valor: 8.00 },
            { nome: "Rondônia", valor: 8.00 },
            { nome: "Ouro Branco", valor: 8.00 }, 
            { nome: "Liberdade", valor: 8.00 },
            { nome: "Boa Vista", valor: 8.00 }, 
            { nome: "Hamburgo Velho", valor: 8.00 },
            { nome: "Vila Nova", valor: 8.00 }, 
            { nome: "Jardim Mauá", valor: 8.00 },
            { nome: "Industrial", valor: 8.00 }, 
            { nome: "Boa Saúde", valor: 8.00 },
            { nome: "Canudos", valor: 10.00 }, 
            { nome: "Mundo Novo", valor: 10.00 },
            { nome: "Santo Afonso", valor: 10.00 }, 
            { nome: "São José", valor: 10.00 },
            { nome: "São Jorge", valor: 10.00 }, 
            { nome: "Roselândia", valor: 10.00 }
        ]
    },
    "Estância Velha": {
        classe: "city-estancia-velha",
        bairros: [
            { nome: "Rincão dos Ilhéus", valor: 9.00 }, 
            { nome: "Sol Nascente", valor: 9.00 },
            { nome: "Encosta do Sol", valor: 10.00 }, 
            { nome: "União", valor: 10.00 },
            { nome: "Rincão Gaúcho", valor: 11.00 }, 
            { nome: "Floresta", valor: 13.00 },
            { nome: "Centro", valor: 13.00 }, 
            { nome: "Das Rosas", valor: 15.00 },
            { nome: "Bela Vista", valor: 15.00 }, 
            { nome: "Lira", valor: 15.00 },
            { nome: "Lago Azul", valor: 15.00 }, 
            { nome: "Das Quintas", valor: 18.00 }
        ]
    },
    "São Leopoldo": {
        classe: "city-sao-leopoldo",
        bairros: [
            { nome: "Scharlau", valor: 11.00 }, 
            { nome: "Santos Dumont", valor: 11.00 },
            { nome: "Campina", valor: 13.00 }, 
            { nome: "Rio dos Sinos", valor: 13.00 },
            { nome: "São Miguel", valor: 13.00 }, 
            { nome: "Arroio da Manteiga", valor: 13.00 },
            { nome: "Centro", valor: 15.00 }, 
            { nome: "Fião", valor: 15.00 },
            { nome: "Cristo Rei", valor: 15.00 }, 
            { nome: "Padre Reus", valor: 15.00 },
            { nome: "São José", valor: 15.00 }, 
            { nome: "Morro do Espelho", valor: 15.00 },
            { nome: "Pinheiro", valor: 15.00 }, 
            { nome: "Rio Branco", valor: 15.00 },
            { nome: "Santa Tereza", valor: 15.00 }, 
            { nome: "Jardim América", valor: 15.00 },
            { nome: "Santo André", valor: 15.00 }, 
            { nome: "Campestre", valor: 15.00 },
            { nome: "Feitoria", valor: 15.00 }
        ]
    },
    "Campo Bom": {
        classe: "city-campo-bom",
        bairros: [
            { nome: "Imigrante", valor: 11.00 }, 
            { nome: "Ipiranga", valor: 11.00 },
            { nome: "Genuíno Sampaio", valor: 13.00 }, 
            { nome: "Celeste", valor: 13.00 },
            { nome: "Centro", valor: 13.00 }, 
            { nome: "Vila Dona Augusta", valor: 15.00 },
            { nome: "Metzler", valor: 15.00 }, 
            { nome: "Junchen", valor: 15.00 },
            { nome: "Dona Leopoldina", valor: 15.00 }, 
            { nome: "Dos Gringos", valor: 15.00 },
            { nome: "Paulista", valor: 17.00 }, 
            { nome: "Bela Vista", valor: 17.00 },
            { nome: "Porto Blos", valor: 17.00 }
        ]
    },
    "Ivoti": {
        classe: "city-ivoti",
        bairros: [{ nome: "Ivoti", valor: 20.00 }]
    }
};

// ===== VARIÁVEIS GLOBAIS =====
let totalGeral = 0;
let contagens = {};
let ordemAdicao = [];
let isRecognizing = false;
let feedbackTimeout;

// Chave para localStorage
const STORAGE_KEY = 'calculadora_entregas_dados';

// ===== FUNÇÕES DE PERSISTÊNCIA =====
function salvarDados() {
    const dados = {
        totalGeral,
        contagens,
        ordemAdicao,
        ultimaAtualizacao: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
        try {
            const dados = JSON.parse(dadosSalvos);
            totalGeral = dados.totalGeral || 0;
            contagens = dados.contagens || {};
            ordemAdicao = dados.ordemAdicao || [];
            return true;
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
            return false;
        }
    }
    return false;
}

function limparDadosSalvos() {
    localStorage.removeItem(STORAGE_KEY);
}

// ===== FORMATAÇÃO =====
function formatarMoeda(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function formatarDataHora(data = new Date()) {
    const opcoes = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return data.toLocaleDateString('pt-BR', opcoes);
}

// ===== CONTAGEM DE BAIRROS =====
function contarBairrosAtivos() {
    let total = 0;
    for (const id in contagens) {
        if (contagens[id] > 0) {
            total += contagens[id];
        }
    }
    return total;
}

function atualizarContadorBairros() {
    const contador = document.getElementById('bairros-count');
    if (contador) {
        contador.textContent = contarBairrosAtivos();
    }
}

// ===== RENDERIZAÇÃO =====
function renderizarApp() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    for (const cidade in dadosEntregas) {
        const dados = dadosEntregas[cidade];
        
        const bairrosOrdenados = [...dados.bairros].sort((a, b) => 
            a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
        );

        const coluna = document.createElement('div');
        coluna.className = `city-column ${dados.classe}`;
        
        const header = document.createElement('div');
        header.className = 'city-header';
        header.innerHTML = `<span>${cidade}</span><span class="arrow">▼</span>`;
        header.onclick = () => coluna.classList.toggle('active');

        const lista = document.createElement('div');
        lista.className = 'neighborhood-list';

        bairrosOrdenados.forEach(bairro => {
            const idUnico = `${cidade}-${bairro.nome}`.replace(/\s+/g, '_');
            
            // Inicializa contagem se não existir
            if (contagens[idUnico] === undefined) {
                contagens[idUnico] = 0;
            }

            const item = document.createElement('div');
            item.className = 'neighborhood-item';
            item.innerHTML = `
                <div class="neighborhood-info">
                    <span class="neighborhood-name">${bairro.nome}</span>
                    <span class="price">R$ ${formatarMoeda(bairro.valor)}</span>
                </div>
                <div class="controls">
                    <button class="btn-control btn-minus" onclick="alterarValor('${idUnico}', -1, ${bairro.valor}, '${cidade}', '${bairro.nome}')">−</button>
                    <span class="counter ${contagens[idUnico] > 0 ? 'has-value' : ''}" id="count-${idUnico}">${contagens[idUnico]}</span>
                    <button class="btn-control btn-plus" onclick="alterarValor('${idUnico}', 1, ${bairro.valor}, '${cidade}', '${bairro.nome}')">+</button>
                </div>
            `;
            lista.appendChild(item);
        });

        coluna.appendChild(header);
        coluna.appendChild(lista);
        app.appendChild(coluna);
    }

    // Atualiza displays
    document.getElementById('total-amount').innerText = formatarMoeda(totalGeral);
    atualizarContadorBairros();
}

// ===== ALTERAÇÃO DE VALORES =====
function alterarValor(id, operacao, valorBairro, cidade, bairroNome) {
    if (operacao === -1 && contagens[id] === 0) return;

    const countAntigo = contagens[id];
    contagens[id] += operacao;
    
    const counterElement = document.getElementById(`count-${id}`);
    counterElement.innerText = contagens[id];
    
    contagens[id] > 0 
        ? counterElement.classList.add('has-value') 
        : counterElement.classList.remove('has-value');

    // Registra na ordem de adição
    if (operacao === 1 && countAntigo === 0) {
        ordemAdicao.push({ id, cidade, bairroNome, valor: valorBairro, dataHora: new Date().toISOString() });
    }

    // Remove da ordem se zerou
    if (contagens[id] === 0) {
        ordemAdicao = ordemAdicao.filter(item => item.id !== id);
    }

    totalGeral += (operacao * valorBairro);
    totalGeral = Math.max(0, Math.round(totalGeral * 100) / 100);
    
    document.getElementById('total-amount').innerText = formatarMoeda(totalGeral);
    atualizarContadorBairros();
    
    // Salva automaticamente
    salvarDados();
    
    atualizarHistoricoAberto();
}

// ===== EXPORTAR DADOS =====
function exportarDados() {
    const itensAtivos = ordemAdicao.filter(item => contagens[item.id] > 0);
    
    if (itensAtivos.length === 0) {
        mostrarToast('Nenhum bairro para exportar!');
        return;
    }

    const dataHora = formatarDataHora();
    const totalBairros = contarBairrosAtivos();
    const valorEntregas = totalBairros * 5; // Cálculo: entregas x 5
    const somaFinal = totalGeral + valorEntregas; // Soma total
    
    let texto = `📋 RELATÓRIO DE ENTREGAS\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `📅 Data/Hora: ${dataHora}\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    texto += `📍 BAIRROS SELECIONADOS:\n`;
    texto += `──────────────────────────\n`;
    
    // Agrupa por cidade
    const porCidade = {};
    itensAtivos.forEach(item => {
        if (!porCidade[item.cidade]) {
            porCidade[item.cidade] = [];
        }
        porCidade[item.cidade].push({
            nome: item.bairroNome,
            qtd: contagens[item.id],
            valor: item.valor,
            total: contagens[item.id] * item.valor
        });
    });

    for (const cidade in porCidade) {
        texto += `\n🏙️ ${cidade}:\n`;
        porCidade[cidade].forEach(b => {
            texto += `   • ${b.nome} (${b.qtd}x) - R$ ${formatarMoeda(b.total)}\n`;
        });
    }
    
    texto += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `📊 RESUMO:\n`;
    texto += `   • Total de entregas: ${totalBairros} (R$ ${formatarMoeda(valorEntregas)})\n`;
    texto += `   • Valor taxas: R$ ${formatarMoeda(totalGeral)}\n`;
    texto += `   ──────────────────────\n`;
    texto += `   💰 TOTAL FINAL: R$ ${formatarMoeda(somaFinal)}\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    // Copia para área de transferência
    navigator.clipboard.writeText(texto).then(() => {
        mostrarToast('✅ Copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        // Fallback para navegadores antigos
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        mostrarToast('✅ Copiado!');
    });
}

// ===== TOAST NOTIFICAÇÃO =====
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    
    toastMsg.textContent = mensagem;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== RECONHECIMENTO DE VOZ =====
function iniciarReconhecimentoVoz() {
    if (isRecognizing) return;
    isRecognizing = true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Navegador não suporta reconhecimento de voz. Use Chrome, Edge ou Safari.");
        isRecognizing = false;
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const btnVoz = document.getElementById('btnVoz');
    const feedback = document.getElementById('voiceFeedback');
    const feedbackText = document.getElementById('feedbackText');
    const feedbackOptions = document.getElementById('feedbackOptions');

    btnVoz.classList.add('listening');
    feedback.classList.add('show');
    feedbackText.textContent = 'Ouvindo...';
    feedbackOptions.innerHTML = '';

    recognition.onstart = () => console.log("Ouvindo...");

    recognition.onerror = (event) => {
        console.error("Erro:", event.error);
        isRecognizing = false;
        btnVoz.classList.remove('listening');
        feedback.classList.remove('show');
    };

    recognition.onend = () => {
        isRecognizing = false;
        btnVoz.classList.remove('listening');
        clearTimeout(feedbackTimeout);
        feedbackTimeout = setTimeout(() => {
            feedback.classList.remove('show');
        }, 3000);
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Comando:", transcript);
        encontrarBairros(transcript);
    };

    recognition.start();
}

function encontrarBairros(comando) {
    const feedbackText = document.getElementById('feedbackText');
    const feedbackOptions = document.getElementById('feedbackOptions');
    feedbackOptions.innerHTML = '';

    let cidadeAlvo = null;
    let bairrosEncontrados = [];

    for (const cidade of Object.keys(dadosEntregas)) {
        const nomeCidade = cidade.toLowerCase();
        if (comando.includes(`de ${nomeCidade}`) || comando.includes(nomeCidade)) {
            cidadeAlvo = cidade;
            break;
        }
    }

    if (cidadeAlvo) {
        const bairros = dadosEntregas[cidadeAlvo].bairros;
        for (const b of bairros) {
            const nomeBairro = b.nome.toLowerCase();
            if (comando.includes(nomeBairro)) {
                bairrosEncontrados.push({ ...b, cidade: cidadeAlvo });
                break;
            }
        }
    } else {
        for (const cidade of Object.keys(dadosEntregas)) {
            const bairros = dadosEntregas[cidade].bairros;
            for (const b of bairros) {
                const nomeBairro = b.nome.toLowerCase();
                if (comando.includes(nomeBairro)) {
                    bairrosEncontrados.push({ ...b, cidade });
                }
            }
        }
    }

    if (bairrosEncontrados.length === 0) {
        feedbackText.textContent = `Nenhum bairro encontrado para: "${comando}"`;
        feedbackOptions.innerHTML = `
            <button class="option-btn" onclick="document.getElementById('voiceFeedback').classList.remove('show')">
                Fechar
            </button>
        `;
    } else if (bairrosEncontrados.length === 1) {
        const { cidade, nome, valor } = bairrosEncontrados[0];
        feedbackText.textContent = `Adicionando: "${nome}" em ${cidade}`;
        
        const id = `${cidade}-${nome}`.replace(/\s+/g, '_');
        const qtdMatch = comando.match(/(\d+)/);
        const qtd = qtdMatch ? parseInt(qtdMatch[0], 10) : 1;
        
        for (let i = 0; i < qtd; i++) {
            alterarValor(id, 1, valor, cidade, nome);
        }
        
        clearTimeout(feedbackTimeout);
        feedbackTimeout = setTimeout(() => {
            document.getElementById('voiceFeedback').classList.remove('show');
        }, 2000);
    } else {
        feedbackText.textContent = `Encontramos várias opções para "${comando}". Selecione:`;
        
        bairrosEncontrados.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${item.nome} (${item.cidade}) - R$ ${formatarMoeda(item.valor)}`;
            btn.onclick = () => {
                const id = `${item.cidade}-${item.nome}`.replace(/\s+/g, '_');
                const qtdMatch = comando.match(/(\d+)/);
                const qtd = qtdMatch ? parseInt(qtdMatch[0], 10) : 1;
                
                for (let i = 0; i < qtd; i++) {
                    alterarValor(id, 1, item.valor, item.cidade, item.nome);
                }
                
                document.getElementById('voiceFeedback').classList.remove('show');
            };
            feedbackOptions.appendChild(btn);
        });
    }
}

// ===== HISTÓRICO =====
function mostrarHistorico() {
    const modal = document.getElementById('historicoModal');
    const lista = document.getElementById('historicoLista');
    lista.innerHTML = '';

    const itensAtivos = ordemAdicao.filter(item => contagens[item.id] > 0);

    if (itensAtivos.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#6b7280; font-style:italic">Nenhum bairro adicionado.</p>';
    } else {
        itensAtivos.forEach(item => {
            const qtd = contagens[item.id];
            const totalBairro = qtd * item.valor;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'historico-item';
            itemDiv.innerHTML = `
                <div class="historico-header">
                    <span>${item.bairroNome}<br><small>${item.cidade}</small></span>
                    <span>R$ ${formatarMoeda(totalBairro)}</span>
                </div>
                <div class="historico-controls">
                    <button class="btn-control btn-minus" 
                        onclick="alterarValor('${item.id}', -1, ${item.valor}, '${item.cidade}', '${item.bairroNome}')">−</button>
                    <span class="counter-historico">${qtd}</span>
                    <button class="btn-control btn-plus" 
                        onclick="alterarValor('${item.id}', 1, ${item.valor}, '${item.cidade}', '${item.bairroNome}')">+</button>
                </div>
            `;
            lista.appendChild(itemDiv);
        });
    }

    modal.style.display = 'flex';
}

function fecharHistorico() {
    document.getElementById('historicoModal').style.display = 'none';
}

function atualizarHistoricoAberto() {
    const modal = document.getElementById('historicoModal');
    if (modal.style.display === 'flex') {
        mostrarHistorico();
    }
}

// ===== OUTRAS FUNÇÕES =====
function recolherTudo() {
    document.querySelectorAll('.city-column').forEach(col => col.classList.remove('active'));
}

function resetarTudo() {
    if (!confirm('Tem certeza que deseja limpar todos os dados?')) return;
    
    totalGeral = 0;
    ordemAdicao = [];
    document.getElementById('total-amount').innerText = '0,00';
    document.getElementById('bairros-count').innerText = '0';
    
    for (const id in contagens) {
        contagens[id] = 0;
        const el = document.getElementById(`count-${id}`);
        if (el) { 
            el.innerText = '0'; 
            el.classList.remove('has-value'); 
        }
    }
    
    limparDadosSalvos();
    recolherTudo();
    fecharHistorico();
    document.getElementById('voiceFeedback').classList.remove('show');
    
    mostrarToast('Dados limpos com sucesso!');
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Tenta carregar dados salvos
    const dadosCarregados = carregarDados();
    
    // Renderiza a aplicação
    renderizarApp();
    
    if (dadosCarregados && totalGeral > 0) {
        mostrarToast('📂 Dados anteriores restaurados!');
    }
});

// Salva dados quando a página é fechada
window.addEventListener('beforeunload', () => {
    salvarDados();
});
