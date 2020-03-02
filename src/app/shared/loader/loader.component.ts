import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() message: string | undefined;

  constructor(public loader: NgxSpinnerService) {}

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.isLoading) {
      this.loader.show('spinner1');
    } else {
      this.loader.hide('spinner1');
    }
  }
}
