package com.example.demo.controller;

import com.example.demo.model.Account;
import com.example.demo.model.Transaction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BankingController {

    // Simulated database - in real app, this would be from a database
    private List<Account> accounts = new ArrayList<>();
    private List<Transaction> transactions = new ArrayList<>();

    public BankingController() {
        // Initialize with sample data
        accounts.add(new Account("DE89370400440532013000", "Checking Account", 
            new BigDecimal("15420.50"), "EUR", "Madu Odiraa"));
        accounts.add(new Account("DE89370400440532013001", "Savings Account", 
            new BigDecimal("45230.75"), "EUR", "Madu Odiraa"));
        accounts.add(new Account("DE89370400440532013002", "Investment Account", 
            new BigDecimal("125000.00"), "EUR", "Madu Odiraa"));

        // Sample transactions
        transactions.add(new Transaction("TXN001", "CREDIT", new BigDecimal("2500.00"), 
            "Salary Payment", LocalDateTime.now().minusDays(1), "COMPLETED", new BigDecimal("15420.50")));
        transactions.add(new Transaction("TXN002", "DEBIT", new BigDecimal("850.00"), 
            "Rent Payment", LocalDateTime.now().minusDays(2), "COMPLETED", new BigDecimal("12920.50")));
        transactions.add(new Transaction("TXN003", "DEBIT", new BigDecimal("125.30"), 
            "Grocery Store", LocalDateTime.now().minusDays(3), "COMPLETED", new BigDecimal("13770.50")));
        transactions.add(new Transaction("TXN004", "CREDIT", new BigDecimal("1500.00"), 
            "Freelance Payment", LocalDateTime.now().minusDays(5), "COMPLETED", new BigDecimal("13895.80")));
        transactions.add(new Transaction("TXN005", "DEBIT", new BigDecimal("75.50"), 
            "Restaurant", LocalDateTime.now().minusDays(6), "COMPLETED", new BigDecimal("12395.80")));
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("accounts", accounts);
        model.addAttribute("totalBalance", calculateTotalBalance());
        model.addAttribute("recentTransactions", transactions.subList(0, Math.min(5, transactions.size())));
        model.addAttribute("userName", "Madu Odiraa");
        model.addAttribute("lastLogin", LocalDateTime.now().minusHours(2).format(DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm")));
        return "dashboard";
    }

    @GetMapping("/transactions")
    public String transactions(Model model) {
        model.addAttribute("transactions", transactions);
        model.addAttribute("userName", "M");
        return "transactions";
    }

    @GetMapping("/transfer")
    public String transferForm(Model model) {
        model.addAttribute("accounts", accounts);
        model.addAttribute("userName", "John Doe");
        return "transfer";
    }

    @PostMapping("/transfer")
    public String processTransfer(
            @RequestParam String fromAccount,
            @RequestParam String toAccount,
            @RequestParam BigDecimal amount,
            @RequestParam String description,
            RedirectAttributes redirectAttributes) {
        
        // Validation
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            redirectAttributes.addFlashAttribute("error", "Amount must be greater than zero");
            return "redirect:/transfer";
        }

        if (fromAccount.equals(toAccount)) {
            redirectAttributes.addFlashAttribute("error", "Cannot transfer to the same account");
            return "redirect:/transfer";
        }

        // Find source account
        Account sourceAccount = accounts.stream()
            .filter(acc -> acc.getAccountNumber().equals(fromAccount))
            .findFirst()
            .orElse(null);

        if (sourceAccount == null || sourceAccount.getBalance().compareTo(amount) < 0) {
            redirectAttributes.addFlashAttribute("error", "Insufficient funds");
            return "redirect:/transfer";
        }

        // Process transfer (simplified - in real app, this would be a transaction)
        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        
        Account targetAccount = accounts.stream()
            .filter(acc -> acc.getAccountNumber().equals(toAccount))
            .findFirst()
            .orElse(null);

        if (targetAccount != null) {
            targetAccount.setBalance(targetAccount.getBalance().add(amount));
        }

        // Add transaction records
        String txnId = "TXN" + String.format("%03d", transactions.size() + 1);
        transactions.add(0, new Transaction(txnId, "DEBIT", amount, 
            "Transfer: " + description, LocalDateTime.now(), "COMPLETED", sourceAccount.getBalance()));

        redirectAttributes.addFlashAttribute("success", 
            String.format("Successfully transferred €%.2f from %s to %s", 
                amount, sourceAccount.getAccountType(), toAccount));
        
        return "redirect:/dashboard";
    }

    @GetMapping("/accounts")
    public String accounts(Model model) {
        model.addAttribute("accounts", accounts);
        model.addAttribute("userName", "John Doe");
        return "accounts";
    }

    private BigDecimal calculateTotalBalance() {
        return accounts.stream()
            .map(Account::getBalance)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
