import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  public product;
  public name;
  public ingredients;
  public isExpanded;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.data.product;
    //Get and format name
    this.name = this.product["desc"]["name"];
    for(var i = 0; i < this.name.length; i++) {
      if(this.name.slice(i, i + 5) == (", UPC")) {
        this.name = this.name.slice(0, i);
      }
    }
    this.name = this.regularCase(this.name.trim());

    //Get and format ingredients
    this.ingredients = this.product["ing"]["desc"].split(',');
    for(var i = 0; i < this.ingredients.length; i++) {
      this.ingredients[i] = this.regularCase(this.ingredients[i].trim());
    }

    this.isExpanded = false;
  }

  regularCase(str) {
    var arr = str.split(' ');
    var toReturn = "";
    for(var i = 0; i < arr.length; i++) {
      toReturn += arr[i][0] + arr[i].slice(1, arr[i].length).toLowerCase() + " ";
    }
    return toReturn;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
