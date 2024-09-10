// menu.js - файл с работой меню карточек и колонок

function createMenuWindow(item, type) {
    const menuWindow = document.createElement('div');
    menuWindow.className = 'menu-window';

    menuWindow.innerHTML = 'Менюшка ＼(≧▽≦)／'

    // // Закрытие других открытых меню
    // document.querySelectorAll(".menu-window").forEach(otherMenu => {
    //     if (otherMenu !== menuWindow) {
    //         otherMenu.remove();
    //     }
    // });

    if (type == 'column') {
        item.appendChild(menuWindow)
    }
    else if (type == 'card') {
        document.body.appendChild(menuWindow)
    }

    // Закрытие меню при клике вне его
    // document.addEventListener("click", (event) => {
    //     if (!event.target.closest(".menu-window")) {
    //         menuWindow.remove();
    //     }
    // });
}