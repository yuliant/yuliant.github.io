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
          method: $('#metode').val(),
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
          success: function (response) {
            responseElement.text('API Response: ' + JSON.stringify(response));
          },
          error: function (error) {
            responseElement.text('API Error: ' + JSON.stringify(error));
          }
        });
      };
    }
  );
