$(document).ready(function () {
    getUserWaifus();
});


function getUserWaifus() {
    //Get user waifu info
    var page = $("#waifuRow");
    page.hide();
    $.get("http://sorabot.pw/api/allwaifusrequest/", function (data) {
        var waifuRow = $("#waifuRow");
        if(data == null){
            var error = '<div class="alert alert-danger alert-botpermissions">Something went terribly wrong :(</div>';
            waifuRow.html(error);
            page.show();
            $(".spinner").remove();
            return;
        }
        var dat = JSON.parse(data);

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
                '                                    <li class="list-group-item">'+getRarityString(waifu.rarity)+'</li>\n' +
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

function getRarityString(rarity){
    switch (rarity) {
        case 0:
            return "Common";
        case 1:
            return "Uncommon";
        case 2:
            return "Rare";
        case 3:
            return "Epic";
        case 99:
            return "Ultimate Waifu";
        case 5:
            return "Halloween";
        case 6:
            return "Christmas";
        case 7:
            return "Summer";
        default:
            return "Unknown";
    }
}