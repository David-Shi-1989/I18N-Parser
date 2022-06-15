import { configureStore } from '@reduxjs/toolkit'
import autoFetchSlice from './slice/autoFetchSlice'

export default configureStore({
  reducer: {
    autoFetch: autoFetchSlice
  },
})