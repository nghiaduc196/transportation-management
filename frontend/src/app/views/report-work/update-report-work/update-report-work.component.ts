import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-report-work',
  templateUrl: './update-report-work.component.html',
  styleUrls: ['./update-report-work.component.scss']
})
export class UpdateReportWorkComponent implements OnInit {
  requestDTO = this.fb.group({
    id: [null],
    nameCustomer: [null, Validators.required],
    phoneCustomer: [null],
    addressStart: [null],
    addressEnd: [null],
    description: [null],
    totalMoney: [null],
  });
  listOldImage = [];
  listImage = [];
  fileList = [];
  isPickedImage = false;
  listUser = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  detectFiles(event): void {
    const files = event.target.files;
    if (files) {
      try {
        Array.prototype.push.apply(this.fileList, files);
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.listImage.push(e.target.result);
          };
          reader.readAsDataURL(file);
          this.isPickedImage = true;
        }
      } catch (error) {}
    }
  }

  removeImg(url): void {
    const index = this.listImage.indexOf(url);
    const f = this.fileList.filter(item => this.fileList.indexOf(item) !== index);
    this.listImage = this.listImage.filter(x => x !== url);
    this.fileList = f;
  }
}
