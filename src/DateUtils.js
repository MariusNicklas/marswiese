export const formatDay = num => {
  switch (num) {
    case 1:
      return 'Mo';
    case 2:
      return 'Di';
    case 3:
      return 'Mi';
    case 4:
      return 'Do';
    case 5:
      return 'Fr';
    case 6:
      return 'Sa';
    case 7:
      return 'So';
    default:
      return '';
  }
};

export const formatDateWithHours = date => {
  const d = new Date(date);
  const formattedDate =
    formatDay(d.getDay()) +
    ', ' +
    d.getDate() +
    '.' +
    (d.getMonth() + 1) +
    '.' +
    d.getFullYear() +
    ' ' +
    d.getHours();
  return formattedDate;
};

export const formatDateWithoutHours = date => {
  const d = new Date(date);
  const formattedDate =
    formatDay(d.getDay()) +
    ', ' +
    d.getDate() +
    '.' +
    (d.getMonth() + 1) +
    '.' +
    d.getFullYear();
  return formattedDate;
};

export const formatHour = date => {
  const d = new Date(date);
  const formattedDate = d.getHours();
  return formattedDate;
};
