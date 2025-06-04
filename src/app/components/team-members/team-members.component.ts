import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModalComponent} from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent {

  members = [
    {
      name: 'Farouk Muhammed',
      avatarUrl: 'https://placehold.co/40x40/E2E8F0/718096?text=FM', // Placeholder avatar
      status: 'Active',
      statusColor: 'bg-green-500', // Tailwind class for green dot
      role: 'Product Designer',
      email: 'olivia@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      additionalTeams: 4,
    },
    {
      name: 'Saliu Hammed',
      avatarUrl: 'https://placehold.co/40x40/E2E8F0/718096?text=SH', // Placeholder avatar
      status: 'Active',
      statusColor: 'bg-green-500',
      role: 'Product Designer',
      email: 'olivia@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      additionalTeams: 4,
    },
    {
      name: 'Farouk Muhammed', // Example with a different name for variety if needed
      avatarUrl: 'https://placehold.co/40x40/E2E8F0/718096?text=FM2', // Placeholder avatar
      status: 'Active',
      statusColor: 'bg-green-500',
      role: 'Product Designer',
      email: 'olivia@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
      additionalTeams: 4,
    },
    // Add more members as needed to test pagination
  ];
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 3; // Assuming 3 items per page as in the screenshot
  totalPages = Math.ceil(this.members.length / this.itemsPerPage);
  pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  // Modal & form state
  isAddModalOpen = false;
  addMemberForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initAddMemberForm();
  }

  get paginatedMembers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.members.slice(startIndex, endIndex);
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
    const teamsArray = formValue.teams
      ? formValue.teams.split(',').map((t: string) => t.trim())
      : [];
    console.log('form', this.addMemberForm, formValue)
    this.members.push({
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
    });
    console.log('members', this.members)

    this.closeAddMemberModal();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Placeholder for filter action
  openFilters() {
    console.log('Filters button clicked');
    // Implement filter logic here
  }

  // Placeholders for row actions
  editMember(member: any) {
    console.log('Edit member:', member.name);
    // Implement edit logic here
  }

  deleteMember(member: any) {
    console.log('Delete member:', member.name);
    // Implement delete logic here, e.g., remove from this.members and update pagination
    // For a real app, you'd likely call a service to delete the member from the backend
  }

}
