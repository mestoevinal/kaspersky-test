export function getTotalPages(count, limit) {
    let totalPages = []
    for (let i = 1; i < Math.ceil(count / limit) + 1; i++) {
        totalPages.push(i)
    }
    return totalPages
}