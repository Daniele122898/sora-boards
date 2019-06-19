$(document).ready(function () {
    getUserWaifus();
});

function getUserWaifus() {
    var userId = getIDfromPath(window.location.pathname);

    var page = $("#waifuRow");
    page.hide();
    //Get user waifu info
    $.get("http://sorabot.pw/api/userwaifurequest/"+userId, function (data) {
        var waifuRow = $("#waifuRow");
        if(data == null || data.toString() === "" ){
            var error = '<div class="alert alert-danger alert-botpermissions">This User doesn\'t exist or has no waifus!</div>';
            waifuRow.html(error);
            page.show();
            $(".spinner").remove();
            return;
        }
        var dat = JSON.parse(data);
        var succ = dat.success;
        if(!succ) {
            var error = '<div class="alert alert-danger alert-botpermissions">This User doesn\'t exist or has no waifus!</div>';
            waifuRow.html(error);
            page.show();
            $(".spinner").remove();
            return;
        }

        $("#userImg").attr("src", dat.avatarUrl == null ? 'https://i.imgur.com/PvYs6dc.png' : dat.avatarUrl);
        $("#userName").text(dat.username);


        for(var i=0; i<dat.waifus.length; i++){
            var waifu = dat.waifus[i];
            var html = waifuRow.html();
            html += '<div class="col-12 col-sm-6 col-lg-4">\n' +
                '                            <div class="card">\n' +
                '                                <div class="crop pop">\n' +
                '                                    <img src="'+waifu.imageUrl+'" alt="Waifu Image">\n' +
                '                                </div>\n' +
                '                                <div class="card-body" style="padding: 10px 1.25rem 0px 1.25rem;">\n' +
                '                                    <h5 class="card-title">'+waifu.name+'</h5>\n' +
                '                                </div>\n' +
                '                                <ul class="list-group list-group-flush">\n' +
                '                                    <li class="list-group-item">'+waifu.rarity+'</li>\n' +
                '                                    <li class="list-group-item"><span class="waifuCount">'+waifu.count+'</span></li>\n' +
                '                                </ul>\n' +
                '                                <div class="card-body" style="margin: 0; padding: 0; text-align: right; padding-right: 10px;">\n' +
                '                                    <p class="card-text"><span class="waifuId">ID: '+waifu.id+'</span></p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            waifuRow.html(html);
        }

        page.show();
        $(".spinner").remove();

        $('.pop').on('click', function() {
            $('.imagepreview').attr('src', $(this).find('img').attr('src'));
            $('#imagemodal').modal('show');
        });

    });
}

function getIDfromPath(path){
    var id ="";
    path = path.substring(6, path.length);
    id = path.substring(0, path.indexOf("/"));
    return id;
}