import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/DisplayAccountsContacts.getAccountRecords';

export default class ArtiFirstComponent extends LightningElement {

    data;
    erorr;

    @wire(getAccounts)
    wiredAccounts(result){
        console.log('Result Log',result);
        if(result.data){
            this.data = result.data;
            this.erorr = undefined
        }else if(result.error){
            this.erorr = result.error;
            this.data = undefined;
        }
    }
}