let imagesLink = [];


$("#addProduct").submit(function (e) {
    e.preventDefault();
    let data = {
        title: document.getElementById("p_title").value,
        cap: document.getElementById("p_cap").value,
        imagesLink
    };

    $.ajax({
        type: "POST",
        url: "/product/add",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log("OK");
        },
        error: function (data) {
            //console.log("Error");
        },
       
    });

});