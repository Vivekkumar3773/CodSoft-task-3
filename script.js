// This is for my logic file in this project
const display = document.getElementById("display"); // Get the display element
const buttons = document.querySelectorAll(".btn"); // Get all buttons with the class "btn"
const history = document.getElementById("history"); // Get the history element

let currentInput = ""; // Store the current input
let operator = ""; 
let previousInput = ""; // Store the previous input
let historyLog = []; // Store the history of calculations

// Add event listeners to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent; // Get the text content of the button

    if (value === "C") {
      // Clear button
      currentInput = "";
      operator = "";
      previousInput = "";
      display.textContent = "0"; // Reset display to 0
    } else if (button.innerHTML.includes("bx-arrow-back")) {
      // Backspace button
      if (currentInput) {
        currentInput = currentInput.toString().slice(0, -1);
        display.textContent = currentInput || "0"; // Update display or show 0 if empty
      }
    } else if (value === "Save History") {
      // Save history button
      saveHistory(); 
    } else if (value === "=") {
      // Equals button
      if (operator && previousInput !== "") {
        try {
          const result = eval(`${previousInput} ${operator} ${currentInput}`); // Evaluate the expression
          display.textContent = result; // Display the result
          historyLog.push(
            `${previousInput} ${operator} ${currentInput} = ${result}` // Add to history log
          );
          updateHistory(); // Update the history display
          currentInput = result; 
          operator = "";
          previousInput = "";
        } catch (error) {
          display.textContent = "Error"; // Display error if eval fails
        }
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Operator buttons
      if (currentInput !== "") {
        operator = value; // Set the operator
        previousInput = currentInput; 
        currentInput = ""; // Reset current input
      }
    } else {
      // Number buttons
      currentInput += value; 
      display.textContent = currentInput; // Update the display
    }
  });
});

// Function to update the history display
function updateHistory() {
  history.innerHTML = historyLog.map((entry) => `<div>${entry}</div>`).join(""); // Create history entries
}
//My coding was end of this project  