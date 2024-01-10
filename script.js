const stats = ["Mean", "Median", "Mode"];
const rounds = ["Round #"];
const frequency = [];
const data = [];
let diceAmount = 0;
let mean = 0;
let median = 0;
let mode = 0;

console.log("active");

//Source: https://stackoverflow.com/questions/8922002/attach-event-listener-through-javascript-to-radio-button

function setUp()
{
 //reads the results of the form and will set up the frequency and rounds array accordingly 
}

//Source: https://www.w3schools.com/JS/js_random.asp
function randomNum()
{
  //returns a random number between 1 to 6
  return Math.floor(Math.random() * 6) + 1;
}

//Source: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces#creating_an_html_table_dynamically
function makeTable(row, column, data)
{
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < row.length; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < column; j++) {
        const cell = document.createElement("td");
        cell.appendChild(cellText);
        row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
}