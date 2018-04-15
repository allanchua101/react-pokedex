function ascending(a, b) {
    var textA = a.id.toUpperCase();
    var textB = b.id.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

function descending(a, b) {
    var textA = a.id.toUpperCase();
    var textB = b.id.toUpperCase();
    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
}

export default class SortByID {
    execute(data, sortDirection = 'Ascending') {
        const dataClone = data;
        return dataClone.sort(sortDirection === 'Ascending' ? ascending : descending);
    }
}