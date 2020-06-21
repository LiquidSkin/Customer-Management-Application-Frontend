import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   users: User[];
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
  addUser(Name: string): void
  {
    this.apiService.addUser(this.newUser).subscribe(
      (data) => {
        console.log(data);
        this.newUser.Name = Name;

      }
    )
    this.newUser = new User();
  }




  //put
  updateTodo(id,user:User):void{
    console.log(user);
    this.apiService.updateUser(user.id,this.editingUser)
    .subscribe((data)=>{
      let existingTodo = this.users.find(todo => todo.id === data.id);
      // existingTodo = data;
      existingTodo.Name = user.Name;
      this.editingUser = existingTodo;
      
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
