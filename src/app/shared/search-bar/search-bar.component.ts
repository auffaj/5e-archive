import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MagicItem } from '../../magic-items-page/magic-item';
import { Feat } from '../../feats-page/feat';
import { Equip } from '../../equipment-page/equip';
import { Spell } from '../../spells-page/spell';
import { NgIf } from '@angular/common';

@Component({
  selector: 'fiveE-archive-search-bar',
  standalone: true,
  imports: [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit{
 @Input() config: MagicItem | Feat | Equip | Spell;
  public name: string = "";

  @Output() filterSubmitted = new EventEmitter();

  ngOnInit(): void {
      console.log(typeof(this.config), JSON.stringify(this.config) == JSON.stringify(new MagicItem()));   
  }

  submit(event: Event){
    this.filterSubmitted.emit(event)
  }
}
