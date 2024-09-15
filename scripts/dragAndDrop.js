// Фукционал Drag and Drop с библиотекой SortableJS для колонок
// https://github.com/SortableJS/Sortable

// список колонок
const columnsListElement = document.querySelector(`.columns-list`);

// Функционал Drag and Drop с библиотекой SortableJS для колонок
Sortable.create(columnsListElement, {
    gropup: 'selected',
    animation: 100, // скорость анимации
    handle: '.column-header', // перетаскиваем колонку, удерживая выбранный нами элемент (в нашем случае это .column__header)
    delay: window.innerWidth <= 900 ? 50 : 0, // время в миллисекундах, чтобы определить, когда должна начаться сортировка
    filter: '#ignore',

    // вызов функции в начале перемещения колонок
    onStart: function () {
        console.log('НАЧИНАЕМ ПЕРЕМЕЩЕНИЕ КОЛОНОК')

        // убираем выбор выбранного элемента
        document.querySelector('.board').style.scrollSnapType = 'unset';
    },
    // Element dragging ended
    onEnd: function () {
        console.log('ПРЕКРАЩАЕМ ПЕРЕМЕЩЕНИЕ КОЛОНОК')

        // убираем выбор выбранного элемента
        document.querySelector('.board').style.scrollSnapType = 'x mandatory';
    },
    // вызов функции при изменении положений колонок
    onChange: function () {
        console.log('Данные колонок обновились')
    },

});


// Функционал Drag and Drop с библиотекой SortableJS для карточек
function sortableCards(listOfElem, message) {
    listOfElem.forEach(elem => {
        Sortable.create(elem, {
            group: 'selected',
            animation: 100,
            delay: window.innerWidth <= 900 ? 50 : 0,

            // вызов функции в начале перемещения колонок
            onStart: function (evt) {
                console.log('НАЧИНАЕМ ПЕРЕМЕЩЕНИЕ КАРТОЧЕК')

                // убираем выбор выбранного элемента
                document.querySelector('.board').style.scrollSnapType = 'unset';
            },
            
            // Element dragging ended
            onEnd: function () {
                console.log('ПРЕКРАЩАЕМ ПЕРЕМЕЩЕНИЕ КАРТОЧЕК')

                // убираем выбор выбранного элемента
                document.querySelector('.board').style.scrollSnapType = 'x mandatory';
            },

            onChange: function () {
                console.log(`${message}`);
            },
        });
    });
}