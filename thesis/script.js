$(document).ready(function () {
      // Initialize Chosen.js
      // $('.chosen-select').Choices();
      const elementban = document.querySelector('.ban-select');
      const choicesban = new Choices(elementban,{
         removeItemButton: true,
         duplicateItemsAllowed: false,
      });
      const element = document.querySelector('.chosen-select');
      const choices = new Choices(element,{
         removeItemButton: true,
         duplicateItemsAllowed: false,
      });

      // Array to hold selected items in the order they were selected
      let selectedItems = [];

      // Event listener to track selection order
      $('#predictData').on('change', function () {
        const selectedValues = $(this).val() || [];

        // Add new selected items to the selectedItems array, maintaining order
        selectedValues.forEach(item => {
          if (!selectedItems.includes(item)) {
            selectedItems.push(item);
          }
        });

        // Remove items that are no longer selected from the selectedItems array
        selectedItems = selectedItems.filter(item => selectedValues.includes(item));

        console.log(selectedItems);
      });

      // Array to hold selected items in the order they were selected
      let banItems = [];

      // Event listener to track selection order
      $('#banData').on('change', function () {
        const selectedValues = $(this).val() || [];

        // Add new selected items to the banItems array, maintaining order
        selectedValues.forEach(item => {
          if (!banItems.includes(item)) {
            banItems.push(item);
          }
        });

        // Remove items that are no longer selected from the banItems array
        banItems = banItems.filter(item => selectedValues.includes(item));

        console.log(banItems);
      });

      // Submit data and display it in the response paragraph
      window.submitData = function () {
        const responseElement = $('#input');

        // Parse the selected items into arrays and flatten the array
        let combinedArray = [];
        selectedItems.forEach(item => {
          let parsedArray = JSON.parse(item);
          combinedArray = combinedArray.concat(parsedArray);
        });
        
        // Parse the selected items into arrays and flatten the array
        let banArray = [];
        banItems.forEach(item => {
          banArray = banArray.concat(item);
        });

        // Prepare the data object with the key 'input'
        const dataToSend = { 
          ban: banArray,
          input: combinedArray,
          // method: $('#metode').val(),
          length: combinedArray.length
        };

        console.log("Data to be sent:", dataToSend);

        // Simulate API request
        // Replace the following URL with your API endpoint
        const baseUrl = $('#baseUrl').val();
        const apiUrl = `${baseUrl}/api/recomendation`;

        $.ajax({
          url: apiUrl,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(dataToSend),
          beforeSend: function () {
            $("#card-container").empty(); // Kosongkan container sebelum load data
            responseElement.text('Loading ...');
          },
          success: function (response) {
            responseElement.text(JSON.stringify(response));

            // Memuat JSON lokal berisi nama hero dan URL gambar
            $.getJSON("hero.json", function(heroData) {
              let heroes = response.prediction; // Ambil array hero dari response API
              let cardContainer = $("#card-container"); // Elemen tempat menampung card

              cardContainer.empty(); // Hapus isi sebelumnya jika ada

              // Loop untuk membuat card hero
              heroes.forEach(hero => {
                let heroInfo = heroData.find(h => h.name === hero); // Cari data hero di JSON

                if (heroInfo) { // Jika hero ditemukan di JSON
                  let cardHtml = `
                    <div class="col-6 mb-3">
                      <div class="card">
                        <img src="${heroInfo.image}" class="card-img-top" alt="${hero}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                          <h5 class="card-title">${hero}</h5>
                        </div>
                      </div>
                    </div>
                  `;
                  cardContainer.append(cardHtml); // Tambahkan card ke container
                }
              });
              $("#loading").hide(); // Sembunyikan loading setelah data selesai ditampilkan
            });
          },
          error: function (error) {
            responseElement.text('API Error: ' + JSON.stringify(error));
          }
        });
      };
    }
  );
