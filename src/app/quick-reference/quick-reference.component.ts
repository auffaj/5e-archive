import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellsPageComponent } from './pages/spells-page/spells-page.component';
import { EquipsPageComponent } from './pages/equipment-page/equip-page.component';
import { MagicItemsPageComponent } from './pages/magic-items-page/magic-items-page.component';
import { FeatsPageComponent } from './pages/feats-page/feat-page.component';
import { MatTab, MatTabChangeEvent, MatTabContent, MatTabGroup } from '@angular/material/tabs';
import { NgScrollbarModule} from 'ngx-scrollbar';

@Component({
  selector: 'fiveE-archive-quick-reference',
  standalone: true,
  imports: [CommonModule,
    MatTab,
            MatTabGroup,
            MatTabContent,
            NgScrollbarModule,
            
            SpellsPageComponent,
            MagicItemsPageComponent,
            EquipsPageComponent,
            FeatsPageComponent,
  ],
  templateUrl: './quick-reference.component.html',
  styleUrl: './quick-reference.component.scss'
})
export class QuickReferenceComponent {
  public wasLoaded: any = {
    "Spells": false,
    "Equipment": false,
    "Feats": false,
    "Magic Items": false
  }

  pageLoaded(event: MatTabChangeEvent){
    this.wasLoaded[event.tab.textLabel] = true;
  }
}
