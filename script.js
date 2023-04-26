

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




  var userinput = document.getElementById("contact-dob").value;



  //check user provide input or not  (Not required)
  if (userinput == null || userinput == '') {
    dobError.innerHTML = "**Choose a date please!";
    return true;
  }

  //execute if user entered a date   
  else {
    //extract and collect only date from date-time string  
    var mdate = userinput.toString();
    dob = mdate
    var dobYear = parseInt(mdate.substring(0, 4), 10);
    var dobMonth = parseInt(mdate.substring(5, 7), 10);
    var dobDate = parseInt(mdate.substring(8, 10), 10);

    //get the current date from system  
    var today = new Date();
    //date string after broking  
    var birthday = new Date(dobYear, dobMonth - 1, dobDate);
    console.log(mdate);
    //calculate the difference of dates  
    var diffInMillisecond = today.valueOf() - birthday.valueOf();

    //convert the difference in milliseconds and store in day and year variable          
    var year_age = Math.floor(diffInMillisecond / 31536000000);
    var day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);

    //when birth date and month is same as today's date        
    if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
      alert("Happy Birthday!");
      return true
    }

    var month_age = Math.floor(day_age / 30);
    day_ageday_age = day_age % 30;

    var tMnt = (month_age + (year_age * 12));
    var tDays = (tMnt * 30) + day_age;

    //DOB is greater than today's date, generate an error: Invalid date    
    if (dob > today) {
      dobError.innerHTML = ("Invalid date input - Please try again!");
    } else if (year_age < 18) {
      dobok.innerHTML = "The age is " + year_age + " years " + month_age + " months " + day_age + " days"
      
      dobError.innerHTML = ("Age should be greater than or equal to 18!");
      return false
    } else {

      dobok.innerHTML = "The age is " + year_age + " years " + month_age + " months " + day_age + " days"
      dobError.innerHTML = ("Valid");
      return true

    }
  }

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












