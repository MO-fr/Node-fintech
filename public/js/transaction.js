document.addEventListener('DOMContentLoaded', function() {
    // Local Storage Key
    const TRANSACTIONS_KEY = 'fintech-transactions';

    // Transaction Class
    class Transaction {
        constructor(description, category, amount, date) {
            this.id = Date.now();
            this.description = description;
            this.category = category;
            this.amount = parseFloat(amount);
            this.date = new Date(date);
        }
    }

    // Transaction Management Class
    class TransactionManager {
        constructor() {
            this.transactions = this.loadTransactions();
            this.renderTransactions();
            this.initEventListeners();
        }

        // Load transactions from local storage
        loadTransactions() {
            const stored = localStorage.getItem(TRANSACTIONS_KEY);
            return stored ? JSON.parse(stored).map(t => {
                const transaction = new Transaction(t.description, t.category, t.amount, t.date);
                transaction.id = t.id;
                return transaction;
            }) : [];
        }

        // Save transactions to local storage
        saveTransactions() {
            localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(this.transactions));
        }

        // Render transactions to table
        renderTransactions() {
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = '';

            if (this.transactions.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-4">No transactions found.</td>
                    </tr>
                `;
                return;
            }

            this.transactions.forEach((transaction, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${transaction.description}</td>
                    <td><span class="badge bg-primary">${transaction.category}</span></td>
                    <td class="fw-bold">$${transaction.amount.toFixed(2)}</td>
                    <td>${transaction.date.toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-edit btn-sm me-1" data-id="${transaction.id}">Edit</button>
                        <button class="btn btn-delete btn-sm" data-id="${transaction.id}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Add new transaction
        addTransaction(transaction) {
            this.transactions.push(transaction);
            this.saveTransactions();
            this.renderTransactions();
        }

        // Delete transaction
        deleteTransaction(id) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveTransactions();
            this.renderTransactions();
        }

        // Edit transaction
        editTransaction(id, updatedTransaction) {
            const index = this.transactions.findIndex(t => t.id === id);
            if (index !== -1) {
                this.transactions[index] = {...updatedTransaction, id};
                this.saveTransactions();
                this.renderTransactions();
            }
        }

        // Initialize event listeners
        initEventListeners() {
            const addTransactionForm = document.querySelector('#addTransactionModal form');
            const tableBody = document.querySelector('table tbody');

            // Add transaction
            addTransactionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addTransactionForm);
                const newTransaction = new Transaction(
                    formData.get('description'),
                    formData.get('category'),
                    formData.get('amount'),
                    formData.get('date')
                );
                this.addTransaction(newTransaction);
                
                // Reset form and close modal
                addTransactionForm.reset();
                bootstrap.Modal.getInstance(document.getElementById('addTransactionModal')).hide();
            });

            // Delegate event for delete and edit buttons
            tableBody.addEventListener('click', (e) => {
                const target = e.target;
                const transactionId = parseInt(target.getAttribute('data-id'));

                if (target.classList.contains('btn-delete')) {
                    this.deleteTransaction(transactionId);
                }

                if (target.classList.contains('btn-edit')) {
                    const transaction = this.transactions.find(t => t.id === transactionId);
                    this.showEditModal(transaction);
                }
            });
        }

        // Show edit modal
        showEditModal(transaction) {
            // Create edit modal dynamically
            const modalHtml = `
                <div class="modal fade" id="editTransactionModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form id="editTransactionForm">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Transaction</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <input type="text" class="form-control" name="description" value="${transaction.description}" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Category</label>
                                        <select class="form-select" name="category" required>
                                            <option value="Food" ${transaction.category === 'Food' ? 'selected' : ''}>Food</option>
                                            <option value="Transportation" ${transaction.category === 'Transportation' ? 'selected' : ''}>Transportation</option>
                                            <option value="Entertainment" ${transaction.category === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
                                            <option value="Shopping" ${transaction.category === 'Shopping' ? 'selected' : ''}>Shopping</option>
                                            <option value="Bills" ${transaction.category === 'Bills' ? 'selected' : ''}>Bills</option>
                                            <option value="Other" ${transaction.category === 'Other' ? 'selected' : ''}>Other</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Amount</label>
                                        <div class="input-group">
                                            <span class="input-group-text">$</span>
                                            <input type="number" step="0.01" class="form-control" name="amount" value="${transaction.amount}" required>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Date</label>
                                        <input type="date" class="form-control" name="date" value="${transaction.date.toISOString().split('T')[0]}" required>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-custom" data-id="${transaction.id}">Update Transaction</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            // Remove existing edit modal if any
            const existingModal = document.getElementById('editTransactionModal');
            if (existingModal) {
                existingModal.remove();
            }

            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            // Show modal
            const editModal = new bootstrap.Modal(document.getElementById('editTransactionModal'));
            editModal.show();

            // Handle edit form submission
            const editForm = document.getElementById('editTransactionForm');
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(editForm);
                const updatedTransaction = {
                    description: formData.get('description'),
                    category: formData.get('category'),
                    amount: formData.get('amount'),
                    date: formData.get('date')
                };
                const transactionId = parseInt(e.submitter.getAttribute('data-id'));
                
                this.editTransaction(transactionId, updatedTransaction);
                editModal.hide();
            });
        }
    }

    // Initialize Transaction Manager
    new TransactionManager();
});