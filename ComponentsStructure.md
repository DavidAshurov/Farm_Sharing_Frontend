
src/
├── components/            🆕 Компоненты UI
│   ├── cart/             🆕 Компоненты корзины
│   │   ├── CartButton.tsx
│   │   ├── CartDrawer.tsx
│   │   └── CartItem.tsx
│   ├── offers/           🆕 Компоненты предложений/товаров
│   │   ├── filterBar/    🆕 Фильтрация
│   │   ├── OfferCard.tsx
│   │   └── ...
│   ├── product/          🆕 Компоненты для детального просмотра
│   │   ├── ProductCard.tsx
│   │   ├── ProductImage.tsx
│   │   └── ...
│   └── ...
├── hooks/                 🆕 Пользовательские хуки
│   ├── useCart.ts        🆕 Хук для работы с корзиной
│   └── useFarms.ts       🆕 Хук для получения ферм
├── shared/               🆕Общие ресурсы (подготовка к FSD)
│   └── cart/             🆕Сущность корзины
│       └── model/        🆕Бизнес-логика корзины
│           └── CartContext.tsx  🆕 Контекст корзины
├── types/                 🆕 Типы данных
│   ├── farm.ts           🆕 Тип Farm
│   └── offer.ts          🆕 Тип Offer
└── utils/                 🆕 Утилиты
└── constants.ts       🆕 Константы (тестовые данные)