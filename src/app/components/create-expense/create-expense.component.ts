import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  type: number;
  returndata:any=null;
  newexpense: any;
  selectedFile: File;
  public files: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialogRef: MatDialogRef<CreateExpenseComponent>, private _formBuilder: FormBuilder, private exp: ExpenseService) {
    this.type = this.data.type;
    this.dialogRef.beforeClosed().subscribe(() => {
      this.dismiss(this.returndata);
    })
  }

  ngOnInit() {
    this.initform();
  }

  initform() {
    if (this.type == 2) {
      this.newexpense = this._formBuilder.group({
        "name": [this.data.exp.name, Validators.required],
        "date": [this.data.exp.date, Validators.required],
        "total": [this.data.exp.total, [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]]
      });
    }
    else {
      this.newexpense = this._formBuilder.group({
        "name": ['', Validators.required],
        "date": ['', Validators.required],
        "total": ['', [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]]
      });
    }
  }

  submit() {
    var f = new FormData();
    f.append('name', this.newexpense.value.name);
    f.append('date', this.newexpense.value.date);
    f.append('total', this.newexpense.value.total);
    if (this.selectedFile) {
      f.append('image', this.selectedFile, this.selectedFile.name);
    }
    console.log(f.get('name'), f.get('date'), f.get('total'), f.get('image'));
    if (this.type == 2) {
      this.exp.updateexpense(this.data.exp.id, f).subscribe(
        (data) => { this.returndata=data; console.log('Server Sent:', data) ;this.dismiss(data);  },
        (error) => { console.log(error); }
      );
    }
    else {
      this.exp.newexpense(f).subscribe(
        (data) => {this.returndata=data; console.log('Server Sent:', data);this.dismiss(data); },
        (error) => { console.log(error); }
      );
    }
  }

  dismiss(data) {
    console.log("dismiss",data);
    this.dialogRef.close(data);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

}
