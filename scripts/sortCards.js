// sortCards.js - файл по сортировке карточек

// Функция для создания кнопки сортировки
function createSortButton(menuWindow, column) {
    const sortButton = document.createElement('button');
    sortButton.className = 'menu-button';
    sortButton.innerHTML = 'Сортировать';

    sortButton.addEventListener('click', () => {
        const sortWindow = createSortWindow(menuWindow, column);
        menuWindow.appendChild(sortWindow)
    })

    return sortButton;
}

function createSortWindow(menuWindow, column) {
    const sortWindow = document.createElement('div');
    sortWindow.className = 'sort-window';

    const sortOptions = [
        { text: 'Дата создания (сначала новые)', type: 'upToDown' },
        { text: 'Дата создания (сначала старые)', type: 'downToUp' },
        { text: 'Название карточки (по алфавиту)', type: 'letter' }
    ];

    sortOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'menu-button';
        button.innerHTML = option.text;
        button.addEventListener('click', () => {
            sortCards(column, option.type);
            sortWindow.remove();
            menuWindow.remove();
        });
        sortWindow.appendChild(button);
    });

    return sortWindow;
}

// Функция для сортировки карточек в колонке
function sortCards(column, type) {
    const index = columnsData.findIndex(elem => elem.id == column.id);
    
    const sortTypes = {
        upToDown: (a, b) => new Date(b.data) - new Date(a.data),
        downToUp: (a, b) => new Date(a.data) - new Date(b.data),
        letter: (a, b) => a.value.localeCompare(b.value)
    };

    if (index !== -1){
        columnsData[index].cards.sort(sortTypes[type] || (() => 0));
    
        const cardListId = document.getElementById(column.id).querySelector('.card-list').id;
        const cardList = document.getElementById(cardListId);
        cardList.innerHTML = '';
    
        columnsData[index].cards.forEach(card => {
            addingCard(card.id, card.value, card.color, card.description, columnsData[index]);
        });
    }

}