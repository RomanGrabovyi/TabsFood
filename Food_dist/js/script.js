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


        return {   // Повертає об"єкт з готовими зниаченнями
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes' : minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {  // Встановлюємо таймер
        const timer = document.querySelector(selector),//В селектор можна записати будь-який таймер
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeIntarval = setInterval(updateClock, 1000);// Обновляємо щосекнди

              updateClock();

        function updateClock() {  // Обновляємо таймер
            const t = getTimeRemainig(endtime);//В т записуємо об"єкт що повертається зі всіма значеннями

            days.innerHTML = getZero(t.days);//Виносимо на сторінку
            hours.innerHTML = getZero(t.days);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeIntarval); // Зупиняємо таймер
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modalTriger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    modalTriger.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });
    
    
    modalCloseBtn.addEventListener('click', closeModal);

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code =='Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });
});