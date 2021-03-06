import { Component  } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Config } from '../../../provider/config';
import { UtilService } from '../../../provider/util-service';
import { Auth } from '../../../provider/auth';
import { EmployerService } from '../../../provider/employer-service';
import { EmployerApplicantPage } from '../applicant/employer-applicant';
import { EmployerPostJobEditPage } from '../postjob-edit/employer-postjob-edit';

@Component({
  selector: 'page-employer-activity',
  templateUrl: 'employer-activity.html'
})
export class EmployerActivityPage {

  list: any;
  slist: any;
  constructor(public navCtrl: NavController, 
    public config: Config,
    public util: UtilService,
    public auth: Auth,
    public employerService: EmployerService,
    public loading: LoadingController) {
        
  }
  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    let loader = this.loading.create({
      content: 'Loading...',
    });
    loader.present();
    let param = {"employer_id" : this.config.user_id};
    this.employerService.postData("loadmyjobs", param)
    .subscribe(data => { 
        loader.dismissAll();
        if(data.status == "success") {
          this.list = data.result; console.log(this.list);
          this.search("");
        }
    })
  }
  getDate(date) {
      return new Date(date+' UTC');
  }

  edit(i) {
    this.navCtrl.push(EmployerPostJobEditPage, {
      data: this.list[i],
      bedit: true
    }, this.config.navOptions);
  }

  view(i) {
    this.navCtrl.push(EmployerApplicantPage, {
      data: this.list[i]
    }, this.config.navOptions);
  }

  search(value) {
    console.log(value);
    this.slist = this.filterItems(value);
  }
  filterItems(searchTerm) {
    return this.list.filter((item) => {
      for(var key in item) { 
        if(item[key].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
      }
      return false;
      //return item.job_job_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    })
  }


}
