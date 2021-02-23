import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/models/appointments';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public successMsg: string ="";
  public errorMsg: string ="";
  appointmentDate: string ="";
  name: string ="";
  email: string="";

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Reunión creada exitosamente para el día ${appointmentDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}