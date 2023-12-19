import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-dialog-component.component.html',
  styleUrl: './modal-dialog-component.component.scss'
})
export class ModalDialogComponentComponent {
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>;

  public closeModalDialog() {
    this.isConfirmed.emit(false)
  }
}
