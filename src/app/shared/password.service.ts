import { Injectable } from '@angular/core';
import { Password } from './password.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  passwords:Password[] = [
    {
      website: 'https://google.com',
      email: 'example@gmail.com',
      password: 'password123',
      visible: false
    },
    {
      website: 'https://youtube.com',
      email: 'example@gmail.com',
      password: 'something123',
      visible: false
    }
  ];
  

  constructor() { }

  getAllPasswords() {
    return this.passwords;
  }

  addPassword(password: Password) {
    this.passwords.push(password);
  }

  updatePassword(index: number, updatedObject: Password) {
    this.passwords[index] = updatedObject;
  }

  deletePassword(index: number) {
    this.passwords.splice(index, 1);
  }
}
