import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDialogComponentComponent
} from "../../shared/components/modal-dialog-component/modal-dialog-component.component";

@Component({
  selector: 'list-players',
  standalone: true,
  imports: [CommonModule, ModalDialogComponentComponent],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss'
})
export class ListPlayersComponent {
  @Input() isConfirmed: boolean = false;
  public isModalDialogVisible: boolean = false;

  public showModalDialog() {
    this.isModalDialogVisible = true;
}

  public closeModalDialog() {
    this.isModalDialogVisible = false;
  }

}
