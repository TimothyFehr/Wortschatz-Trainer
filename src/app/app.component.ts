import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordlistComponent } from './features/wordlist/wordlist.component';
import { TabsComponent } from './features/tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordlistComponent, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'wortschatz-trainer';
}
