import { Injectable } from '@angular/core';
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [];
  constructor() {
    
    const stored = localStorage.getItem('students');
    if (stored) {
      this.students = JSON.parse(stored);
    } else{
      this.students=[
        {
      id: 1,
      name: 'Bhuvana',
      class: 'Class 9',
      gender: 'Female',
      hasHobby: true,
      hobby: 'Painting',
      favouriteSubject: 'Mathematics',
    },
    {
      id:2,
      name: 'Roshan',
      class: 'Class 6',
      gender: 'Male',
      hasHobby: false,
      hobby: null,
      favouriteSubject: 'English',
    }

    ];
    localStorage.setItem('students', JSON.stringify(this.students));
    }
  }


  getAllStudents(): Student[] {
    return [...this.students]
  }

  addStudent(student: Student){
    const nextId = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
    student.id = nextId;
    this.students.push(student);

     localStorage.setItem('students', JSON.stringify(this.students));
  }
}
