public with sharing class CreateMultipleAccounts {
   @AuraEnabled
   public static Account createAccount(Account accountObject){
    try {
        insert accountObject;
        return accountObject;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
   public static List<Account> createAccounts(List<Account> accountList){
    try {
        insert accountList;
        return accountList;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}