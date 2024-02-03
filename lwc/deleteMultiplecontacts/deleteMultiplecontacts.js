import { LightningElement, wire } from 'lwc';
import records from '@salesforce/apex/ContactRecords.getContactRecords';
import deleteMassRecords from '@salesforce/apex/ContactRecords.deleteMassRecords';
//import displayAccounts from '@salesforce/apex/DeleteMultipleRecords.displayAccounts';
//import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class DeleteMultiplecontacts extends LightningElement {
    @wire (records) contacts
    selectedContactIdList = [];
    columns = [{label:"First Name",fieldName:'FirstName',type:'text'},
                {label:"Last Name",fieldName:'Lastname',type:'text'},
                {label:"Email",fieldName:'Email',type:'email'}];

    deleteSelectedRecords(){
        deleteMassRecords({conList:this.selectedContactIdList}).then((x)=>{
            console.log(JSON.stringify(x));
        }).catch((err)=>{
            console.log(JSON.stringify(err));
        })
    }

    prepareSelectRecords(e){
        const selectedRows = e.target.selectedRows;
        this.selectedContactIdList = [];
        for(let i = 0; i<selectedRows.length; i++){
            this.selectedContactIdList.push(selectedRows[i].id);
            console.log(this.selectedContactIdList);
        }
    }
}