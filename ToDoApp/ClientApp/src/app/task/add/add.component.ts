import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { TaskModel } from '../../Model/TaskModel.model';
import { restService } from '../../Services/rest.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  public task: TaskModel;
  constructor(
    private _routeManager: Router,
    private _authManager: AuthorizeService,
    private _rest: restService
  ) {
    this.task = new TaskModel();
  }
  ngOnInit() {
    this._authManager.isAuthenticated().subscribe((result) => {
      if (result == false) {
        this._routeManager.navigate([ApplicationPaths.Login]);
      }
    });
  }
  performAdd() {
    console.log(this.task);
    this.task.Id = 0;
    this.task.Status = 0;
    this._rest.createTask(this.task).subscribe((data) => {
      if (data) {
        alert('Task Added !');
        this._routeManager.navigate(['']);
      } else {
        alert('Error occured at server!');
      }
    });
  }
  cancel() {
    this._routeManager.navigate(['']);
  }
}
