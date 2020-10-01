export function getData(count) {
    const result = [];

    const now = Date.now();
    let stringCount = 0;
    let nextNumber = 0;
    let nextDate = now;

    for (let i = 0; i < count; i++) {
        newRecord(i, `code ${stringCount}`, nextNumber, nextDate, result);

        stringCount += 1;
        nextNumber += 13;

        if (stringCount == 10) {
            stringCount = 0;
            nextDate = nextDate + 1;
            nextNumber = 0;
        }
    }

    return result;
}

function newRecord(id, code, number, date, array) {
    array.push({
        id: id,
        code: code,
        number: number,
        date: date
    })
}

