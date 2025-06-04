import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() subtext = '';
  @Input() trend = '';
  @Input() trendDirection!: 'up' | 'down' | undefined;
}
