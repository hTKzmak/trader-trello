// colorChange.js - файл для расботы с изменением цвета карточек

function addColorButton(menuWindow, columnItemData, card) {

    const colorButton = document.createElement('button')
    colorButton.className = 'menu-button'
    colorButton.innerHTML = 'Изменить цвет'
    colorButton.style = `
        position: relative;
    `

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color'
    colorPicker.style = `
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        opacity: 0;
        cursor: pointer;
    `


    // colorPicker.addEventListener('click', () => [
    //     // menuWindow.style.display = 'none'
    // ])

    colorPicker.addEventListener('input', (evt) => {
        const rgbColor = hexToRgb(evt.target.value);

        updateCardColor(document.getElementById(card.id), rgbColor);
        const index = columnItemData.cards.findIndex(elem => elem.id == card.id);

        if (index !== -1) {
            columnItemData.cards[index].color = rgbColor;
        }
    })

    colorButton.appendChild(colorPicker)
    
    return colorButton;
}

// преобразование hex в rgb
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}

// функция для получения яркости
function getBrightness(color) {
    // если цвета нет, то его значение будет белый цвет, иначе у него будет своё значение
    const rgbColor = !color ? 'rgb(255, 255, 255)' : color;

    // Убедитесь, что цвет в формате rgb
    const rgb = rgbColor.match(/\d+/g).map(Number); // Получаем массив [r, g, b]

    // Вычисляем яркость
    const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114);

    return brightness;
}

// обновляем цвет
function updateCardColor(card, color) {

    // Вычисляем яркость
    const brightness = getBrightness(color);

    card.style.background = color;
    card.children[0].style.color = brightness > 186 ? 'black' : 'white';

    // изменяем цвет икноки описания
    if (document.getElementById(card.id).childNodes[2]) {
        document.getElementById(card.id).childNodes[2].style.color = brightness > 186 ? 'black' : 'white';
    }
}

// отдельная функция для изменения цвета иконки (используется в modalWindow.js)
function updateDescColor(descIcon, color) {
    const brightness = getBrightness(color);

    // Определяем цвет для иконки
    const iconColor = brightness > 186 ? 'black' : 'white';

    if (descIcon) {
        descIcon.style.color = iconColor;
    }
}