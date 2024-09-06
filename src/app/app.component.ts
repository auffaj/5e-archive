import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpellsPageComponent } from './spells-page/spells-page.component';
import { EquipsPageComponent } from "./equipment-page/equip-page.component";
import { MagicItemsPageComponent } from './magic-items-page/magic-items-page.component';
import { FeatsPageComponent } from './feats-page/feat-page.component';
import { MatTab, MatTabChangeEvent, MatTabContent, MatTabGroup } from '@angular/material/tabs';
import { NgScrollbarModule} from 'ngx-scrollbar'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            CommonModule,
            MatTab,
            MatTabGroup,
            MatTabContent,
            NgScrollbarModule,
            
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
