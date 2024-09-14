// файл для расботы с изменением цвета карточек
function addColorButton() {
    // Создаем элемент input типа text (для библиотеки coloris)
    const colorPicker = document.createElement('input');
    colorPicker.type = 'text'
    colorPicker.className = 'menu-button'
    colorPicker.id = 'coloris'
    colorPicker.value = 'Изменить цвет'
    // colorPicker.setAttribute('data-coloris', '')

    colorPicker.addEventListener('click', () => {
        alert('color')
    })

    return colorPicker;
}