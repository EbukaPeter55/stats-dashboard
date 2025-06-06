import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {TeamMembersService} from './services/team-members.service';
import {Subject, takeUntil} from 'rxjs';
import {TeamMember} from './models/team-member.model';
import {EditTeamMemberComponent} from './components/edit-team-member/edit-team-member.component';
import {DeleteTeamMemberComponent} from './components/delete-team-member/delete-team-member.component';
import {ViewTeamMemberComponent} from './components/view-team-member/view-team-member.component';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, EditTeamMemberComponent, DeleteTeamMemberComponent, ViewTeamMemberComponent, HeaderComponent],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss'
})

export class TeamMembersComponent implements OnInit, OnDestroy {
  members: TeamMember[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = Math.ceil(this.members.length / this.itemsPerPage);
  pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  isAddModalOpen = false;
  addMemberForm!: FormGroup;
  paginatedMembers: any[] = [];
  editModalOpen = false;
  selectedMember: TeamMember | null = null;
  deleteModalOpen = false;
  memberToDelete: TeamMember | null = null;
  detailsModalOpen = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private teamMemberService: TeamMembersService) {
  }

  ngOnInit() {
    this.initAddMemberForm();
    this.getMembers();
  }

  getMembers = () => {
    this.teamMemberService.members$.pipe(takeUntil(this.destroy$)).subscribe(members => {
      this.members = members;
      this.calculatePagination();
      this.updatePaginatedMembers();
    });
  }

  /**
   * Initialize the add member form
   */
  initAddMemberForm = () => {
    this.addMemberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      status: ['Active'],
      teams: ['']
    });
  }

  openAddMemberModal = () => {
    this.isAddModalOpen = true;
  }

  openDeleteConfirm = (member: TeamMember) => {
    this.memberToDelete = member;
    this.deleteModalOpen = true;
  }

  openDetails = (member: TeamMember) => {
    this.selectedMember = member;
    this.detailsModalOpen = true;
  }

  closeDetailsModal = () => {
    this.detailsModalOpen = false;
    this.selectedMember = null;
  }


  closeDeleteModal = () => {
    this.deleteModalOpen = false;
    this.memberToDelete = null;
  }

  confirmDelete = () => {
    if (this.memberToDelete) {
      this.teamMemberService.deleteMember(this.memberToDelete.email);
      this.closeDeleteModal();
    }
  }

  closeAddMemberModal = () => {
    this.isAddModalOpen = false;
    this.addMemberForm.reset({status: 'Active'});
  }

  addMember = () => {
    if (this.addMemberForm.invalid) {
      this.addMemberForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.addMemberForm.value;
    const teamsArray = formValue.teams ? formValue.teams.split(',').map((t: string) => t.trim()) : [];

    const newMember = {
      name: formValue.name,
      email: formValue.email,
      role: formValue.role,
      status: formValue.status,
      statusColor: 'bg-green-500',
      teams: teamsArray,
      additionalTeams: [],
      avatarUrl:
        'https://placehold.co/40x40/E2E8F0/718096?text=' +
        formValue.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
    };

    setTimeout(() => {
      try {
        this.teamMemberService.addMember(newMember);
        this.loading = false;
        this.successMessage = 'Member added successfully!';
        setTimeout(() => {
            this.successMessage = '';
            this.loading = false;
            this.closeAddMemberModal();
          }, 1500
        );
      } catch (err) {
        this.loading = false;
        this.errorMessage = 'Something went wrong while saving.';
      }
    }, 1500)

  }

  calculatePagination = () => {
    this.totalPages = Math.ceil(this.members.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    this.updatePaginatedMembers();
  }

  updatePaginatedMembers = () => {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMembers = this.members.slice(startIndex, endIndex);
  }

  goToPage = (page: number) => {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedMembers();
    }
  }

  previousPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedMembers();
    }
  }

  nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedMembers();
    }
  }

  openEditModal = (member: any) => {
    this.selectedMember = member;
    this.editModalOpen = true;
  }

  closeEditModal = () => {
    this.editModalOpen = false;
    this.selectedMember = null;
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
