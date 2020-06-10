export const formatValue = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  );

export const formatDate = (value: string): Date =>
  new Intl.DateTimeFormat('pt-BR').format(value);

// export default formatValue;
