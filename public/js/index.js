let transactions = [];
let myChart;

// Fetch api transaction
fetch("/api/transaction")
    .then(response => {
        return response.json();
    })
    .then(data => {


        transactions = data;
        popTotal();
        popTable();
        popChart();
    });
// POP TOTAL
function popTotal() {
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);
  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}
// POP TABLE
function popTable() {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    transactions.forEach(transaction => {
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${transaction.name}</td><td>${transaction.value}</td>`;
      tbody.appendChild(tr);
    });
}
//   POP CHART
function popChart() {
  let reversed = transactions.slice().reverse();
  let sum = 0;
  let labels = reversed.map(t => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });
  let data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
  });
//   DESTORY!!!!!!!!!!!!!!!!!!!!!!
  if (myChart) {
    myChart.destroy();
  }
  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: 'line',
      data: {
        labels,
        datasets: [{
            label: "Total Over Time",
            fill: true,
            backgroundColor: "#6666ff",
            data
        }]
    }
  });
}

// AFTER POP YOU GOTTA SEND
function sendTransaction(isAdding) {
    let nameEl = document.querySelector("#t-name");
    let amountEl = document.querySelector("#t-amount");
    let errorEl = document.querySelector(".form .error");

    if (nameEl.value === "" || amountEl.value === "") {
      errorEl.textContent = "Missing Information";
      return;
    }
    else {
      errorEl.textContent = "";
    }
  
    let transaction = {
      name: nameEl.value,
      value: amountEl.value,
      date: new Date().toISOString()
    };
    if (!isAdding) {
      transaction.value *= -1;
    }
    transactions.isArray(transactions);



    transactions.unshift(transaction);
//   RERUN cause stack told you to
    popChart();
    popTable();
    popTotal();
    
    fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
    .then(response => {    
      return response.json();
    })
    .then(data => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      }
      else {

        nameEl.value = "";
        amountEl.value = "";
      }
    })

    // CATCH ERR
    .catch(err => {
      saveRecord(transaction);
      nameEl.value = "";
      amountEl.value = "";
    });
  }
// SEND SEND SEND, BTN BTN, ON CLICKITY CLICK
  document.querySelector("#add-btn").onclick = function() {
    sendTransaction(true);
  };
  document.querySelector("#sub-btn").onclick = function() {
    sendTransaction(false);
  };