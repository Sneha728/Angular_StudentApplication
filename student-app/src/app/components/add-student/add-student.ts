import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student-service';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css',
})
export class AddStudent implements OnInit {
   studentForm!: FormGroup;
  classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9'];
  subjects = ['Mathematics', 'Science', 'Social Studies', 'English', 'Computer'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      class: ['', Validators.required],
      gender: ['', Validators.required],
      hasHobby: [false],
      hobby: [''],
      favouriteSubject: ['']
    });

    
    this.studentForm.get('hasHobby')!.valueChanges.subscribe((has: boolean) => {
      const hobby = this.studentForm.get('hobby');
      if (has) {
        hobby!.setValidators([Validators.required, Validators.minLength(2)]);
        hobby!.enable();
      } else {
        hobby!.clearValidators();
        hobby!.setValue('');
        hobby!.disable();
      }
      hobby!.updateValueAndValidity();
    });

   
    if (!this.studentForm.get('hasHobby')!.value) {
      this.studentForm.get('hobby')!.disable();
    }
  }

  get name() { return this.studentForm.get('name'); }
  get classControl() { return this.studentForm.get('class'); }
  get gender() { return this.studentForm.get('gender'); }
  get hasHobby() { return this.studentForm.get('hasHobby'); }
  get hobby() { return this.studentForm.get('hobby'); }

  onSave() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const value = this.studentForm.value;

    const newStudent: Student = {
      id: 0, 
      name: value.name,
      class: value.class,
      gender: value.gender,
      hasHobby: value.hasHobby,
      hobby: value.hasHobby ? value.hobby : null,
      favouriteSubject: value.favouriteSubject || null
    };

    this.studentService.addStudent(newStudent);
    this.router.navigate(['/']);
  }

}
