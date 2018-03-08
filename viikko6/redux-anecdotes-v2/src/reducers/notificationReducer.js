  export const setNotification = (notification) => {
    return {
      type: 'SET',
      notification
    }
  }

  export const notify = (notification, seconds) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET',
        notification
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE'
        })
      },(seconds*1000))

    }
  }

  export const removeNotification = () => {
      return {
          type: 'REMOVE'
      }
  }
  
  const reducer = (store = 'HERE IS NOTIFICATION', action) => {
    if (action.type==='SET') {
      return action.notification
    } else if (action.type==='REMOVE') {
        return ''
    }
    return store
  }
  
  export default reducer