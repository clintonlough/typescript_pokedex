export function cleanInput(input: string): string[] {
    // Trim first so pure-whitespace inputs return an empty array
    const trimmed = input.trim();
    if (trimmed.length === 0) {
        return [];
    }
    return trimmed.split(/\s+/);
}
