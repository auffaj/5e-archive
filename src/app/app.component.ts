import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpellsPageComponent } from './spells-page/spells-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SpellsPageComponent, CommonModule],
  providers:[CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '5e Archive, thank you D&D B!';
}
