function updateImage(data){
    let mainImg=document.getElementById("mainImg");
    mainImg.src=data.src;
  }
  

  
function addToCart(id){
  let data={
    id:id,
  };
$.ajax({
    type: "POST",
    url: `/cart/add/${id}`,
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        console.log(data.responseText);
            if(data.done){
               // window.location.href=(baseUrl);
            }
    },
    error: function (data) {
      console.log(data.responseText);
        //window.location.href=(baseUrl);
    },
   
});

  


}