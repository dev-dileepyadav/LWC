import { LightningElement, wire } from 'lwc';
import AccountRecords from '@salesforce/apex/GetAccountRecords.getAccRecords';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
const columns = [
    {label:'Name',type:'customNames',fieldName:'Name',wrapText:true,
    typeAttributes: {
        accountName: { fieldName: "Name" },
      }},
    {label:'Phone',type:'text',fieldName:'Phone',wrapText:true},
    {label:'Rating',type:'customRating',fieldName:'Rating',wrapText:true,
    typeAttributes:{
                            options:{fieldName:'picklistOptions'},
                            value:{fieldName:'Rating'},
                            placeHolder:'Select Rating'}
                        }];
                        
export default class CustomDataTable extends LightningElement {

    accountRating = [];
    erro;
    columns = columns;
    data;
    error;

    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    accountObjectMetaData;

    @wire(getPicklistValues,{recordTypeId:'$accountObjectMetaData.data.defaultRecordTypeId',fieldApiName:ACCOUNT_RATING})
    RatingPickList({data,error}){
        if(data){
            this.accountRating = data.values;
            this.fetchAccounts()
        }else if(error){
            this.erro = error;
        }
    }


    fetchAccounts(){
        AccountRecords().then((result)=>{
            let options = [];
            for(let key in this.accountRating){
                options.push({label:this.accountRating[key].label,value:this.accountRating[key].value})
            }
            this.data = result.map((record)=>{
                return {
                    ...record,
                    'picklistOptions':options
                }
            });
            this.error = undefined;
        }).catch((err)=>{
            this.error = err;
            this.data = undefined;
        })
    }
}