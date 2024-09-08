import { Component, OnInit } from '@angular/core';
import { Spell } from './spell';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchBarSpellComponent } from '../shared/search-bar/search-bar.component';
import { SearchService } from '../shared/services/search/search.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../shared/services/data/data.service';

@Component({
  selector: 'fiveE-archive-spells-page',
  standalone: true,
  imports: [CommonModule, SpellCardComponent, CardContainerComponent, SearchBarSpellComponent, MatProgressBar],
  providers:[DataService],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public spells: Spell[] = []
  private debounce: any = null;

  public loading: boolean = true;

  ngOnInit(){
    this.data.getSpells()
        .subscribe(data => {
          this.search.setData(data);
          this.setShownSpells(data as Spell[]);

          setTimeout(() => this.loading = false, 500);
        });
     
  }

  setShownSpells(_data_: Spell[]){
    this.spells = JSON.parse(JSON.stringify(_data_));
  }

  /**
    Queue search with debounce
  */
    filterSearched(event: Spell){
      if(this.debounce != null){
        clearTimeout(this.debounce);
      }
  
      this.debounce = setTimeout(() => this.doFilterSearch(event), 150);
    }
  
    private doFilterSearch(event: Spell){
      this.debounce = null;
      this.setShownSpells(this.search.getSearchResults(event) as Spell[]);
    }
}
