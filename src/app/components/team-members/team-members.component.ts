import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {TeamMembersService} from './services/team-members.service';
import {Subscription} from 'rxjs';
import {TeamMember} from './models/team-member.model';
import {EditTeamMemberComponent} from './components/edit-team-member/edit-team-member.component';
import {DeleteTeamMemberComponent} from './components/delete-team-member/delete-team-member.component';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, EditTeamMemberComponent, DeleteTeamMemberComponent],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent implements OnInit {

  members: TeamMember[] = [];
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = Math.ceil(this.members.length / this.itemsPerPage);
  pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  isAddModalOpen = false;
  addMemberForm!: FormGroup;
  paginatedMembers: any[] = [];
  editModalOpen = false;
  selectedMember: TeamMember | null = null;
  private membersSub!: Subscription;
  deleteModalOpen = false;
  memberToDelete: TeamMember | null = null;



  constructor(private fb: FormBuilder, private teamMemberService: TeamMembersService) {
  }

  ngOnInit() {
    this.initAddMemberForm();

    this.membersSub = this.teamMemberService.members$.subscribe(members => {
      this.members = members;
      this.calculatePagination();
      this.updatePaginatedMembers();
    });
  }

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

    const formValue = this.addMemberForm.value;
    const teamsArray = formValue.teams ? formValue.teams.split(',').map((t: string) => t.trim()) : [];

    const newMember = {
      name: formValue.name,
      email: formValue.email,
      role: formValue.role,
      status: formValue.status,
      statusColor: 'bg-green-500',
      teams: teamsArray,
      additionalTeams: 0,
      avatarUrl:
        'https://placehold.co/40x40/E2E8F0/718096?text=' +
        formValue.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
    };

    this.teamMemberService.addMember(newMember);
    this.closeAddMemberModal();
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

  goToPage(page: number) {
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

  // Placeholder for filter action
  openFilters() {
    console.log('Filters button clicked');
    // Implement filter logic here
  }

  openEditModal(member: any) {
    console.log('member', member)
    this.selectedMember = member;
    this.editModalOpen = true;
  }

  closeEditModal = () => {
    this.editModalOpen = false;
    this.selectedMember = null;
  }

}
