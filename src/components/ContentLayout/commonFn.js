export const transformMenuFlat = (menu) => {
    let flat = [];
    menu.forEach(item => {
        if (!item.children) {
            flat.push(item);
        }
        else {
            const { children } = item;
            flat.push(item);
            flat.push(...transformMenuFlat(children));
        }
    });
    return flat;
};