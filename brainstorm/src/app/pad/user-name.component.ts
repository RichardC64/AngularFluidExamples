import { Component, Input } from '@angular/core';
import { IUser } from '../fluid-object';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent {
  @Input() user!: IUser;
  @Input() users!: IUser[];
}
