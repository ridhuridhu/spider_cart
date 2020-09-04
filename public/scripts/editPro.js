let imagesLink = [];
let imagesEditLink = [];
let textArea=document.getElementById("p_cap");
let hideMe=document.getElementById("hideMe");
hideMe.style.display="none";
textArea.innerHTML=hideMe.value;
let link=document.getElementsByTagName("img");
function pushAllLinks(){
    for(var i=0;i<link.length;i++){
        if((link[i].src).search("edit")>0){
            //console.log(link[i].src);
        }
        else{
            imagesEditLink.push(link[i].src);
        }
        
    }
}

function delImg(data){
    console.log(data);
    console.log(data.src);
    data.src="";
    console.log(data);
}

$("#addProduct").submit(function (e) {
    // console.log(this.action);
    let url=this.action;
    e.preventDefault();
    var baseUrl=`${window.location.origin}/`;
    pushAllLinks();
    //console.log(imagesEditLink)
    let data = {
        title: document.getElementById("p_title").value,
        cap: document.getElementById("p_cap").value,
        price:document.getElementById("p_price").value,
        quantity:document.getElementById("p_quantity").value,
        imagesEditLink
    };

    $.ajax({
        type: "POST",
        url: `${url}`,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
                if(data.done){
                    window.location.href=(baseUrl);
                }
        },
        error: function (data) {
            window.location.href=(baseUrl);
        },
       
    });
   

});