export const swap = <T>(array: T[], i: number, j: number): void => {
    const temp: T = array[i];
    array[i] = array[j];
    array[j] = temp;
}

export const shuffle = <T>(array: T[]): T[] => {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        swap(array, currentIndex, randomIndex);
    }
    return array;
}
