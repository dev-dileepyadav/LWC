import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    isText = true;
    text = '';

    staff = [{name:'Dileep',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Mukesh',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Chintan',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Amrit',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Amit',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Sonal',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Sharma',salary:1200000,pin:303107,Mob:9667612626},
            {name:'Jugal',salary:1200000,pin:303107,Mob:9667612626}]
    handleChange(e){
       this.text = e.target.value;
       this.isText = this.text===''|| this.text === undefined || this.text === null;
    }

    
}