import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  private formSubmitAttempt: boolean;
  loginPage: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.loginPage) {
      this.loginForm = this.fb.group({
        user_email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
    if (!this.loginPage) {
      this.signUpForm = this.fb.group({
        user_email: ['', Validators.required],
        user_name: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    }
  }

  async login() {
    let data = await this.userService.login(this.loginForm.value);
    if (data) {
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    }

    this.formSubmitAttempt = true;
  }

  async signUp() {
    let validatedData = this.validateSignUp();
    if (validatedData.valid === true) {
      let data = await this.userService.saveUser(validatedData.data);
    } else {
      console.log(validatedData);
    }
    // let data = await this.userService.saveUser(this.loginForm.value);
    // if (data) {
    //   this.router.navigateByUrl('/home').then(() => {
    //     window.location.reload();
    //   });
    // }

    // this.formSubmitAttempt = true;
  }

  validate(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }
  validateSignUp() {
    let { user_email, user_name, password, confirmPassword } =
      this.signUpForm.getRawValue();
    if (
      user_email?.length != 0 &&
      user_name?.length != 0 &&
      password?.length != 0 &&
      confirmPassword?.length != 0
    ) {
      if (password === confirmPassword) {
        return { valid: true, data: { user_name, user_email, password } };
      } else {
        return {
          valid: false,
          data: 'Password and Confirm Password should be same',
        };
      }
    } else {
      return { valid: false, data: 'Please fill all the fields' };
    }
  }
}
