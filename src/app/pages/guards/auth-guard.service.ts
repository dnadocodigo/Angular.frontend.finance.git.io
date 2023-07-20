import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable(
  {
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree
      {
        return new Promise(resolve =>
          this.authService.checkToken().then((x) =>
          {
            this.authService.isUserAuthehticated().then( status =>{
            let redirect: string = state.root.queryParams['redirect'];
            let blnUnAuthorize = false;

            // validaation
            if(status === false)
              blnUnAuthorize = true;

            // redirect
            if(blnUnAuthorize && redirect != null && redirect.length > 0)
              this.router.navigate(["login",{redirect}]);
            else if(blnUnAuthorize)
              this.router.navigate(["login"]);

            resolve(status);
          })
          .catch(() =>
          {
            this.router.navigate(["login"]);
            resolve(false);
          })
      }))
    }
  }
