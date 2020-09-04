let imagesLink = [];

$("#addProduct").submit(function (e) {
    e.preventDefault();
    var baseUrl=`${window.location.origin}/`;

    let data = {
        title: document.getElementById("p_title").value,
        cap: document.getElementById("p_cap").value,
        price:document.getElementById("p_price").value,
        imagesLink
    };

    $.ajax({
        type: "POST",
        url: "/seller/add",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
                if(data.done){
                    window.location.href=(baseUrl);
                }
        },
        error: function (data) {
            window.location.href=(baseUrl);
        },
       
    });

});