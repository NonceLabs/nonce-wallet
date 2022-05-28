import { createSlice } from '@reduxjs/toolkit'

interface SettingSlice {
  theme: string
}

const initialState: SettingSlice = {
  theme: 'auto',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { updateTheme } = settingSlice.actions

export default settingSlice.reducer
