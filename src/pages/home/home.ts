import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController) {

  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      //Found UPC
      console.log("UPC found");
      console.log(JSON.stringify(barcodeData));

      //Move on to DB checking stage before displaying product modal
    }, (err) => {
      console.log("Scan failed");
      console.log(JSON.stringify(err));
      this.showToast("Scan failed. Please try again.");
    });
  }

  searchDB() {

  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
