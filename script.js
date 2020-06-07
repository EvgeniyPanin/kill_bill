const form = document.querySelector('#kill_bill');
const button = form.querySelector('.button');

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    button.textContent = 'Удаляем...'
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', 'disabled');

    const tokenValue = form.querySelector('#token').value;
    const cohortValue = form.querySelector('#cohort').value;


    const api = {
        baseUrl: `https://praktikum.tk/${cohortValue}`,
        headers: {
            authorization: tokenValue,
            'Content-Type': 'application/json'
        }
    }

    fetch(`https://praktikum.tk/${cohortValue}/users/me`, {
        headers: api.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((infoForMe) => {
            if (infoForMe._id) {
                return infoForMe._id;
            }
        })
        .then( meId => {
            fetch(`https://praktikum.tk/${cohortValue}/cards`, {
                headers: api.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((content) => {
                content.forEach(element => {
                    if (element.owner._id === meId) {
                        fetch(`https://praktikum.tk/${cohortValue}/cards/${element._id}`, {
                            method: 'DELETE',
                            headers: api.headers
                        })
                        .then(res => {
                            if (res.ok) {
                                return res.json();
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }
                })
                alert('Все ваши карточки удалены');
                button.textContent = 'Удалить мои карточки';
                button.classList.remove('popup__button_disabled');
                button.removeAttribute('disabled');
            })
            .catch((err) => alert(`ошибка, проверьте правильность ввода данных`))
        })

    
})
