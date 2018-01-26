import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage implements OnInit {

  @ViewChild(Slides) slides: Slides;

  title: string; // title of the page, fetched from navParams
  questions: string[]; // questions of the quiz, fetched from navParams
  answers: any; // answers of the questions, fetched from navParams

  optionStates: Array<boolean[]> = [];

  currentQuestionNumber: number = 1;
  swipingLocked: boolean; // for switching questions using automatic slider 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.title = this.navParams.get('title');
    this.questions = this.navParams.get('questions');
    this.answers = this.navParams.get('answers');
    for (let i = 0; i < this.questions.length; i++) {
      this.optionStates.push([]);
      for (let j = 0; j < this.answers[i].options.length; j++) {
        this.optionStates[i].push(false);
      }
    }
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.swipingLocked = true;
  }

  checkAnswer(quesitonIndex: number, selectedIndex: number) {
    this.optionStates[quesitonIndex][selectedIndex] = !this.optionStates[quesitonIndex][selectedIndex];

    let countSelected = 0;
    this.optionStates[quesitonIndex].forEach((option) => {
      if (option == true) {
        countSelected++;
        if (countSelected > 2) {
          this.showAlert('Error', 'You cannot select more than 2 options', {
            text: 'OK'
          });
          this.optionStates[quesitonIndex][selectedIndex] = !this.optionStates[quesitonIndex][selectedIndex];
          return;
        }
      }
    });
  }

  updateCurQuestion() {
    this.currentQuestionNumber = this.slides.getActiveIndex() + 1;
  }

  showAlert(title: string, subTitle?: string, button?: any) {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [button],
      cssClass: 'darkAlert'
    }).present();
  }

  switchLocking() {
    this.swipingLocked = !this.swipingLocked;
    this.slides.lockSwipes(this.swipingLocked);
  }

  nextQuestion() {
    this.switchLocking();
    this.slides.slideNext(200);
    setTimeout(() => this.switchLocking(), 200);
  }

  prevQuestion() {
    this.switchLocking();
    this.slides.slidePrev(200);
    setTimeout(() => this.switchLocking(), 200);
  }

  finishQuiz() {
    let summaryPageLoader = this.loadingCtrl.create({
      content: 'Opening Summary...',
    });
    summaryPageLoader.present();

    // faking the loader
    setTimeout(() => {
      summaryPageLoader.dismiss();
      this.navCtrl.setRoot('ResultPage', {
        optionStates: this.optionStates,
        ...this.navParams.data
      });
    }, 1000);
  }

}