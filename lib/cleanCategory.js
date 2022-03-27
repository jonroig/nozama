const cleanCategory = (inputCategory) => {
    const outputCategory = inputCategory
        .toLowerCase()
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    return outputCategory;
}

module.exports = {
    cleanCategory
};