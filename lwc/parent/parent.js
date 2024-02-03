import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener } from 'c/subs';
export default class Parent extends LightningElement {

    @wire(CurrentPageReference)
    pageRef;

    connectedCallback(){
        registerListener('createAccount',this.createAccount,this);
    }

     accountData;
    createAccount(data){
        this.accountData = data;
        console.log("Getting data from pubsub",this.accountData);
    }
    parentValue = '';

    handleChange(e){
        this.parentValue = e.target.value;
    }

    value = '';
    
    handleChanges(e) {
        this.value = e.detail.value;
        const child = this.template.querySelector('c-child');
        child.gettingDataFromParent(this.value);
    }

    selectedBoxValues(e){
        this.value = e.detail;
    }
}