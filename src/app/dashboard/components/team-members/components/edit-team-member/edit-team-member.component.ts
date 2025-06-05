import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TeamMember} from '../../models/team-member.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ModalComponent} from '../../../../../shared/components/modal/modal.component';
import {TeamMembersService} from '../../services/team-members.service';

@Component({
  selector: 'app-edit-team-member',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './edit-team-member.component.html',
  styleUrl: './edit-team-member.component.scss'
})
export class EditTeamMemberComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() member!: TeamMember | null;
  @Output() close = new EventEmitter<void>();
  loading = false;
  successMessage = '';
  errorMessage = '';

  editForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private teamMemberService: TeamMembersService) {
  }

  ngOnInit(): void {
    this.initializeEditForm();
  }

  initializeEditForm = () => {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: [{value: '', disabled: true}],
      role: ['', Validators.required],
      status: ['Active', Validators.required],
      teams: ['']
    });
  }

  ngOnChanges() {
    if (this.member && this.editForm) {
      this.editForm.patchValue({
        name: this.member.name,
        email: this.member.email,
        role: this.member.role,
        status: this.member.status,
        teams: (this.member.teams || []).join(', ')
      });
    }
  }

  saveChanges = () => {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.editForm.getRawValue();
    if (this.member) {
      const updatedMember: TeamMember = {
        ...this.member,
        name: formValue.name,
        role: formValue.role,
        status: formValue.status,
        teams: formValue.teams.split(',').map((t: string) => t.trim()),
        avatarUrl: this.member.avatarUrl,
        additionalTeams: this.member.additionalTeams,
        statusColor: this.member.statusColor
      };
      setTimeout(() => {
        try {
          this.teamMemberService.updateMember(updatedMember);
          this.loading = false;
          this.successMessage = 'Member details updated successfully!';
          setTimeout(() => {
            this.successMessage = '';
            this.loading = false;
            this.close.emit()
          },1500
          );
        } catch (err) {
          this.loading = false;
          this.errorMessage = 'Something went wrong while saving.';
        }
      }, 1500);
    }
  }

  closeModal = () => {
    this.close.emit();
  }

}
