import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{
  progress;
  canBeClosed = true; 
  primaryButtonText = 'Upload';
  finishedText = 'Upload Successful!';
  showCancelButton = true; 
  uploading = false;
  uploadSuccessful = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public uploadService: UploadService) {}
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  @ViewChild('name') name:ElementRef; 
  @ViewChild('desc') desc:ElementRef; 

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }



  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
    let name = this.name.nativeElement.value;
    let desc = this.desc.nativeElement.value;
    let cusers = localStorage.getItem("User");

    let cuser = JSON.parse(cusers);

    var data = { "name":name, "desc":desc, "user_id":cuser.user_id};


    // set the component state to "uploading"
    this.uploading = true;
  
    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, data);
  
    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }
  
    // Adjust the state variables
  
    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';
  
    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
  
    // Hide the cancel-button
    this.showCancelButton = false;
  
    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;
  
      // ... the upload was successful...
      this.uploadSuccessful = true;
  
      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

}