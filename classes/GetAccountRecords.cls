public with sharing class GetAccountRecords {
    @Auraenabled(cacheable=true)
    public static List<Account> getAccRecords(){
        List<Account> accList = [SELECT Id,Name,Phone,Rating FROM Account ORDER BY createdDate ASC];
        return accList;
    }

    @Auraenabled(cacheable=true)
    public static void deleteRecord(Account objectAccount){
        try {
            //List<Account> accList = [SELECT Id FROM Account WHERE id =:objectAccount LIMIT 1];
            delete objectAccount;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}