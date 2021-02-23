import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointments';
import { AppointmentService } from 'src/app/services/appointments.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  public loading = true;
  public errorMsg: string = "";
  public successMsg: string = "";
  public appointments: Appointment[] = [];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
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

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Reunión cancelada exitosamente'
      },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        });
  }
}
