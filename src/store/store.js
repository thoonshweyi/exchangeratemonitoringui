import { configureStore } from '@reduxjs/toolkit'
import reducerfortype from './reducerfortype'

export default configureStore({
  reducer: {
    type:reducerfortype
  }
})
