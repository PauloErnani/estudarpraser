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
