import { Component, HostListener } from '@angular/core';
import { faFacebook,faTwitter,faLinkedin,faYoutube,faInstagram,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':leave', 
          [
            animate(400, style({ opacity: 0 }))
          ]
        ),
        transition(
          ':enter', 
          [
            style({ opacity: 0 }), 
            animate(2000, style({opacity: 1}))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  

baseURL: string = "http://192.168.1.148:8000";
  title = 'willtech';
  x:String='Home';
reactiveForm!: FormGroup;
  public getScreenWidth: any;
  public getScreenHeight: any;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
  faGoogle = faGoogle;
  submitted = false;
  name:String="";
  email:String="";
  companyName:String="";
  desc:String="";
  phone:String="";

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
      this.reactiveForm = new FormGroup({
        name: new FormControl(this.name,  [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
      ]),
        email: new FormControl(this.email, [ 
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)

        ]),
        companyName: new FormControl(this.companyName, [ 
        ]),
        desc: new FormControl(this.desc, [
        ]),
        phone: new FormControl(this.phone, [ 
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15)
        ]),
      });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
  send(){
    if(this.reactiveForm.get('name')?.invalid &&this.reactiveForm.get('phone')?.invalid &&this.reactiveForm.get('email')?.invalid){
      alert("please fill in name, email, and phone.");
      return;
    }
    console.log(this.reactiveForm.get('name')?.value);
    console.log(this.reactiveForm.get('email')?.value);
    console.log(this.reactiveForm.get('companyName')?.value);
    console.log(this.reactiveForm.get('desc')?.value);
    console.log(this.reactiveForm.get('phone')?.value);
    let x ={
      name:this.reactiveForm.get('name')?.value,
      email:this.reactiveForm.get('email')?.value,
      companyName:this.reactiveForm.get('companyName')?.value,
      desc:this.reactiveForm.get('desc')?.value,
      phone:this.reactiveForm.get('phone')?.value,
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post("https://e55u5xibrhu3qe5msdrkco2yka0tcbyn.lambda-url.us-east-1.on.aws/",x,httpOptions).subscribe(()=>console.log("here"));
     
alert("This infomation has been sent to the team and will be process asap.lease reframe from sending more than one request");
  }

  about(){
  this.x='AboutUs';
}
}



  
