import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL : "http://localhost:4500"
    }
)

export function registerUser(data){
    return apiClient.post(`/api/auth/register`, data);
}

export function loginUser(data){
    return apiClient.post(`/api/auth/login`, data);
}

export function getNotes(){
    return apiClient.get(`/notes/get-all`);
}

export function createNote(data){
    return apiClient.post(`/notes/create`, data);
}

export function deleteNote(id){
    return apiClient.delete(`notes/delete/${id}`);
}

export function updateNote(id, data){
    return apiClient.put(`notes/update/${id}`, data);
}
