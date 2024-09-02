if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration.scope);
        }, function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const addSubjectBtn = document.getElementById('add-subject-btn');
    const subjectInput = document.getElementById('subject-input');
    const subjectsContainer = document.getElementById('subjects-container');

    // Função para adicionar uma nova matéria
    addSubjectBtn.addEventListener('click', () => {
        const subjectName = subjectInput.value.trim();
        if (subjectName) {
            addSubject(subjectName);
            subjectInput.value = '';
        }
    });

    // Função para criar e adicionar uma nova matéria ao DOM
    function addSubject(name) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject';
        subjectDiv.innerHTML = `
            <h2>${name}</h2>
            <input type="text" placeholder="Adicionar conteúdo" class="content-input">
            <button class="add-content-btn">Adicionar Conteúdo</button>
            <ul class="content-list"></ul>
        `;
        subjectsContainer.appendChild(subjectDiv);

        // Adicionar funcionalidade aos botões de adicionar conteúdo
        const addContentBtn = subjectDiv.querySelector('.add-content-btn');
        const contentInput = subjectDiv.querySelector('.content-input');
        const contentList = subjectDiv.querySelector('.content-list');

        addContentBtn.addEventListener('click', () => {
            const contentName = contentInput.value.trim();
            if (contentName) {
                addContent(contentList, contentName);
                contentInput.value = '';
            }
        });
    }

    // Função para adicionar um novo conteúdo à lista de conteúdos
    function addContent(contentList, name) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span>${name}</span>
        `;
        contentList.appendChild(li);
    }
});
// Função para salvar o estado atual dos estudos
function saveState() {
    const materias = [];
    document.querySelectorAll('.content').forEach((content) => {
        const materia = content.querySelector('h2').textContent;
        const conteudos = [];
        content.querySelectorAll('li').forEach((li) => {
            conteudos.push({
                texto: li.querySelector('span').textContent,
                estudado: li.classList.contains('studied')
            });
        });
        materias.push({ materia, conteudos });
    });
    localStorage.setItem('estadoEstudos', JSON.stringify(materias));
}

// Função para carregar o estado salvo
function loadState() {
    const estadoSalvo = localStorage.getItem('estadoEstudos');
    if (estadoSalvo) {
        const materias = JSON.parse(estadoSalvo);
        materias.forEach((materia) => {
            adicionarMateria(materia.materia);
            const ul = document.querySelector('.content:last-of-type ul');
            materia.conteudos.forEach((conteudo) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${conteudo.texto}</span> <button onclick="removerConteudo(this)">Remover</button>`;
                if (conteudo.estudado) {
                    li.classList.add('studied');
                }
                li.onclick = function() {
                    this.classList.toggle('studied');
                    saveState();
                };
                ul.appendChild(li);
            });
        });
    }
}

// Carregar o estado ao iniciar
window.onload = loadState;

// Adicione o saveState em ações que mudam o estado
document.querySelector('#add-materia').addEventListener('click', function() {
    adicionarMateria();
    saveState();
});

