const actions = {
    delete: item=>({
        type: 'del_item',
        id: item.id
    }),
    add: item=>({
        type: 'add_item',
        name: item.name,
    })
};
export default actions;