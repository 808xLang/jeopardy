// categories is the main data structure for the app; it looks like this:

// const {default: axios} = require("axios");

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setCategories(categoryIds) {
  for (const i in categoryIds) {
    const categoryId = categoryIds[i];
    console.log({ categoryId });
    const monkeyResponse = await axios.get(
      `https://jservice.io//api/category?id=${categoryId.id}`
    );
    console.log({ monkeyResponse });
    // adding each category to the categories array
    categories.push({
      id: categoryId.id,
      title: categoryId.title,
      clues: monkeyResponse.data.clues,
    });
  }
}

async function setupAndStart() {
  // get random category Ids
  const categoryResponse = await axios.get(
    "https://jservice.io/api/categories?count=6"
  );
  console.log({ categoryResponse });
  const categoryIds = categoryResponse.data;
  console.log({ categoryIds });

  // get data for each category id
  await setCategories(categoryIds);
  console.log({ categories });
  generateTable();
}

function putCategoriesInTable() {
  const tbl = document.getElementById("jeopardy");
  for (let i = 0; i < tbl.rows.length; i++) {
    for (let j = 0; j < tbl.rows[i].cells.length; j++) {
      const monkeyCell = tbl.rows[i].cells[j]
      if (i===0){
        // const response = await fetch (url);
        // const data = await response.json();
        monkeyCell.innerHTML = `  ${categories[j]?.title}    ` 
      }
      else {
      
        // add event listener to the cell to change the inner html to the correct catrgory question
        monkeyCell.addEventListener("click", () => {
          // debugger
          if (monkeyCell.innerHTML !== '?'){
            monkeyCell.innerHTML = `${categories[j].clues[i].answer}`
          }
          else {
          monkeyCell.innerHTML = `${categories[j].clues[i].question}`
        }
          })
      }
    }
  }
}

generateTable = () => {
  // creates a <table> element and a <tbody> element
  const tbl = document.getElementById("jeopardy");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < 7; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement(i === 0 ? "th" : "td");
      // cell.onclick = () => {this.moveSelect(i,j)};
      //Changes the name to format in css
      cell.id = `${i}-${j}`;
      cell.innerHTML = "?";
      cell.class = "newMonkey"
      row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  // document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  // tbl.setAttribute("border", "2");
  console.log("monkey");
  putCategoriesInTable()
};

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */
document.getElementById("start").addEventListener("click", setupAndStart);

// TODO
