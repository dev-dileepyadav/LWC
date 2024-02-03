import { LightningElement, api, wire } from 'lwc';
import displayAccounts from '@salesforce/apex/DeleteMultipleRecords.displayAccounts';
import deleteAccounts from '@salesforce/apex/DeleteMultipleRecords.deleteAccount';
import { refreshApex } from '@salesforce/apex';
const columns = [
                {label:'Name', fieldName:'Name'},
                {label:'Phone', fieldName:'Phone'},
                {label:'Industry', fieldName:'Industry'},
            ];
            
export default class DeleteMultipleAccounts extends LightningElement {

    @wire(displayAccounts) accounts;

    @api selectedIds = [];
    columns = columns;
    getSelectedId(e){
        const selectedRecords = e.detail.selectedRows;
        for(let i = 0; i< selectedRecords.length;i++){
            this.selectedIds.push(selectedRecords[i].Id);
            //console.log(JSON.stringify(this.selectedIds));
        }
    }

    handelDelete(){

        deleteAccounts({accList:this.selectedIds}).then(()=>{
            this.template.querySelector('lightning-datatable').selectedRows = [];
            return refreshApex(this.accounts);
        }).catch((err)=>{
            console.log(err);
        })
    }
}