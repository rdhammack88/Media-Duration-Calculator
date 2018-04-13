$('document').ready(function() {

    var infoBody = $('#file-info');
    var fileNamesList = [], fileList = [], timeList = [];
    window.URL = window.URL || window.webkitURL;
    var fileInfo = {
        index: 1,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        //
        // updateIndex: function() {
        //     return this.index + 1;
        // },

        display: function(name, type, hours, minutes, seconds) {
            return `<tr><th scope="row">${this.index++}</th><td class="fileName">${name}</td><td>${type}</td><td>${hours} : ${minutes} : ${seconds}</td><td class="icons"><button type="button" class="delete"><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button></td></tr>`;
        },

        getFileDuration: function(file, indx, that) {
                fileList.push(file);
                var video = document.createElement('video');
                // var duration;
                video.preload = 'metadata';
                var obj = this;

                video.ondurationchange = function() {
                    window.URL.revokeObjectURL(video.src);
                    duration = Math.floor(video.duration);
                    // durTotal += duration;

                    if(duration/60/60 < 10) { // >= 1
                        var hours = '0' + Math.floor(duration/60/60);
                    } else {
                        var hours = Math.floor(duration/60/60);;
                    }

                    if(duration/60%60 < 10) {
                        var minutes = '0' + Math.floor(duration/60%60);
                    } else {
                        var minutes = Math.floor(duration/60%60);
                    }

                    if(duration%60 < 10) { //duration/60/60
                        var seconds = '0' + duration%60;
                    } else {
                        var seconds = duration%60;
                    }

                    obj.totalHours += parseInt(obj.totalHours) + parseInt(hours);
                    obj.totalMinutes += parseInt(obj.totalMinutes) + parseInt(minutes);
                    obj.totalSeconds += parseInt(obj.totalSeconds) + parseInt(seconds);

                    infoBody.append(fileInfo.display(that.name, that.type, hours, minutes, seconds));

                    $('#totalFileCount').text(`${obj.index - 1} `);
                    $('.totalHours').text(obj.totalHours);
                    $('.totalMinutes').text(obj.totalMinutes);
                    $('.totalSeconds').text(obj.totalSeconds);
                };

                video.src = URL.createObjectURL(file);
        }
    }

    $('input:file').change(function() {
        // var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
        //
        // if(!totalFileCount) {
        //     totalFileCount = 0;
        // }

        for(var i = 0; i < this.files.length; i++) {
            if(fileNamesList.includes(this.files[i].name)) {
                continue;
            } else { //var fileList =
                fileInfo.getFileDuration(this.files[i], i, this.files[i]);

                fileNamesList.push(this.files[i].name);
            }
        }
        // $('#totalFileCount').text(`${totalFileCount} `);
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
        if(this.style.color === 'green') {
            $(this).css({'color':'red'});$(this).parents('tr').children('td').css({
                'text-decoration': 'none',
                'color': 'red'
            });
        } else {
            // $(this).parent('button.done').closest('button.delete').children().css({'color': 'green'});
            $(this).css({'color':'green'}); //{'color':'green' ? 'red' : 'green'}
            $(this).parents('tr').children('td').css({
                'text-decoration': 'line-through',
                'color': 'green'
            });
        }
    });

    $('#file-drop').on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('#file-drop').on('dragenter', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('#file-drop').on('drop', function(e) {

        if(e.originalEvent.dataTransfer){
            if(e.originalEvent.dataTransfer.files.length) {
                e.preventDefault();
                e.stopPropagation();
                /*UPLOAD FILES HERE*/
                // console.log(e.originalEvent.dataTransfer.files);
                // console.log('dropped');
                // upload(e.originalEvent.dataTransfer.files);


                var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
                if(!totalFileCount) {
                    totalFileCount = 0;
                }
                for(var i = 0; i < e.originalEvent.dataTransfer.files.length; i++) {
                    if(fileNamesList.includes(e.originalEvent.dataTransfer.files[i].name)) {
                        continue;
                    } else { //var fileList =
                        fileInfo.getFileDuration(e.originalEvent.dataTransfer.files[i], i, e.originalEvent.dataTransfer.files[i]);
                        fileNamesList.push(e.originalEvent.dataTransfer.files[i].name);
                    }
                }
                // $('#totalFileCount').text(`${totalFileCount} `);
            }
        }
    });


    $('.format-toggle').click(function(e) {
        // console.log($(e.target).closest('input').val());
        var $checked = $('input[name=timeFormat]');
        // console.log($checked.checked);

        // if($checked[0].checked) {
        //     $checked.attr('checked', false);
        // }

        if($checked[0].checked) {
            console.log('checked');
            // $checked.attr('checked', false);
            // $('span.seconds').css({'color':'00e600'});
            // $('span.minutes').css({'color':'fff'});
        } else {
            // $checked.attr('checked', true);
            // $('span.seconds').css({'color':'fff'});
            // $('span.minutes').css({'color':'00e600'});
        }

        // $checked.attr('checked', $checked[0].checked ? false : true);

    });

    $('#file-info').sortable({axis: 'y'});

});
