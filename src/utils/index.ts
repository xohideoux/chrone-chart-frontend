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