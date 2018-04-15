export default class PaginationUtility {
    execute(pageSize, page, data) {
        let pageOffset = ((page - 1) * pageSize);
        let lastItemIndex = (pageOffset + pageSize);
        const dataClone = data;

        return {
            page: page,
            pageItems: dataClone.slice(pageOffset, lastItemIndex),
            totalPages: Math.ceil(data.length / pageSize)
        };
    }
};