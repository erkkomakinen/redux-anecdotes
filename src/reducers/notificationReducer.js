let timeoutID

const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }

  //return state
}

/*
export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: message,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}
*/

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification,
    })
    if (timeoutID) window.clearTimeout(timeoutID)
    timeoutID = window.timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export default reducer
