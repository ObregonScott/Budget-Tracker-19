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
function pChart() {

}