const reducer = (state = '', action) => {
    if (action.type === 'NOTIFY') {
        return action.data
    } else if (action.type === 'ZERO') {
        return ''
    }
    return state

}

export const notify = (notification, ms) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTIFY',
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: 'ZERO'
            })
        }, (ms * 1000))
    }
}

export default reducer