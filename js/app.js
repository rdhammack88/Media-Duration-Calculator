$('document').ready(function() {

(function() {

    var infoBody = $('#file-info');
    var fileNamesList = []; //, fileList = [], timeList = [];
    window.URL = window.URL || window.webkitURL;
    var fileInfo = {
        index: 1,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        durTotal: 0,

        getFileDuration: function(file, indx) {
                // fileList.push(file);
                var video = document.createElement('video');
                // var duration;
                video.preload = 'metadata';
                var that = this;

                video.onloadedmetadata  = function() {
                    window.URL.revokeObjectURL(video.src);
                    duration = Math.floor(video.duration);
                    that.durTotal += parseInt(duration);
                    var hours = parseInt(Math.floor(duration/60/60));
                    var minutes = parseInt(Math.floor(duration/60%60));
                    var seconds = parseInt(Math.floor(duration%60));
                    // console.log(duration);
                    console.log(that.durTotal);



                    that.totalHours = Math.floor(that.durTotal/60/60);
                    that.totalMinutes = Math.floor(that.durTotal/60%60);
                    that.totalSeconds = Math.floor(that.durTotal%60);

                    that.totalHours = that.totalHours < 10 ? '0' + that.totalHours : that.totalHours;
                    that.totalMinutes = that.totalMinutes < 10 ? '0' + that.totalMinutes : that.totalMinutes;
                    that.totalSeconds = that.totalSeconds < 10 ? '0' + that.totalSeconds : that.totalSeconds;


                    ///// CODE THAT WORKS /////
                    //
                    // // hours = hours < 10 ? '0' + hours : hours;
                    // // minutes = minutes < 10 ? '0' + minutes : minutes;
                    // // seconds = seconds < 10 ? '0' + seconds : seconds;
                    //
                    // // if(duration/60/60 < 10) { // >= 1
                    // //     var hours = '0' + Math.floor(duration/60/60);
                    // // } else {
                    // //     var hours = parseInt(Math.floor(duration/60/60));
                    // // }
                    // //
                    // // if(duration/60%60 < 10) {
                    // //     var minutes = '0' + Math.floor(duration/60%60);
                    // // } else {
                    // //     var minutes = parseInt(Math.floor(duration/60%60));
                    // // }
                    // //
                    // // if(duration%60 < 10) { //duration/60/60
                    // //     var seconds = '0' + duration%60;
                    // // } else {
                    // //     var seconds = parseInt(duration%60);
                    // // }
                    //
                    // that.totalHours += parseInt(hours);
                    // that.totalMinutes += parseInt(minutes);
                    // that.totalSeconds += parseInt(seconds);
                    //
                    // that.totalHours += parseInt(that.totalMinutes%60) >= 1 ? parseInt(that.totalMinutes/60) : parseInt(that.totalHours);
                    // that.totalMinutes += parseInt(that.totalSeconds%60) >= 1 ? parseInt(that.totalSeconds/60) : parseInt(that.totalMinutes);
                    // that.totalSeconds = parseInt(that.totalSeconds%60) >= 1 ? parseInt(that.totalSeconds%60) : parseInt(that.totalSeconds);
                    // that.totalMinutes = parseInt(that.totalMinutes%60) >= 1 ? parseInt(that.totalMinutes%60) : parseInt(that.totalMinutes);
                    //
                    // // that.totalHours = that.totalHours < 10 ? '0' + that.totalHours : that.totalHours;
                    // // that.totalMinutes = that.totalMinutes < 10 ? '0' + that.totalMinutes : that.totalMinutes;
                    // // that.totalSeconds = that.totalSeconds < 10 ? '0' + that.totalSeconds : that.totalSeconds;
                    ///// ABOVE CODE THAT WORKS /////


                    infoBody.append(fileInfo.display(file.name, file.type, hours, minutes, seconds));
                    // infoBody.append(fileInfo.display(file.name, file.type, that.totalHours, that.totalMinutes, that.totalSeconds));

                    $('#totalFileCount').text(`${that.index - 1}`);
                    $('.totalHours').text(that.totalHours);
                    $('.totalMinutes').text(that.totalMinutes);
                    $('.totalSeconds').text(that.totalSeconds);
                    // $('#durationTotal').text(that.durTotal);
                };

                video.oncanplaythrough  = function() {
                    // var hour = parseInt($('.totalHours').text());
                    // var minute = parseInt($('.totalMinutes').text());
                    // var second = parseInt($('.totalSeconds').text());
                    // $('#totalFileCount').text(`${that.index - 1} `);
                    // // $('.totalHours').text(that.totalHours);
                    // // $('.totalMinutes').text(that.totalMinutes);
                    // // $('.totalSeconds').text(that.totalSeconds);
                    //
                    //
                    // $('.totalHours').text(hour < 10 ? '0' + that.totalHours : that.totalHours);
                    // $('.totalMinutes').text(minute < 10 ? '0' + that.totalMinutes : that.totalMinutes);
                    // $('.totalSeconds').text(second < 10 ? '0' + that.totalSeconds : that.totalSeconds);
                }

                video.src = URL.createObjectURL(file);
        },

        addListeners: function() {
            // return function() {
            //     // $('body').on('click', '.delete', function(e) {
            //     $('.delete').click(function(e) {
            //         e.preventDefault();
            //         var $remove = $(e.target).closest('tr');
            //         $remove.remove();
            //     });
            //
            //     // $('body').on('click', '.done', function(e) {
            //     $('.done').click(function(e) {
            //         e.preventDefault();
            //         if(this.style.color === 'green') {
            //             $(this).css({'color':'red'});$(this).parents('tr').children('td').css({
            //                 'text-decoration': 'none',
            //                 'color': 'red'
            //             });
            //         } else {
            //             $(this).css({'color':'green'});
            //             $(this).parents('tr').children('td').css({
            //                 'text-decoration': 'line-through',
            //                 'color': 'green'
            //             });
            //         }
            //     });
            // };
        },

        clear_file: function(el) {
            var fileName = $(el).parent().siblings('td.fileName').text();
            var $remove = $(el).closest('tr');
            $remove.remove();
            if(fileNamesList.includes(fileName)) {
                let i = fileNamesList.indexOf(fileName);
                fileNamesList.splice(i, 1)
            }

            if(infoBody.html() == '') {
                fileInfo.clear_list();
            }
        },

        clear_list: function() {
            fileNamesList = [];
            infoBody.html('');

            $('.totalHours, .totalMinutes, .totalSeconds').html('00');
            $('#totalFileCount').html('0');

            this.index = 1;
            this.totalHours = 0;
            this.totalMinutes = 0;
            this.totalSeconds = 0;
        },



        display: function(name, type, hours, minutes, seconds) {
            return `<tr><th scope="row">${this.index++}</th><td class="fileName">${name}</td><td>${type}</td><td>${hours} : ${minutes} : ${seconds}</td><td class="icons"><button type="button" class="delete" onclick=""><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button></td></tr>`;
        },
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
                fileInfo.getFileDuration(this.files[i], i);
                fileNamesList.push(this.files[i].name);
                fileInfo.addListeners();
            }
        }
        // $('#totalFileCount').text(`${totalFileCount} `);
    });

    $('body').on('click', '.delete', function(e) {
        e.preventDefault();
        fileInfo.clear_file(this);

        // var $remove = $(e.target).closest('tr');
        // $remove.remove();
        //
        // if(infoBody.html() == '') {
        //     fileInfo.clear_list();
        // }
    });

    $('body').on('click', '.done', function(e) {
        e.preventDefault();
        if(this.style.color === 'green') {
            $(this).css({'color':'red'});$(this).parents('tr').children('td').css({
                'text-decoration': 'none',
                'color': 'red'
            });
        } else {
            $(this).css({'color':'green'});
            $(this).parents('tr').children('td').css({
                'text-decoration': 'line-through',
                'color': 'green'
            });
        }
    });

    $('#file-drop').on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // console.log('dropped');
    });

    $('#file-drop').on('dragenter', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // console.log('dropped');
    });

    $('#file-drop').on('drop', function(e) {
        // console.log('dropped');
        console.log(fileNamesList);
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
                        fileInfo.getFileDuration(e.originalEvent.dataTransfer.files[i], i);
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

    $('.clear_list').click(function() {
        fileInfo.clear_list();

    });

})();
});
