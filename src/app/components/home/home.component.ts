import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Expenses } from '../../shared/expenses';
import { ExpenseService } from '../../services/expense/expense.service';
import { CreateExpenseComponent } from '../create-expense/create-expense.component';
import { BaseURL } from 'src/app/shared/baseurl';
import { LoginUser } from '../../shared/loginuser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  expenses: Expenses[];
  searchresult:any;
  displayedColumns: string[] = ['name', 'total', 'date', 'image', 'edit','delete'];
  errmsg: string;
  dataSource : any;
  currentUserSubject: BehaviorSubject<LoginUser>;
  currentUser: Observable<LoginUser>; 
  show:boolean=false;

  filterlist: Object[] = [
    { "name": "Image Availability", "isselected": true },
    { "name": "Date Availability", "isselected": true },
    { "name": "Name Availability", "isselected": true },
    { "name": "Cost Availability", "isselected": true }
  ]

  constructor(private expense: ExpenseService,  private router: Router,public dialog: MatDialog, private fb: FormBuilder) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable(); 
    if(this.currentUserSubject.value==null)
    {
      this.reload();
    }
  }


  ngOnInit() {
    this.getallexpense();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getallexpense() {
    this.expense.getallexpense().subscribe((e) => { this.expenses = e.results;this.refresh(); console.log(this.expenses); }, (error) => { this.errmsg = error; console.log(this.errmsg); })
  }

  reload(){
    this.router.navigate(['/login-signup']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.reload();
  }

  createnewexpense() {
    const dialogref = this.dialog.open(CreateExpenseComponent, { data: { "type": 1 } });
    dialogref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.image="https://shwetabh.pythonanywhere.com/"+result.image;
      this.expenses.push(result);
      this.refresh()
      console.log(this.expenses);
    });
  }

  refresh() {
      this.dataSource = new MatTableDataSource<Expenses>(this.expenses);   
  }

  updateexpense(exp,i) {
    const dialogref = this.dialog.open(CreateExpenseComponent, { data: { "type": 2, "exp": exp} });
    dialogref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.expenses[i]=result;
      this.expenses[i].image="https://shwetabh.pythonanywhere.com/"+this.expenses[i].image;
      this.refresh();
      console.log(this.expenses);
    });
  }

 

  sort(id) {
    this.expense.sort(id).subscribe((e) => { this.expenses = e, console.log(this.expenses),this.refresh(); }, (error) => console.log(error));
  }

  delete(id,i) {
    this.expense.deleteexpense(id).subscribe((e) => { if(e.Deleted==true){ 
      this.expenses.splice(i,1);
      console.log("deleted",this.expenses);
      this.refresh();} }, 
      (error) => console.log(error));
  }

  sort_reverse(id) {
    this.expense.sort(id).subscribe((e) => { this.expenses = e, this.expenses = this.expenses.reverse(), console.log(this.expenses) ,this.refresh();}, (error) => console.log(error));
  }

  listfilter() {
    this.expense.listfilter().subscribe((e) => { this.expenses = e, console.log(this.expenses);this.refresh(); }, (error) => console.log(error));
  }



}

