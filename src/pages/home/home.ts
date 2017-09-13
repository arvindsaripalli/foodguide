import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Headers } from '@angular/http';

import { ProductPage } from '../product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private usda_api = "BnFxHw2boWUzPCneV3EyXOhPUKRPY31hDwzCSbSW";
  constructor(
    public navCtrl: NavController,
    public barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    public http: Http,
    public modalCtrl: ModalController) {

  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      //Found UPC
      console.log("UPC found");
      console.log(JSON.stringify(barcodeData));

      //Move on to DB checking stage before displaying product modal
      this.searchFromUPC(barcodeData.text);
    }, (err) => {
      console.log("Scan failed");
      console.log(JSON.stringify(err));
      this.showToast("Scan failed. Please try again.");
    });
  }

  searchFromUPC(upc) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    this.http.get("https://api.nal.usda.gov/ndb/search/?format=json&q=" + upc + "&max=25&offset=0&api_key=" + this.usda_api, {headers: headers}).subscribe(
      (res) => {
        var response = JSON.parse(res["_body"]);

        if(response["errors"] != undefined) {
          console.log("Search from UPC API empty");
          this.showToast("We could not find your product in the USDA Nutrition Database.");
        } else {
          console.log("Search from UPC API successful");
          console.log(response["list"]["item"]);
          this.getFromID(response["list"]["item"][0]["ndbno"]);
        }
      }, (err) => {
        console.log("Search from UPC API unsuccessful");
        console.log(JSON.stringify(err));
      }
    );
  }

  getFromID(ndbno) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    this.http.get("https://api.nal.usda.gov/ndb/V2/reports?ndbno=" + ndbno + "&api_key=" + this.usda_api, {headers: headers}).subscribe(
      (res) => {
        var response = JSON.parse(res["_body"]);

        console.log("Search from UPC API successful");
        console.log(JSON.stringify(response));

        this.showProduct(response);

      }, (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  showProduct(response) {
    let modal = this.modalCtrl.create(ProductPage, {product: response});
    modal.present();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
