// Format value as DD.MM.YYYY
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

// Format date string from DD.MM.YYYY to YYYY-MM-DD for requests
export const formatDateToReq = (dateString: string) => {
  const parts = dateString.split('.');

  if (parts.length !== 3) {
    return '';
  }

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${year}-${month}-${day}`;
}

// Get URL params string from an object
export const getParamsFromObj = (obj: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  return Object.entries(obj)
    .filter(([, value]) => value != false)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

// Extract the username from an email address
export const getNameFromEmail = (email: string) => (email.split('@')[0]);

// Format a date string to DD.MM.YYYY
export const formatDateToString = (dateString: string) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}