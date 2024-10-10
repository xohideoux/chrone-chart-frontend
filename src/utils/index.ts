export const formatDateInputValue = (value: string) => {
  let updatedValue = value.replace(/\D/g, "").slice(0, 8);

  if (updatedValue.length > 2) {
    updatedValue = updatedValue.slice(0, 2) + '.' + updatedValue.slice(2);
  }
  if (updatedValue.length > 5) {
    updatedValue = updatedValue.slice(0, 5) + '.' + updatedValue.slice(5);
  }

  return updatedValue
}

export const formatDateToReq = (dateString: string) => {
  const parts = dateString.split('.');

  if (parts.length !== 3) {
    return '';
    throw new Error("Invalid date format. Expected DD.MM.YYYY");
  }

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${year}-${month}-${day}`;
}

export const getParamsFromObj = (obj: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  return Object.entries(obj)
    .filter(([, value]) => value != false)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export const getNameFromEmail = (email: string) => (email.split('@')[0]);

export const formatDateToString = (dateString: string) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}