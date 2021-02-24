import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/models/appointment';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  public loading = true;
  public error = false;
  public errorMsg = '';
  public successMsg = '';
  public appointments: Appointment[] = [];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentService) { }

  public ngOnInit(): void {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
          this.loading = false;
        });
  }

  public cancelAppointment(id: string): void {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Reunión cancelada exitosamente';
      },
        (error: ErrorEvent) => {
          this.error = true;
          this.errorMsg = error.error.message;
        });
  }
}
