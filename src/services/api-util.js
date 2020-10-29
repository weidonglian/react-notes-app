export const errorMessage = e => {
    return e?.response?.data?.error ? e.response.data.error : String(e)
}