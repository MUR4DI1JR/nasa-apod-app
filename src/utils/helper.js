export const shortText = (text) =>{
    return text.length > 245 ? text.substring(0, 240) + "..." : text;
}