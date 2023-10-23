import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.successMessage$.subscribe((message) => {
      this.successMessage = message;
      this.clearMessages();
    });

    this.notificationService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
      this.clearMessages();
    });
  }

  clearMessages() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 5000); // Clear messages after 5 seconds
  }
}
