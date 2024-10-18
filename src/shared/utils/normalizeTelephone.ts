const normalizeTelephone = (number: string): string => {
  const cleanNumber = number.replace(/\D+/g, '');
  return `+${cleanNumber}`;
};
export default normalizeTelephone;