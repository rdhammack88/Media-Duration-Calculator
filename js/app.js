$('document').ready(function() {

    var infoBody = $('#file-info');
    var fileNamesList = [], fileList = [];
    var fileInfo = {
        index: 0,

        updateIndex: function() {
            return this.index + 1;
        },


        display: function(index, name, type, len=0) {
            return `<tr><th scope="row">${index}</th><td class="fileName">${name}</td><td>${type}</td><td>${len}</td><td class="icons"><button type="button" class="delete"><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button></td></tr>`;
        },

        getFileDuration: function() {
            var files = this.files;
            // for(var i = 0; i < this.length; i++) {
                console.log(this.files);
                // fileList.push(files[i]);
                var video = document.createElement('video');
                video.preload = 'metadata';

                video.onloadedmetadata = function() {
                    window.URL.revokeObjectURL(video.src);
                    var duration = video.duration;
                    fileList[fileList.length - 1].duration = duration
                }
                video.src = URL.createObjectURL(files[0]);
            // }
            return fileList;
        },

        deleteFileInfo: function() {
            return console.log('clicked');
            var that = this;
            var indx = $(this).parent('tr').eq();
        }


        // getFileInfo: function() {
        //     var index = this.updateIndex();
        //     // return index;
        //     console.log(index);
        //     for(var i = 0; i < this.length; i++) {
        //         console.log(this.files[i].name);
        //         // infoBody.append(this.display(index, this.files[i].name, this.files[i].type));
        //     }
        // },
    }

    $('input:file').change(function() {
        console.log(this.files[0].name);
        console.log(this.files);

        // var fileNames = document.querySelectorAll('.fileName');
        // fileNamesList = fileNames.length ? Array.from(fileNames) : [];

        console.log(fileNamesList);
        var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
        if(!totalFileCount) {
            totalFileCount = 0;
        }

        for(var i = 0; i < this.files.length; i++) {
            if(fileNamesList.includes(this.files[i].name)) {
                continue;
            } else {
                // var fileList = fileInfo.getFileDuration();
                // console.log(fileList);
                fileNamesList.push(this.files[i].name);
                infoBody.append(fileInfo.display(++totalFileCount, this.files[i].name, this.files[i].type));
            }
        }

        $('#totalFileCount').text(`${totalFileCount} `);

    });

    $('body').on('click', '.delete', function(e) {
        e.preventDefault();
        console.log($(this).eq());
        console.log($(this).parents('tr'));
        $(this).parents('tr').addClass('remove');
        // $('.remove').parents('tbody').remove('.remove');
        $(this).parents('tbody').remove('.remove');
        // var that = this;
        // var indx = $(this).parent('tr').eq();
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
