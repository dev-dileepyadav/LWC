import { LightningElement, wire } from 'lwc';
import accountWithContacts from '@salesforce/apex/AccountWrap.accountWithContacts';
export default class WrapAccountWithContact extends LightningElement {

    @wire(accountWithContacts)wrappedList;

    
}