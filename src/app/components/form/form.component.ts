import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordService } from '../../shared/password.service';
import { Password } from '../../shared/password.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!:FormGroup;  
  passwords!:Password[];

  constructor(private passwordService: PasswordService, 
              private fb: FormBuilder, 
              private _snackBar: MatSnackBar) { }

  ngOnInit():void {
    this.initializeForm();
    this.passwords = this.passwordService.getAllPasswords();
  }

  initializeForm():void {
    this.form = this.fb.group({
      website: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
    });
  }

  passwordExists(password:string):boolean { // Check if password has been used
    return this.passwords.filter(x => x.password === password).length > 1 ? true : false;
  }

  onSubmit(formDirective: FormGroupDirective):void {   
    if (this.form.invalid) return

    let passwordObj = this.form.value;
    passwordObj = {...passwordObj, visible: false}; // Spread visibility
    this.passwordService.addPassword(passwordObj);

    if (this.passwordExists(passwordObj.password)) {
      this.openSnackBar()
    }
    
    formDirective.resetForm()
  }
}

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar-component.html',
  styles: [`
    .notification {
      color: #f2f3f4;
    }
  `],
})
export class NotificationComponent {}
