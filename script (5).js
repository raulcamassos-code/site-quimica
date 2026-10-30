//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//PASSO A PASSO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//BLOCOS (ÓXIDOS BÁSICOS E ÁCIDOS)
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {"pergunta": "O que é um óxido?", "alternativas": ["Substância simples formada só por oxigênio", "Composto binário em que o oxigênio é o elemento mais eletronegativo", "Composto com pelo menos três elementos", "Mistura de metais"], "correta": 1, "explicacao": "Óxidos são compostos de dois elementos, sendo o oxigênio o mais eletronegativo (o OF₂ não é considerado óxido, pois o flúor é mais eletronegativo)."},
    {"pergunta": "Qual é a fórmula do óxido de cálcio?", "alternativas": ["Ca₂O", "CaO₂", "CaO", "Ca(OH)₂"], "correta": 2, "explicacao": "O cálcio forma o íon Ca²⁺ e o oxigênio, O²⁻, então a fórmula é CaO."},
    {"pergunta": "Qual é o nome do Na₂O?", "alternativas": ["Óxido de sódio", "Peróxido de sódio", "Hidróxido de sódio", "Dióxido de sódio"], "correta": 0, "explicacao": "Na₂O é o óxido de sódio. O peróxido de sódio é o Na₂O₂."},
    {"pergunta": "Qual é o nome do CO₂?", "alternativas": ["Monóxido de carbono", "Peróxido de carbono", "Dióxido de carbono", "Ácido carbônico"], "correta": 2, "explicacao": "CO₂ tem um átomo de carbono e dois de oxigênio: dióxido de carbono."},
    {"pergunta": "Os óxidos básicos são formados, em geral, por oxigênio e:", "alternativas": ["Gases nobres", "Halogênios", "Ametais", "Metais"], "correta": 3, "explicacao": "Óxidos básicos são iônicos e formados por metais, como Na₂O, K₂O, CaO e MgO."},
    {"pergunta": "Um óxido básico reage com água formando:", "alternativas": ["Um ácido", "Uma base", "Apenas um sal", "Um peróxido"], "correta": 1, "explicacao": "Exemplo: CaO + H₂O → Ca(OH)₂, uma base."},
    {"pergunta": "Qual é o produto da reação SO₃ + H₂O?", "alternativas": ["H₂SO₃", "H₂SO₄", "H₂S", "SO₄"], "correta": 1, "explicacao": "SO₃ + H₂O → H₂SO₄, o ácido sulfúrico."},
    {"pergunta": "Quais óxidos são os principais responsáveis pela chuva ácida?", "alternativas": ["CaO e MgO", "Na₂O e K₂O", "SO₂ e NO₂", "ZnO e Al₂O₃"], "correta": 2, "explicacao": "SO₂ e NO₂ reagem com a água da chuva formando ácidos sulfúrico e nítrico."},
    {"pergunta": "Qual destes é um óxido anfótero?", "alternativas": ["Na₂O", "SO₃", "CO₂", "Al₂O₃"], "correta": 3, "explicacao": "Al₂O₃ e ZnO reagem tanto com ácidos quanto com bases."},
    {"pergunta": "Qual destes é um óxido neutro?", "alternativas": ["CO", "CO₂", "Na₂O", "SO₃"], "correta": 0, "explicacao": "CO, NO e N₂O não reagem com água, ácidos ou bases."},
    {"pergunta": "Qual é o principal componente da ferrugem?", "alternativas": ["Cloreto de ferro", "Óxido de ferro III hidratado", "Carbonato de ferro", "Ferro metálico"], "correta": 1, "explicacao": "A ferrugem é basicamente Fe₂O₃ hidratado, formado pela reação do ferro com oxigênio e água."},
    {"pergunta": "Qual é a fórmula da cal virgem?", "alternativas": ["CaCO₃", "Ca(OH)₂", "CaO", "CaSO₄"], "correta": 2, "explicacao": "A cal virgem é o óxido de cálcio, CaO, obtido pela decomposição do calcário."},
    {"pergunta": "A cal virgem reage com água formando:", "alternativas": ["Calcário", "Cal hidratada (apagada)", "Gesso", "Cimento"], "correta": 1, "explicacao": "CaO + H₂O → Ca(OH)₂, chamada de cal hidratada ou cal apagada."},
    {"pergunta": "Qual é a principal matéria-prima para produzir alumínio?", "alternativas": ["Hematita", "Bauxita", "Calcário", "Cassiterita"], "correta": 1, "explicacao": "A bauxita é rica em Al₂O₃ (alumina), da qual se extrai o alumínio."},
    {"pergunta": "Qual minério é rico em Fe₂O₃ e usado para obter ferro?", "alternativas": ["Hematita", "Bauxita", "Galena", "Cassiterita"], "correta": 0, "explicacao": "A hematita (Fe₂O₃) é um dos principais minérios de ferro."},
    {"pergunta": "A areia e o quartzo são formados principalmente por:", "alternativas": ["CO₂", "SiO₂", "Al₂O₃", "CaO"], "correta": 1, "explicacao": "A sílica, SiO₂, é o principal componente da areia, do quartzo e do vidro comum."},
    {"pergunta": "O CO₂ dissolvido em água forma qual ácido?", "alternativas": ["Ácido clorídrico", "Ácido sulfúrico", "Ácido nítrico", "Ácido carbônico"], "correta": 3, "explicacao": "CO₂ + H₂O ⇌ H₂CO₃, o ácido carbônico presente nos refrigerantes."},
    {"pergunta": "A água (H₂O) também pode ser chamada de:", "alternativas": ["Hidróxido de oxigênio", "Peróxido de hidrogênio", "Óxido de hidrogênio", "Ácido hídrico"], "correta": 2, "explicacao": "H₂O é formada por hidrogênio e oxigênio, portanto é o óxido de hidrogênio."},
    {"pergunta": "Qual é a fórmula do peróxido de hidrogênio (água oxigenada)?", "alternativas": ["H₂O", "H₂O₂", "HO", "H₃O"], "correta": 1, "explicacao": "Nos peróxidos há a ligação O–O; no H₂O₂ o oxigênio tem Nox −1."},
    {"pergunta": "Um óxido reage com NaOH formando sal e água, mas não reage com HCl. Qual é o seu caráter?", "alternativas": ["Básico", "Neutro", "Ácido", "Anfótero"], "correta": 2, "explicacao": "Óxidos ácidos reagem com bases formando sal e água, como CO₂ + 2 NaOH → Na₂CO₃ + H₂O."}
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 15 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
