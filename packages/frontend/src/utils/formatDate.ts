const dateFormatter = new Intl.DateTimeFormat('pt-BR');

function formatDate(date: number | Date) {
  return dateFormatter.format(date);
}

export default formatDate;
