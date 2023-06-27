import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExpenseComponent } from "./expense.component";
import { ExpenseRoutingModule } from "./expense-routing.module";
import { NavebarModule } from "src/app/components/navbar/navbar.module";
import { SidebarModule } from "src/app/components/sidebar/sidebar.module";

@NgModule({
  providers:[],
  declarations:[ExpenseComponent],
  imports:[
    CommonModule,
    ExpenseRoutingModule,
    NavebarModule,
    SidebarModule,
  ]
})
export class ExpenseModule{}
