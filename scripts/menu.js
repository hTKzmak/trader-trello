// menu.js - файл с работой меню карточек и колонок

function createMenuWindow(item, type) {
    const menuWindow = document.createElement('div');
    menuWindow.className = 'menu-window';

    menuWindow.innerHTML = 'Менюшка ＼(≧▽≦)／'

    // Закрытие других открытых меню
    // работает это странным образом: он не удаляет последнюю созданное меню
    document.querySelectorAll(".menu-window").forEach(otherMenu => {
        otherMenu.remove()
    });

    if (type == 'column') {
        menuWindow.style.left = '65%'
        item.appendChild(menuWindow)
    }
    else if(type == 'card'){
        item.appendChild(menuWindow)
    }

    document.addEventListener('click', (evt) => {
        if (!menuWindow.contains(evt)) {
            menuWindow.remove();
        }
    })

}