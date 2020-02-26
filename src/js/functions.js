const validationErrorLenght = "Должно быть от 2 до 30 символов";
const validationError = "Это обязательное поле";

function validationInput(variable) {
    if ((variable.validity.tooShort) ||
      (variable.validity.tooLong)) {
      variable.nextElementSibling.textContent = validationErrorLenght;
      return false;
    } else if ((variable.value === '') ||
      (variable.value === null) || (variable.value === undefined)) {
      variable.nextElementSibling.textContent = validationError;
      return false;
    } else {
      variable.nextElementSibling.textContent = '';
      return true;
    }
  }
  
  function validationForm(variable) {
    const form = variable.parentNode;
    const button = form.lastElementChild;
    const variable1 = form.firstElementChild;
    const variable2 = variable1.nextElementSibling.nextElementSibling;
  
    if ((validation(variable1)) && (validation(variable2))) {
      button.classList.add('popup__button_active');
    } else {
      button.classList.remove('popup__button_active');
    }
  
  }
  
  function validation(variable) {
    /* Можно лучше: удалите else а внутри условия добавьте return
     например было: 
     if(условие){  
       // ваш код 
     } else if(условие2){ 
       // ваш код 
     } 
     стало : 
     if(условие){  
         // ваш код 
      return; 
    } 
   
     if(условие2){ 
      // ваш код 
      return; 
    } 
   
  */
    if ((variable.validity.tooShort) ||
      (variable.validity.tooLong)) {
      return false;
    } else if ((variable.value === '') ||
      (variable.value === null) || (variable.value === undefined)) {
      return false;
    } else {
      return true;
    }
  }
  
  function getProfile(api, name, about, image) {
    return api.getProfileApi()
            .then((res) =>{
              name.textContent = res.name;
              about.textContent = res.about;
              image.style.backgroundImage =  `url(${res.avatar})`;
            })
  }

  function urlConcat(url, host){
    const arr = [url, host];
    return arr.join('');
  }

  export {validationInput, validationForm, getProfile, urlConcat};