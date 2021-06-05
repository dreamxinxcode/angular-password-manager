import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { Password } from '../../shared/password.model';
import { PasswordService } from '../../shared/password.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {

  passwords!:Password[];

  constructor(private passwordService: PasswordService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.passwords = this.passwordService.getAllPasswords();
  }

  generatePassword():string {
    return Math.random().toString(36).slice(-8);
  }
 
  toggleVisible(id:number):void {
    this.passwords[id].visible = !this.passwords[id].visible;
  }

  refreshPassword(id:number):void {
    this.passwords[id].password = this.generatePassword();
  }

  onEditClick(id:number):void {
    const item = this.passwords[id];

    let dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: item
    });
  }

  deletePassword(id:number):void {
    this.passwordService.deletePassword(id);
  }
}