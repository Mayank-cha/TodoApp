import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../Model/TaskModel.model';
@Injectable({
  providedIn: 'root',
})
export class restService {
    private endPoint:string;
    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string){
        this.endPoint=baseUrl+"api/Task/"
    }
    getTasksById(id:number):Observable<TaskModel>{
        return this.http.get<TaskModel>(this.endPoint+id.toString());
    }
    getTasksByUser():Observable<TaskModel[]>{
        return this.http.get<TaskModel[]>(this.endPoint+"list");
    }
    updateTask(task:TaskModel):Observable<TaskModel>{
        return this.http.post<TaskModel>(this.endPoint+"update",task);
    }
    deleteTask(id:number):Observable<boolean>{
        return this.http.get<boolean>(this.endPoint+"delete/"+id.toString());
    }
    createTask(task:TaskModel){
        return this.http.post<boolean>(this.endPoint+"add",task);
    }
}
