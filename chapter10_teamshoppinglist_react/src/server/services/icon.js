// Generate a simple text icon for certain common products
// Unknown products will get a blank icon (' ')
function generateIcon(description) {
    // A dictionary of icons and search strings
    let icons = {
        '#': 'chocolate bar',
        '@': 'pasta',
        '$': 'kebab',
        ')': 'banana',
        '|': 'pocky',
        '=': 'cheese slices',
        'o': 'kiwifruit',
        'e': 'lamb loin chop',
        'i': 'candle',
        'O': 'donut',
        'T': 't-bone steak',
        '_': 'flatbread',
        ':': 'peas',
        'V': 'carrot'
    };

    // Perform a case-insensitive substring search of the 'icons' dictionary
    let lowercase = description.toLowerCase();
    for (let icon in icons) {
        if (lowercase.indexOf(icons[icon]) != -1)
            return icon;
    }

    // If no icon is found, return an empty string
    return ' ';
}

module.exports = { generateIcon };