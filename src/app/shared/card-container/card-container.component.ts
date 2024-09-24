import {Component, Input, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'fiveE-archive-card-container',
  templateUrl: './card-container.component.html',
  styleUrl: './card-container.component.scss',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule,MatIconModule,NgIf, MatTooltipModule]
})
export class CardContainerComponent implements OnInit{
  @Input() description: string[] | string | null = null;
  @Input() tags: string[] | string | null = null;
  @Input() sourcebook: string | null = null;
  @Input() classes: string[] | null = null;

  public currentSubject: string | null = 'description';
  public title: string | null = null;
  public drawerContent!: {title: string | null, body: string | null};

  ngOnInit(): void {
      this.drawerContent = this.getDrawerContent();
  }

  openDrawer(drawer: MatDrawer, subject: string): undefined{
    if(this.currentSubject == subject){
      return;
    }
    else if(this.currentSubject != subject){
      this.currentSubject = subject;
    }

    this.drawerContent = this.getDrawerContent();
  }

  getDrawerContent(): {title: string | null, body: string | null}{
    switch(this.currentSubject){
      case("description"): 
        let _description_ = "";

        if(typeof(this.description) == "string"){
          _description_ = this.description as string;
        } else if(this.description != null){
          _description_ = this.description.join("\n\n")
        }
                             
        return {title: "Description", body: _description_};
      case("tags"): 
        return {title: "Tags", body: this.tags == null ? "" : this.tags.toString().replace("Tags:","").trim()};
      case("sourcebook"):
        return {title: "Source Book", body: this.sourcebook == null ? "" : this.sourcebook};
      case("classes"):
        return {title: "Classes", body: this.classes == null ? "" : this.classes.join(", ")}
      default: 
        return {title: null, body: null};
    }
  }
}