export const genderList = [
  {
    label: 'male',
    value: 0,
  },
  {
    label: 'female',
    value: 1,
  },
];
export const maritalStatus = [
  {
    label: 'married',
    value: 1,
  },
  {
    label: 'unmarried',
    value: 2,
  },
];
export const relationship = [
  {
    value: 4,
    label: 'father',
  },
  {
    value: 5,
    label: 'brother',
  },
  {
    value: 2,
    label: 'wife',
  },
  {
    value: 7,
    label: 'other',
  },
  {
    value: 3,
    label: 'have',
  },
  {
    value: 6,
    label: 'sister',
  },
  {
    value: 1,
    label: 'husband',
  },
];
export const suportedFormat = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
export const menuItems = [{ name: 'Personal account', to: 'personal', id: 3 }];

export const menuItemsAdmin = [
  { name: 'Users', to: 'users-list', id: 2 },
  { name: 'Poll', to: 'poll', id: 3 },
  { name: 'Vacation/Sick', to: 'vacation', id: 4 },
  { name: 'Personal account', to: 'personal', id: 5 },
];

export const menuItemsWorker = [
  { name: 'Poll', to: 'poll', id: 3 },
  { name: 'Vacation/Sick', to: 'vacation', id: 4 },
  { name: 'Personal account', to: 'personal', id: 5 },
];

export const menuItemsHr = [
  { name: 'Poll', to: 'poll', id: 3 },
  { name: 'Vacation/Sick', to: 'vacation', id: 4 },
  { name: 'Personal account', to: 'personal', id: 5 },
];

// dataPicker locale
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = {
  ua: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

export const localeUa = {
  localize: {
    day: (n) => days[n],
    month: (n) => months.ua[n],
  },
  formatLong: {
    date: () => 'mm/dd/yyyy',
  },
};

export const localeRu = {
  localize: {
    day: (n) => days[n],
    month: (n) => months.ru[n],
  },
  formatLong: {
    date: () => 'mm/dd/yyyy',
  },
};
