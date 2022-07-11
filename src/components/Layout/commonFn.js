export const getTransformMenu = (menu) => menu?.map(({ name, url, children }) => ({
    label: name,
    key: name,
    url: url || '',
    // children: getTransformMenu(children)
}));