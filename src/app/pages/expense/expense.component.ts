import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
  constructor(public menuService: MenuService) {
  }
  ngOnInit(){
    this.menuService.menuSelected = 4;
  }
}
