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
import { NgScrollbarModule } from 'ngx-scrollbar';

const IMPORTS = [CommonModule,
                 SpellCardComponent,
                 CardContainerComponent,
                 SearchBarSpellComponent,
                 MatProgressBar,
                 MatButton,
                 MatTooltip,
                 NgScrollbarModule]

@Component({
  selector: 'fiveE-archive-spells-page',
  standalone: true,
  imports: IMPORTS,
  providers:[DataService],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent implements OnInit {
  constructor(private search: SearchService, private data: DataService){}
  public cards: Spell[] = []
  public loading: boolean = true;
  public totalItems: number = 0;
  public addMoreCount: number = 25;
  public limitCount: number = 25;
  private debounce: any = null;
  private filter: any = null;

  ngOnInit(){
    this.data.getSpells()
        .subscribe(data => this.initCards(data));
  }

  initCards(_data_: Spell[]){
    this.search.setData(_data_);
    this.setShownCards(_data_);
    this.totalItems = _data_.length;
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
