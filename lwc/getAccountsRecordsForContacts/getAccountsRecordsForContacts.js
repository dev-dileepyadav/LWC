import { LightningElement, wire } from 'lwc';
import accountRecords from '@salesforce/apex/DisplayAccountsContacts.getAccountRecords';

export default class GetAccountsRecordsForContacts extends LightningElement {
    @wire(accountRecords) accounts;
    
    accountId;
    showContacts(e){
        e.preventDefault();
        this.accountId = e.target.dataset.accountid;
    }
}