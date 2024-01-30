const statData = [];
const frequency = [];
const data = [];

let statLabel = ["Mean", "Median", "Mode"];
let frequencyLabel = [];
let roundsLabel = ["Round #", "Dice 1"];

const amountForm = document.getElementById("amountForm");
const roundForm = document.getElementById("roundForm");

let amountSet = false;
let roundSet = false;

let diceAmount = 0;
let rounds = 0;

let mean = 0;
let median = 0;
let mode = 0;
let double = 0;
let triple = 0;

console.log("active");

//Source: Bonnie Chan
//reads the results of the form and will set up the frequency and rounds array accordingly 
function initializeAmount()
{
 if(amountForm.amount.value != null)
 {
  amountSet = true;
 }
 if(amountSet)
 {
  diceAmount = amountForm.amount.value;
  disableRadios();
  console.log(diceAmount);
  setDiceLabels();
  setUpTables();
}

//After a dice amount is set the rounds, stat, and frequency table would update accordingly
function setDiceLabels()
{
  if(diceAmount > 1)
  {
    roundsLabel.push("Dice 2");
    statLabel.push("Doubles");
    if(diceAmount > 2)
    {
      roundsLabel.push("Dice 3");
      statLabel.push("Triples");
      setFrequency(3, 18);
    }
    else
    {
      setFrequency(2, 12);
    }
  }
  else
  {
    setFrequency(1, 6);
  }
 }
}

//Sets dice frequency for the frequency label
function setFrequency(min, max)
{
  for(let x = min; x < max; x++)
  {
    frequencyLabel.push(x);
  }
}

function initializeRound()
{
 if(roundForm.rounds.value != null)
 {
  roundSet = true;
 }
 if(roundSet)
 {
  rounds = roundForm.rounds.value;
  console.log(rounds);
  setUpTables();
 }
}

//Sets the round numbers in the round label
function setRoundsLabel(roundNum)
{
  for(let x = 1; x < roundNum + 1; x++)
  {
    roundsLabel.push(x);
  }
}

function disableRadios()
{
  const dots = document.querySelectorAll("input[type=radio]");
  let dotLength = dots.length;
  while(dotLength--)
  {
    dots[dotLength].disabled = true;
  }
}

//Source: https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
//Prevents the page from refreshing every time the submit button is clicked
function formSubmit(event)
{
  event.preventDefault();
  initializeRound();
  document.getElementById("text").disabled = true;
  document.getElementById("submitButton").disabled = true;
}

//Once all the forms are made, it will set up the tables on the website
function setUpTables()
{
  if(diceAmount != 0 && rounds != 0)
  {
    makeTable(3, 3, data, true, false, statLabel, "stats");
  }
}

//Roll Functions

//Source: https://www.w3schools.com/JS/js_random.asp
function roll() //Rolls the dice once and adds the result to the data array
{
  //selects a random number between 1 to 6
  const number = Math.floor(Math.random() * 6) + 1;
  data.push(number);
  console.log(data);
}

function startingRolls(num)
{
  num = num * diceAmount;
  for(let x = 0; x < num; x++)
  {
    roll();
  }
}

function doubleCounter()
{
  if(diceAmount == 3)
  {
    for(let x = 0; x < data.length; x + 3)
    {
      if(data[x] == data[x + 1])
      {
        double++;
      }
      else if(data[x] == data[x + 2])
      {
        double++;
      }
      else if(data[x + 1] == data[x + 2])
      {
        double++;
      }
    }
  }
  else
  {
    for(let x = 0; x < data.length; x + 2)
    {
      if(data[x] == data[x + 1])
      {
        double++;
      }
    }
  }
}

function tripleCounter()
{
  for(let x = 0; x < data.length; x + 3)
  {
    if((data[x] == data[x + 1]) && (data[x + 1] == data[x + 2]))
    {
      triple++;
    }
  }
}

const button = document.getElementById("roll");
button.addEventListener("click", roll);

//Source: https://stackoverflow.com/questions/29755879/event-listener-for-multiple-radio-button-groups
const dots = document.querySelectorAll("input[type=radio]");
let dotLength = dots.length;
while(dotLength--)
{
  dots[dotLength].addEventListener("click", initializeAmount);
}

roundForm.addEventListener("submit", formSubmit);

// Stat functions

//Source: https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places 
function simplify(num){ //rounds the number/result to show two decimal places
  return (Math.round((num)*100)/100).toFixed(2);
}

//Source: https://www.delftstack.com/howto/javascript/find-median-in-javascript/ 
function organizeData() //creates an organized version of the data array, it does not effect the original
{
  const sort = data.slice().sort((a, b) => a - b); 
  return sort;
}

function calMean() //Calculates Mean
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
function calMedian() //Calculates Median
{
  if(data.length > 0)
  {
    const sort = organizeData();
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
function calMode() //Calculates Mode
{
  if(data.length > 0)
  {
    const sort = organizeData();
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

function setStatData()
{
  statData.push(calMean());
  statData.push(calMedian());
  statData.push(calMode());
  if(diceAmount > 1)
  {
    statData.push(double);
    if(diceAmount > 2)
    {
      statData.push(triple);
    }
  }
}

//Source: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces#creating_an_html_table_dynamically
function makeTable(row, column, data, doLabelRow, doLabelCol, label, location)
{
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    let dataIndex = 0;
    let cellText = "";
    let labelSlot = 0;

    for (let i = 0; i < row; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < column; j++) {
          const cell = document.createElement("td");
          if(doLabelRow)
          {
            if(j == 0)
            {
              cellText = document.createTextNode(label[labelSlot]);
              if(labelSlot < label.length)
              {
                labelSlot++;
              }
            }
          }
          else if(doLabelCol)
          {
            if(i == 0)
            {
              cellText = document.createTextNode(label[labelSlot]);
              if(labelSlot < label.length)
              {
                labelSlot++;
              }
            }
          }
          else
          {
            cellText = document.createTextNode(data[dataIndex]);
            if(dataIndex < data.length)
            {
              dataIndex++;
            }
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
  tbl.appendChild(tblBody);
  document.getElementById(location).appendChild(tbl);
  tbl.setAttribute("border", "2");
}