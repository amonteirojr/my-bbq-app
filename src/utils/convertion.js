function formatCurrencyBRL(value) {
  let newValue = value;

  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(newValue);
}

function parseCurrency(val) {
  val = val.replace(/\D/g, "");
  val = val.replace(/(\d)(\d{2})$/, "$1,$2");
  return val;
}

function formatCurrency(val) {
  val = val.replace(/\D/g, "");
  val = parseInt(val) / 100;
  return val;
}

export { formatCurrencyBRL, parseCurrency, formatCurrency };
