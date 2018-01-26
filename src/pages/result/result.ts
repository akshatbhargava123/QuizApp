import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  title: string;
  questions: string[];
  answers: any;
  optionStates: Array<boolean[]>;
  totalCorrect: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    console.log(navParams.data)
    this.title = this.navParams.get('title');
    this.questions = this.navParams.get('questions');
    this.answers = this.navParams.get('answers');
    this.optionStates = this.navParams.get('optionStates');
    this.answers.forEach((answer, i) => {
      if (this.optionStates[i][answer.correct] == true) {
        this.totalCorrect++;
      }
    });
  }

  goHome() {
    this.navCtrl.setRoot('HomePage');
  }

}