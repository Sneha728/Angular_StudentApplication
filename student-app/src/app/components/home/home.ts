import { Component ,OnInit} from '@angular/core';
import { StudentService } from '../../services/student-service';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  students : Student[] = [];
  constructor(private studentService: StudentService) {}
  ngOnInit() {
    this.students = this.studentService.getAllStudents();
  }

}
