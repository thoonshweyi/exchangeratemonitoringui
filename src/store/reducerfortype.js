import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'type',
  initialState: {
    value: 'tt'
  },
  reducers: {
    changeType: (state, action) => {
    //  console.log(action)
      state.value = action.payload
    }
  }
})
// console.log(counterSlice);
// Action creators are generated for each case reducer function
export const { changeType } = counterSlice.actions

export default counterSlice.reducer