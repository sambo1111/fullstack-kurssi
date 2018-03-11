import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from '../src/reducers/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store