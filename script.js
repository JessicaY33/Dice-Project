//Source: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces#creating_an_html_table_dynamically
function makeTable(row, column)
{
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < row; i++) {
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