import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { TaskModel } from '../../Model/TaskModel.model';
import { restService } from '../../Services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // public obs_all: Observable<any>;
  // public obs_list
  // public selector: number;
  // public change: boolean;
  // public allList:TaskModel[]
  public search:string;
  constructor(
    private _routeManager: Router,
    private _authManager: AuthorizeService,
    private _rest: restService
  ) {
    this.search="";
  }
  initAll(data:TaskModel[]){
    
  }


  ngOnInit() {
    this._authManager.isAuthenticated().subscribe((result) => {
      if (result == false) {
        this._routeManager.navigate([ApplicationPaths.Login]);
      }
    });
    this._rest.getTasksByUser().subscribe({
      next: (array) => {
        this.initAll(array);
        console.log(array);
      },
      error: (err) => {
        this.initAll([]);
        console.log("error message"+err);
      }
    });
    
  }
  filter(term:string) {
    
  }
  currentSelection() {}
}
