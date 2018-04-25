$('document').ready(function() {
/* Once the document has loaded, run an IIFE to not polute the global namespace */
(function() {

    window.URL = window.URL || window.webkitURL
    var $fileDrop = $('#file-drop');
    var $infoBody = $('#file-info-body');
    var $clearAllButton = $('.clear_list');
    var $saveAllButton = $('.save_list');
    var $totalFileCount = $('#totalFileCount');
    var $fileInfoTable = $('.file-info-container');
    var fileInfo = {
        index: 1,
        durTotal: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        fileNamesList: [],

        /* Method to add individual file duration to total duration */
        addTotalDuration: function(fileHourLength, fileMinuteLength, fileSecondLength) {
            this.durTotal = this.durTotal + ((fileHourLength*60*60) + (fileMinuteLength * 60) + fileSecondLength);

            /* update the file list objects total time formats h:m:s */
            this.totalHours = Math.floor(this.durTotal/60/60);
            this.totalMinutes = Math.floor(this.durTotal/60%60);
            this.totalSeconds = Math.floor(this.durTotal%60);
        },

        /* Method to subtract individual file duration from total duration */
        subTotalDuration: function(fileHourLength, fileMinuteLength, fileSecondLength) {
            /* subtract the file time lengths from the total time lengths */
            this.totalHours -= fileHourLength;
            this.totalMinutes -= fileMinuteLength;
            this.totalSeconds -= fileSecondLength;
            /* first, test if the new total time length for each format h:m:s, is less than 0 */
            this.totalHours = this.totalHours < 0 ? 60 + this.totalHours : this.totalHours;
            this.totalHours = this.totalMinutes < 0 ? this.totalHours - 1 : this.totalHours;
            this.totalMinutes = this.totalMinutes < 0 ? 60 + this.totalMinutes : this.totalMinutes;
            this.totalMinutes = this.totalSeconds < 0 ? this.totalMinutes - 1 : this.totalMinutes;
            this.totalSeconds = this.totalSeconds < 0 ? 60 + this.totalSeconds : this.totalSeconds;

            /* update total duration of all files still left in list */
            this.durTotal = this.durTotal - ((fileHourLength*60*60) + (fileMinuteLength * 60) + fileSecondLength);
        },

        /* Method to arrange file # in list, when files are moved around or deleted */
        arrange: function() {
            var $filePos = $('.file_position');
            for(var filePos in $filePos) {
                $filePos[filePos].innerText = parseInt(filePos) + 1;
            }

            // $('#multimedia_upload').val(null);
        },

        /* Method to clear all file info when trashcan icon is clicked */
        clear_file: function(operand, el) {
            this.index--;
            $totalFileCount.text(this.index - 1);
            $('#multimedia_upload').val(null);
            var $remove = $(el).closest('tr');
            var fileName = $(el).parent().siblings('td.fileName').text();
            // if($($remove).children('td.fileName').css({'color': '#f39856'})) {
            // console.log(el.previousElementSibling());
            // console.log(el.previousSibling());
            // console.log(el);
            // console.log(el);
            // if(el..style.color === 'green') {
            //     console.log('subbed');
                this.updateTotalDuration('sub', el);
            // }

            $remove.remove();

            this.arrange();

            // var $filePos = $('.file_position');
            // for(var filePos in $filePos) {
            //     $filePos[filePos].innerText = parseInt(filePos) + 1;
            // }
            if(this.fileNamesList.includes(fileName)) {
                let i = this.fileNamesList.indexOf(fileName);
                this.fileNamesList.splice(i, 1);
            }
            if($infoBody.html() == '') {
                this.clear_list(); // fileInfo.clear_list();
            }
        },

        /* Method to clear all files from list */
        clear_list: function() {
            this.fileNamesList = [];
            $infoBody.html('');
            $clearAllButton.fadeOut(1000);
            $saveAllButton.fadeOut(1000);
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

        /* Method to display each file info into the list */
        display: function(name, type, hours, minutes, seconds) {
            var shortName = name;
            if(name.length > 60) {
                shortName = name.slice(0, 59);// + '...'; // name.slice(name.lastIndexOf('.')); //name.length / 2
                var charsToRemove = /[^A-z0-9]/;

                while( shortName[shortName.length - 1].match(charsToRemove)) {
                    shortName = shortName.slice(0, shortName.length - 1);
                }
                shortName += '....';
            }

            return `<tr><th scope="row" class="file_position">${this.index++}</th><td class="fileName" data-name="${name}">${shortName}</td><td class="fileType">${type}</td><td class="file_duration"><span class="file_hour_length">${hours}</span> : <span class="file_minute_length">${minutes}</span> : <span class="file_second_length">${seconds}</span></td><td class="icons"><button type="button" class="delete" onclick=""><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button></td></tr>`;
        },

        /* Method to get each file information when file is uploaded/dragged into browser */
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

        /* Method to check if each time format H:M:S, is under 10, add a leading 0 */
        lessThanTenTest: function(obj) {
            obj.totalHours = obj.totalHours < 10 ? '0' + obj.totalHours : obj.totalHours;
            obj.totalMinutes = obj.totalMinutes < 10 ? '0' + obj.totalMinutes : obj.totalMinutes;
            obj.totalSeconds = obj.totalSeconds < 10 ? '0' + obj.totalSeconds : obj.totalSeconds;
        },

        /* Method to save file lists and add the name to display */
        displaySavedFileLists: function(fileList) {
            $('.file-name-list').html("");
            for(var listName in fileList) {
                $('.file-name-list').append(
                    '<li class="list-group-item saved-list-item"><span class="saved-file-list">' + fileList[listName].name + '</span><span class="list-total-time">' + fileList[listName].totalDuration + '</span><button type="button" class="deleteListName"><i class="fas fa-trash"></i></button></li>'
                )
            }
            $('.file-list-of-names').fadeIn(1000);
        },

        /* Method to update the total duration of all files, when a new file is added or a file is deleted */
        updateTotalDuration: function(operand, el) {
            /* get current file duration in each format h:m:s */
            var fileHourLength = parseInt($(el).parent().prev().children('.file_hour_length').text());
            var fileMinuteLength = parseInt($(el).parent().prev().children('.file_minute_length').text());
            var fileSecondLength = parseInt($(el).parent().prev().children('.file_second_length').text());

            if(operand === 'sub') {
                this.subTotalDuration(fileHourLength, fileMinuteLength, fileSecondLength);
            } else if(operand === 'add') {
                this.addTotalDuration(fileHourLength, fileMinuteLength, fileSecondLength);
            }


            // /* subtract the file time lengths from the total time lengths */
            // this.totalHours -= fileHourLength;
            // this.totalMinutes -= fileMinuteLength;
            // this.totalSeconds -= fileSecondLength;
            // /* first, test if the new total time length for each format h:m:s, is less than 0 */
            // this.totalHours = this.totalHours < 0 ? 60 + this.totalHours : this.totalHours;
            // this.totalMinutes = this.totalMinutes < 0 ? 60 + this.totalMinutes : this.totalMinutes;
            // this.totalMinutes = this.totalSeconds < 0 ? this.totalMinutes - 1 : this.totalMinutes;
            // this.totalSeconds = this.totalSeconds < 0 ? 60 + this.totalSeconds : this.totalSeconds;
            // /* update total duration of all files still left in list */
            // this.durTotal = this.durTotal - ((fileMinuteLength * 60) + fileSecondLength);


            /* second, test if all totals are under 10, then add a "0" to the front before display */
            this.lessThanTenTest(this);
            $('.totalHours').text(this.totalHours);
            $('.totalMinutes').text(this.totalMinutes);
            $('.totalSeconds').text(this.totalSeconds);
        },
    }


    if(localStorage.getItem('fileListNames')) {
        console.log(typeof localStorage.getItem('fileListNames'));
        console.log(localStorage.getItem('fileListNames'));
        console.log(JSON.parse(localStorage.getItem('fileListNames')));
        var savedFileLists = JSON.parse(localStorage.getItem('fileListNames'));

        fileInfo.displaySavedFileLists(savedFileLists);
    } else {
        $('.file-name-list').html('<p class="text-danger">You currently do not have any saved file lists.</p>');
        var savedFileLists = [];
        var savedFileListInfo = [];
        $('.file-list-of-names').hide();
    }


    /* Prevent defaults on window dragover */
    $(window).on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    /* Prevent defaults on window dragenter */
    $(window).on('dragenter', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    /* On drop of files into browser, gather all file information */
    $(window).on('drop', function(e) { // $fileDrop
        if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length){
            e.preventDefault();
            e.stopPropagation();
            $clearAllButton.fadeIn(1000);
            $saveAllButton.fadeIn(1000);
            $fileInfoTable.fadeIn(1000);

            // console.log(e.currentTarget.File)
            // console.log(e);
            //     console.log(e.originalEvent.dataTransfer.items);

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

    /* On upload of files into browser, gather all file information */
    $('input:file').change(function() {
        $clearAllButton.fadeIn(1000);
        $saveAllButton.fadeIn(1000);
        $fileInfoTable.fadeIn(1000);
        for(var i = 0; i < this.files.length; i++) {
            if(fileInfo.fileNamesList.includes(this.files[i].name)) {
                continue;
            } else {
                fileInfo.getFileDuration(this.files[i], i);
                fileInfo.fileNamesList.push(this.files[i].name);
            }
        }
    });

    /* On click of trashcan icon for each file, delete the file from the list */
    $('body').on('click', '.delete', function(e) {
        e.preventDefault();
        fileInfo.clear_file(e, this);
    });

    /* On click of checkmark icon for each file, mark out file info and update total duration */
    $('body').on('click', '.done', function(e) {
        e.preventDefault();
        if(this.style.color === 'green') {
            $(this).css({'color':'#f39856'});
            $(this).parents('tr').children('td').css({
                'text-decoration': 'none',
                'color': '#f39856'
            });
            fileInfo.updateTotalDuration('add', this);
        } else {
            $(this).css({'color':'green'});
            $(this).parents('tr').children('td').css({
                'text-decoration': 'line-through',
                'color': 'green'
            });
            fileInfo.updateTotalDuration('sub', this);
        }
    });

    /*  On click of trashcan icon for saved file, delete the saved file info from local storage and display */
    $('body').on('click', '.deleteListName', function(e) {
        let savedLists = JSON.parse(localStorage.getItem('fileListNames'));
        let listName = $(this).prev().prev('span').text();

        for(let obj in savedLists) {
            if(savedLists[obj].name === listName) {
                let i = savedLists.indexOf(listName);
                savedLists.splice(i, 1);
                localStorage.setItem('fileListNames', JSON.stringify(savedLists));
                let $remove = $(this).parents('li.list-group-item');
                $remove.remove();
            }
        }

        if($('.file-name-list').text() === ''){
            localStorage.removeItem('fileListNames');
            localStorage.clear();
            $('.file-list-of-names').fadeOut(1000);
        }
        console.log(JSON.parse(localStorage.getItem('fileListNames')));
        console.log(savedLists);
    });

    /* On click of Clear List button, clear the entire list of files */
    $clearAllButton.click(function() {
        fileInfo.clear_list();
    });

    /* On click of Save button in modal window, save the current list of files */
    $('.save-list-name-btn').click(function() {
        console.log($('.save-list-name').val());
        // var fileListNames = [];
        // $('.file-name-list').html("");
        var listName = $('.save-list-name').val();
        if(savedFileLists.includes(listName)) {
            $('#saveListModal .saved-name-error').text('Please pick a name that has not already been asigned to a saved list.');
            return false;
        } else {
            var hr = $('.totalHours').text();
            var min = $('.totalMinutes').text();
            var sec = $('.totalSeconds').text();
            var totalDuration = hr + ':' + min + ':' + sec;
            savedFileLists.push({'name': listName, 'totalDuration': totalDuration});
            localStorage.setItem('fileListNames', JSON.stringify(savedFileLists));
            fileInfo.displaySavedFileLists(savedFileLists);
        }



        var filesList = $('tr');
        for(let i = 1; i < filesList.length - 1; i++) {
            var fileObj = {
                fileName: $(filesList[i]).children('.fileName').text(),
                fileType: $(filesList[i]).children('.fileType').text(),
                fileDurationH: $(filesList[i]).children('.file_duration').children('span.file_hour_length').text(),
                fileDurationM: $(filesList[i]).children('.file_duration').children('span.file_minute_length').text(),
                fileDurationS: $(filesList[i]).children('.file_duration').children('span.file_second_length').text(),
            }
            savedFileListInfo.push(fileObj);
        }

        localStorage.setItem('savedFileListInfo', JSON.stringify(savedFileListInfo));
        console.log(savedFileListInfo);
        // console.log(filesList.length);
        // console.log(JSON.stringify(filesList));


    });


    $('body').on('click', '.saved-list-item', function() {

    });

    /* On show of save file modal, focus on the file list name input */
    $('#saveListModal').on('shown.bs.modal', function () {
        $('.save-list-name').trigger('focus');
    });

    /* Make the file table list sortable */
    $infoBody.sortable({
        axis: 'y',
        update: function() {
            fileInfo.arrange()
        }
    });

    /* DOES NOTHING, MAY NEED DELETED */
    // $('#exampleModalCenter').modal({}); //show: false

})();
});
