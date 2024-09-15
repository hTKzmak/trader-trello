// colorChange.js - файл для расботы с изменением цвета карточек

function addColorButton(menuWindow, columnItemData, card) {
    // Создаем элемент input типа text (для библиотеки coloris)
    const colorPicker = document.createElement('input');
    colorPicker.type = 'text'
    colorPicker.className = 'menu-button'
    colorPicker.id = 'coloris'
    colorPicker.value = 'Изменить цвет'
    // colorPicker.setAttribute('data-coloris', '')

    Coloris({
        el: '#coloris',
        parent: menuWindow,
        defaultColor: 'rgb(255, 255, 255)',
        wrap: false,
        theme: 'default',
        format: 'rgb',
        themeMode: 'light',

        onChange: (color) => {
            colorPicker.value = 'Изменить цвет'
            updateCardColor(document.getElementById(card.id), color);
            const index = columnItemData.cards.findIndex(elem => elem.id == card.id);

            if (index !== -1) {
                columnItemData.cards[index].color = color;
            }
        }
    });

    return colorPicker;
}

// обновляем цвет
function updateCardColor(card, color) {
    // Убедитесь, что цвет в формате rgb
    const rgb = color.match(/\d+/g).map(Number); // Получаем массив [r, g, b]

    // Вычисляем яркость
    const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114);
    card.style.background = color;
    card.children[0].style.color = brightness > 186 ? 'black' : 'white';

    // изменяем цвет икноки описания
    if (document.getElementById(card.id).childNodes[2]) {
        document.getElementById(card.id).childNodes[2].style.color = brightness > 186 ? 'black' : 'white';
    }
}

// отдельная функция для изменения цвета иконки (используется в modalWindow.js)
function updateDescColor(descIcon, color) {
    // Убедитесь, что цвет в формате rgb
    const rgb = color.match(/\d+/g).map(Number); // Получаем массив [r, g, b]

    // Вычисляем яркость
    const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114);

    // Определяем цвет для иконки
    const iconColor = brightness > 186 ? 'black' : 'white';

    if (descIcon) {
        descIcon.style.color = iconColor;
    }
}