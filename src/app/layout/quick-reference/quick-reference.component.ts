import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpellsPageComponent } from '../../spells-page/spells-page.component';
import { EquipsPageComponent } from '../../equipment-page/equip-page.component';
import { MagicItemsPageComponent } from '../../magic-items-page/magic-items-page.component';
import { FeatsPageComponent } from '../../feats-page/feat-page.component';
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
    console.log(event.tab.textLabel);

    this.wasLoaded[event.tab.textLabel] = true;
    console.log(this.wasLoaded);
  }
}
