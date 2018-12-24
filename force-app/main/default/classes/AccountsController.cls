public with sharing class AccountsController {
    public AccountsController() {
            //testing
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsList(){
      return [select Id,Name,AccountNumber FROM Account ];
    }
    public static void dealAccounts() {
            /added comment
    }
}
