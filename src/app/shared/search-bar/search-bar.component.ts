import { Component, Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MagicItem } from '../../magic-items-page/magic-item';
import { Feat } from '../../feats-page/feat';
import { Equip } from '../../equipment-page/equip';
import { Spell } from '../../spells-page/spell';
import { NgIf } from '@angular/common';

/**
 * All Generic Functionality for the search bar components.
 * Component level functions should only contain a difference in the config parameter
 */
@Directive()
export abstract class SearchBarComponent {
    public name: string = "";

    public config: any;
  
    @Output() filterSubmitted = new EventEmitter();
  
    submit(){
      this.filterSubmitted.emit(this.config)
    }
  }

@Component({
  selector: 'fiveE-archive-search-bar-magic-item',
  standalone: true,
  imports: [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf],
  templateUrl: './search-bar-magic-item.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarMagicItemComponent extends SearchBarComponent{
  public override config: MagicItem = new MagicItem();
}

@Component({
  selector: 'fiveE-archive-search-bar-equip',
  standalone: true,
  imports: [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf],
  templateUrl: './search-bar-equip.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarEquipComponent extends SearchBarComponent{
  public override config: Equip = new Equip();
}

@Component({
  selector: 'fiveE-archive-search-bar-spell',
  standalone: true,
  imports: [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf],
  templateUrl: './search-bar-spell.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarSpellComponent extends SearchBarComponent{
  public override config: Spell = new Spell();
}


@Component({
  selector: 'fiveE-archive-search-bar-feat',
  standalone: true,
  imports: [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf],
  templateUrl: './search-bar-feat.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarFeatComponent extends SearchBarComponent{
  public override config: Feat = new Feat();
}