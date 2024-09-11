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


// Отображение и исчезновение формы заполнения для создания колонки

// Функция для скрытия формы заполнения (для колонок и карточек)
function hideForm(formEl, spanEl, inputEl) {
    formEl.style.display = 'none';
    spanEl.style.display = 'block';
    inputEl.value = "";
}

// Функция для отображения формы заполнения (для колонок и карточек)
function showForm(formEl, spanEl, inputEl, buttonEl) {
    formEl.style.display = 'grid';
    spanEl.style.display = 'none';
    inputEl.focus() // устанавливаем фокус на поле ввода

    // Функционал отображения и исчезновения окна
    document.addEventListener('touchstart', (evt) => {
        const touch = evt.touches[0];

        if (!buttonEl.contains(touch.target)) {
            hideForm(formEl, spanEl, inputEl);
        }
    })

    document.addEventListener('click', (evt) => {
        if (!buttonEl.contains(evt.target)) {
            hideForm(formEl, spanEl, inputEl);
        }
    })
}

// Функционал Drag and Drop с библиотекой SortableJS для карточек
function sortableLists(listOfElem, message) {
    listOfElem.forEach(elem => {
        Sortable.create(elem, {
            group: 'selected',
            animation: 100,
            delay: window.innerWidth <= 900 ? 50 : 0,

            // вызов функции в начале перемещения колонок
            onStart: function () {
                console.log('НАЧИНАЕМ ПЕРЕМЕЩЕНИЕ КАРТОЧЕК')
            },

            // Element dragging ended
            onEnd: function () {
                console.log('ПРЕКРАЩАЕМ ПЕРЕМЕЩЕНИЕ КАРТОЧЕК')
            },

            onChange: function () {
                console.log(`${message}`);
            },
        });
    });
}

// Событие для отображения и исчезновения формы заполнения (для колонок)
addColumnButton.addEventListener('click', (evt) => {
    const classes = ['form-options'];
    const ids = ['add_column_value', 'submit'];

    if (!classes.includes(evt.target.className) && !ids.includes(evt.target.id) && evt.target.tagName !== 'SPAN') {
        hideForm(columnForm, addColumnButton.querySelector('span'), addColumnButton.querySelector('input'));
    }
    else {
        showForm(columnForm, addColumnButton.querySelector('span'), addColumnButton.querySelector('input'), addColumnButton);
    }
});

// Событие по добавлению колонки
columnForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // находим #add_column_value и смотрим у него значение
    let inputValue = columnForm.querySelector('#add_column_value').value;

    let columnItemData = {
        id: Date.now(),
        value: inputValue,
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
        hideForm(columnForm, addColumnButton.querySelector('span'), addColumnButton.querySelector('input'));


        // Функционал Drag and Drop с библиотекой SortableJS для карточек
        const cardsListEl = document.querySelectorAll('.card-list');
        sortableLists(cardsListEl, 'Данные карточек обновились');
    }

    // скролл к созданной колонке:
    // Находим последнюю колонку
    const lastColumn = document.querySelector('.columns-list').lastChild;
    // Прокручиваем к последней колонке
    lastColumn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

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
function createColumnItem(columnData) {
    const columnItem = document.createElement('li');
    columnItem.className = 'column';
    columnItem.id = columnData.id;

    const columnHeader = createColumnHeader(columnData, columnItem);
    columnItem.appendChild(columnHeader);

    const cardsList = createColumnCardsList(columnData);
    columnItem.appendChild(cardsList);

    const columnFooter = createColumnFooter(columnData);
    columnItem.appendChild(columnFooter);

    return columnItem;
}

// Функция для создания заголовка колонки
function createColumnHeader(columnData, columnItem) {
    const columnHeader = document.createElement('div');
    columnHeader.className = 'column-header';

    const columnName = document.createElement('span');
    columnName.innerHTML = columnData.value;

    const menuButton = createMenuButton();

    menuButton.addEventListener('click', () => {
        createMenuWindow(columnItem, 'column')
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
function createColumnFooter(columnData) {
    const columnFooter = document.createElement('div');
    columnFooter.className = 'column-footer';
    columnFooter.innerHTML = `
        <span>Добавить карточку</span>
        
        <form style="display: none;">
            <input type="text" id="add_card_value" placeholder="Введите название">
            <div class="form-options">
                <button id="submit" type="submit">Добавить</button>
                <i class="cancel"><img src="./icons/close.svg" alt="Отмена"></i>
            </div>
        </form>
    `;

    const columnFooterForm = columnFooter.querySelector('form');
    const columnFooterSpan = columnFooter.querySelector('span');
    const columnFooterInput = columnFooter.querySelector('input');

    columnFooter.addEventListener('click', (evt) => {
        const classes = ['form-options'];
        const ids = ['add_card_value', 'submit'];

        if (!classes.includes(evt.target.className) && !ids.includes(evt.target.id) && evt.target.tagName !== 'SPAN') {
            hideForm(columnFooterForm, columnFooterSpan, columnFooterInput);
        }
        else {
            showForm(columnFooterForm, columnFooterSpan, columnFooterInput, columnFooter);
        }
    })

    // добавление карточки в колонку
    columnFooterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addCardItemToColumn(columnData, columnFooterInput)
    })

    return columnFooter;
}


// Добавление карточки для опередлённой колонки

// Функция для добавления карточки
// columnData.id (находим по id список), columnFooterInput, columnData
function addCardItemToColumn(columnData, input) {
    const cardData = {
        id: Date.now(),
        data: new Date().toISOString().replace('T', ' ').split('.')[0],
        color: '#ffffff',
        value: input.value,
        description: null,
    };

    if (input.value) {
        addingCard(cardData.id, cardData.value, cardData.color, columnData);
        columnData.cards.push(cardData);
        console.log(columnData)
    }

    input.value = '';
}

// Функция создание карточки
function addingCard(cardDataId, value, color, columnData) {
    let cardsList = document.getElementById(columnData.id).childNodes[1]

    let columnForm = document.getElementById(columnData.id).childNodes[2].childNodes[3]
    let columnSpan = document.getElementById(columnData.id).childNodes[2].childNodes[1]

    const cardItem = document.createElement('li');
    cardItem.className = 'card';
    cardItem.id = cardDataId;
    cardItem.style.background = color;

    const cardItemName = document.createElement('span');
    cardItemName.innerHTML = value;

    const menuButton = createMenuButton();

    menuButton.addEventListener('click', () => {
        createMenuWindow(cardItem, 'card')
    })

    cardItem.appendChild(cardItemName);
    cardItem.appendChild(menuButton);

    if (value) {
        cardsList.appendChild(cardItem);
        cardsList.scrollTop = cardsList.scrollHeight;
        hideForm(columnForm, columnSpan, value)

        // Функционал Drag and Drop с библиотекой SortableJS для карточек
        const cardsListEl = document.querySelectorAll('.card-list');
        sortableLists(cardsListEl, 'Данные карточек обновились');
    }
}

// Функция для добавления колонки на страницу
function addColumnItemToPage(columnItem) {
    const columnsList = document.querySelector('.columns-list');
    columnsList.appendChild(columnItem);
}