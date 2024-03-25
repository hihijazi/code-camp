import axios from 'axios';
import { apiUrlBackend } from '../constants.js';

export const loginInstructor = async (postData) => {
    const response = await axios.post(`${apiUrlBackend}/instructorlogin`, postData);
    return response.data;
}

export const loginStudent = async (postData) => {
    const response = await axios.post(`${apiUrlBackend}/studentlogin`, postData);
    return response.data;
}

export const studentRegister = async (postData) => {
    const response = await axios.post(`${apiUrlBackend}/students`, postData);
    return response.data;
}

export const instructorRegister = async(postData) => {
    const response = await axios.post(`${apiUrlBackend}/instructors`, postData);
    return response.data;
}