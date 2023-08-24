
export const createQueryString = (params) => {
    if (!params) {
        return ""; // Return an empty string if params is undefined or null
    }
    const queryParams = Object.entries(params)
        .filter(([key, value]) => value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

    return queryParams;
}
