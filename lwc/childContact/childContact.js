import { LightningElement, api, wire } from 'lwc';
import getcontact from '@salesforce/apex/DisplayAccountsContacts.getRelatedContacts';

export default class ChildContact extends LightningElement {
    @api accountid
    con;
    err;
    @wire(getcontact,{accountId:'$accountid'})
    contacts({data,error}){
        if(data){
            this.con = data;
            this.err = undefined
            console.log(this.con);
        }else if(error){
            this.err;
            this.con = undefined;
        }
    }
}