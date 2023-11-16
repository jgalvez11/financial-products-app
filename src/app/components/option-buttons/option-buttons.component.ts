import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-option-buttons',
  templateUrl: './option-buttons.component.html',
  styleUrls: ['./option-buttons.component.scss'],
})
export class OptionButtonsComponent {
  filterValue = new FormControl('');
  @Output() searchEvent = new EventEmitter<string>();

  search = this.filterValue.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  constructor() {
    this.search.subscribe((term) => {
      this.searchEvent.emit(term || '');
    });
  }
}
