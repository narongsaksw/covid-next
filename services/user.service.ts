import http from "../http-common/http-common"
import { FormData, User } from '../type/type'

export const addUserAndTimeline = (values: FormData) => {
    return http.post('/users', { ...values })
}

export const getAllUser = () => {
    return http.get<User[]>('/users')
}