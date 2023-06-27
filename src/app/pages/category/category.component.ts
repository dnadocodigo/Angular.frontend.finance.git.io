import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  constructor(public menuService: MenuService) {
  }
  ngOnInit(){
    this.menuService.menuSelected = 3;
  }
}
