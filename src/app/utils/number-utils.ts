export function convertToNumber(value: string): number {
  const cleanedValue = value.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleanedValue);
}
