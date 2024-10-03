import { Component, OnInit } from '@angular/core';
import { Spell } from './spell';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import { CardContainerComponent } from '../../../shared/card-container/card-container.component';
import { SearchBarSpellComponent } from '../../../shared/search-bar/search-bar.component';
import { SearchService } from '../../../shared/services/search/search.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DataService } from '../../../shared/services/data/data.service';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'fiveE-archive-spells-page',
  standalone: true,
  imports: [CommonModule, SpellCardComponent, CardContainerComponent, SearchBarSpellComponent, MatProgressBar, MatButton, MatTooltip],
  providers:[DataService],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public cards: Spell[] = []
  private debounce: any = null;
  public limitCount: number = 20;
  public totalItems: number = 0;
  public loading: boolean = true;
  private filter: any;

  ngOnInit(){
    this.data.getSpells()
        .subscribe(data => this.initCards(data));
  }

  initCards(data: Spell[]){
    this.search.setData(data);
    this.setShownCards(data);

    setTimeout(() => this.loading = false, 500);
  }

  setShownCards(_data_: Spell[]){
    this.cards = _data_.slice(0, this.limitCount);
  }

  addMore(amountToAdd: number | null = null){
    const myData: Spell[] = this.search.getSearchResults(this.filter) as Spell[];

    this.limitCount = amountToAdd  == null ?  myData.length : this.limitCount + amountToAdd;
        
    myData.slice(0, this.limitCount).forEach(spell => {
      if(this.cards.find(card => card.name == spell.name) == undefined){
        this.cards.push(spell)
      }
    })
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
      this.filter = event;
      this.setShownCards(this.search.getSearchResults(event) as Spell[]);
    }
}
