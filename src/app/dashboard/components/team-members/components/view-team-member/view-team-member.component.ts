import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from '../../../../../shared/components/modal/modal.component';
import {CommonModule} from '@angular/common';
import {TeamMember} from '../../models/team-member.model';

@Component({
  selector: 'app-view-team-member',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './view-team-member.component.html',
  styleUrl: './view-team-member.component.scss'
})
export class ViewTeamMemberComponent {
  @Input() isOpen = false;
  @Input() member!: TeamMember | null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
