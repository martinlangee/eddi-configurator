function stringToColor(string) {
    if (!string) return 'grey';
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function getInitials(name) {
    if (!name) return '??';
    const parts = name.split(' ');
    const idx1 = parts.length > 1 ? 1 : 0;
    const idx2 = 1 - idx1;
    return parts[0].length > 1 ?
        `${parts[0][0]}${parts[idx1][idx2]}` :
        name;
}

export function stringAvatar(name, w, h) {
    name = name.toString(); // for the case 'name' is a number
    return {
        sx: w && h ? {
            bgcolor: stringToColor(name),
            width: w,
            height: h
        } : { bgcolor: stringToColor(name) },
        children: getInitials(name),
    };
}

export function isPosInteger(str) {
    const num = Number(str);
    return Number.isInteger(num) && num > 0;
}