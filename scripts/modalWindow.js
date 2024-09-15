// modalWindow.js - файл для создания модального окна для карточек, где можно изменить название, добавить описание и т.д.  

// создание модалки
function addWindowModal(cardItem, columnItemData) {
    // находим index самой карточки
    const index = columnItemData.cards.findIndex(elem => elem.id == cardItem.id);

    const modalWindowContainer = document.createElement('div');
    modalWindowContainer.className = 'modalWindow-container'

    const windowElement = document.createElement('div');
    windowElement.className = 'window';

    const modalHeader = addModalHeader(modalWindowContainer);
    windowElement.appendChild(modalHeader)

    const modalContent = addModalContent(cardItem, columnItemData, index);
    windowElement.appendChild(modalContent)

    modalWindowContainer.appendChild(windowElement);
    document.body.appendChild(modalWindowContainer)

    setTimeout(() => {
        document.querySelector('.modalWindow-container').style.opacity = 1;
    }, 350)
}

// добавление header для модалки
function addModalHeader() {
    const header = document.createElement('header');
    const windowSpan = document.createElement('span');
    windowSpan.innerHTML = 'Окно с информацией о карточке';

    // кнопка закрытия окна
    const closeButton = document.createElement('button');
    closeButton.classList.add('exit');
    closeButton.innerHTML = '<img src="./icons/close-window.svg" alt="Закрыть">';

    // фунционал закрытия окна (то есть, удаляет modalWindowContainer с разметки)
    closeButton.addEventListener('click', () => {
        document.querySelector('.modalWindow-container').remove()

        tinymce.remove();
    })

    header.appendChild(windowSpan);
    header.appendChild(closeButton);

    return header;
}

// добавление всего контента модалки
function addModalContent(cardItem, columnItemData, index) {

    const content = document.createElement('div');
    content.className = 'window-content';

    const cardNameInput = document.createElement('input');
    cardNameInput.type = 'text';
    cardNameInput.className = 'card-name';
    cardNameInput.value = columnItemData.cards[index].value || '';
    cardNameInput.placeholder = 'Введите название карточки';

    cardNameInput.addEventListener('input', () => {
        cardNameInput.id = cardNameInput.value ? '' : 'empty';
    })

    const description = addCardDescription();

    const options = addOptionButtons(cardItem, columnItemData, index);

    content.appendChild(cardNameInput)
    content.appendChild(description)
    content.appendChild(options)


    // Работа с TinyMCE:
    tinymceInstall(columnItemData, index);

    return content;
}

// добавление описания
function addCardDescription() {
    const cardDescriptionTextarea = document.createElement('textarea');
    cardDescriptionTextarea.id = 'card-description';
    cardDescriptionTextarea.cols = 30;
    cardDescriptionTextarea.rows = 10;

    return cardDescriptionTextarea;
}

// добавление опциональных кнопок
function addOptionButtons(cardItem, columnItemData, index) {

    // создания списока options (здесь будут находиться кнопки сохранения, удаления и закрытия окна)
    const options = document.createElement('div');
    options.className = 'options';

    // кнопка для сохранения карточки
    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Сохранить';

    saveButton.addEventListener('click', () => {
        let newCardName = document.querySelector('.card-name').value;
        const descIcon = document.createElement('i')
        descIcon.className = 'fas fa-align-left';
        descIcon.style = `
            position: absolute;
            bottom: 7px;
            left: 11px;
        `
        descIcon.title = 'У этой карточки есть описание';

        if (index !== -1) {
            if (newCardName) {
                columnItemData.cards[index].value = newCardName;
                document.getElementById(cardItem.id).querySelector('span').innerHTML = newCardName;

                getDescValue(columnItemData, index)

                document.querySelector('.modalWindow-container').remove()

                if (columnItemData.cards[index].description !== '') {
                    cardItem.style.paddingBottom = '30px';
                    
                    // изменяем цвет иконки в зависимости от цвета карточки 
                    updateDescColor(descIcon, cardItem.style.background)
                    cardItem.appendChild(descIcon)
                }
                else {
                    cardItem.style.paddingBottom = '10px';

                    if(cardItem.querySelector('i')){
                        cardItem.querySelector('i').remove();
                    }
                }

                // удаление поле ввода описания
                tinymce.remove();
            }
        }

    })


    // кнопка для удаления карточки
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete_card';
    deleteButton.innerHTML = 'Удалить';

    deleteButton.addEventListener('click', () => {
        if (index !== -1) {
            columnItemData.cards.splice(index, 1);
            document.getElementById(cardItem.id).remove();

            document.querySelector('.modalWindow-container').remove()
        }

        tinymce.remove();
    })

    // Вторая кнопка закрытия модального окна, сделанная для options
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Закрыть'

    // фунционал закрытия окна (то есть, удаляет modalWindowContainer с разметки)
    closeButton.addEventListener('click', () => {
        document.querySelector('.modalWindow-container').remove()

        tinymce.remove();
    })

    options.appendChild(saveButton);
    options.appendChild(deleteButton);
    options.appendChild(closeButton);

    return options;
}

// установка библиотеки tinymce
function tinymceInstall(columnItemData, index) {
    // Уничтожение существующего экземпляра TinyMCE, если он есть, перед инициализацией нового.
    // Он нужен для того, чтобы при следующем выборе карточки снова появлися этот редактор, а не пустое поле ввода
    if (tinymce.get('card-description')) {
        tinymce.get('card-description').remove();
    }

    // Делаем инициализацию TinyMCE после того, как элемент добавлен в DOM
    setTimeout(() => {
        tinymce.init({
            selector: 'textarea#card-description',
            highlight_on_focus: false,
            license_key: 'gpl',
            statusbar: false,
            height: '45vh',
            max_height: 400,
            promotion: false,
            menubar: true,
            language: 'ru',
            plugins: 'lists emoticons',
            forced_root_block: 'div',
            newline_behavior: 'linebreak',
            toolbar: 'fontfamily fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | emoticons | backcolor forecolor removeformat | bullist numlist outdent indent | undo redo',
            mobile: {
                toolbar_mode: 'floating'
            },
            // Добавляем описание к карточке
            // Этот обратный вызов срабатывает после инициализации редактора и устанавливает содержимое, если описание существует.
            setup: function (editor) {
                editor.on('init', function () {
                    let cardDesc = columnItemData.cards[index].description;
                    if (cardDesc) {
                        editor.setContent(cardDesc);
                    }
                });
            }
        });
    }, 0); // Можно использовать короткую задержку для того, чтобы элемент успел появиться в DOM

}


// получение значения поле ввода TinyMCE
function getDescValue(columnData, cardIndex) {

    // получаем значение поле ввода
    const editorContent = tinymce.activeEditor.getContent();

    // получаем значение поле ввода, но без тегов
    // const editorContent = (((tinymce.activeEditor.getContent()).replace(/(&nbsp;)*/g, "")).replace(/(<p>)*/g, "")).replace(/<(\/)?p[^>]*>/g, "");

    // сохраняем значение в описание карточки
    columnData.cards[cardIndex].description = editorContent;

    console.log(columnData)
}
