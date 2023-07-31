/* zip joins two arrays together .*/
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
    const minLength = Math.min(arr1.length, arr2.length);
    const result: [T, U][] = new Array(minLength);
    for (let i = 0; i < minLength; i++) {
        result[i] = [arr1[i], arr2[i]];
    }
    return result;
}