import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/subs';

export default class LdsCreateRecord extends LightningElement {

    @wire(CurrentPageReference)
    pageRef;
    accName;
    accPhone;

    handleName(e){
        this.accName = e.target.value;
    }

    handlePhone(e){
        this.accPhone = e.target.value;
    }
    saveRecord(){

        const fields = {
            "Name": this.accName,
            "Phone": this.accPhone
        }

        const recordDetails = {
            apiName:"Account",
            fields:fields
        };
        
        createRecord(recordDetails).then(x=>{
            console.log(x);
            alert("record created");
        }).catch(err=>{
            console.log(err);
            alert("Acn not record created");
        })
        fireEvent(pageRef,'createAccount',this.recordDetails);
        console.log(recordDetails);
    }

}