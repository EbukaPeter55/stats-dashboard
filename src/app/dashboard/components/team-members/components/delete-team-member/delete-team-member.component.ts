import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from '../../../../../shared/components/modal/modal.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-delete-team-member',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './delete-team-member.component.html',
  styleUrl: './delete-team-member.component.scss'
})
export class DeleteTeamMemberComponent {
  @Input() isOpen = false;
  @Input() memberName = '';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  confirm() {
    this.confirmDelete.emit();
  }

  closeModal() {
    this.close.emit();
  }

}
