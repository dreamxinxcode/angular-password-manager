import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Password } from '../../shared/password.model';
import { PasswordService } from '../../shared/password.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!:FormGroup;  
  passwords!:Password[];

  constructor(
    private passwordService: PasswordService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.passwords = this.passwordService.getAllPasswords();
  }

  initializeForm():void {
    this.form = this.fb.group({
      website: new FormControl(this.data.website, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      password: new FormControl(this.data.password, [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit():void {  
    this.passwordService.updatePassword(this.passwords.indexOf(this.data), this.form.value)
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }

}
