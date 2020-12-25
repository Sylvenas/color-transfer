export function isNumeric(...numbers: Array<number>): boolean {
    const numberArr = numbers.filter(n => !isNaN(parseFloat(n.toString())) && isFinite(n))
    return numberArr.length === numbers.length
}