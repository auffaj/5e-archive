import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MagicItem } from '../../magic-items-page/magic-item';
import { Feat } from '../../feats-page/feat';
import { Equip } from '../../equipment-page/equip';
import { Spell } from '../../spells-page/spell';
import { NgIf } from '@angular/common';
import { SearchBarComponent } from './search-bar.class';

@Component({
  selector: 'fiveE-archive-search-bar-magic-item',
  standalone: true,
  imports: [MatInput, MatIcon, MatFormField, MatLabel, FormsModule, NgIf],
  templateUrl: './search-bar-magic-item.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarMagicItemComponent extends SearchBarComponent{
  @Input() config: MagicItem = new MagicItem();
}