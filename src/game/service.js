export const fetchCard = async () => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`, {method: 'GET'})
    const json = await response.json()
    return await json
}
