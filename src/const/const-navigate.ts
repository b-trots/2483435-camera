enum AppRoute {
  Plug = '',
  Main = '/',
  Cameras = '/cameras/:id',
}

const BREADCRUMBS: { name: string; path?: string }[] = [
  { name: 'Главная', path: AppRoute.Main },
  { name: 'Каталог', path: AppRoute.Main },
];

const NAVIGATE = [
  { name: 'Каталог', path: AppRoute.Main },
  { name: 'Гарантии', path: AppRoute.Plug },
  { name: 'Доставка', path: AppRoute.Plug },
  { name: 'О компании', path: AppRoute.Plug },
] as const;

const RESOURCES = [
  { name: 'Курсы операторов', path: AppRoute.Plug },
  { name: 'Блог', path: AppRoute.Plug },
  { name: 'Сообщество', path: AppRoute.Plug },
] as const;

const SUPPORT = [
  { name: 'FAQ', path: AppRoute.Plug },
  { name: 'Задать вопрос', path: AppRoute.Plug },
] as const;

const FOOTER_NAVIGATE = [
  { title: 'Навигация', navigate: NAVIGATE },
  { title: 'Ресурсы', navigate: RESOURCES },
  { title: 'Поддержка', navigate: SUPPORT },
] as const;

const SOCIAL = [
  {
    name: 'vk',
    label: 'Переход на страницу вконтакте',
    path: AppRoute.Plug,
  },
  {
    name: 'pinterest',
    label: 'Переход на страницу pinterest',
    path: AppRoute.Plug,
  },
  {
    name: 'reddit',
    label: 'Переход на страницу reddit',
    path: AppRoute.Plug,
  },
] as const;

export {
  AppRoute,
  BREADCRUMBS,
  NAVIGATE,
  RESOURCES,
  SUPPORT,
  FOOTER_NAVIGATE,
  SOCIAL,
};
