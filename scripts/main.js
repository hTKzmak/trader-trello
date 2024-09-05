// Находим элементы на странице
const addColumnButton = document.querySelector('.add_column');
const form = document.querySelector('form');

// Массив для хранения данных колонок и карточек
let columnsData = [];

// Функции для работы с формой создания колонки
document.querySelector('.cancel').addEventListener('click', () => {
    document.body.click();
})


// Отображение и исчезновение формы заполнения для создания колонки

// Функция для скрытия формы заполнения
function hideForm() {
    form.style.display = 'none';
    addColumnButton.querySelector('span').style.display = 'block';
    document.querySelector('#add_column_value').value = "";
}

// Функция для отображения формы заполнения
function showForm() {
    form.style.display = 'grid';
    addColumnButton.querySelector('span').style.display = 'none';
    form.children[0].focus() // устанавливаем фокус на поле ввода

    // Функционал отображения и исчезновения окна
    document.addEventListener('touchstart', (evt) => {
        const touch = evt.touches[0];

        if (!addColumnButton.contains(touch.target)) {
            hideForm();
        }
    })

    document.addEventListener('click', (evt) => {
        if (!addColumnButton.contains(evt.target)) {
            hideForm();
        }
    })
}

// Событие для отображения и исчезновения формы заполнения (для колонок)
addColumnButton.addEventListener('click', () => {
    showForm()

    console.log('отображение формы для колонок')
});
