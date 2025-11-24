export type BlockList = {
    id: number;
    label: string;
    children?: BlockList[];
};

export type ListData = BlockList[];

export const dataTest: ListData = [
    {
        id: 1,
        label: 'Электроника',
        children: [
            { id: 2, label: 'Смартфоны' },
            {
                id: 3,
                label: 'Ноутбуки',
                children: [
                    { id: 4, label: 'Игровые' },
                    { id: 5, label: 'Ультрабуки' },
                    { id: 6, label: 'Трансформеры' },
                ],
            },
            {
                id: 7,
                label: 'Телевизоры',
                children: [
                    { id: 8, label: '4K UHD' },
                    { id: 9, label: 'QLED' },
                    { id: 10, label: 'OLED' },
                ],
            },
        ],
    },
    {
        id: 11,
        label: 'Одежда',
        children: [
            { id: 12, label: 'Мужская' },
            {
                id: 13,
                label: 'Женская',
                children: [
                    { id: 14, label: 'Платья' },
                    { id: 15, label: 'Блузки' },
                    { id: 16, label: 'Юбки' },
                ],
            },
            { id: 17, label: 'Детская' },
        ],
    },
    {
        id: 18,
        label: 'Книги',
        children: [
            {
                id: 19,
                label: 'Художественная литература',
                children: [
                    { id: 20, label: 'Фэнтези' },
                    { id: 21, label: 'Детективы' },
                    { id: 22, label: 'Романы' },
                ],
            },
            { id: 23, label: 'Научная литература' },
            { id: 24, label: 'Учебники' },
        ],
    },
    {
        id: 25,
        label: 'Спорт',
        children: [
            {
                id: 26,
                label: 'Фитнес',
                children: [
                    { id: 27, label: 'Гантели' },
                    { id: 28, label: 'Беговые дорожки' },
                    { id: 29, label: 'Йога' },
                ],
            },
            { id: 30, label: 'Велоспорт' },
            { id: 31, label: 'Туризм' },
        ],
    },
    {
        id: 32,
        label: 'Мебель',
        children: [
            { id: 33, label: 'Гостиная' },
            {
                id: 34,
                label: 'Спальня',
                children: [
                    { id: 35, label: 'Кровати' },
                    { id: 36, label: 'Шкафы' },
                    { id: 37, label: 'Тумбы' },
                ],
            },
            { id: 38, label: 'Офисная' },
        ],
    },
    {
        id: 39,
        label: 'Красота',
        children: [
            { id: 40, label: 'Парфюмерия' },
            {
                id: 41,
                label: 'Косметика',
                children: [
                    { id: 42, label: 'Декоративная' },
                    { id: 43, label: 'Уходовая' },
                ],
            },
        ],
    },
    {
        id: 44,
        label: 'Автотовары',
        children: [
            { id: 45, label: 'Шины' },
            { id: 46, label: 'Аккумуляторы' },
            {
                id: 47,
                label: 'Автохимия',
                children: [
                    { id: 48, label: 'Моторные масла' },
                    { id: 49, label: 'Омыватели' },
                ],
            },
        ],
    },
    { id: 50, label: 'Цифровые товары' },
    {
        id: 51,
        label: 'Игрушки',
        children: [
            { id: 52, label: 'Конструкторы' },
            { id: 53, label: 'Куклы' },
            { id: 54, label: 'Настольные игры' },
        ],
    },
    {
        id: 55,
        label: 'Продукты',
        children: [
            {
                id: 56,
                label: 'Молочные продукты',
                children: [
                    { id: 57, label: 'Сыры' },
                    { id: 58, label: 'Йогурты' },
                ],
            },
            { id: 59, label: 'Хлебобулочные изделия' },
            { id: 60, label: 'Бакалея' },
        ],
    },
];
