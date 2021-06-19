/* Used the sendMail code from the Resume project */
function sendMail(contactForm) {
    emailjs.send("service_x1zhgef","project2_template", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "message_request": contactForm.message.value
    })
    .then(
        function(response) {
            alert("Thank you for emailing me, I will respond as soon as I can!");
        },
        function(error) {
            alert("It would appear something went wrong: ", error);
        }
    );
    return false;  // To block from loading a new page
}