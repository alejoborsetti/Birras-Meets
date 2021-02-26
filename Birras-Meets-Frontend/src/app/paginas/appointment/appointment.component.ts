import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public successMsg = '';
  public errorMsg = '';
  public appointmentDate = '';
  public name = '';
  public email = '';

  constructor(private appointmentService: AppointmentService) { }

  public ngOnInit(): void {
  }

  public createAppointment(): void {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((createdAppointment: Appointment) => {
        const user: any = {
          name: this.name,
          email: this.email,
        };
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Reunión creada exitosamente para el día ${appointmentDate}`;
        this.appointmentService.sendEmail('http://localhost:3000/sendmail', user).subscribe(
          data => {
          },
          (error: ErrorEvent) => {
            this.errorMsg = error.error.message;
          });
      });

  }
}
