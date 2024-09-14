// modalWindow.js - файл для создания модального окна для карточек, где можно изменить название, добавить описание и т.д.  

function addWindowModal(cardItem, columnItemData) {
    const modalWindowContainer = document.createElement('div');
    modalWindowContainer.className = 'modalWindow-container'

    const windowElement = document.createElement('div');
    windowElement.className = 'window';

    const modalHeader = addModalHeader(modalWindowContainer);
    windowElement.appendChild(modalHeader)

    const modalContent = addModalContent();
    windowElement.appendChild(modalContent)

    modalWindowContainer.appendChild(windowElement);
    document.body.appendChild(modalWindowContainer)

    setTimeout(() => {
        document.querySelector('.modalWindow-container').style.opacity = 1;
    }, 300)
}

function addModalHeader(modalWindowContainer) {
    const header = document.createElement('header');
    const windowSpan = document.createElement('span');
    windowSpan.innerHTML = 'Окно с информацией о карточке';

    // кнопка закрытия окна
    const closeButton = document.createElement('button');
    closeButton.classList.add('exit');
    closeButton.innerHTML = '<img src="./icons/close-window.svg" alt="Закрыть">';

    // фунционал закрытия окна (то есть, удаляет modalWindowContainer с разметки)
    closeButton.addEventListener('click', () => {
        modalWindowContainer.remove();
    })

    header.appendChild(windowSpan);
    header.appendChild(closeButton);

    return header;
}

function addModalContent() {
    const content = document.createElement('div');
    content.className = 'window-content';

    const cardNameInput = document.createElement('input');
    cardNameInput.type = 'text';
    cardNameInput.className = 'card-name';
    cardNameInput.value = ';p';
    cardNameInput.placeholder = 'Введите название карточки';

    cardNameInput.addEventListener('input', () => {
        cardNameInput.id = cardNameInput.value ? '' : 'empty';
    })

    const description = addCardDescription();

    content.appendChild(cardNameInput)
    content.appendChild(description)

    return content;
}

function addCardDescription() {
    const cardDescriptionTextarea = document.createElement('textarea');
    cardDescriptionTextarea.id = 'card-description';
    cardDescriptionTextarea.cols = 30;
    cardDescriptionTextarea.rows = 10;

    tinymce.init({
        selector: '#card-description',
        plugins: 'lists emoticons',
        statusbar: false,
        promotion: false,
        menubar: true,
        language: 'ru',
        toolbar: 'fontfamily fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | emoticons | backcolor forecolor removeformat | bullist numlist outdent indent | undo redo',
        mobile: {
            toolbar_mode: 'floating'
        },
        // setup: editor => editor.on('init', () => {
        //     editor.setContent(columnItemData.cards[index].description || '');
        // })
    });

    return cardDescriptionTextarea;
}