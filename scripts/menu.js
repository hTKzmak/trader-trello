// menu.js - файл с работой меню карточек и колонок

function createMenuWindow(item, type, button) {
    const menuWindow = document.createElement('div');
    menuWindow.className = 'menu-window';

    menuWindow.innerHTML = `
        <button class="menu-button">Изменить (пока ещё не добавил)</button>
        <button class="menu-button">Что-то для этого элемента</button>
        <button class="menu-button" id="delete">Удалить (пока ещё не добавил)</button>
    `

    // Закрытие других открытых меню
    // работает это странным образом: он не удаляет последнее созданное меню
    document.querySelectorAll(".menu-window").forEach(otherMenu => {
        otherMenu.remove()
    });

    // проверка прикосновения и клика
    checkingClickAndTouch(menuWindow, button);

    if (type == 'column') {
        menuWindow.style.left = window.innerWidth > 400 ? '65%' : '8%';
        item.appendChild(menuWindow)
    }
    else if (type == 'card') {
        document.addEventListener('click', (evt) => {
            menuWindow.style.top = (evt.pageY - 10) + 'px';
            menuWindow.style.left = window.innerWidth > 400 ? (evt.pageX - 50) + 'px' : '13%';
        }, { once: true })
        document.body.appendChild(menuWindow)
    }

}

// функция для проверки прикосновения и клика
function checkingClickAndTouch(menuWindow, button){
    // если нажатие произошло вне menuWindow и вне button, да и если мы не нажали на саму кнопку, то окно исчезает (удаляется)
    document.addEventListener('click', (evt) => {
        if (!menuWindow.contains(evt.target) && !button.contains(evt.target) && evt.target.className != 'menu-button') {
            menuWindow.remove();
        }
    })

    document.addEventListener('touchstart', (evt) => {
        const touch = evt.touches[0];
        const targetElement = touch.target;

        if (!menuWindow.contains(targetElement) && !button.contains(targetElement) && targetElement.className != 'menu-button') {
            menuWindow.remove();
        }
    })
}