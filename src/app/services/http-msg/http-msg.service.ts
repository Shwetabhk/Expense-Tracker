import { Injectable } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpMsgService {
  constructor() { }

  handleError(error: HttpErrorResponse) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      errMsg = "Please Wait While We Are Fixing This For You.";
    } else {
      console.error((error.message) ? error.message :
   error.status ? `${error.status} - ${error.statusText}` : 'Server error');
   console.log(error.error);
      errMsg = "Please Wait While We Are Fixing This For You.";
    }
    return throwError(errMsg);
  };
}
