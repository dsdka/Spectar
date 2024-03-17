import * as constants from './constants';

export const navigationMenu = (userRole) => {
  switch (userRole) {
    case constants.userRole.ADMIN: return [
      {
        label: 'График',
        path: '/schedule'
      },
      {
        label: 'Пациенти',
        path: '/patients'
      },
      {
        label: 'Управление на потребители',
        path: '/userManagement'
      },
      {
        label: 'Настройки',
        path: '/settings'
      }
    ]
    case constants.userRole.PARENT: return [
      {
        label: 'Запазване на час',
        path: '/schedule'
      },
      {
        label: 'Документи',
        path: '/myDocuments'
      },
    ]
    case constants.userRole.TERAPEFT: return [
      {
        label: 'График',
        path: '/schedule'
      },
      {
        label: 'Пациенти',
        path: '/patients'
      },
      {
        label: 'Настройки',
        path: '/settings'
      }
    ]
    default: return [
      {
        label: 'Запазване на час',
        path: '/schedule'
      },
    ]
  }
}