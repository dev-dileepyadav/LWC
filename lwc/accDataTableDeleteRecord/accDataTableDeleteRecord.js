import { LightningElement, track, wire } from 'lwc';
import AccountRecords from '@salesforce/apex/GetAccountRecords.getAccRecords';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

const actions = [
    { label: 'View', name: 'view'},
    { label: 'Edit', name: 'edit'},
    { label: 'Delete', name: 'delete'}
 ];

const columns = [
                {label:'Name',fieldName:'Name'},
                {label:'Phone',fieldName:'Phone',type:'Phone'},
                {type:'action',typeAttributes:{rowActions:actions,menuAlignment: 'right'}}];

export default class AccDataTableDeleteRecord extends NavigationMixin (LightningElement) {

    @track data;
    refreshTable;
    error;
    @track columns = columns;
    @track recordId;
    

    @wire(AccountRecords) wiredAccounts(result){
        console.log(result);
        this.refreshTable = result;
        if(result.data){
            this.data = result.data;
            this.error = undefined;
        }else if(result.error){
            this.error = result.error;
            this.data = undefined;
        }
    }
// delete record from normal table
/*
    handleDelete(event){
        const recordId = event.target.dataset.recordid;
        console.log(event.target.dataset.recordid);
        deleteRecord(recordId).then(()=>{
            const message = new ShowToastEvent({
                title: 'Success!!',
                message: ' account deleted.',
                variant: 'success'
            })
            this.dispatchEvent(message);
        }).catch((err)=>{
            console.log(err);
            const message = new ShowToastEvent({
                title: 'Fail!!',
                message: ' Fail to delete account delete.'+err.body.message,
                variant: 'error'
            })
            this.dispatchEvent(message);
        })
    }*/

  
// delete record from data table
handleRowAction(event){
    const actionName = event.detail.action.name;
    const row = event.detail.row;
        this.recordId = row.Id;
    if(actionName == 'delete'){
        deleteRecord(this.recordId).then(()=>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: ' account deleted.',
                variant: 'success'
            })
        );
        return refreshApex(this.refreshTable);
    })
    } else if(actionName == 'view'){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                actionName: 'view'
            }
        });

    }else if(actionName == 'edit'){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                objectApiName: 'Account',
                actionName: 'edit'
            }
        });
    }
    //refreshApex(this.data);
}

}