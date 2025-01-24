const masterPassword = prompt(`Welcome !!! \nPlease set your Master password :`);
let authenticated = false;

// Concept 2: Linked Lists (singly linked list)
function LinkedListNode(accountName, password) {
    this.accountName = accountName;
    this.password = password;
    this.next = null;
}

// Concept 1: Dynamic Memory Allocation (Arrays)
const passwordLists = [];

// Concept 4: Stacks created
const passwordChangeHistory = [];

function authenticate() {
    const passwordInput = document.getElementById("masterPassword").value;

    if (passwordInput === masterPassword) {
        authenticated = true;
        document.getElementById("passwordList").style.display = "block";
    } else {
        alert("Incorrect master password. Please try again.");
    }
}

function getPassword() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;
        const passwordList = passwordLists.find(list => list.head.accountName === accountName);

        if (passwordList) {
            alert(`Password for ${accountName}: ${passwordList.head.password}`);
        } else {
            alert(`No password found for ${accountName}.`);
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

function addAccount() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;

        // Check if the account already exists
        const accountExists = passwordLists.some(list => list.head.accountName === accountName);

        if (accountExists) {
            alert(`Account ${accountName} already exists. Please enter a different account name.`);
        } else {
            const newPassword = prompt(`Enter password for ${accountName}:`);

            if (newPassword !== null) {
                const newNode = new LinkedListNode(accountName, newPassword);

                const passwordList = passwordLists.find(list => list.head.accountName === accountName);

                if (passwordList) {
                    let current = passwordList.head;
                    while (current.next) {
                        current = current.next;
                    }
                    current.next = newNode;
                } else {
                    passwordLists.push({
                        head: newNode,
                    });
                }

                // Concept 4: Stacks implemented
                passwordChangeHistory.push({ accountName, newPassword });

                alert(`Password for ${accountName} added successfully.`);
            }
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

// Additional Feature: Show All Accounts
function showAllAccounts() {
    if (authenticated) {
        const allAccounts = passwordLists.map(list => {
            return list.head.accountName;
        });

        alert("All Accounts:\n" + allAccounts.join(', '));
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

// Additional Feature: Show Previous Passwords
function showPreviousPasswords() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;

        // Filter password change history for the entered account
        const relevantChanges = passwordChangeHistory.filter(change => change.accountName === accountName);

        if (relevantChanges.length > 0) {
            // Retrieve the two most recent changes
            const latestChanges = relevantChanges.slice(-2);

            const formattedHistory = latestChanges.map((change, index) => {
                return `Account: ${change.accountName}, ${index === 0 ? 'Previous' : 'Current'} Password: ${change.newPassword}`;
            });

            alert("Previous and Current Passwords:\n" + formattedHistory.join('\n'));
        } else {
            alert(`No previous password changes for ${accountName}.`);
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}

// Additional Feature: Update Password
function updatePassword() {
    if (authenticated) {
        const accountName = document.getElementById("accountName").value;
        
        const passwordList = passwordLists.find(list => list.head.accountName === accountName);

        if (passwordList) {
            const newPassword = prompt(`Enter new password for ${accountName}:`);
            if (newPassword !== null) {
                passwordChangeHistory.push({ accountName, newPassword });

                // Update the password in the linked list
                passwordList.head.password = newPassword;

                alert(`Password for ${accountName} updated successfully.`);
            } else {
                alert(`No account found for ${accountName}.`);
            }
        } else {
            alert(`No account found for ${accountName}.`); // Moved from the inner if block
        }
    } else {
        alert("Authentication required. Please enter the master password first.");
    }
}