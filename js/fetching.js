export async function fetchData() {
    const response = await fetch('data.json')
    if(!response.ok) throw new Error(`HTTP Error fetching`)
    return await response.json()
}