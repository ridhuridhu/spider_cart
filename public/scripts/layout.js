//add to cart
$("#addToCart").click(function (e) { 
    e.preventDefault();
    console.log(this);
});

const baseUrl=`${window.location.origin}/`;
// console.log(baseUrl);


//Search bar 
$("#searchBox").keyup((e) => {
    let query = document.getElementById("searchBox");
    let a = {
        k: (query.value)
    };
    $.post(`/search/${query.value}`, (data) => {
        //console.log(data);
        $(".showSearch").html(data);
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
            let html = ` <img src="${baseUrl}image/${data.filename}" alt="${data.filename}">`;
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

