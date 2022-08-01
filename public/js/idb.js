let transactions = [];
let myChart;

// Fetch api transaction
fetch("/api/transaction")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // save db data on global variable
    transactions = data;

    populateTotal();
    populateTable();
    populateChart();
  });

  function populateTotal() {

  }

  function populateTable() {
  
  }
  
  function populateChart() {

}