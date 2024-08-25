import { Component, OnInit } from '@angular/core';
import { Spell } from './spell';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from './components/spell-card/spell-card.component';
import data from '../../data/spells.json'

@Component({
  selector: 'fiveE-archive-spells-page',
  standalone: true,
  imports: [CommonModule, SpellCardComponent],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent implements OnInit {
  public spells: Spell[]

  ngOnInit(){
     this.setShownSpells(data);
  }

  setShownSpells(_data_: Spell[]){
    this.spells = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    if(searchTerm == ''){
      this.setShownSpells(data);
    } else {
      const newSpells = data.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownSpells(newSpells);
    }
  }
}
