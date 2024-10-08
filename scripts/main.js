// Main.js является файлом с основным функционалом

// Находим элементы на странице
const addColumnButton = document.querySelector('.add_column');
const columnForm = addColumnButton.querySelector('form');

// Массив для хранения данных колонок и карточек
let columnsData = [];

// Функции для работы с формой создания колонки
document.querySelector('.cancel').addEventListener('click', () => {
    document.body.click();
})

// функция по скроллу к элементу
function scrollToItem(elem) {
    elem.scrollIntoView({
        behavior: 'smooth', // плавный скролл
        block: 'nearest',   // по вертикали оставляем без изменений
        inline: 'center'    // горизонтальное позиционирование элемента в центре
    });
}


// Отображение и исчезновение формы заполнения для создания колонки

// Функция для скрытия формы заполнения (для колонок и карточек)
function hideForm(formEl, spanEl) {
    formEl.style.display = 'none';
    spanEl.style.display = 'block';
}

// Функция для отображения формы заполнения (для колонок и карточек)
function showForm(formEl, spanEl, inputEl, buttonEl, type, data) {
    formEl.style.display = 'grid';
    spanEl.style.display = 'none';
    inputEl.focus() // устанавливаем фокус на поле ввода

    scrollToItem(buttonEl)

    // Функция для проверки, является ли клик вне кнопки и есть ли значение в input
    function handleOutsideClick(evt) {
        const isOutside = !buttonEl.contains(evt.target);
        const hasValue = inputEl.value.trim() !== '';

        if (isOutside && hasValue) {
            // Вызываем submit соответствующей формы
            if (type === 'column') {
                submitColumn()
            } else if (type === 'card') {
                addCardItemToColumn(data, inputEl)
            }
        } else if (isOutside && !hasValue) {
            hideForm(formEl, spanEl);
        }
    }

    // Добавляем обработчики событий
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('click', handleOutsideClick);
}

// Событие для отображения и исчезновения формы заполнения (для колонок)
addColumnButton.addEventListener('click', (evt) => {
    const classes = ['form-options'];
    const ids = ['add_column_value', 'submit'];

    if (!classes.includes(evt.target.className) && !ids.includes(evt.target.id) && evt.target.tagName !== 'SPAN' && evt.target != addColumnButton) {
        hideForm(columnForm, addColumnButton.querySelector('span'));
    }
    else {
        showForm(columnForm, addColumnButton.querySelector('span'), addColumnButton.querySelector('input'), addColumnButton, 'column', null);
    }
});


// функция по добавлению колонки
function submitColumn() {
    // находим #add_column_value и смотрим у него значение
    let inputValue = columnForm.querySelector('#add_column_value').value;

    let columnItemData = {
        id: Date.now(),
        value: inputValue,
        color: 'rgb(54, 164, 164)',
        cards: []
    };

    // добавляем колонку в случае если название не пустое
    if (inputValue) {
        // добавляем данные о колонке в columnsData
        columnsData.push(columnItemData);

        // создаём колонку
        const columnItem = createColumnItem(columnItemData);
        addColumnItemToPage(columnItem);

        // скрываем формы заполнения
        hideForm(columnForm, addColumnButton.querySelector('span'));

        console.log(columnsData)

        // Функционал Drag and Drop с библиотекой SortableJS для карточек
        const cardsListEl = document.querySelectorAll('.card-list');
        sortableCards(cardsListEl, 'Данные карточек обновились');
    }

    addColumnButton.querySelector('input').value = "";

}

// Событие по добавлению колонки
columnForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitColumn()
});



// Элементы для колонок и карточек

// создание кнопки для колонки и карточки
function createMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.innerHTML = `
        <div class="menu-icon">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    `;
    return menuButton;
}


// Создание колонки:

// Функция для создания колонки
function createColumnItem(columnItemData) {
    const columnItem = document.createElement('li');
    columnItem.className = 'column';
    columnItem.id = columnItemData.id;

    const columnHeader = createColumnHeader(columnItemData, columnItem);
    columnItem.appendChild(columnHeader);

    const cardsList = createColumnCardsList(columnItemData);
    columnItem.appendChild(cardsList);

    const columnFooter = createColumnFooter(columnItemData);
    columnItem.appendChild(columnFooter);

    return columnItem;
}

// Функция для создания заголовка колонки
function createColumnHeader(columnItemData, columnItem) {
    const columnHeader = document.createElement('div');
    columnHeader.className = 'column-header';

    const columnName = document.createElement('span');
    columnName.innerHTML = columnItemData.value;

    const menuButton = createMenuButton();

    menuButton.addEventListener('click', () => {
        scrollToItem(menuButton)
        createMenuWindow(columnItem, columnItemData, 'column', menuButton)
    })

    columnHeader.appendChild(columnName)
    columnHeader.appendChild(menuButton)

    return columnHeader;
}

// Функция для создания списка карточек для колонки
function createColumnCardsList() {
    const cardsList = document.createElement('ul');
    cardsList.className = 'card-list';
    cardsList.id = `id${Math.random().toString(16).slice(2)}`;

    return cardsList;
}

// Функция для создания футера колонки
function createColumnFooter(columnItemData) {
    const columnFooter = document.createElement('div');
    columnFooter.className = 'column-footer';
    columnFooter.innerHTML = `
        <span>Добавить карточку</span>
        
        <form style="display: none;">
            <input type="text" id="add_card_value" placeholder="Введите название">
            <div class="form-options">
                <button id="submit" type="submit">Добавить</button>
                <i class="cancel fal fa-times"></i>
            </div>
        </form>
    `;

    const columnFooterForm = columnFooter.querySelector('form');
    const columnFooterSpan = columnFooter.querySelector('span');
    const columnFooterInput = columnFooter.querySelector('input');

    columnFooter.addEventListener('click', (evt) => {
        const classes = ['form-options'];
        const ids = ['add_card_value', 'submit'];

        if (!classes.includes(evt.target.className) && !ids.includes(evt.target.id) && evt.target.tagName !== 'SPAN' && evt.target != columnFooter) {
            hideForm(columnFooterForm, columnFooterSpan, columnFooterInput);
        }
        else {
            showForm(columnFooterForm, columnFooterSpan, columnFooterInput, columnFooter, 'card', columnItemData);
        }
    })

    // добавление карточки в колонку
    columnFooterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addCardItemToColumn(columnItemData, columnFooterInput)
    })

    return columnFooter;
}


// Добавление карточки для опередлённой колонки

// Функция для добавления карточки
// columnItemData.id (находим по id список), columnFooterInput, columnItemData
function addCardItemToColumn(columnItemData, input) {
    const cardData = {
        id: Date.now(),
        data: new Date().toISOString().replace('T', ' ').split('.')[0],
        color: 'rgb(255, 255, 255)',
        value: input.value,
        description: null,
    };

    if (input.value) {
        addingCard(cardData.id, cardData.value, cardData.color, cardData.description, columnItemData);
        columnItemData.cards.push(cardData);
        console.log(columnItemData)
    }

    input.value = '';
}

// Функция создание карточки
function addingCard(cardElemId, value, color, description, columnItemData) {
    let cardsList = document.getElementById(columnItemData.id).childNodes[1]

    let columnForm = document.getElementById(columnItemData.id).childNodes[2].childNodes[3]
    let columnSpan = document.getElementById(columnItemData.id).childNodes[2].childNodes[1]

    const cardItem = document.createElement('li');
    cardItem.className = 'card';
    cardItem.id = cardElemId;
    cardItem.style.background = color;

    const cardItemName = document.createElement('span');
    cardItemName.innerHTML = value;


    const menuButton = createMenuButton();

    menuButton.addEventListener('click', () => {
        scrollToItem(menuButton)
        createMenuWindow(cardItem, columnItemData, 'card', menuButton)
    })

    cardItem.appendChild(cardItemName);
    cardItem.appendChild(menuButton);

    // если у карточки есть описание, то мы его добавляем
    if (description) {
        const descIcon = document.createElement('i')
        descIcon.className = 'fas fa-align-left';
        descIcon.style = `
            position: absolute;
            bottom: 7px;
            left: 11px;
        `
        descIcon.title = 'У этой карточки есть описание';
        cardItem.style.paddingBottom = '30px';

        // изменяем цвет иконки в зависимости от цвета карточки 
        updateDescColor(descIcon, color)
        cardItem.appendChild(descIcon)
    }


    if (value) {
        cardsList.appendChild(cardItem);
        cardsList.scrollTop = cardsList.scrollHeight;
        hideForm(columnForm, columnSpan, value)

        // изменение цвета карточки, текста и икноки описания
        updateCardColor(cardItem, color)

        // Функционал Drag and Drop с библиотекой SortableJS для карточек
        const cardsListEl = document.querySelectorAll('.card-list');
        sortableCards(cardsListEl, 'Данные карточек обновились');
    }

    // при нажатии на карточку появляется окно редактирования
    // Сработает в том случае, если мы нажади именно на тег li, а не на что-то другое (например, кнопка меню)
    cardItem.addEventListener('click', (event) => {
        if (event.target.tagName == 'LI') {
            addWindowModal(cardItem, columnItemData)
        }
    })

}

// Функция для добавления колонки на страницу
function addColumnItemToPage(columnItem) {
    const columnsList = document.querySelector('.columns-list');
    columnsList.appendChild(columnItem);

    // скролл к созданной колонке:
    // Находим последнюю колонку
    const lastColumn = document.querySelector('.columns-list').lastChild;

    if (lastColumn) {
        // Прокручиваем к последней колонке
        scrollToItem(lastColumn)
    }
}