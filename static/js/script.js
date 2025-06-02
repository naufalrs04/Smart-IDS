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
        console.log('teeys');

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
          } else{
            if(data.percent < 50){
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
            }else{
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
              <h2 class="text-lg font-semibold text-gray-900">Prediction Result By ${data.model == 'combined' ? 'Combined Algorithm' : data.model}</h2>
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
            if(data.model != 'combined'){
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
            }else{
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

  // SweetAlert Trigger
  $("#howitworks").on("click", function () {
    Swal.fire({
      title: "How it Works ?",
      text: "This application detects intrusions based on anomaly detection using AI. It utilizes optimized features for improved accuracy and performance.",
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

let currentVersion = null;

function switchContent(version) {
  currentVersion = version;

  const contentDiv = document.getElementById("knn-content");
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (version === "Version1.0.0") {
    contentDiv.style.display = "block";
    Swal.fire("Version 1.0.0", "Only K-Nearest Neighbor is available.", "info");
  } else if (version === "Version1.0.1") {
    let html =
      '<p class="mb-2">Select Algorithm:</p><ul class="list-disc ml-6">';
    algorithmOptions[version].forEach((algo) => {
      html += `<li><a href="#" onclick="loadAlgorithm('${algo}')" class="text-blue-600 hover:underline">${algo}</a></li>`;
    });
    html += "</ul>";

    Swal.fire({
      title: "Version 1.0.1",
      html: html,
      icon: "info",
      showConfirmButton: false,
    });
  }
}

function loadAlgorithm(algo) {
  Swal.fire(`You selected ${algo}`, "", "success");
  //....
}

document.addEventListener("DOMContentLoaded", function () {
  const versionBtn = document.getElementById("versionBtn");
  const versionMenu = document.getElementById("versionMenu");

  versionBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // prevent event bubbling
    versionMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function () {
    versionMenu.classList.add("hidden");
  });

        document.getElementById('versionBtn').addEventListener('click', function() {
        const menu = document.getElementById('versionMenu');
        menu.classList.toggle('hidden');
      });

      document.addEventListener('click', function(event) {
        const btn = document.getElementById('versionBtn');
        const menu = document.getElementById('versionMenu');
        
        if (!btn.contains(event.target) && !menu.contains(event.target)) {
          menu.classList.add('hidden');
        }
      });
});



