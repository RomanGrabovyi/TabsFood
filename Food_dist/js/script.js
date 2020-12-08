window.addEventListener('DOMContentLoaded', () => {
    let tabContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer


    const deadline = '2020-11-30';

    function getTimeRemainig(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //Різнця між кінцевим часом і теперішнім в мілісекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor(t / 1000) % 60;


        return { // Повертає об"єкт з готовими зниаченнями
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // Встановлюємо таймер
        const timer = document.querySelector(selector), //В селектор можна записати будь-який таймер
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeIntarval = setInterval(updateClock, 1000); // Обновляємо щосекнди

        updateClock();

        function updateClock() { // Обновляємо таймер
            const t = getTimeRemainig(endtime); //В т записуємо об"єкт що повертається зі всіма значеннями

            days.innerHTML = getZero(t.days); //Виносимо на сторінку
            hours.innerHTML = getZero(t.days);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeIntarval); // Зупиняємо таймер
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTriger.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';

    }

    modal.addEventListener('click', (e) => { //Закриваємо вікно клвкаючи на окремій області від вікна
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { //закриваємо вікно кнопкою Escape
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000); //вікно відкриється через 3 сек.

    function showModalByScroll() { //Коли скролимо в низ відкривається вікно
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //Вікно появиться тільки один раз після скролу в сам низ.
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //...rest оператор повертає масив,залишок
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 28.5;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.transfer * this.price;
        }

        render() { //За допомогою render створюємо структуру яка поміщається в окремий div

            const element = document.createElement('div');

            if (this.classes.length === 0) { //якщо масив пустий то,
                this.element = 'menu__item'; //створюємо клас по дефолту
                element.classList.add(this.element); //і добавляємо до елемента
            } else {
                this.classes.forEach(className => element.classList.add(className)); // якщо передали хоч один клас то перейтись по кожному елементу і кожен клас підєднємо до елемента
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>       
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();

    //Forms
    // створюємо server.php (response);

    const forms = document.querySelectorAll('form'); //получаємо всі форми на сторінці

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дякуємо! Скоро з вами зв\'яжемось',
        error: 'Виникла помилка!'
    };

    forms.forEach(item => { //кожній формі добавляємо функцію 
        postData(item);
    });

    function postData(form) { // відповідає за постинг даних на сервер
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img'); //створюємо блок для відображення сповіщення
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage); //відправляємо на сторінку
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json'); // B FormData цього прписувати не потрібно
            //якщо приймає дані в JSON
            const formData = new FormData(form);

            const object = {}; //
            formData.forEach(function (value, key) { //перебираємо formData і всі дані вносимо в object
                object[key] = value;
            });
            //після того як ортимали обєкт можемо проводити конвертацію JSON 
            const json = JSON.stringify(object); // перетворює звичайний обєкт в json

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 2000);
                } else {
                    showThanksModal(message.error);
                }
            });
        });
    }

    function showThanksModal(message) { //створюємо функцію для показу модального вікна після відправки форми
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //скриваємо основне мод вікно.
        openModal(); //відкриваємо мод вікно

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class = "modal__content">
            <div class = "modal__close" data-close>×</div>
            <div class = "modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal); //елемент показу.ться на сторінці
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});