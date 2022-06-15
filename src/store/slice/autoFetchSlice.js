import { createSlice } from '@reduxjs/toolkit'

export const autoFetchSlice = createSlice({
  name: 'autoFetch',
  initialState: {
    curStep: 0,
    files: []
  },
  reducers: {
    stepNext: state => {
      state.curStep++
    },
    setFiles: (state) => {
      state.files = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { stepNext, setFiles } = autoFetchSlice.actions

export default autoFetchSlice.reducer