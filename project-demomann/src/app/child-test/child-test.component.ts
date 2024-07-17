import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-test',
  standalone: true,
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './child-test.component.html',
  styleUrl: './child-test.component.scss'
})
export class ChildTestComponent {
  @Input() parentCallText:any = "";
  @Input() data:any = null;
}
