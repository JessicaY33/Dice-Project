const stats = ["Mean", "Median", "Mode"];
const rounds = ["Round #"];
const frequency = [];
const data = [];

const amountForm = document.getElementById("amountForm");
const roundForm = document.getElementById("roundForm");

let amountSet = false;
let roundSet = false;

let diceAmount = 0;
let times = 0;

let mean = 0;
let median = 0;
let mode = 0;

console.log("active");

//Source: Bonnie Chan
function initialize()
{
 //reads the results of the form and will set up the frequency and rounds array accordingly 
 if(amountForm.amount.value != null)
 {
  amountSet = true;
 }
 if(roundForm.amount.value != null)
 {
  roundSet = true;
 }
 if(amountSet)
 {
  diceAmount = amountForm.amount.value;
  console.log(diceAmount);
 }
 if(roundSet)
 {
  times = roundForm.amount.value;
 }
}

//Source: https://www.w3schools.com/JS/js_random.asp
function roll() //Rolls the dice once and adds the result to the data array
{
  //selects a random number between 1 to 6
  const number = Math.floor(Math.random() * 6) + 1;
  data.push(number);
  console.log(data);
}

//Roll Button Function
const button = document.getElementById("roll");
button.addEventListener("click", roll);

//Source: https://stackoverflow.com/questions/29755879/event-listener-for-multiple-radio-button-groups
const dots = document.querySelectorAll("input[type=radio]");
let dotLength = dots.length;
while(dotLength--)
{
  dots[dotLength].addEventListener("click", initialize);
}

// Stat functions

//Source: https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places 
function simplify(num){ //rounds the number/result to show two decimal places
  return (Math.round((num)*100)/100).toFixed(2);
}

//Source: https://www.delftstack.com/howto/javascript/find-median-in-javascript/ 
function organize(data) //creates an organized version of the data array, it does not effect the original
{
  const sort = data.slice().sort((a, b) => a - b); 
  return sort;
}

function calMean(data) //Calculates Mean
{
  if(data.length > 0)
  {
    let total = 0;
    for(let num = 0; num < data.length; num++)
    {
      total += data[num];
    }
    mean = simplify(total/data.length);
  }
  return mean;
}

//Source: https://www.delftstack.com/howto/javascript/find-median-in-javascript/ 
function calMedian(data) //Calculates Mean
{
  if(data.length > 0)
  {
    const sort = organize(data);
    const middleIndex = Math.floor(sort.length/2);
    if(sort.length % 2 != 0) //if odd
    {
      median = sort[middleIndex];
    }
    else
    {
      median = simplify((sort[middleIndex] + sort[middleIndex - 1])/2);
    }
  }
  return median;
}

//Source: https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript 
function calMode(data)
{
  if(data.length > 0)
  {
    const sort = organize(data);
    let bestStreak = 0; //the highest appearance of a number
    let bestNum = sort[0]; //the number that appears the most
    let currentStreak = 0; //the current streak being counted
    let currentNum = 0; //the number being counted

    for(let x = 1; x < sort.length; x++) //goes throughout the array
    {
      if(sort[x - 1] !== sort[x]) //it keeps increasing the current streak until it reaches a different number
      {
        if(currentStreak > bestStreak)//checks if the recent streak that had ended is bigger than the current best streak
        {
          bestStreak = currentStreak; //If the current streak is greater, the best streak will now be the current streak
          bestNum = currentNum; //The best number is now the num that has the longest streak
        }
        currentStreak = 0; //streak resets
        currentNum = sort[x]; //changes to a new number
      }
      currentStreak++;
    }

    mode = bestNum; //mode is the number that appears the most in the data
  }
  return mode;
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