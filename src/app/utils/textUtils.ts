/**
 * Smartly shortens a title by preserving important words and adding ellipsis
 * @param title The title to shorten
 * @param maxLength Maximum length of the shortened title
 * @returns Shortened title with ellipsis if needed
 */
export const shortenTitle = (title: string, maxLength: number = 35): string => {
    if (!title) return '';
    if (title.length <= maxLength) return title;

    // Split into words
    const words = title.split(' ');
    let shortened = '';
    let currentLength = 0;

    // Try to keep as many complete words as possible
    for (const word of words) {
        if (currentLength + word.length + 1 <= maxLength - 3) { // -3 for ellipsis
            shortened += (shortened ? ' ' : '') + word;
            currentLength += (shortened ? 1 : 0) + word.length;
        } else {
            break;
        }
    }

    // If we can't even fit one word, just cut the string
    if (!shortened) {
        shortened = title.slice(0, maxLength - 3);
    }

    return `${shortened}...`;
};
