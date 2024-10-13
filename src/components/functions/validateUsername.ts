export function validateUsername(username: string, usedNames: string[]) {
    const noSpaces = /^[^\s]+$/.test(username);
    const isUnique = !usedNames.includes(username);

    if (username.trim().length < 1) {
        return { valid: false, message: 'Username must be at least one character long.' };
    }
    if (!noSpaces) {
        return { valid: false, message: 'Username cannot contain spaces.' };
    }
    if (!isUnique) {
        return { valid: false, message: 'Username is already taken.' };
    }
    return { valid: true, message: 'Username is valid.' };
}