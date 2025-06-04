import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { TeamMembersComponent } from '../components/team-members/team-members.component';
import {DataGrowthComponent} from '../components/data-growth/data-growth.component';
import {RevenueContributionComponent} from '../components/revenue-contribution/revenue-contribution.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, StatsCardComponent, TeamMembersComponent, DataGrowthComponent, RevenueContributionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
