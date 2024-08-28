import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpellsPageComponent } from './spells-page/spells-page.component';
import { EquipsPageComponent } from "./equipment-page/equip-page.component";
import { MagicItemsPageComponent } from './magic-items-page/magic-items-page.component';
import { MatExpansionModule } from "@angular/material/expansion"
import { FeatsPageComponent } from './feats-page/feat-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            CommonModule,
            MatExpansionModule,
            
            SpellsPageComponent,
            MagicItemsPageComponent,
            EquipsPageComponent,
            FeatsPageComponent
            ],
  providers:[CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '5e Archive, thank you D&D B!';
}
