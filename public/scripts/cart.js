
console.log("object");
function remove(tag){
    let baseUrl=`${window.location.origin}/cart`;
    let data={
        id:tag.id
    };
    $.ajax({
        type: "POST",
        url: `${baseUrl}/remove`,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           // console.log(data);
                //if(data.done){
                    window.location.href=(baseUrl);
                //}
        },
        error: function (data) {
            window.location.href=(baseUrl);
        },
       
    });
   

}