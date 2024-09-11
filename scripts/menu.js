// menu.js - файл с работой меню карточек и колонок

function createMenuWindow(item, type, button) {
    const menuWindow = document.createElement('div');
    menuWindow.className = 'menu-window';

    menuWindow.innerHTML = 'Менюшка ＼(≧▽≦)／'

    // Закрытие других открытых меню
    // работает это странным образом: он не удаляет последнюю созданное меню
    document.querySelectorAll(".menu-window").forEach(otherMenu => {
        otherMenu.remove()
    });

    // если нажатие произошло вне menuWindow и вне button, да и если мы не нажали на саму кнопку, то окно исчезает (удаляется)
    document.addEventListener('click', (evt) => {
        if (!menuWindow.contains(evt.target) && !button.contains(evt.target) && evt.target.className != 'menu-button') {
            menuWindow.remove();
        }
    })

    if (type == 'column') {
        menuWindow.style.left = window.innerWidth > 400 ? '65%' : '13%';
        item.appendChild(menuWindow)
    }
    else if (type == 'card') {
        item.appendChild(menuWindow)
    }

}
