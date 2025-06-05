import {Component} from '@angular/core';
import {ChartType, ChartData, Chart, DoughnutController, ArcElement, Tooltip, Legend} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-revenue-contribution',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './revenue-contribution.component.html',
  styleUrl: './revenue-contribution.component.scss'
})
export class RevenueContributionComponent {
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [450, 300, 225, 200],
        backgroundColor: ['#DCEBFE', '#1E3B8A', '#61A6FA', '#91C3FD'],
        borderWidth: 0
      }
    ]
  };
}
