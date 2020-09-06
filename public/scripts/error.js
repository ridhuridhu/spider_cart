let passwordBox=document.getElementById("password");
let submitBtn=document.getElementById("submitBtn");
let passValid=document.getElementById("passValid");
passValid.style.display="none";
submitBtn.style.cursor="none";
passwordBox.addEventListener("keyup",()=>{
    let p=(passwordBox.value);
    passValid.style.display="block";
    let valid=false;
    passValid.innerHTML="";
    if(p.length<4){
        passValid.innerHTML+="<li>Password must be at least 4 characters! </li>";
    }
    else if(!p.match(/[a-z]/)){
        passValid.innerHTML+="<li>Password must contain at least one lower case letter </li>";
    }
    else if(!p.match(/[A-Z]/)){
        passValid.innerHTML+="<li>Password must contain at least one Upper case letter </li>";
    }
    else{
        valid=true;
        passValid.style.display="none";
    }
    if(valid){
        submitBtn.classList.remove("disabled");
        submitBtn.style.cursor="pointer";
    }else{
        submitBtn.classList.add("disabled");
        submitBtn.style.cursor="none";
    }
});
