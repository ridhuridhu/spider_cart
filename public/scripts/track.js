
function getUser(id,tagData){
    console.log(id,tagData);
    var tag={
        id:id
    };
    $.ajax({
        type: "POST",
        url: "/seller/userData",
        data: JSON.stringify(tag),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            tagData.innerHTML=`<p>
               name: ${data.name}
                <hr>
               email:${data.email}
            
            </p>`;
                //console.log(data);
        },
        error: function (data) {
            //console.log(data,"err");
        },
       
    });



}