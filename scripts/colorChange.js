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
        defaultColor: '#ffffff',
        theme: 'default',
        format: 'hex',
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

// преобразование hex в rgb в виде объекта
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

// обновляем цвет
function updateCardColor(card, color) {
    const rgb = hexToRgb(color);
    const brightness = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);
    card.style.background = color;
    card.children[0].style.color = brightness > 186 ? 'black' : 'white';

    // изменяем цвет икноки описания
    if(document.getElementById(card.id).childNodes[2]){
        document.getElementById(card.id).childNodes[2].style.color = brightness > 186 ? 'black' : 'white';
    }
}