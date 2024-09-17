// colorChange.js - файл для расботы с изменением цвета карточек

function addColorButton(menuWindow, columnItemData, card) {
    // Создаем элемент input типа text (для библиотеки coloris)
    const colorPicker = document.createElement('input');
    colorPicker.type = 'text'
    colorPicker.className = 'menu-button'
    colorPicker.id = 'coloris'
    colorPicker.readOnly = 'true'
    colorPicker.value = 'Изменить цвет'
    // colorPicker.setAttribute('data-coloris', '')

    colorPicker.addEventListener('click', () => {
        // menuWindow.style.display = 'none';
    })

    Coloris({
        el: '#coloris',
        parent: menuWindow,
        // parent: document.body,
        // parent: card.parentNode.parentNode,
        defaultColor: 'rgb(255, 255, 255)',
        wrap: false,
        theme: 'default',
        format: 'rgb',
        themeMode: 'light',

        clearButton: true,
        clearLabel: 'Очистить',
        closeButton: true,
        closeLabel: 'Закрыть',

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