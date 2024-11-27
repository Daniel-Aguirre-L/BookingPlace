export const getRatingDescription = (rating) => {
    if (rating < 2) return "Necesita mejoras"
    if (rating < 3) return "Puede ser mejor"
    if (rating < 4) return "Buena"
    if (rating < 5) return "Muy Buena"
    return "Excelente"
}