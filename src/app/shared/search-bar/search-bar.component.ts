import { Component, Directive, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MagicItem } from '../../quick-reference/pages/magic-items-page/magic-item';
import { Feat } from '../../quick-reference/pages/feats-page/feat';
import { Equip } from '../../quick-reference/pages/equipment-page/equip';
import { Spell } from '../../quick-reference/pages/spells-page/spell';
import { NgIf } from '@angular/common';

const IMPORTS = [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf, MatSuffix]

/**
 * All Generic Functionality for the search bar components.
 * Component level functions should only contain a difference in the config parameter
 */
@Directive()
export abstract class SearchBarComponent {
    public name: string = "";

    public dataConfig: any;
  
    @Output() filterSubmitted = new EventEmitter();

    reset(key:string){ /* set overridden per component, refresh value back to default nothing */ }

    submit(){
      this.filterSubmitted.emit(this.dataConfig)
    }
  }

@Component({
  selector: 'fiveE-archive-search-bar-magic-item',
  standalone: true,
  imports: IMPORTS,
  templateUrl: './search-bar-magic-item.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarMagicItemComponent extends SearchBarComponent{
  public override dataConfig: MagicItem = new MagicItem();

  public override reset(key: string): void {
    switch(key){
      case("name"):
        this.dataConfig.name = '';
        break;

        
    }
    this.submit()
  }
}

@Component({
  selector: 'fiveE-archive-search-bar-equip',
  standalone: true,
  imports: IMPORTS,
  templateUrl: './search-bar-equip.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarEquipComponent extends SearchBarComponent{
  public override dataConfig: Equip = new Equip();

  public override reset(key: string): void {
    switch(key){
      case("name"):
        this.dataConfig.name = '';
        break;
    }
    this.submit()    
      
  }
}

@Component({
  selector: 'fiveE-archive-search-bar-spell',
  standalone: true,
  imports: IMPORTS,
  templateUrl: './search-bar-spell.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarSpellComponent extends SearchBarComponent{
  public override dataConfig: Spell = new Spell();

  public override reset(key: string): void {
      switch(key){
        case("name"):
          this.dataConfig.name = '';
          break;
      }
      this.submit()    
  }
}


@Component({
  selector: 'fiveE-archive-search-bar-feat',
  standalone: true,
  imports: IMPORTS,
  templateUrl: './search-bar-feat.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarFeatComponent extends SearchBarComponent{
  public override dataConfig: Feat = new Feat();

  public override reset(key: string): void {
    switch(key){
      case("name"):
        this.dataConfig.name = '';
        break;
    }

    this.submit()    
  }

  
}