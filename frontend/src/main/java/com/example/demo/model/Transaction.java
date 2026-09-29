package com.example.demo.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Transaction {
    private String id;
    private String type; // DEBIT or CREDIT
    private BigDecimal amount;
    private String description;
    private LocalDateTime timestamp;
    private String status;
    private BigDecimal balanceAfter;

    public Transaction(String id, String type, BigDecimal amount, String description, 
                      LocalDateTime timestamp, String status, BigDecimal balanceAfter) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.timestamp = timestamp;
        this.status = status;
        this.balanceAfter = balanceAfter;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getBalanceAfter() {
        return balanceAfter;
    }

    public void setBalanceAfter(BigDecimal balanceAfter) {
        this.balanceAfter = balanceAfter;
    }
}
