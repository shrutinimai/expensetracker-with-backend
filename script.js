const apiUrl = "http://localhost:3000/expenses";
let editId = null;

document.addEventListener("DOMContentLoaded", fetchExpenses);

document.getElementById("addExpenseBtn").addEventListener("click", handleExpense);
document.getElementById("cancelEditBtn").addEventListener("click", resetForm);

async function fetchExpenses() {
    try {
        const res = await axios.get(apiUrl);
        const expenses = res.data;

        let total = 0;
        expenses.forEach(exp => total += Number(exp.amount));
        document.getElementById("totalAmount").textContent = `Total: ${total}`;

        const list = document.getElementById("expenseList");
        list.innerHTML = "";
        expenses.forEach(exp => {
            let item = document.createElement("li");
            item.innerHTML = `${exp.amount} - ${exp.description} - ${exp.category} 
                <button onclick="editExpense(${exp.id}, '${exp.amount}', '${exp.description}', '${exp.category}')">Edit</button>
                <button onclick="deleteExpense(${exp.id})">Delete</button>`;
            list.appendChild(item);
        });
    } catch (err) {
        console.error("Error fetching expenses", err);
    }
}

async function handleExpense() {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    if (!amount || !description || !category) return alert("All fields are required!");

    try {
        let data = { amount, description, category };
        editId ? await axios.put(`${apiUrl}/${editId}`, data) : await axios.post(apiUrl, data);
        resetForm();
        fetchExpenses();
    } catch (err) {
        console.error("Error saving expense", err);
    }
}

async function deleteExpense(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchExpenses();
    } catch (err) {
        console.error("Error deleting expense", err);
    }
}

function editExpense(id, amount, description, category) {
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    document.getElementById("addExpenseBtn").textContent = "Update Expense";
    document.getElementById("cancelEditBtn").style.display = "inline";
    editId = id;
}

function resetForm() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("addExpenseBtn").textContent = "Add Expense";
    document.getElementById("cancelEditBtn").style.display = "none";
    editId = null;
}
