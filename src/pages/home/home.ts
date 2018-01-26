import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

// Quiz Schema (its better to make a modal folder and put all modals there, but fine for now :D)
interface Quiz {
  title: string;
  description: string;
  questions: string[];
  answers: Array<{
    options: string[],
    correct: number
  }>
};

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  quizData: Quiz[];
  subscription: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public afDB: AngularFireDatabase) {
    let loader = this.loadingCtrl.create({
      content: 'Fetching Quiz data...'
    });
    loader.present();

    // subscribing for constant changes from firebase
    this.subscription = this.afDB.list('quizData').valueChanges().subscribe((value: Quiz[]) => {
      this.quizData = value;
      loader.dismiss();
    });
    
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  openQuiz(quizInfo: Quiz) {
    this.navCtrl.push('QuizPage', quizInfo);
  }

}