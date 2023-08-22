/* zip joins two arrays together .*/
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
    const minLength = Math.min(arr1.length, arr2.length);
    const result: [T, U][] = new Array(minLength);
    for (let i = 0; i < minLength; i++) {
        result[i] = [arr1[i], arr2[i]];
    }
    return result;
}

/* capitalize a given text*/
export function capitalize(text: string): string {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/* group list of object based on a value of a given property*/
export function reorderWithPriority<T, U>(list: T[], property: string, value: U): T[] {
    let hasPropertyValue: T[] = [];
    let hasNoPropertyValue: T[] = []

    for (let i = 0; i < list.length; i++) {
        if((list[i] as any)[property] === value){
            hasPropertyValue.push(list[i]);
        }else {
            hasNoPropertyValue.push(list[i])
        }
    }
    return [...hasPropertyValue, ...hasNoPropertyValue]
}

export function getUniqueKey(): string {
    return `${new Date().toISOString()}-${Math.random()}`
}