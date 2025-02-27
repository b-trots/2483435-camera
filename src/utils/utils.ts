type PhoneType = string;
const toStandardizePhone = (phone: PhoneType) =>
  phone.replace(/\D/g, '').replace(/^8/, '7').replace(/^7/, '+7');

export { toStandardizePhone };
