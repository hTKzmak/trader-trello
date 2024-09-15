const addChoosen = (evt) => {
    if (evt.target.classList.contains('card')) {
        evt.target.classList.add('choosen');
    }
}

const dragCard = (evt) => {
    // Разрешаем сбрасывать элементы в эту область
    evt.preventDefault();

    const activeElement = document.querySelector('.choosen');

    // Проверяем если событие dragover произошёл на column
    if (activeElement && (evt.target.classList.contains('column'))) {
        const currentElement = evt.target;

        const cardsList = currentElement.querySelector('.card-list');

        cardsList.appendChild(activeElement)
        console.log('Перетаскиваем карточку')
    }
}

const removeChoosen = (evt) => {
    if (evt.target.classList.contains('choosen')) {
        evt.target.classList.remove('choosen');
        console.log('Данные карточек обновились :)')
    }
}


// событие добавления класса choosen
document.addEventListener('dragstart', addChoosen);

// событие перемещения карточки
document.addEventListener('dragover', dragCard);

// событие удаления класса choosen
document.addEventListener('dragend', removeChoosen);


