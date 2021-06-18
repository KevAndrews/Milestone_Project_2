/* Custom Code */
$(document).ready(function() {
    let modalName = "modal-";
    $("button").click(function() {
      if($(this).attr("id") != 'start'){
        modalName += $(this).attr("id");
        openModal(modalName);
      } else{
        window.location.href = "game.html";
      } 
    });

    $("span").click(function() {
        closeModal(modalName);
        modalName = "modal-";
    });
});

/* Used JQuery_Method_Chaining___Challenge_1 as a template */
function openModal(modalId){
  $("#" + modalId).removeClass("hide-modal").addClass("display-modal");
}

function closeModal(modalId){
  $("#" + modalId).removeClass("display-modal").addClass("hide-modal");
}