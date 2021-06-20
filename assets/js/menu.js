/* Custom Code */
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', function(){ getEvent(false, this); });
  });
  document.querySelectorAll('span').forEach(item => {
    item.addEventListener('click', function(){ getEvent(true, this); });
  });
});

function getEvent(isSpanTag, element){
  let modalName = "modal-";
  modalName += element.id;
  if(!isSpanTag){
    if(element.id != 'start'){
      openModal(modalName);
    } else{
      window.location.href = "game.html";
    } 
  } else{
    closeModal(element.parentElement.parentElement.parentElement.id);
  }
  
}

/* Code to add and remove classes: https://www.w3schools.com/jsref/prop_element_classlist.asp */
function openModal(modalId){
  let element = document.getElementById(modalId);
  element.classList.remove("hide-modal");
  element.classList.add("display-modal");
}

function closeModal(modalId){
  let element = document.getElementById(modalId);
  element.classList.remove("display-modal");
  element.classList.add("hide-modal");
}