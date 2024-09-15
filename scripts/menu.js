// menu.js - файл с работой меню карточек и колонок

// создание кнопок для меню
const createOptionButton = (text, id, handler) => {
    const button = document.createElement('button');
    button.className = 'menu-button';
    button.id = id;
    button.innerHTML = text;
    button.addEventListener('click', handler);
    return button;
};


function createMenuWindow(item, columnItemData, type, button) {
    const menuWindow = document.createElement('div');
    menuWindow.className = 'menu-window';

    // кнопка удаления
    const changeButton = createOptionButton('Изменить', '', () => {
        changeElem(item, columnItemData, type)
        menuWindow.remove();
    });
    menuWindow.appendChild(changeButton)

    if (type == 'column') {
        const sortButton = createSortButton(menuWindow, item);
        menuWindow.appendChild(sortButton)
    }
    else if (type == 'card') {
        const colorButton = addColorButton(menuWindow, columnItemData, item);
        menuWindow.appendChild(colorButton)
    }

    const deleteButton = createOptionButton('Удалить', 'delete', () => {
        deleteElem(item, columnItemData, type)
        menuWindow.remove();
    });
    menuWindow.appendChild(deleteButton)


    // Закрытие других открытых меню
    // работает это странным образом: он не удаляет последнее созданное меню
    document.querySelectorAll(".menu-window").forEach(otherMenu => {
        otherMenu.remove()
    });

    // проверка прикосновения и клика
    checkingClickAndTouch(menuWindow, button);

    if (type == 'column') {
        menuWindow.style.left = window.innerWidth > 450 ? '65%' : '25%';
        item.appendChild(menuWindow)
    }
    else if (type == 'card') {
        document.addEventListener('click', (evt) => {
            menuWindow.style.top = (evt.clientY - 63) + 'px';
            menuWindow.style.left = window.innerWidth > 450 ? (evt.clientX - 257) + 'px' : '25%';
        }, { once: true })

        item.parentNode.parentNode.appendChild(menuWindow)
    }

}

function changeElem(item, columnItemData, type) {
    if (type == 'column') {
        // убираем название и кнопку
        const columnName = document.getElementById(item.id).childNodes[0].childNodes[0];
        const columnButton = document.getElementById(item.id).childNodes[0].childNodes[1];

        columnName.style.display = 'none'
        columnButton.style.display = 'none'

        changeColumnName(item, columnName, columnButton, columnItemData)

    }
    else if (type == 'card') {
        addWindowModal(item, columnItemData)
    }
}

// функция удаления колонки и карточки
function deleteElem(item, columnItemData, type) {
    if (type == 'column') {
        const index = columnsData.findIndex(elem => elem.id == item.id);

        if (index !== -1) {
            columnsData.splice(index, 1);
            document.getElementById(item.id).remove();
        }

        console.log('Удаление колонки' + ' ' + item.id)
        console.log(columnsData)
    }
    else if (type == 'card') {
        const index = columnItemData.cards.findIndex(elem => elem.id == item.id);

        if (index !== -1) {
            columnItemData.cards.splice(index, 1);
            document.getElementById(item.id).remove();
        }

        console.log('Удаление карточки' + ' ' + item.id)
        console.log(columnsData)
    }
}


function changeColumnName(item, columnName, columnButton, columnItemData) {
    const columnInput = document.createElement('input');
    columnInput.value = columnName.innerHTML;

    document.getElementById(item.id).childNodes[0].appendChild(columnInput);
    columnInput.focus()

    const saveNewName = () => {
        const newName = columnInput.value.trim();

        // если название имеется и не совпадает со старым
        if (newName && newName !== columnItemData.value) {
            columnItemData.value = newName;
            columnName.innerHTML = newName;
            console.log(columnsData);
        }

        columnName.style.display = 'block';
        columnButton.style.display = 'block';
        columnInput.remove();
    };

    columnInput.addEventListener('keydown', (event) => {
        if (event.code == 'Enter' || event.key == 'Enter') {
            saveNewName();
        }
    });

    columnInput.addEventListener('blur', saveNewName);
}


// функция для проверки прикосновения и клика
function checkingClickAndTouch(menuWindow, button) {
    // если нажатие произошло вне menuWindow и вне button, да и если мы не нажали на саму кнопку, то окно исчезает (удаляется)
    document.addEventListener('click', (evt) => {
        if (!menuWindow.contains(evt.target) && !button.contains(evt.target)) {
            menuWindow.remove();
        }
    })

    document.addEventListener('touchstart', (evt) => {
        const touch = evt.touches[0];
        const targetElement = touch.target;

        if (!menuWindow.contains(targetElement) && !button.contains(targetElement)) {
            menuWindow.remove();
        }
    })
}