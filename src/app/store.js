import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import studentReducer from "../features/students/studentsSlice"
import classReducer from "../features/classes/classesSlice"
import lessonsReducer from "../features/lessons/todaysLessonsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    lessons: lessonsReducer,
    classes: classReducer, 
  },
})
