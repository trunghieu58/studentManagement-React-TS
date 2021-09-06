import { Student } from './../models/student';
import { ListResponse, listParams } from './../models/common';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: listParams): Promise<ListResponse<Student>> {
    return axiosClient.get('students', { params });
  },
  getStudentById(id: string): Promise<Student> {
    const url = `students/${id}`;
    return axiosClient.get(url);
  },
  add(student: Student) : Promise<Student> {
      const url = `students`
      return axiosClient.post(url, student);
  },
  update(id: string, student: Student) : Promise<Student> {
      const url = `students/${id}`
      return axiosClient.patch(url, student)
  },
  remove(id: string) : Promise<ListResponse<Student>> {
      return axiosClient.delete(`students/${id}`)
  }
};

export default studentApi;
