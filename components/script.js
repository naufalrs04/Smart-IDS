// Submit Form
$(document).ready(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    console.log(formData);

    $.ajax({
      url: "/predict",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        data = response.data[0];
        console.log(data);
        console.log("teeys");

        if (data.type == "single") {
          if (data.prediction == 0) {
            $("#result")
              .html(`<div class="flex items-center p-4 mb-4 text-xs text-green-800 border border-green-300 rounded-lg bg-green-50 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Info !</span> This Packet is predicted as not Intrusion by ${data.model}
                </div>
                </div>`);
          } else if (data.prediction == 1) {
            $("#result")
              .html(`<div class="flex items-center p-4 mb-4 text-xs text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Danger !</span> This Packet is predicted as Intrusion by ${data.model}
                </div>
                </div>`);
          } else {
            if (data.percent < 50) {
              $("#result")
                .html(`<div class="flex items-center p-4 mb-4 text-xs text-green-800 border border-green-300 rounded-lg bg-green-50 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Info !</span> This Packet is ${data.percent}% predicted as not Intrusion 
                </div>
                </div>`);
            } else {
              $("#result")
                .html(`<div class="flex items-center p-4 mb-4 text-xs text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Danger !</span> This Packet is ${data.percent}% predicted as Intrusion  
                </div>
                </div>`);
            }
          }
        } else {
          var table = `<div class="overflow-x-auto">
              <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Prediction Result By ${data.model == "combined" ? "Combined Algorithm" : data.model}</h2>
              </div>
              <table class="mt-5 min-w-full divide-y divide-gray-200 text-center border">
                  <thead class="bg-gray-50">
                      <tr>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">No</th>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">pkts</th>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">bytes</th>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">spkts</th>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">sbytes</th>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">TnBPDstIP</th>
                          <th class="px-6 py-3 text-xs font-medium text-gray-500">Prediction</th>
                      </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">`;

          for (let i = 0; i < data.prediction.length; i++) {
            const row = data.data[i];
            if (data.model != "combined") {
              table += `<tr>
                <td class="px-5 py-4 text-gray-900">${i + 1}</td>
                <td class="px-5 py-4 text-gray-900">${row.pkts}</td>
                <td class="px-5 py-4 text-gray-900">${row.bytes}</td>
                <td class="px-5 py-4 text-gray-900">${row.spkts}</td>
                <td class="px-5 py-4 text-gray-900">${row.sbytes}</td>
                <td class="px-5 py-4 text-gray-900">${row.TnBPDstIP}</td>
                <td class="px-5 py-4">
                    <div class="flex items-center justify-center text-center ${data.prediction[i] == 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-medium px-2.5 py-0.5 rounded-full">
                        ${data.prediction[i] == 0 ? "Not Intrusion" : "Intrusion"}
                    </div>
                </td>
            </tr>`;
            } else {
              table += `<tr>
                <td class="px-5 py-4 text-gray-900">${i + 1}</td>
                <td class="px-5 py-4 text-gray-900">${row.pkts}</td>
                <td class="px-5 py-4 text-gray-900">${row.bytes}</td>
                <td class="px-5 py-4 text-gray-900">${row.spkts}</td>
                <td class="px-5 py-4 text-gray-900">${row.sbytes}</td>
                <td class="px-5 py-4 text-gray-900">${row.TnBPDstIP}</td>
                <td class="px-5 py-4">
                    <div class="flex items-center justify-center text-center ${data.prediction[i] < 50 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-medium px-2.5 py-0.5 rounded-full">
                        ${data.prediction[i]}% Intrusion
                    </div>
                </td>
            </tr>`;
            }
          }

          table += `</tbody></table></div>`;
          $("#result").html(table);
        }
      },
      error: function () {
        $("#result").text("Error submitting form!");
      },
    });
  });

  $("#reset-btn").on("click", function () {
    $("form")[0].reset();
    $("#result").empty();
  });

  // SweetAlert Trigger - Dekstop
  $("#howitworks").on("click", function () {
    Swal.fire({
      title: "How it Works ?",
      text: "This application detects intrusions based on anomaly detection using Machine Learning Model like KNN, Random Forest, an Decision Tree.",
      icon: "question",
      confirmButtonText: "Close",
    });
  });

  // SweetAlert Trigger - Mobile
  $("#howitworks-Mobile").on("click", function () {
    Swal.fire({
      title: "How it Works ?",
      text: "This application detects intrusions based on anomaly detection using Machine Learning Model like KNN, Random Forest, an Decision Tree.",
      icon: "question",
      confirmButtonText: "Close",
    });
  });
});

const algorithmOptions = {
  "Version1.0.0": ["KNN"],
  "Version1.0.1": [
    "KNN",
    "SVM",
    "Random Forest",
    "Naive Bayes",
    "Decision Tree",
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  const versionBtn = document.getElementById("versionBtn");
  const versionMenu = document.getElementById("versionMenu");

  versionBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    versionMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function (event) {
    if (
      versionBtn &&
      versionMenu &&
      !versionBtn.contains(event.target) &&
      !versionMenu.contains(event.target)
    ) {
      versionMenu.classList.add("hidden");
    }
  });

  // Add smooth transitions for form inputs
  document.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("focus", function () {
      this.parentElement.classList.add("transform", "scale-105");
    });

    element.addEventListener("blur", function () {
      this.parentElement.classList.remove("transform", "scale-105");
    });
  });
});

// Mobile menu logic
let mobileMenuOpen = false;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleDropdown = toggleDropdown;

function toggleDropdown(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.getElementById("mobileMenuBtn");

  if (!mobileMenuOpen) {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    hamburger.classList.add("active");
    mobileMenuOpen = true;
  } else {
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    hamburger.classList.remove("active");
    mobileMenuOpen = false;
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  if (
    mobileMenuOpen &&
    !mobileMenu.contains(event.target) &&
    !mobileMenuBtn.contains(event.target)
  ) {
    toggleMobileMenu();
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 1024 && mobileMenuOpen) {
    toggleMobileMenu();
  }
});
