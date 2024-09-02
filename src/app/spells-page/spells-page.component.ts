import { Component, OnInit } from '@angular/core';
import { Spell } from './spell';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import { HttpClient } from '@angular/common/http';
import { CardContainerComponent } from '../shared/card-container/card-container.component';
import { SearchBarSpellComponent } from '../shared/search-bar/search-bar.component';
import { SearchService } from '../shared/services/search/search.service';

@Component({
  selector: 'fiveE-archive-spells-page',
  standalone: true,
  imports: [CommonModule, SpellCardComponent, CardContainerComponent, SearchBarSpellComponent],
  providers:[HttpClient],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent implements OnInit {
  constructor(private http: HttpClient, private search: SearchService){}
  public spells: Spell[] = []
  private debounce: any = null;

  ngOnInit(){
    this.http.get('assets/spells.json', {responseType: 'json'})
        .subscribe(data => {
          this.search.setData(data);
          this.setShownSpells(data as Spell[]);
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
