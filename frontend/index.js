function submitForm() {
  var bookTitle = document.getElementById("bookTitle").value;
  if (bookTitle) {
    // Getting curr date and time
    var currentDate = new Date();
    var takenOn = currentDate.toLocaleString();

    // Cal return date and time
    var returnDate = new Date(currentDate.getTime() + 1 * 60 * 60 * 1000);
    var returnOn = returnDate.toLocaleString();

    // Display book information
    document.getElementById("bookName").innerHTML = "Book Name: " + bookTitle;
    document.getElementById("takenOn").innerHTML = "Book Taken On: " + takenOn;
    document.getElementById("returnOn").innerHTML =
      "Book Return On: " + returnOn;

    // Calculate and display penalty if exceeded 1 hour
    var timeDifference = returnDate.getTime() - currentDate.getTime();
    var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    var penalty = hoursDifference > 1 ? (hoursDifference - 1) * 10 : 0;

    var bookInfo = {
      bookName: bookTitle,
      takenOn: takenOn,
      returnOn: returnOn,
      penalty: penalty,
    };
    axios
      .post("http://localhost:4000/general/post-gen", bookInfo)
      .then((res) => fetchStoredBookings(res.data))
      .catch((err) => console.log(err));
    //localStorage.setItem("bookInfo", JSON.stringify(bookInfo));

    if (penalty < 0) {
      document.getElementById("penaltySection").style.display = "none";
    }
  } else {
    alert("Please enter the book title.");
  }
}

function returnBook() {
  axios
    .get("http://localhost:4000/general/get-gen")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i]) {
          var returnedBookDiv = document.createElement("div");
          returnedBookDiv.innerHTML =
            "<h2>Returned Book Information</h2>" +
            "<p>Book Name: " +
            response.data[i].bookName +
            "</p>" +
            "<p>Book Taken On: " +
            response.data[i].takenOn +
            "</p>" +
            "<p>Book Return On: " +
            response.data[i].returnOn +
            "</p>" +
            "<p>Penalty: " +
            response.data[i].penalty +
            " rupees</p>";
          // Append the new elements to the document
          document.body.appendChild(returnedBookDiv);

          // Clear existing book information
          document.getElementById("bookInfo").style.display = "none";

          // Optionally, you can hide the penalty section as well
          document.getElementById("penaltySection").style.display = "none";
        } else {
          alert("No book information found.");
        }
      }
    })
    .catch((err) => console.log(err));
}

function submitPenalty() {
  var penaltyAmount = document.getElementById("penaltyAmount").value;

  if (penaltyAmount) {
    // Handle the penalty amount (e.g., save it or perform further actions)
    alert("Penalty submitted: " + penaltyAmount + " rupees");

    // Clear the penalty input field
    document.getElementById("penaltyAmount").value = "";
  } else {
    alert("Please enter the penalty amount.");
  }
}

function fetchStoredBookings(bookInfo) {
  document.getElementById("bookName").innerHTML =
    "Book Name: " + bookInfo.bookName;
  document.getElementById("takenOn").innerHTML =
    "Book Taken On: " + bookInfo.takenOn;
  document.getElementById("returnOn").innerHTML =
    "Book Return On: " + bookInfo.returnOn;
  document.getElementById("penalty").innerHTML =
    "Penalty : " + bookInfo.penalty + " rupees";

  document.getElementById("bookInfo").style.display = "block";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/general/get-gen")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i]) {
          var returnedBookDiv = document.createElement("div");
          returnedBookDiv.innerHTML =
            "<h2>Returned Book Information</h2>" +
            "<p>Book Name: " +
            response.data[i].bookName +
            "</p>" +
            "<p>Book Taken On: " +
            response.data[i].takenOn +
            "</p>" +
            "<p>Book Return On: " +
            response.data[i].returnOn +
            "</p>" +
            "<p>Penalty: " +
            response.data[i].penalty +
            " rupees</p>";
          // Append the new elements to the document
          document.body.appendChild(returnedBookDiv);

          // Clear existing book information
          document.getElementById("bookInfo").style.display = "block";

          // Optionally, you can hide the penalty section as well
          document.getElementById("penaltySection").style.display = "none";
        } else {
          alert("No book information found.");
        }
      }
    })
    .catch((err) => console.log(err));
});
