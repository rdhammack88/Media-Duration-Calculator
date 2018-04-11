$('document').ready(function() {

    var infoBody = $('#file-info');
    var fileNamesList = [], fileList = [], timeList = [];
    window.URL = window.URL || window.webkitURL;
    var fileInfo = {
        // index: 0,
        //
        // updateIndex: function() {
        //     return this.index + 1;
        // },

        display: function(index, name, type, dur=0) {
            return `<tr><th scope="row">${index}</th><td class="fileName">${name}</td><td>${type}</td><td>${dur}s</td><td class="icons"><button type="button" class="delete"><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button></td></tr>`;
        },

        getFileDuration: function(file, indx, totalFileCount, that) {
                fileList.push(file);
                var video = document.createElement('video');
                var duration;
                video.preload = 'metadata';

                video.ondurationchange = function() {
                    window.URL.revokeObjectURL(video.src);
                    duration = Math.floor(video.duration);
                    // fileList[indx].duration = duration;
                    // timeList.push(duration);
                    // console.log(duration);
                    // return duration;

                    infoBody.append(fileInfo.display(totalFileCount, that.name, that.type, duration));
                };

                video.src = URL.createObjectURL(file);
        },

        // getFileInformation: function(file) {
        //     console.log(this);
        //     if(fileNamesList.includes(this.files[i].name)) {
        //         // continue;
        //         return false;
        //     } else {
        //         var fileList = fileInfo.getFileDuration(this.files[i], i);
        //         // var duration = fileList[i].duration;
        //         var that = this.files[i];
        //         var indx = i;
        //         // console.log(fileList);
        //         // console.log(fileList[i]);
        //         // console.log(fileList[i].name);
        //         // console.log(fileList[i].duration);
        //         // console.log(fileList[i].size);
        //
        //         fileNamesList.push(this.files[i].name);
        //         var timer = setTimeout(function() {
        //             var duration = timeList[indx];
        //             console.log(timeList[indx]);
        //             console.log(duration);
        //             infoBody.append(fileInfo.display(++totalFileCount, that.name, that.type, duration));
        //         }, 500);
        //
        //
        //     }
        // },

        deleteFileInfo: function() {
            return console.log('clicked');
            var that = this;
            var indx = $(this).parent('tr').eq();
        }
    }

    $('input:file').change(function() {
        var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
        // var files = Array.from(this.files);
        // console.log(files);
        if(!totalFileCount) {
            totalFileCount = 0;
        }
        // var fileObj = fileInfo;

        // files.forEach(fileObj.getFileInformation());
        // files.forEach(function(file) {
        //     // var fileObj = fileInfo;
        //     fileObj.getFileInformation();
        // });
// var that = this.files[i];
//
//         var timer = setTimeout(function() {
        for(var i = 0; i < this.files.length; i++) {
            if(fileNamesList.includes(this.files[i].name)) {
                continue;
            } else {
                var fileList = fileInfo.getFileDuration(this.files[i], i, ++totalFileCount, this.files[i]);
                // var duration = fileList[i].duration;
                // var that = this.files[i];
                // var indx = i;
                // console.log(fileList);
                // console.log(fileList[i]);
                // console.log(fileList[i].name);
                // console.log(fileList[i].duration);
                // console.log(fileList[i].size);

                // fileNamesList.push(that.name);
                fileNamesList.push(this.files[i].name);
                // var timer = setTimeout(function() {
                    // var duration = timeList[indx];
                //     console.log(timeList[indx]);
                //     console.log(duration);


                    // infoBody.append(fileInfo.display(++totalFileCount, that.name, that.type, duration));


                // }, 500);



            }

                            // clearTimeout(timer);
        }
         // }, 500);


        // console.log(fileList[0]);

        $('#totalFileCount').text(`${totalFileCount} `);
    });

    $('body').on('click', '.delete', function(e) {
        e.preventDefault();
        // $(this).parents('tr').addClass('remove');
        // $(this).parents('tbody').remove('.remove');

        var $remove = $(e.target).closest('tr');
        $remove.remove();
    });

    $('body').on('click', '.done', function(e) {
        e.preventDefault();
        $(this).css({'color':'green'});
        $(this).parents('tr').children('td').css({
            'text-decoration': 'line-through',
            'color': 'green'
        });
    });

});
