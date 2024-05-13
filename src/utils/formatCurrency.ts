export const formatCurrency = (value: string) => {
  const numberValue = parseFloat(value.replace(/[^\d]/g, ""));

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((numberValue || 0) / 100);

  return formatted;
};
