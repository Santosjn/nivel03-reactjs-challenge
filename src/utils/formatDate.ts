const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('pt-BR').format(new Date(value));

export default formatDate;
