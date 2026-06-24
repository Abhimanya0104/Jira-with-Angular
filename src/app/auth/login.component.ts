import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Jira Clone Login</h2>

        <form (submit)="login($event)">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required />

          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper{
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#0f172a;
    }

    .login-card{
      background:white;
      padding:40px;
      width:320px;
      border-radius:8px;
      box-shadow:0 10px 30px rgba(0,0,0,0.2);
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    h2{
      margin-bottom:10px;
      text-align:center;
    }

    input{
      padding:8px;
      border:1px solid #ddd;
      border-radius:4px;
      margin-bottom:10px;
    }

    button{
      padding:10px;
      border:none;
      background:#4f46e5;
      color:white;
      border-radius:4px;
      cursor:pointer;
    }

    button:hover{
      background:#4338ca;
    }
  `]
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private router: Router){}

  login(event: Event){
    event.preventDefault();

    if(this.email && this.password){
      localStorage.setItem('jira_user','logged_in');
      this.router.navigate(['/board']);
    }
  }
}