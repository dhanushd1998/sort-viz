import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SortingVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [SortingVisualizerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'sort-viz';
}
