export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

const reducer = (store = '', action) => {
    if (action.type === 'SET_FILTER') {
        return action.filter
    }
    return store
}

export default reducer