import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../services/auth.service";
import { catchError, finalize, map, throwError, zip } from "rxjs";


@Injectable()

export class HttpStatus
{
  private requestInFlight$: BehaviorSubject<boolean>

  constructor() {
    this.requestInFlight$ = new BehaviorSubject<boolean>(false);
  }
  setHttpStatus(inFlight: boolean){
    this.requestInFlight$.next(inFlight)
  }
  getHttpStatus(): Observable<boolean>{
    return this.requestInFlight$.asObservable();
  }
}


@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
  private _requests = 0;

constructor( private  spinner: NgxSpinnerService, private status: HttpStatus, private authService: AuthService, private route: Router)
{}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    ++this._requests;
    let headers;
    if(req.url.includes('api.ipify.org')){
      headers: new HttpHeaders({
        contetType: "false",
        processDate:"false",
      });
    }
    else if(req.body instanceof FormData)
    {
      Headers: new HttpHeaders({
        contentType: "false",
        processDate: "false",
        Athorization: 'Beares'+ this.authService.getToken
      });
      }
      else
      {
        headers= new HttpHeaders()
          .append("accept", "application/json")
          .append("Content-Type", "application/Json")
        .append("Authorization", "Bearer" + this.authService.getToken)
      }
      let request = req.clone({headers});
      this.status.setHttpStatus(true);
      this.spinner.show();

      return next.handle(request).pipe(
        map((event)=>{
          return event;
        }),
        catchError((error: Response) =>{
          if(error.status === 401){
            this.route.navigate(["/ROTA-A-DEFINIR- 401 Unauthorized"]);
          }
          return throwError(error)
        }),
        finalize(()=>{
          --this._requests;
          this.status.setHttpStatus(this._requests > 0);
          this.status.getHttpStatus().subscribe((status: boolean) =>{
            if(!status)
            this.spinner.hide();
          });
        })
      );
    }
}



