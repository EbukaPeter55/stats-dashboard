import { Component } from '@angular/core';
import {
  ChartConfiguration,
  ChartType,
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

/**
 * Registering necessary chart.js components for the bar chart
 */
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-data-growth',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './data-growth.component.html',
  styleUrl: './data-growth.component.scss',
})
export class DataGrowthComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [500, 600, 550, 530, 520, 580, 550, 540, 570, 600, 590, 550],
        label: 'Revenue',
        backgroundColor: '#DCEBFE',
      },
      {
        data: [900, 980, 800, 790, 800, 970, 910, 930, 890, 960, 970, 870],
        label: 'Active Users',
        backgroundColor: '#3479E9',
      },
    ],
  };
  public barChartType: ChartType = 'bar';
}
