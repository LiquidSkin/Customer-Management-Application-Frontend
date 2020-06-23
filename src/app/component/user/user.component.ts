import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   users: User[]= [];
   newUser: User = new User();
   editingUser: User = new User();
   editing: boolean;

  constructor(public apiService: UserService) { }
  ngOnInit(): void {
  }
  //get
  getUser():void 
  {
    this.apiService.getUser().subscribe(
      (data) => {
        this.users = data;
      }
    )
  }
  //post
  addUser(Name:NgForm): void
  {
    this.apiService.addUser(this.newUser).subscribe(
      (data) => {
        console.log(data);
        this.newUser.name = data.name;
        this.getUser();

      }
    )
    this.newUser = new User();
  }
  //put
  updateUser(id,user:User):void{
    console.log(user);
    this.apiService.updateUser(user.id,this.editingUser)
    .subscribe((data)=>{
      let existingUser = this.users.find(user => user.id === data.id);
      // existingTodo = data;
      existingUser.name = data.name;
      this.editingUser = existingUser
      
    });
    this.editingUser = new User();
  }
  //delete
  deleteUser(id): void
  {
   this.apiService.deleteUser(id).subscribe((data) => {
     this.users = this.users.filter(user => user.id != id)
   })
  }



}
