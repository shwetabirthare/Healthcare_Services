function loginUser() {
   let name = document.getElementById("userName").value;
   let password = document.getElementById("password").value;
   let userData = localStorage.getItem("userDetail");
   userData = JSON.parse(userData);
   Object.values(userData).map(item => {
     if (name == item.name && password == item.password) {
       alert("user logged in successfully");
       sessionStorage.setItem("name", item.name);
       return false;
     }
    });
    alert("incorrect username or password");
    
 }

 function closeBtn() {
    document.getElementById("overlay").style.display = 'none';
   window.location.href = "index.html";
 }