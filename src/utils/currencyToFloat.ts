export function currencyToFloat(valor: string) {
  const clearValue = valor.replace(/[^\d.,]/g, "");

  const valueWithDot = clearValue.replace(",", ".");

  const floatValue = parseFloat(valueWithDot);

  return floatValue;
}
