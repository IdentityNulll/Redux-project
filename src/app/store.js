import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import studentReducer from "../features/students/studentsSlice"
import classReducer from "../features/classes/classesSlice"
import todaysLessonsReducer from "../features/todaysLessons/todaysLessonsSlice"
import usersReducer from "../features/users/usersSlice"
import lessonsReducer from "../features/lessons/lessons"
import teacherReducer from "../features/teachers/teacherSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    todaysLessons: todaysLessonsReducer,
    classes: classReducer,
    users: usersReducer,
    lessons: lessonsReducer,
    teachers : teacherReducer,
  },
})
