

var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var dobError = document.getElementById('dob-error');
var dobok = document.getElementById('dob-ok');
var submitError = document.getElementById('submit-error');

var userName;
var email;
var phone;
var dob
var stored = JSON.parse(localStorage.getItem('stored')) || [];




function validateName() {
  userName = document.getElementById('contact-name').value;

  if (userName.length == 0) {
    nameError.innerHTML = 'Name is required';
    return false;
  } else if (userName.length <= 2) {
    nameError.innerHTML = 'required minimum 3 characters';
    return false;
  } else if (userName.length > 20) {
    nameError.innerHTML = 'maximum 20 characters';
    return false;
  }


  nameError.innerHTML = 'valid';
  return true;

}




function validateEmail() {
  email = document.getElementById('contact-email').value;

  if (email.length == 0) {
    emailError.innerHTML = 'Email is required';
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.innerHTML = 'Email invalid'
    return false;
  }

  if (stored.filter(e => e.email === email).length > 0) {

    emailError.innerHTML = 'Email Already Exists';
    return false;

  }




  emailError.innerHTML = 'Valid';
  return true;



}






function validatePhone() {
  phone = document.getElementById('contact-phone').value;

  console.log(phone.length);

  if (phone.length != 0) {

    if (phone.length > 0 && phone.length < 10) {
      phoneError.innerHTML = 'Phone no. should be 10 digits.';
      return false;

    } else if (phone.length > 10) {
      phoneError.innerHTML = 'Phone no. should be 10 digits.';
      return false;

    } else if (!phone.match(/^[0-9]{10}$/)) {
      phoneError.innerHTML = 'Only digits please.';
      return false;
    }




  }



  if (phone.length == 0) {

    return true;

  } else if (phone.length == 10) {

    phoneError.innerHTML = 'valid';
    return true;

  }




}



function validateDob() {
  dob = document.getElementById('contact-dob').value;



  if (dob.length == 10) {
    var todayDate = new Date().getTime();
    var birthDate = new Date(dob).getTime();
    var age = (todayDate - birthDate) / (1000 * 60 * 60 * 24 * 365)

    var thisMonth = parseInt( new Date().getMonth())
    var birthMonth = parseInt( new Date(dob).getMonth())

    var month = thisMonth - birthMonth

   

    dobok.innerHTML = "Age is: " + Math.floor(age);
    
   

    if (Math.floor(age) >= 0 && Math.floor(age) <= 18) {

      dobError.innerHTML = 'valid';
      return true;

    } else {
      dobError.innerHTML = 'Age should be greater than or equal to 18';
      return false;
    }


  }

  return true

}






function validateForm() {
  if (!validateName() || !validatePhone() || !validateEmail() || !validateDob()) {
    submitError.style.display = 'block';
    submitError.innerHTML = 'Please fix error to submit';
    setTimeout(() => {
      submitError.style.display = 'none';

    }, 2000);
    return false;


  }
  else {

    var user = { name: userName, email: email, phone: phone, dob: dob };
    stored.push(user);
    localStorage.setItem('stored', JSON.stringify(stored));
    console.log(stored);


  }


}




let serialNo = 1;
for (let i = 0; i < stored.length; i++) {

  var table = document.getElementById("myTable");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = serialNo;
  cell2.innerHTML = stored[i].name;
  cell3.innerHTML = stored[i].email;
  cell4.innerHTML = stored[i].phone
  cell5.innerHTML = stored[i].dob

  serialNo++
}












