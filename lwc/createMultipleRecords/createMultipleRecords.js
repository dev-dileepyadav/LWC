import { LightningElement, track, wire } from 'lwc';
import CreateAccounts from '@salesforce/apex/CreateMultipleAccounts.createAccounts';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import Account from '@salesforce/schema/Account';

export default class CreateMultipleRecords extends LightningElement {

    @track industryField;
    @track index = 0;
    @track accRecList = [
        {
            Name:'',
            Industry:'',
            Phone:''
        }
    ];

    @wire (getPicklistValuesByRecordType,{recordTypeId:'0125h000000Op04AAC',objectApiName:Account})
    wiredPickListValues({data,err}){
        if(data){
          console.log(data);
          this.industryField = data.picklistFieldValues.Industry.values;
        } else if(err){
          this.error = err;
        }
      }

    handleInputChange(e){
        console.log('Access key',e.target);
        if(e.target.name =='Name'){
            this.accRecList[e.target.accessKey].Name = e.target.value;
        }else if(e.target.name =='Industry'){
            this.accRecList[e.target.accessKey].Industry = e.target.value;
            console.log(e.target.value);
        }else if(e.target.name =='Phone'){
            this.accRecList[e.target.accessKey].Phone = e.target.value;
            console.log('Phone',e.target.value);
        }

    }

    removeRow(e){
        if(this.accRecList.length >= 1){
            this.accRecList.splice(e.target.accessKey,1);
            this.keyIndex-1;
        }

    }

    removeAllRows(){

    }

    addNewRow(){
        this.keyIndex +1;
        this.accRecList.push({
            Name:'',
            Industry:'',
            Phone:''
        })

    }

    createAccounts(){
        CreateAccounts({accountList:this.accRecList}).then((x=>{
            console.log("success");
            
            const event = new ShowToastEvent({
                title: 'Created Accounts',
                message:"Accounts Created",
                variant:'success'
            });
            this.dispatchEvent(event);
            // this.accRecList.forEach((item =>{
            //     item.Name = '',
            //     item.Industry = '',
            //     item.Phone = ''
            // }
        })).catch((err)=>{
            console.log("error");
            const event = new ShowToastEvent({
                title: 'Created Accounts',
                message:"Accounts Created"+err,
                variant:'error'
            });
            this.dispatchEvent(event);
        })
        
    }
}