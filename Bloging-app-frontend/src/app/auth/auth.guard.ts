import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { DataStorageService } from "../shared/data-handler.service";
import { BehaviorSubject } from "rxjs";

  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: DataStorageService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        var isAuthenticated = this.authService.isAuthenticated.value;
        if (!isAuthenticated) {
            this.router.navigate(['/auth']);
        }
        return isAuthenticated;
    }
}