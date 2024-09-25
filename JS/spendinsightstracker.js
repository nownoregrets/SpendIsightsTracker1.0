let balance = document.getElementById("balance");
let balanceInput = document.getElementById("balance-input");

// For Balance
function addBalanceFun() {
    if (balanceInput.value === "") {
        alert("Error! Enter amount to add in balance")
    } else {
        // To Add Balance
        let currentBalance = parseFloat(balance.innerText.slice(3))
        let newAmount = parseFloat(balanceInput.value)

        if (isNaN(newAmount)) {
            alert("Error! Enter Vaild Number")
            return
        }

        // To update Balance
        let updateBalance = currentBalance + newAmount;

        balance.innerText = "Rs " + updateBalance.toFixed(2)
        balanceInput.value = "";

        // Store In Local Storage

        localStorage.setItem("Balance", updateBalance.toFixed(2))
    }
}



let expenseDesc = document.getElementById("expense-desc");
let expenseAmount = document.getElementById("expense-amount");
let expenseList = document.getElementById("expense-ul");

let totalExpense = document.getElementById("total-expense");

// For Expense
function addExpense() {
    if (expenseDesc.value === "" || expenseAmount.value === "") {
        alert("Error! Enter values Amount & Expense Description")

    }


    // To add Date
    let currentdate = new Date();
    let month = currentdate.getMonth();
    let date = currentdate.getDate();

    switch (month) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb"
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;

        default:
            month = "Error";
            break;
    }


    // To add Expense
    let newExpense = document.createElement("li");
    newExpense.textContent = `${expenseDesc.value}: Rs ${expenseAmount.value} - ${date} ${month}`;
    newExpense.classList.add("list")
    expenseList.appendChild(newExpense)

    // To update Balance
    let newBalance = parseFloat(balance.innerText.slice(3)) - parseFloat(expenseAmount.value)
    balance.innerText = `Rs ${newBalance.toFixed(2)}`;

    // To update Total Expense
    let newTotalExpense = parseFloat(totalExpense.innerText.slice(18));
    newTotalExpense += parseFloat(expenseAmount.value);
    totalExpense.innerText = `Total Expense: Rs ${newTotalExpense.toFixed(2)}`;

    localStorage.setItem("TotalExpense", newTotalExpense.toFixed(2));


    // To store in Local Storage
    const savedExpense = JSON.parse(localStorage.getItem("Expense")) || [];
    savedExpense.push(newExpense.textContent);
    localStorage.setItem("Expense", JSON.stringify(savedExpense));


    // To update Balance again
    localStorage.setItem("Balance", parseFloat(balance.innerText.slice(3)).toFixed(2));

    expenseDesc.value = "";
    expenseAmount.value = "";

}

// For User Name
let userName = document.getElementById("user-name");;

function userNameFun() {
    let name = prompt("Enter Your Name(Only 2 Words):")
    if (name) {
        userName.innerText = name;

        // To store in Local Storage
        localStorage.setItem("UserName", name);
    }
}


// For Profile Picture
let profilePic = document.getElementById("profile-pic");
let picture = document.getElementById("picture");
profilePic.addEventListener("change", function () {
    let file = profilePic.files[0];

    if (file) {
        let imageURL = URL.createObjectURL(file);
        picture.style.backgroundImage = `url(${imageURL})`

        // To store in Local Storage
        localStorage.setItem("ProfilePic", imageURL)
    }
})


// To Export Expense List
function exportData() {
    const savedExpense = JSON.parse(localStorage.getItem("Expense")) || [];

    if (savedExpense.length === 0) {
        alert("Error! No Expense To Export Data");
    }

    const csvContent = savedExpense.join("\n");
    const encodedURI = encodeURI("data:text/csv;charset=utf-8," + csvContent);

    // To Download
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI)
    link.setAttribute("download", "Exported Expense List.csv")
    document.body.appendChild(link)
    link.click()
}











// To load from Local Storage
document.addEventListener("DOMContentLoaded", () => {
    const savedBalance = localStorage.getItem("Balance");
    const savedExpense = JSON.parse(localStorage.getItem("Expense"))
    const savedTotalExpense = localStorage.getItem("TotalExpense");
    const savedName = localStorage.getItem("UserName")
    const savedPic = localStorage.getItem("ProfilePic")

    if (savedBalance) {
        balance.innerText = `Rs ${savedBalance}`;
    }

    if (savedExpense) {
        savedExpense.forEach(expense => {
            const newExpense = document.createElement("li");
            newExpense.textContent = expense;
            newExpense.classList.add("list")
            expenseList.appendChild(newExpense)
        });
    }

    if (savedTotalExpense) {
        totalExpense.innerText = `Total Expense: Rs ${savedTotalExpense}`;
    }

    if (savedName) {
        userName.innerText = savedName;
    }

    if (savedPic) {
        picture.style.backgroundImage = `url(${savedPic})`;
    }
})

function clearStorage() {
    const savedBalance = localStorage.getItem("balance")
    localStorage.clear();
    balance.innerText = "Rs 0";
    expenseList.innerText = "";
    totalExpense.innerText = "Total Expense: Rs 0";

}