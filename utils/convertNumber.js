export function convertToNumber(num) {
    if (!num) return -1;
    if (Number.isNaN(num)) return num
    return Number(num)
}
