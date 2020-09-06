//add to cart
$("#addToCart").click(function (e) { 
    e.preventDefault();
    console.log(this);
});

var baseUrl=`${window.location.origin}/`;
// console.log(baseUrl);
$(".showSearch").hide();

//Search bar 
$("#searchBox").keyup((e) => {
    //console.log("object");
    $(".showSearch").show();

    let query = document.getElementById("searchBox");
    let a = {
        k: (query.value)
    };
    $.post(`/search/${query.value}`, (data) => {
        //console.log(data);
        if(data.length>1){    
            $(".showSearch").html(data);
            
        }else{
            $(".showSearch").hide();

        }
    });


});



//Image Upload 
$('#imageUploadForm').on('submit', (function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        type: 'POST',
        url: "/profile",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            //console.log("success");
            //console.log(data);
            //console.log(data.filename);
            var showLink = $("#showLink");
            let html = ` <img class="proAdd" src="${baseUrl}image/${data.filename}" alt="${data.filename}">`;
            imagesLink.push(`${baseUrl}image/${data.filename}`);
            //console.log(imagesLink);
            showLink.append(html);
            //showLink.innerHTML=`http://127.0.0.1:3000/image/${data.filename}`;
        },
        error: function (data) {
            // console.log("error");
            //console.log(data);
            var showLink = document.getElementById("showLink");
            showLink.innerHTML = `Error Try Again !`;
        }
    });
    document.getElementById("fileInput").value = "";
}));

