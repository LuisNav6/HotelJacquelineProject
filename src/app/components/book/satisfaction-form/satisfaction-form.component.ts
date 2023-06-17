import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-satisfaction-form',
  templateUrl: './satisfaction-form.component.html',
  styleUrls: ['./satisfaction-form.component.scss']
})
export class SatisfactionFormComponent{

  rating: number = 0;
  comment: string = '';
  @Output() submitForm = new EventEmitter<{ rating: number, comment: string }>();
  @Input() placeholder: string = 'Enter your comment';
  
  onSubmit() {
    this.submitForm.emit({ rating: this.rating, comment: this.comment });
    this.rating = 0;
    this.comment = '';
  }
}
