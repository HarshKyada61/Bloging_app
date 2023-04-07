import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    isAuthenticated = new BehaviorSubject<Boolean>(false)
    canComment = new BehaviorSubject<Boolean>(false)
    URL = 'http://localhost:3000';
    constructor(private http: HttpClient){}
    
    options:any;
    setHeaders(token:any){
        return {
            headers: {'Authorization': token}
        }
    }
    loggedinUser = null;
   
  
    // options= {
    //     headers:{'Authorization': localStorage.getItem('token')}
    // }

    fetchBlogs(){
        return this.http.get(this.URL+'/blog')   
    }

    fetchBlog(id: any){
        return this.http.get(this.URL+'/blog/'+id)
    }

    addBlog(blog:any){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.post(this.URL+'/blog',blog,this.options)
    }

    updateBlog(blog:any,id:any){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.patch(this.URL+'/blog/'+id,blog,this.options)
    }

    deleteBlog(id:any){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.delete(this.URL+'/blog/'+id,this.options)
    }

    login(user:any){
        return this.http.post(this.URL+'/user/login',user)
    }

    signup(user:any){
        return this.http.post(this.URL+'/users/signup', user)
    }

    logout(){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.post(this.URL+'/user/logout',{},this.options)
    }

    fetchUser(){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.get(this.URL+'/user/me',this.options)
    }

    updateUser(user:any){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.patch(this.URL+'/user/me',user,this.options)
    }

    DeleteUser(){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.delete(this.URL+'/user/me',this.options)
    }

    addComment(comment:any){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.post(this.URL+'/comment',comment,this.options)
    }

    deleteComment(id:any){
        this.options = this.setHeaders(localStorage.getItem('token'))
        return this.http.delete(this.URL+"/comment/"+id,this.options)
    }
}