import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip'
import { Router, RouterLink } from '@angular/router';

interface SideNavButton {
  tooltip: string, icon: string, url: string
}

@Component({
  selector: 'fiveE-archive-sidenav',
  standalone: true,
  imports: [MatIcon, MatTooltip, CommonModule,RouterLink, NgFor],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  constructor(private router: Router){}

  public buttons : SideNavButton[] = [{
    tooltip:"Landing Page",
    url:"/landing",
    icon:"home"
  },{
    tooltip:"Spells, Equipment, Feats and Magic Items",
    url:"/quick-reference",
    icon:"manage_search"
  }]

  getClass(button: SideNavButton){
    return {"nav-button":true, "selected": this.router.url == button.url};
  }
}
