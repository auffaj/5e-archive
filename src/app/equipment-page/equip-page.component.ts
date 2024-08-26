import { Component, OnInit } from '@angular/core';
import { Equip } from './equip';
import { CommonModule } from '@angular/common';
import { EquipCardComponent } from './components/equip-card/equip-card.component';
import data from '../../assets/equipment.json'

@Component({
  selector: 'fiveE-archive-equips-page',
  standalone: true,
  imports: [CommonModule, EquipCardComponent],
  templateUrl: './equip-page.component.html',
  styleUrl: './equip-page.component.scss'
})
export class EquipsPageComponent implements OnInit {
  public equips: Equip[]

  ngOnInit(){
     this.setShownEquips(data);
  }

  setShownEquips(_data_: Equip[]){
    this.equips = JSON.parse(JSON.stringify(_data_));
  }

  filterSearched(event: Event){

    const searchTerm: string = (event.target as HTMLInputElement).value.toLowerCase();

    if(searchTerm == ''){
      this.setShownEquips(data);
    } else {
      const newEquips = data.filter(row => row.name.toLowerCase().indexOf(searchTerm) >= 0)
      this.setShownEquips(newEquips);
    }
  }
}
