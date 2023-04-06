import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    isAuthenticated = new BehaviorSubject<Boolean>(false)
    canComment = new BehaviorSubject<Boolean>(false)
    URL = 'http://localhost:3000';
    constructor(private http: HttpClient){}

    fetchBlogs(){
        return this.http.get(this.URL+'/blog')   
    }

    fetchBlog(id: any){
        return this.http.get(this.URL+'/blog/'+id)
    }

    addBlog(blog:any,token:any){
        const headers = new HttpHeaders({'Authorization': token}) 
        const options = {headers:headers}
        return this.http.post(this.URL+'/blog',blog,options)
    }

    login(user:any){
        return this.http.post(this.URL+'/user/login',user)
    }

    signup(user:any){
        return this.http.post(this.URL+'/users/signup', user)
    }

    fetchUser(token:any){
        const headers = new HttpHeaders({'Authorization': token}) 
        const options = {headers:headers}
        return this.http.get(this.URL+'/user/me',options)
    }

    DeleteUser(token:any){
        const headers = new HttpHeaders({'Authorization': token}) 
        const options = {headers:headers}
        return this.http.delete(this.URL+'/user/me',options)
    }

    addComment(token:any,comment:any){
        const headers = new HttpHeaders({'Authorization': token}) 
        const options = {headers:headers}
        return this.http.post(this.URL+'/comment',comment,options)
    }
}