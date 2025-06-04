import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { StatCard } from './shared/stats-card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$1,200,000',
      subtext: 'Compared to last year',
      trend: '+18%',
      trendDirection: 'up',
    },
    {
      title: 'Active Users',
      value: '2500',
      subtext: 'Compared to last month',
      trend: '+5%',
      trendDirection: 'up',
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      subtext: 'Compared to last month',
      trend: '+0.3%',
      trendDirection: 'up',
    },
    {
      title: 'New Signups',
      value: '8200',
      subtext: 'Compared to last month',
      trend: '-5.3%',
      trendDirection: 'down',
    },
  ];
}
