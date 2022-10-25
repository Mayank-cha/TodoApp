import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { TaskModel } from '../Model/TaskModel.model';
import { restService } from '../Services/rest.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['Task Title', 'Operations'];
  displayedColumns_all: string[] = ['Task Title', 'Status'];
  public dataSource: MatTableDataSource<TaskModel>[] = [];
  public selector: number = 0;
  public search: string;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _routeManager: Router,
    private _authManager: AuthorizeService,
    private _rest: restService
  ) {
    this.search = '';
  }
  ngOnInit(): void {
    this.fetchData();
  }
  initAll(data: TaskModel[]) {
    this.dataSource=[];
    this.dataSource.push(new MatTableDataSource(data));
    this.dataSource.push(
      new MatTableDataSource(
        data.filter((d: any) => {
          return d.status === 0;
        })
      )
    );
    this.dataSource.push(
      new MatTableDataSource(
        data.filter((d: any) => {
          return d.status === 1;
        })
      )
    );
    for (let i = 0; i < 3; i++) {
      this.dataSource[i].paginator = this.paginator.toArray()[i];
      this.dataSource[i].sort=this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].filter = filterValue.trim().toLowerCase();
    }
  }
  currentSelection(select: number) {
    this.selector = select;
  }
  add() {
    this._routeManager.navigate(['add']);
  }
  clear() {
    this.search = '';
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].filter = '';
    }
  }
  ngAfterViewInit() {
    this._authManager.isAuthenticated().subscribe((result) => {
      if (result == false) {
        this._routeManager.navigate([ApplicationPaths.Login]);
      }
    });
    this.fetchData();
    
  }
  delete(id :number){
    this._rest.deleteTask(id).subscribe((bool)=>{
      if(bool){
        alert("Task Deleted!");
        this.fetchData();
      }
    });
  }
  complete(task:any){
    task.status=1;
    this._rest.updateTask(task).subscribe((bool)=>{
      if(bool){
        alert("Task Completed!");
        this.fetchData();
      }
    });
  }
  fetchData(){
    this._rest.getTasksByUser().subscribe({
      next: (array) => {
        this.initAll(array);
        console.log(array);
      },
      error: (err) => {
        this.initAll([]);
        console.log('error message' + err);
      },
    });
  }
}
