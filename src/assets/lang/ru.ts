import {ITranslation} from './lang';

export const ru: ITranslation = {
    // Общее
    site_name: 'Alex',
    role: 'Frontend-разработчик',
    menu: 'Меню',
    menu_open: 'Открыть меню разделов',
    room: 'Комната',
    sound_on: 'Включить звук',
    sound_off: 'Выключить звук',
    language: 'Язык',
    eject: 'Извлечь',
    eject_label: 'Извлечь картридж и вернуться в комнату (Esc)',
    loading: 'Загрузка...',

    // Сцена
    scene_label: 'Комната с ретро-консолью. Выберите картридж, чтобы открыть раздел.',
    cartridge_insert: 'Вставить картридж «{name}»',
    dialog_avatar_alt: 'Пиксельный аватар Alex',
    dialog_greeting: 'Привет, я {name}, {role}. Выбери картридж, чтобы начать.',
    dialog_projects: 'Проекты: то, что я сделал.',
    dialog_about: 'Обо мне: кто я и чем занимаюсь.',
    dialog_skills: 'Навыки: инструменты, которые я использую каждый день.',
    dialog_experience: 'Опыт: где и над чем я работал.',
    dialog_contact: 'Контакты: напиши мне, я отвечу.',

    // Разделы
    section_projects: 'Проекты',
    section_about: 'Обо мне',
    section_skills: 'Навыки',
    section_experience: 'Опыт',
    section_contact: 'Контакты',

    // Главная (SEO)
    home_title: 'Портфолио frontend-разработчика',
    home_description: 'Alex — frontend-разработчик. Выберите картридж в комнате с ретро-консолью, чтобы посмотреть проекты, навыки, опыт и контакты.',

    // Проекты
    projects_title: 'Проекты',
    projects_description: 'Веб-проекты Alex: приложения на React и TypeScript, у каждого описаны задача, моя роль и достигнутый результат.',
    projects_intro: 'Избранные проекты последних лет. Нажмите на карточку, чтобы увидеть подробности.',
    project_view: 'Подробнее',
    project_live: 'Демо',
    project_github: 'GitHub',
    project_problem: 'Задача',
    project_role: 'Моя роль',
    project_stack: 'Технологии',
    project_result: 'Результат',
    project_back: 'Все проекты',
    project_image_alt: 'Превью проекта {title}',
    project_screenshot_alt: '{title} — скриншот {index}',
    project_not_found: 'Проект не найден.',

    project_taskFlow_title: 'Task Flow',
    project_taskFlow_summary: 'Доска задач с drag-and-drop для команд.',
    project_taskFlow_problem: 'Небольшие команды вели задачи в таблицах, и было непонятно, кто над чем работает.',
    project_taskFlow_role: 'Разработал frontend с нуля: интерфейс доски, фильтры и управление состоянием.',
    project_taskFlow_result: 'Команда видит статусы всех задач на одном экране, еженедельные встречи стали короче.',

    project_weatherNow_title: 'Weather Now',
    project_weatherNow_summary: 'Быстрое и простое приложение прогноза погоды.',
    project_weatherNow_problem: 'Существующие сайты погоды были перегружены рекламой и медленно работали на мобильных.',
    project_weatherNow_role: 'Дизайн и frontend: кэширование, офлайн-режим и доступный интерфейс.',
    project_weatherNow_result: 'Оценка Lighthouse Performance 95+, первая загрузка меньше секунды.',

    project_shopLite_title: 'Shop Lite',
    project_shopLite_summary: 'Лёгкая онлайн-витрина для малого бизнеса.',
    project_shopLite_problem: 'Небольшим магазинам нужна была простая быстрая витрина вместо сложной платформы.',
    project_shopLite_role: 'Библиотека компонентов, корзина и анимации.',
    project_shopLite_result: 'Конверсия из корзины в заказ выросла, мобильный сценарий стал проще.',

    // Обо мне
    about_title: 'Обо мне',
    about_description: 'Об Alex: опыт frontend-разработчика, принципы работы, чем я занимаюсь каждый день и резюме для скачивания.',
    about_photo_alt: 'Портрет Alex',
    about_bio: 'Я frontend-разработчик и создаю быстрые, доступные и удобные веб-интерфейсы. Люблю тесно работать с дизайнерами и backend-командой, превращая идею в работающий продукт.',
    about_what_title: 'Чем я занимаюсь',
    about_what_1: 'Создаю масштабируемые интерфейсы на React и TypeScript.',
    about_what_2: 'Перевожу макеты Figma в точный до пикселя код.',
    about_what_3: 'Слежу за производительностью, доступностью и качеством тестов.',
    about_cv: 'Скачать резюме',

    // Навыки
    skills_title: 'Навыки',
    skills_description: 'Навыки Alex: frontend-технологии, рабочие инструменты, дизайн и UX — список, разбитый по категориям для быстрого чтения.',
    skills_intro: 'Технологии и инструменты, которые я использую в повседневной работе.',
    skills_group_frontend: 'Frontend',
    skills_group_tools: 'Инструменты',
    skills_group_design: 'Дизайн и UX',

    // Опыт
    experience_title: 'Опыт',
    experience_description: 'Опыт работы Alex: компании, должности, даты и краткое описание выполненной работы на каждой позиции.',
    experience_present: 'Сейчас',
    experience_job1_role: 'Frontend-разработчик',
    experience_job1_summary: 'Развиваю интерфейс основного веб-приложения в продуктовой команде и строю дизайн-систему.',
    experience_job2_role: 'Junior frontend-разработчик',
    experience_job2_summary: 'Делал админ-панели и страницы отчётов, увеличил покрытие тестами.',
    experience_job3_role: 'Стажёр frontend',
    experience_job3_summary: 'Делал лендинги и участвовал в развитии библиотеки компонентов.',

    // Контакты
    contact_title: 'Контакты',
    contact_description: 'Связаться с Alex: email, GitHub, LinkedIn и форма для сообщения. Пишите по поводу сотрудничества и предложений о работе.',
    contact_intro: 'Пишите о проекте, предложении о работе или просто чтобы поздороваться — обычно отвечаю в течение дня.',
    contact_email_label: 'Email',
    contact_social: 'Соцсети',
    contact_form_title: 'Написать сообщение',
    contact_name: 'Ваше имя',
    contact_email: 'Ваш email',
    contact_message: 'Сообщение',
    contact_send: 'Отправить сообщение',
    contact_required: 'Заполните это поле',
    contact_invalid_email: 'Введите корректный email',
    contact_success: 'Открывается почтовое приложение — отправьте сообщение оттуда.',
    contact_mail_subject: 'Сообщение через портфолио: {name}',

    // 404
    not_found_title: 'Страница не найдена',
    not_found_description: 'Страница, которую вы ищете, не существует или была перемещена.',
    not_found_text: 'Этот картридж пуст. Вернитесь в комнату и выберите другой раздел.',
    not_found_cta: 'Вернуться в комнату',
};
