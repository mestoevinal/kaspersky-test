export function getTotalPages(total) {
    let totalPages = []
    for (let i = 1; i < total + 1; i++) {
        totalPages.push(i)
    }
    return totalPages
}