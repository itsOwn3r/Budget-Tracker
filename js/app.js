let spendedArray = [];
let namesArray = [];

// check if there is any Expense in LocalStorage, if true changes display of #chart
chartD();
function chartD() {
  if (localStorage.getItem("ChartDisplay")) {
    if (localStorage.getItem("ChartDisplay") == "hide") {
      showHide(1);
    } else {
      showHide(0);
    }
  } else {
    showHide(0);
  }
}

//ChartControl function. If clicked Chart will be hidden, and if Chart was already hidden, it will display the chart
//chControl();
function chControl() {
  let show = Number;
  let marginRight = document.querySelector("#chartcontrol > img").getAttribute("style");
  let dataID = document.querySelector("#chartcontrol > img").getAttribute("data-id"); // when dataID is 0 that means #chart will not be displayed. when 1 it will.
  // when user chooses to hide the chart, "Display" of #chart will be set to "none" and its "margin-right" will be set to : '2.20em;'
  if (dataID == 0 || marginRight == "margin-right: 2.20em;") {
    // when show is true that means its showing the chart
    show = 0;
    console.log(show);
    showHide(show);
    localStorage.setItem("ChartDisplay", "show"); // Saves the condition of Chart's display in LocalStorage so it can remember user's choice while refreshing the page 
  } else {
    show = 1;
    console.log(show);
    showHide(show);
    localStorage.setItem("ChartDisplay", "hide");
  }
}

// if 0 is passed to this function, it will change the "Display" of chart to Blcok. if not, it will hide the chart.
function showHide(dataID) {
  let bothLength;
  let show = Number;
  if (localStorage.getItem("Both")) {
    bothLength = JSON.parse(localStorage.getItem("Both")).expenseAmount.length;
  } else {
    bothLength = 0;
  }
  if (dataID == 0) {
    console.log(dataID);
    document.querySelector("#chartcontrol > img").style = "";
    document.querySelector("#chart").style = "display: block";
    document.querySelector("#width").style = "";
    document.querySelector("#chartcontrol > img").setAttribute("data-id", 1);
    //checking if there is any Expense entered or not. if bothLength is greater than 0, that means there is/are some Expense entered by user, -->
    // so it will display the chart. if bothLength is 0, the Width of the page will be minimized and chart will be hidden.
    if (bothLength > 0) {
      chart();
    } else {
      document.querySelector("#chart").style = "display: none";
      document.querySelector("#width").style = "max-width: 66% !important";
      let removeSign = document.querySelector("#budget > div.restante.alert.alert-success > p").textContent.replace('$', '')
      document.querySelector("#budget > div.restante.alert.alert-success > p").innerHTML = removeSign + `<span id="left"></span>`
      let removeSign2 = document.querySelector("#budget > div.alert-primary p").innerText.replace('$', '')
      console.log(document.querySelector("#budget > div.alert-primary").textContent);
      console.log(removeSign2);
      document.querySelector("#budget > div.alert-primary p").innerHTML = removeSign2 + `<span id="total"></span>`
    }
  } else {
    console.log(dataID);
    document.querySelector("#chartcontrol > img").style = "margin-right: 2.20em;";
    document.querySelector("#chart").style = "display: none";
    document.querySelector("#width").style = "max-width: 66% !important";
    document.querySelector("#chartcontrol > img").setAttribute("data-id", 0);
  }
}

// Budget Class
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = Number(this.budget);
    console.log(budget);
    console.log(this.budget);
  }

  subtractFromBudget(spended) {
    console.log(spended);
    let newBudget = (this.budgetLeft -= spended);
    console.log(newBudget);
    return Number(newBudget);
  }
}

// Everything related to HTML
class HTML {
  insertBudget(amountOfBudget) {
    budgetAmount.innerHTML =
      "Your Budget is: " +
      Number(amountOfBudget).toLocaleString() +
      " Dollars";
    budgetTotal.innerHTML = Number(amountOfBudget).toLocaleString();
    document.querySelector("input[name=budget]").value = Number(amountOfBudget);
  }
  insertExpense(spended, expenseName) {
    let dataId = document.querySelectorAll("#expenses span.badge").length;
    const expenses = document.querySelector("#expenses ul");
    let li = document.createElement("li");
    li.classList =
      "list-group-item f-flex justify-content-between align-items-center";
    li.setAttribute("data-id", dataId);
    li.innerHTML = `
    <span class='amount'>$${Number(spended).toLocaleString()}</span>
    <span class='badge badge-pill badge-primary'>${expenseName}</span>
    <span class='remove'>X</span>
    `;
    spendedArray.push(Number(spended));
    namesArray.push(expenseName);
    let expenseList = {
      expenseName: namesArray,
      expenseAmount: spendedArray,
    };
    console.log(expenseList);
    localStorage.setItem("Both", JSON.stringify(expenseList));
    expenses.appendChild(li);
  }

  // insert Expenses WithOut Saving to LS, Also using inbound Arrays for 'spended' and 'names'
  insertExpenseWithOutSave(spended, expenseName) {
    let dataId = document.querySelectorAll("#expenses span.badge").length;
    const expenses = document.querySelector("#expenses ul");
    let li = document.createElement("li");
    li.classList =
      "list-group-item f-flex justify-content-between align-items-center";
    li.setAttribute("data-id", dataId);
    li.innerHTML = `
    <span class='amount'>$${Number(spended).toLocaleString()}</span>
    <span class='badge badge-pill badge-primary'>${expenseName}</span>
    <span class='remove'>X</span>
    `;
    
    expenses.appendChild(li);
  }

  trackBudget(spended) {
    let bLeft = userBudget.subtractFromBudget(spended);
    console.log(bLeft);
    budgetLeft.innerHTML = `${Number(bLeft).toLocaleString()}`;
  }

  printMessage(message, className) {
    const div = document.createElement("div");
    div.classList.add("alert", "text-center", className);
    div.appendChild(document.createTextNode(message));
    budgetAmount.appendChild(div);

    setTimeout(() => {
      document.querySelector(".alert").remove();
      form.reset();
    }, 3500);
  }
}

// Variables
const budgetEntry = document.querySelector(".amout input"),
 budgetAmount = document.querySelector(".budgetamount"),
 budgetTotal = document.querySelector("#total"),
 budgetLeft = document.querySelector("#left"),
 amount = document.querySelector("#amount"),
 form = document.querySelector("#add-expense"),
 expenseN = document.querySelector("#expense"),
 expenses = document.querySelector("#expenses"),
 chartControl = document.querySelector("#chartcontrol"),
 reset = document.querySelector("#reset");
let userBudget;

const html = new HTML();

// Eventlisteners
chartControl.addEventListener("click", chControl);
reset.addEventListener("click", resetFunction);

budgetEntry.addEventListener("blur", function () {
  userBudget = budgetEntry.value;
  userBudget = new Budget(userBudget);
  console.log(userBudget);
  html.insertBudget(userBudget.budget);
  updateBudget();
});

budgetEntry.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    userBudget = budgetEntry.value;
    userBudget = new Budget(userBudget);
    html.insertBudget(userBudget.budget);
    updateBudget();
  }
});

  expenses.addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target.classList.contains("remove")) {
      console.log("its contains remove");
      console.log(e.target.parentElement.querySelector(".badge").textContent);
      let both = localStorage.getItem("Both");
      both = JSON.parse(both);
      console.log(both.expenseName.length);
      console.log(both);
      let dataId = e.target.parentElement.getAttribute("data-id");
      console.log(both.expenseName[dataId]);
      console.log(e.target.parentElement.querySelector(".badge").textContent);
      if (e.target.parentElement.querySelector(".badge").textContent === both.expenseName[dataId]) {
        let leftBudget = localStorage.getItem("Left");
        let newtBudget = leftBudget - both.expenseAmount[dataId];
        console.log(both.expenseAmount[dataId]);
        console.log(newtBudget);
        localStorage.setItem("Left", newtBudget);
        both.expenseName.splice(dataId, 1);
        both.expenseAmount.splice(dataId, 1);
        spendedArray.splice(dataId, 1)
        namesArray.splice(dataId, 1)
        console.log(spendedArray);
        console.log(namesArray);
        console.log(both);
        localStorage.setItem("Both", JSON.stringify(both));
        e.target.parentElement.remove();
        document.querySelectorAll("#expenses > ul > li").forEach((x) => x.remove());
        updateAll();
        //insertFunction()
        insertFunctionForW();
        chart();
      }
    }
    console.log(expenses);
  });

form.addEventListener("submit", expense);

// add new Expense function
function expense(e) {
  e.preventDefault();
  userBudget = budgetEntry.value;
  userBudget = new Budget(userBudget);
  curentBudget = userBudget.budget;
  console.log(curentBudget);
  let spended = amount.value;
  let expenseName = expenseN.value;
  let newBudget = curentBudget - spended;
  if (spended == "" || spended == 0) {
    html.printMessage("Error! Please insert data correctly", "alert-danger");
  } else {
    html.insertExpense(spended, expenseName);
    html.trackBudget(spended);
    let oldCurentBudget = localStorage.getItem("Budget");
    let newCurentBudget = localStorage.getItem("Both");
    newCurentBudget = JSON.parse(newCurentBudget);
    console.log(newCurentBudget);
    console.log(newCurentBudget.expenseAmount);
    console.log(oldCurentBudget);
    for (let i = 0; i < newCurentBudget.expenseAmount.length; i++) {
      console.log(newCurentBudget.expenseAmount[i]);
      oldCurentBudget -= newCurentBudget.expenseAmount[i];
    }
    console.log(oldCurentBudget);
    budgetLeft.innerHTML = `${Number(oldCurentBudget).toLocaleString()}`;

    localStorage.setItem("Budget", userBudget.budget);
    console.log(spendedArray);
    console.log(namesArray);

    chart();
    chartD();
  }

  console.log(curentBudget);
}



// send to html.insertBudget function
insertFunction();
function insertFunction() {
  if (localStorage.getItem("Budget") && localStorage.getItem("Both")) {
    ls = localStorage.getItem("Both");
    console.log(ls);
    console.log(JSON.parse(ls));
    ls = JSON.parse(ls);
    console.log(ls.expenseName);

    lsBudget = localStorage.getItem("Budget");
    html.insertBudget(lsBudget);

    console.log(typeof ls);
    let newBud = new Budget(lsBudget);
    for (let i = 0; i < ls.expenseAmount.length; i++) {
      html.insertExpense(ls.expenseAmount[i], ls.expenseName[i]);
      console.log(ls.expenseAmount[i]);
      let update = newBud.subtractFromBudget(ls.expenseAmount[i]);
      localStorage.setItem("Left", Number(update));
      budgetLeft.innerHTML = `${Number(update).toLocaleString()}`;
    }
  }
}

// send to html.insertBudgetWithoutSave function
function insertFunctionForW() {
  if (localStorage.getItem("Budget") && localStorage.getItem("Both")) {
    ls = localStorage.getItem("Both");
    ls = JSON.parse(ls);
    lsBudget = localStorage.getItem("Budget");
    html.insertBudget(lsBudget);
    console.log(typeof ls);
    let newBud = new Budget(lsBudget);
    for (let i = 0; i < ls.expenseAmount.length; i++) {
      html.insertExpenseWithOutSave(ls.expenseAmount[i], ls.expenseName[i]);
      let update = newBud.subtractFromBudget(ls.expenseAmount[i]);
      localStorage.setItem("Left", Number(update));
      budgetLeft.innerHTML = `${Number(update).toLocaleString()}`;
    }
  }
}
// keeps "Budget" in LocalStorage updated. Also tells other function to renew the data with new "Budget"
function updateBudget() {
  let curentBudget = localStorage.getItem("Budget");
  let newCurentBudget = document.querySelector("input[name=budget]").value;
  if (newCurentBudget !== curentBudget) {
    localStorage.setItem("Budget", newCurentBudget);
    updateAll();
  }
}
//updates "Budget Left" in html and LocalStorage
function updateAll() {
  let curentBudget = localStorage.getItem("Budget");
  console.log(curentBudget);
  if (localStorage.getItem("Both")) {
    let both = localStorage.getItem("Both");
    both = JSON.parse(both);
    let allExpenses = 0;
    for (let i = 0; i < both.expenseAmount.length; i++) {
      allExpenses += Number(both.expenseAmount[i]);
    }
    let finalBudget = curentBudget - allExpenses;
    console.log(both.expenseAmount[0]);
    console.log(allExpenses);
    console.log(finalBudget);
    budgetLeft.innerHTML = Number(finalBudget).toLocaleString();
    localStorage.setItem("Left", finalBudget);
  }
}

// displays the google chart
function chart() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  ls = localStorage.getItem("Both");
  ls = JSON.parse(ls);
  let newArray = [];
  console.log(newArray instanceof Array);
  newArray.push(["Expenses", "Expense Amount"]);
  for (let i = 0; i < ls.expenseAmount.length; i++) {
    newArray.push([`${ls.expenseName[i]}`, ls.expenseAmount[i]]);
  }

  console.log(typeof newArray);
  console.log(newArray);
  console.log(newArray[0] + " " + newArray[1]);
  console.log(newArray[0]);
  console.log(typeof newArray[0]);

  let newArraySecond = [];
  newArraySecond.push(newArray);
  console.log(newArraySecond);

  function drawChart() {
    for (let i = 0; i < newArraySecond.length; i++) {
      var data = google.visualization.arrayToDataTable(newArraySecond[i]);

      console.log(newArray[i]);
    }

    var options = {
      title: "Chart of Expenses",
      titleTextStyle: {
        bold: true,
        fontSize: 23,
        alignment: "none",
      },
      is3D: true,
      height: 330,
      width: 500,
      fontSize: 17,
      fontName: "Roboto",
      backgroundColor: {
        fill: "transparent",
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("piechart_3d")
    );
    chart.draw(data, options);
  }
}
//chart()

// reset all data function. basically destroys everything in LocalStorage
function resetFunction(){
  let conf = confirm("Are You Sure You Want To Delete Everything?")
   if (conf == true) {
     reset.style = 'transform: scale(1.5);'
     document.querySelector('#reset > img').style = 'transition: 3s;transform: rotate(360deg);'
 
     setTimeout(() => {
     reset.style = ''
     document.querySelector('#reset > img').style = ''
     }, 3000);
     setTimeout(() => {
         localStorage.clear()
     }, 4000);
     setTimeout(() => {
         window.location.reload()
     }, 4100);
 
 }
 }