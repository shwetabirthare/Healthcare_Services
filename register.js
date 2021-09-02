const registerUser = () => {
    let formData = {
        name: document.getElementById("inputUserName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,

    }

    if (localStorage.getItem('userDetail') == null) {
        localStorage.setItem('userDetail', '[]');

    }
    var userData = JSON.parse(localStorage.getItem('userDetail'));
    userData.push(formData);
    localStorage.setItem('userDetail', JSON.stringify(userData));
   
    alert("Registration done successfully");
    

}
function closeBtn(){
    document.getElementById("overlay").style.display ='none';
    window.location.href="login.html"
  }