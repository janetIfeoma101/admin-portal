// Define base URL for API
const baseUrl = 'https://api.trendit3.com/api/admin';

// Function to fetch user transactions
async function fetchUserTransactions() {
    try {
        // Fetch user transactions from the API
        const response = await fetch(`${baseUrl}/user_transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie('accessToken')}`
            }
        });
        const data = await response.json();
        return data.transactions; // Assuming transactions are returned in an array format
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        return [];
    }
}

// Function to generate transaction history HTML
function generateTransactionHistoryHTML(transactions) {
    return transactions.map(transaction => `
        <div class="wallet-box">
            <div class="left">
                <img src="./images/arrowleftdown.svg" alt="">
                <div class="credit-date">
                    <p id="highlight">${transaction.type}</p>
                    <p id="date">${transaction.date}</p>
                </div>
                <p>${transaction.description}</p>
            </div>
            <div class="right">
                <p id="highlight">${transaction.amount}</p>
            </div>
        </div>
    `).join('');
}

// Function to display transaction history
async function displayTransactionHistory() {
    const transactionContainer = document.getElementById('transaction-history');
    transactionContainer.innerHTML = 'Loading...';

    // Fetch user transactions
    const transactions = await fetchUserTransactions();

    // Generate HTML for transaction history
    const transactionHistoryHTML = generateTransactionHistoryHTML(transactions);

    // Display transaction history in the container
    transactionContainer.innerHTML = transactionHistoryHTML;
}

// Function to refresh transaction history on button click
document.getElementById('refresh-btn').addEventListener('click', displayTransactionHistory);

// Load transaction history on page load
window.addEventListener('load', displayTransactionHistory);