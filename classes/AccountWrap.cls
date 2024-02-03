public with sharing class AccountWrap {

    @AuraEnabled(cacheable=true)
    public static List<wrap> accountWithContacts(){
        List<wrap> wrapList = new List<wrap>();

        List<Account> accList = [SELECT 
        id,
        Name,
        Phone,
        Industry,
        (SELECT id,
        LastName,
        FirstName,
        Phone,
        Email
         FROM contacts)
          FROM Account];

          for(Account acc: accLIst){
            wrapList.add(new wrap(acc,acc.contacts));
          }
          return wrapList;
    }


    public class wrap{

        @AuraEnabled public Account acc{get;set;}
        @AuraEnabled public List<contact> con{get;set;}
        public wrap(Account acc, List<contact> contacts){
            this.acc = acc;
            this.con = contacts;
            
        }
    }
}