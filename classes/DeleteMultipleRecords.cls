public with sharing class DeleteMultipleRecords {

   @AuraEnabled(cacheable = true)
   public static List<Account> displayAccounts(){
    return [SELECT id,Name,Phone,Industry FROM Account];
   }

   @AuraEnabled(Cacheable=false)
   public static List<Account> deleteAccount(List<String> accList){
    List<Account> deleteAccounts = new List<Account>();
    for(Account acc : [SELECT Id FROM Account WHERE id =: accList]){
        deleteAccounts.add(acc);
    }
    if(deleteAccounts.size() > 0){
        delete deleteAccounts;
    }
    return displayAccounts();
   }
}