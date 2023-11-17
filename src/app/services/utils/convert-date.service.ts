import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConvertDateService {
  constructor(private datePipe: DatePipe) {}

  calculateDateRevision(productForm: FormGroup) {
    productForm
      .get('date_release')
      ?.valueChanges.subscribe((dateRelease: Date) => {
        if (dateRelease) {
          const newDate = new Date(dateRelease);
          const newYear = newDate.getFullYear() + 1;

          newDate.setFullYear(newDate.getFullYear() + 1);

          const newDateRevision = new Date(
            newYear,
            newDate.getMonth(),
            newDate.getDate()
          );

          while (newDateRevision.getMonth() !== newDate.getMonth()) {
            newDateRevision.setDate(newDateRevision.getDate() - 1);
          }

          productForm
            .get('date_revision')
            ?.setValue(this.datePipe.transform(newDate, 'yyyy-MM-dd', 'GMT-5'));
        } else {
          productForm.get('date_revision')?.reset();
        }
      });
  }
}
