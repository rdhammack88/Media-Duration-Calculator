$('document').ready(function() {

(function() {
    window.URL = window.URL || window.webkitURL
    var $fileDrop = $('#file-drop');
    var $infoBody = $('#file-info-body');
    var $clearAllButton = $('.clear_list');
    var $totalFileCount = $('#totalFileCount');
    var $fileInfoTable = $('.file-info-container');
    var fileInfo = {
        index: 1,
        durTotal: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        fileNamesList: [],

        clear_file: function(el) {
            this.index--;
            $totalFileCount.text(this.index - 1);
            $('#multimedia_upload').val(null);
            var $remove = $(el).closest('tr');
            var fileName = $(el).parent().siblings('td.fileName').text();
            this.updateTotalDuration(el);
            $remove.remove();

            var $filePos = $('.file_position');
            for(var filePos in $filePos) {
                $filePos[filePos].innerText = parseInt(filePos) + 1;
            }
            if(this.fileNamesList.includes(fileName)) {
                let i = this.fileNamesList.indexOf(fileName);
                this.fileNamesList.splice(i, 1);
            }
            if($infoBody.html() == '') {
                this.clear_list(); // fileInfo.clear_list();
            }
        },

        clear_list: function() {
            this.fileNamesList = [];
            $infoBody.html('');
            $clearAllButton.fadeOut(1000);
            $fileInfoTable.fadeOut(1000);

            $('.totalHours, .totalMinutes, .totalSeconds').html('00');
            $totalFileCount.html('0');
            $('#multimedia_upload').val(null);

            this.index = 1;
            this.totalHours = 0;
            this.totalMinutes = 0;
            this.totalSeconds = 0;
            this.durTotal = 0;
        },

        display: function(name, type, hours, minutes, seconds) {
            return `<tr><th scope="row" class="file_position">${this.index++}</th><td class="fileName">${name}</td><td>${type}</td><td><span class="file_hour_length">${hours}</span> : <span class="file_minute_length">${minutes}</span> : <span class="file_second_length">${seconds}</span></td><td class="icons"><button type="button" class="delete" onclick=""><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button></td></tr>`;
        },

        getFileDuration: function(file, indx) {
                var video = document.createElement('video');
                video.preload = 'metadata';
                var that = this;

                video.onloadedmetadata  = function() {
                    window.URL.revokeObjectURL(video.src);
                    duration = Math.floor(video.duration);
                    that.durTotal += parseInt(duration);
                    var hours = parseInt(Math.floor(duration/60/60));
                    var minutes = parseInt(Math.floor(duration/60%60));
                    var seconds = parseInt(Math.floor(duration%60));
                    hours = hours < 10 ? '0' + hours : hours;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    seconds = seconds < 10 ? '0' + seconds : seconds;

                    /* update the file list objects total time formats h:m:s */
                    that.totalHours = Math.floor(that.durTotal/60/60);
                    that.totalMinutes = Math.floor(that.durTotal/60%60);
                    that.totalSeconds = Math.floor(that.durTotal%60);
                    /* test if all totals are under 10, then add a "0" to the front before display */
                    fileInfo.lessThanTenTest(that);
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
                    /* display all new data elements holding file info into the table */
                    $infoBody.append(fileInfo.display(file.name, file.type, hours, minutes, seconds));
                    $totalFileCount.text(that.index - 1);
                    $('.totalHours').text(that.totalHours);
                    $('.totalMinutes').text(that.totalMinutes);
                    $('.totalSeconds').text(that.totalSeconds);
                };
                video.src = URL.createObjectURL(file);
        },

        lessThanTenTest: function(obj) {
            obj.totalHours = obj.totalHours < 10 ? '0' + obj.totalHours : obj.totalHours;
            obj.totalMinutes = obj.totalMinutes < 10 ? '0' + obj.totalMinutes : obj.totalMinutes;
            obj.totalSeconds = obj.totalSeconds < 10 ? '0' + obj.totalSeconds : obj.totalSeconds;
        },

        updateTotalDuration: function(el) {
            /* get current file duration in each format h:m:s */
            var fileHourLength = parseInt($(el).parent().prev().children('.file_hour_length').text());
            var fileMinuteLength = parseInt($(el).parent().prev().children('.file_minute_length').text());
            var fileSecondLength = parseInt($(el).parent().prev().children('.file_second_length').text());
            /* subtract the file time lengths from the total time lengths */
            this.totalHours -= fileHourLength;
            this.totalMinutes -= fileMinuteLength;
            this.totalSeconds -= fileSecondLength;
            /* first, test if the new total time length for each format h:m:s, is less than 0 */
            this.totalHours = this.totalHours < 0 ? 60 + this.totalHours : this.totalHours;
            this.totalMinutes = this.totalMinutes < 0 ? 60 + this.totalMinutes : this.totalMinutes;
            this.totalMinutes = this.totalSeconds < 0 ? this.totalMinutes - 1 : this.totalMinutes;
            this.totalSeconds = this.totalSeconds < 0 ? 60 + this.totalSeconds : this.totalSeconds;
            /* second, test if all totals are under 10, then add a "0" to the front before display */
            this.lessThanTenTest(this);
            /* update total duration of all files still left in list */
            this.durTotal = this.durTotal - ((fileMinuteLength * 60) + fileSecondLength);
            $('.totalHours').text(this.totalHours);
            $('.totalMinutes').text(this.totalMinutes);
            $('.totalSeconds').text(this.totalSeconds);
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
    }

    $fileDrop.on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $fileDrop.on('dragenter', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $fileDrop.on('drop', function(e) {
        if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length){
            e.preventDefault();
            e.stopPropagation();
            $clearAllButton.fadeIn(1000);
            $fileInfoTable.fadeIn(1000);
            var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
            if(!totalFileCount) {
                totalFileCount = 0;
            }
            for(var i = 0; i < e.originalEvent.dataTransfer.files.length; i++) {
                if(fileInfo.fileNamesList.includes(e.originalEvent.dataTransfer.files[i].name)) {
                    continue;
                } else {
                    fileInfo.getFileDuration(e.originalEvent.dataTransfer.files[i], i);
                    fileInfo.fileNamesList.push(e.originalEvent.dataTransfer.files[i].name);
                }
            }
        }
    });

    $('input:file').change(function() {
        $clearAllButton.fadeIn(1000);
        $fileInfoTable.fadeIn( 1000 );

        for(var i = 0; i < this.files.length; i++) {
            if(fileInfo.fileNamesList.includes(this.files[i].name)) {
                continue;
            } else {
                fileInfo.getFileDuration(this.files[i], i);
                fileInfo.fileNamesList.push(this.files[i].name);
                fileInfo.addListeners();
            }
        }
    });

    $('body').on('click', '.delete', function(e) {
        e.preventDefault();
        fileInfo.clear_file(this);

        // var $remove = $(e.target).closest('tr');
        // $remove.remove();
        //
        // if($infoBody.html() == '') {
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
