package com.example.demo.model;

import java.math.BigDecimal;

public class Account {
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String currency;
    private String accountHolder;

    public Account(String accountNumber, String accountType, BigDecimal balance, String currency, String accountHolder) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.currency = currency;
        this.accountHolder = accountHolder;
    }

    // Getters and setters
    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public void setAccountHolder(String accountHolder) {
        this.accountHolder = accountHolder;
    }
}
