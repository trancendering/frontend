// Function to close the modal after 3 seconds
function closeModalAfterDelay() {
    var countdown = 0; // Set the initial countdown value to 0

    var countdownInterval = setInterval(function() {
        countdown += 0.1; // Increase the countdown value by 0.1

        if (countdown >= 3.0) {
            clearInterval(countdownInterval); // Stop the countdown when it reaches 3
            $('#statusSuccessModal').modal('hide');
            $('.progress-bar').css('width', '100%').attr('aria-valuenow', 100); // Set the progress bar width to 100%
        } else {
            // Update the countdown text
            $('#countdown').text(countdown.toFixed(1));

            // Update the progress bar widt
            var progress = countdown / 3 * 100 + 15; // Calculate the progress percentage + 보정도 조금 들어갔음 (15)
            $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
        }
    }, 100); // Update the countdown every 0.1 seconds

    // Set the initial progress bar width to 0
    $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
}

// // Call the function to close the modal after 3 seconds
// closeModalAfterDelay();

// // Apply the function to the progress bar component
// $(document).ready(function() {
//     closeModalAfterDelay();
// });
