function getAddressWord(count: number): string {
    const remainder10 = count % 10;
    const remainder100 = count % 100;

    if (remainder100 >= 11 && remainder100 <= 19) {
        return `${count} адресов`;
    } else if (remainder10 === 1) {
        return `${count} адрес`;
    } else if (remainder10 >= 2 && remainder10 <= 4) {
        return `${count} адреса`;
    } else {
        return `${count} адресов`;
    }
}
export default getAddressWord