import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TeamMember} from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersService {
  members$;
  private readonly storageKey = 'team-members';
  private membersSubject: BehaviorSubject<any[]>;

  constructor() {
    const initialMembers = this.loadMembers();
    this.membersSubject = new BehaviorSubject<any[]>(initialMembers);
    this.members$ = this.membersSubject.asObservable();
  }

  addMember(member: any) {
    const updatedMembers = [...this.membersSubject.value, member];
    this.membersSubject.next(updatedMembers);
    this.saveMembers(updatedMembers);
  }

  updateMember = (updatedMember: TeamMember) => {
    const current = this.membersSubject.getValue();
    const updated = current.map(member =>
      member.email === updatedMember.email ? updatedMember : member
    );
    this.membersSubject.next(updated);
    this.saveMembers(updated);
  }

  deleteMember(email: string) {
    const updatedMembers = this.membersSubject.value.filter(m => m.email !== email);;
    this.membersSubject.next(updatedMembers);
    this.saveMembers(updatedMembers);
  }

  private loadMembers = () => {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveMembers(members: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(members));
  }

}
