$('document').ready(function() {
/* Once the document has loaded, run an IIFE to not polute the global namespace */
(function() {

    window.URL = window.URL || window.webkitURL
    var $fileDrop = $('#file-drop');
    var $infoBody = $('#file-info-body');
    var $newListButton = $('.new-list-btn');
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
        fileCount: 0,
        fileNamesList: [],

        /* Method to add individual file duration to total duration */
        addTotalDuration: function(fileHourLength, fileMinuteLength, fileSecondLength) {
            /* Update the file list objects total duration */
            this.durTotal = this.durTotal + ((fileHourLength*60*60) + (fileMinuteLength * 60) + fileSecondLength);
            /* Update the file list objects total time formats h:m:s */
            this.totalHours = Math.floor(this.durTotal/60/60);
            this.totalMinutes = Math.floor(this.durTotal/60%60);
            this.totalSeconds = Math.floor(this.durTotal%60);
        },

        /* Method to subtract individual file duration from total duration */
        subTotalDuration: function(fileHourLength, fileMinuteLength, fileSecondLength) {
            /* Subtract the file time lengths from the total time lengths */
            this.totalHours -= fileHourLength;
            this.totalMinutes -= fileMinuteLength;
            this.totalSeconds -= fileSecondLength;
            /* First, test if the new total time length for each format h:m:s, is less than 0 */
            this.totalHours = this.totalHours < 0 ? 60 + this.totalHours : this.totalHours;
            this.totalHours = this.totalMinutes < 0 ? this.totalHours - 1 : this.totalHours;
            this.totalMinutes = this.totalMinutes < 0 ? 60 + this.totalMinutes : this.totalMinutes;
            this.totalMinutes = this.totalSeconds < 0 ? this.totalMinutes - 1 : this.totalMinutes;
            this.totalSeconds = this.totalSeconds < 0 ? 60 + this.totalSeconds : this.totalSeconds;
            /* Update total duration of all files still left in list */
            this.durTotal = this.durTotal - ((fileHourLength*60*60) + (fileMinuteLength * 60) + fileSecondLength);
        },

        /* Method to arrange file # in list, when files are moved around or deleted */
        arrange: function() {
            var $filePos = $('.file_position');
            for(var filePos in $filePos) {
                $filePos[filePos].innerText = parseInt(filePos) + 1;
            }
        },

        /* Method to clear all file info when trashcan icon is clicked */
        clear_file: function(operand, el) {
            this.index--;
            $totalFileCount.text(this.index - 1);
            $('#multimedia_upload').val(null);
            var $remove = $(el).closest('tr');
            var fileName = $(el).parent().siblings('td.fileName').text();
            this.updateTotalDuration('sub', el);
            $remove.remove();
            this.arrange();

            if(this.fileNamesList.includes(fileName)) {
                let index = this.fileNamesList.indexOf(fileName);
                this.fileNamesList.splice(index, 1);
            }
            if($infoBody.html() == '') {
                this.clear_list();
            }
        },

        /* Method to clear all files from list */
        clear_list: function() {
            this.fileNamesList = [];
            $infoBody.html('');
            $newListButton.fadeOut(1000);
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

        /* Method to clear individual file from the saved file list */
        clearFileFromSavedList: function(el, totalDuration) {
            console.log(el);
            console.log('#' + el);
            let parent = $('#' + el).closest('tr');
            let fileName = $('#' + el).parent().siblings('td.fileName').text();
            let listName = $('#' + el).next().next('input.saved_file_list').val();
            console.log(listName);
            console.log(parent);
            console.log(fileName);
            // let fileDuration = $(el).parents('.icons').prev('.file_duration').children('.file_duration_total').children('input').val();
            //
            // console.log(fileDuration);

            // let hr = $('.totalHours').text();
            // let min = $('.totalMinutes').text();
            // let sec = $('.totalSeconds').text();
            // let totalDuration = hr + ':' + min + ':' + sec;
            // console.log(this.durTotal);
            // this.durTotal -= fileDuration;
            // console.log(this.durTotal);

            for(let obj in savedFileListInfo) {
                if(savedFileListInfo[obj].listName === listName && savedFileListInfo[obj].fileName === fileName) {
                    savedFileListInfo.splice(obj, 1);
                    localStorage.setItem('savedFileListInfo',
                    JSON.stringify(savedFileListInfo));
                    break;
                }
            }
            for(let savedList in fileListNames) {
                if(fileListNames[savedList].name === listName) {
                    fileListNames[savedList].totalFileCount = parseInt(fileListNames[savedList].totalFileCount) - 1;
                    fileListNames[savedList].totalDuration = totalDuration;

                    if(fileListNames[savedList].totalFileCount <= 0) {
                        $('.saved-list-item.'+listName).remove();
                        this.deleteSavedList(listName);
                    }
                    localStorage.setItem('fileListNames',
                    JSON.stringify(fileListNames));
                }
            }
            // this.updateDisplaySavedFileLists(listName);
            this.updateLocalStorage();
        },

        /* Method to delete the saved file list */
        deleteSavedList: function(listName) {
            for(let obj in fileListNames) {
                if(fileListNames[obj].name === listName) {
                    let i = obj;
                    fileListNames.splice(i, 1);
                    localStorage.setItem('fileListNames', JSON.stringify(fileListNames));
                }
            }
            this.updateLocalStorage();
            this.clear_list();
            // $fileInfoTable.hide();
        },

        /* Method to display each file info into the list */
        display: function(name, type, hours, minutes, seconds, duration, savedList='', btnIndx = 0) {
            $newListButton.fadeIn(1000);
            $clearAllButton.fadeIn(1000);
            $saveAllButton.fadeIn(1000);
            $fileInfoTable.fadeIn(1000);
            hiddenInput = fileListNames.length ? `<input type="hidden" class="saved_file_list" value="${savedList}"/>` : '';
            // var btnIndx = 0;
            var shortName = name;
            if(name.length > 60) {
                shortName = name.slice(0, 59);
                var charsToRemove = /[^A-z0-9]/;

                while( shortName[shortName.length - 1].match(charsToRemove)) {
                    shortName = shortName.slice(0, shortName.length - 1);
                }
                shortName += '....';
            }

            return `<tr class="fileInfoRow"><th scope="row" class="file_position">${this.index++}</th><td class="fileName" data-name="${name}">${shortName}</td><td class="fileType">${type}</td><td class="file_duration"><span class="file_duration_total"><input type="hidden" value="${duration}"/></span><span class="file_hour_length">${hours}</span> : <span class="file_minute_length">${minutes}</span> : <span class="file_second_length">${seconds}</span></td><td class="icons"><button type="button" class="delete" id="fileDeleteIndx${btnIndx}" data-toggle="modal" data-target="#deleteFileModal" data-title="Delete File"><i class="fas fa-trash"></i></button><button type="button" class="done"><i class="fas fa-check"></i></button>${hiddenInput}</td></tr>`;
        },

        /* Method to save file lists and add the name to display */
        displaySavedFileLists: function(fileList) {
            $('.file-name-list').html("");
            for(var listName in fileList) {
                $('.file-name-list').append(
                    '<li class="list-group-item saved-list-item ' + fileList[listName].name + '"><span class="saved-file-list">' + fileList[listName].name + '</span><span class="list-total-time">' + fileList[listName].totalDuration + '</span><span class="saved-total-file-count"><span class="saved-file-count">' + fileList[listName].totalFileCount + '</span>' + (fileList[listName].totalFileCount > 1 ? ' files' : ' file') + '</span><span class="done-delete-btns"><button type="button" class="completeSavedList"><i class="fas fa-check"></i></button><button type="button" class="deleteSavedList" data-toggle="modal" data-target="#deleteListModal" data-title="Delete List"><i class="fas fa-trash"></i></button></span></li>'
                )
            }
            $('.file-list-of-names').fadeIn(1000);
        },

        /* Method to display saved list file information */
        displaySavedFileListInfo: function(showListName) {
            var thisFileList = JSON.parse(localStorage.getItem('savedFileListInfo'));
            fileInfo.index = 1;
            fileInfo.durTotal = 0;
            $infoBody.html('');

            for(let fileInformation in thisFileList) {
                if(thisFileList[fileInformation].listName === showListName) {
                    $infoBody.append(
                        fileInfo.getfileDuration(
                            thisFileList[fileInformation].fileDuration,
                            thisFileList[fileInformation].fileName,
                            thisFileList[fileInformation].fileType,
                            fileInfo,
                            showListName
                        )
                    )
                }
            }
            $fileInfoTable.fadeIn(1000);
        },

        /* Method to get each files total duration */
        getfileDuration: function(duration, name, type, obj = this, savedList = '') {
            obj.durTotal += parseInt(duration);
            var hours = parseInt(Math.floor(duration/60/60));
            var minutes = parseInt(Math.floor(duration/60%60));
            var seconds = parseInt(Math.floor(duration%60));
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            /* Update the file list objects total time formats h:m:s */
            obj.totalHours = Math.floor(obj.durTotal/60/60);
            obj.totalMinutes = Math.floor(obj.durTotal/60%60);
            obj.totalSeconds = Math.floor(obj.durTotal%60);
            /* Test if all totals are under 10, then add a "0" to the front before display */
            fileInfo.lessThanTenTest(obj);
            $infoBody.append(fileInfo.display(name, type, hours, minutes, seconds, duration, savedList, this.fileCount++));
            $totalFileCount.text(obj.index - 1);
            $('.totalHours').text(obj.totalHours);
            $('.totalMinutes').text(obj.totalMinutes);
            $('.totalSeconds').text(obj.totalSeconds);
        },

        /* Method to get each file information when file is uploaded/dragged into browser */
        getFileInfo: function(file, indx) {
            var video = document.createElement('video');
            video.preload = 'metadata';
            var that = this;

            video.onloadedmetadata  = function() {
                window.URL.revokeObjectURL(video.src);
                duration = Math.floor(video.duration);
                that.getfileDuration(duration, file.name, file.type, that);
            };
            video.src = URL.createObjectURL(file);
        },

        /* Method to check if each time format H:M:S, is under 10, add a leading 0 */
        lessThanTenTest: function(obj) {
            obj.totalHours = obj.totalHours < 10 ? '0' + obj.totalHours : obj.totalHours;
            obj.totalMinutes = obj.totalMinutes < 10 ? '0' + obj.totalMinutes : obj.totalMinutes;
            obj.totalSeconds = obj.totalSeconds < 10 ? '0' + obj.totalSeconds : obj.totalSeconds;
        },

        /* Method to save list of file information */
        saveListInfo: function() {
            let listName = $('.save-list-name').val().toLowerCase();
            let totalFileCount = $totalFileCount.text();
            if(fileListNames.some(function(obj) {return obj.name === listName})) {
                $('#saveListModal .saved-name-error').text('Please pick a name that has not already been asigned to a saved list.');
                return false;
            } else {
                let hr = $('.totalHours').text();
                let min = $('.totalMinutes').text();
                let sec = $('.totalSeconds').text();
                let totalDuration = hr + ':' + min + ':' + sec;
                fileListNames.push({'name': listName, 'totalDuration': totalDuration, 'totalFileCount': totalFileCount});
                localStorage.setItem('fileListNames', JSON.stringify(fileListNames));
                fileInfo.displaySavedFileLists(fileListNames);
            }

            let filesList = $('tr.fileInfoRow');
            for(let i = 0; i < filesList.length; i++) {
                let fileObj = {
                    listName: listName,
                    fileName: $(filesList[i]).children('.fileName').text(),
                    fileType: $(filesList[i]).children('.fileType').text(),
                    fileDuration: $(filesList[i]).children('td.file_duration').children().children('input').val()
                }
                savedFileListInfo.push(fileObj);
            }

            localStorage.setItem('savedFileListInfo', JSON.stringify(savedFileListInfo));
            $('.save-list-name').val('');
            $('#saveListModal .saved-name-error').text('');
        },

        /* Method to update the saved file list display of total file count */
        updateDisplaySavedFileLists: function(fileListName) {
            if(fileListName) {
                let count = parseInt($('.saved-list-item.'+fileListName + ' .saved-file-count').text());
                count -= 1;
                $('.saved-list-item.'+fileListName + ' .saved-file-count').text(count);
                // let savedListTotalDuration =
                let hr = $('.totalHours').text();
                let min = $('.totalMinutes').text();
                let sec = $('.totalSeconds').text();
                let totalDuration = hr + ':' + min + ':' + sec;
                $('.saved-list-item.'+fileListName + ' .list-total-time').text(totalDuration);
                return totalDuration;
            }
        },

        /* Method to update the local storage if user has deleted saved lists */
        updateLocalStorage: function() {
            if(!localStorage.length || $('.file-name-list').html() === ''){
                // localStorage.removeItem('savedFileListInfo');
                // localStorage.removeItem('fileListNames');
                localStorage.clear();
                $('.file-list-of-names').fadeOut(1000);
            }
        },

        /* Method to update the total duration of all files, when a new file is added or a file is deleted */
        updateTotalDuration: function(operand, el) {
            /* Get current file duration in each format h:m:s */
            var fileHourLength = parseInt($(el).parent().prev().children('.file_hour_length').text());
            var fileMinuteLength = parseInt($(el).parent().prev().children('.file_minute_length').text());
            var fileSecondLength = parseInt($(el).parent().prev().children('.file_second_length').text());

            if(operand === 'sub') {
                this.subTotalDuration(fileHourLength, fileMinuteLength, fileSecondLength);
            } else if(operand === 'add') {
                this.addTotalDuration(fileHourLength, fileMinuteLength, fileSecondLength);
            }

            /* Second, test if all totals are under 10, then add a "0" to the front before display */
            this.lessThanTenTest(this);
            $('.totalHours').text(this.totalHours);
            $('.totalMinutes').text(this.totalMinutes);
            $('.totalSeconds').text(this.totalSeconds);
        },
    }

    /* Check if any file lists have been saved to local storage */
    if(localStorage.getItem('fileListNames') && localStorage.getItem('savedFileListInfo')) {
        var fileListNames = JSON.parse(localStorage.getItem('fileListNames'));
        var savedFileListInfo = JSON.parse(localStorage.getItem('savedFileListInfo'));
        fileInfo.displaySavedFileLists(fileListNames);
    } else {
        $('.file-name-list').html('<p class="text-danger">You currently do not have any saved file lists.</p>');
        var fileListNames = [];
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
    $(window).on('drop', function(e) {
        e.preventDefault();
        if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length){
            e.preventDefault();
            e.stopPropagation();
            var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
            if(!totalFileCount) {
                totalFileCount = 0;
            }
            for(var i = 0; i < e.originalEvent.dataTransfer.files.length; i++) {
                if(fileInfo.fileNamesList.includes(e.originalEvent.dataTransfer.files[i].name)) {
                    continue;
                } else {
                    fileInfo.getFileInfo(e.originalEvent.dataTransfer.files[i], i);
                    fileInfo.fileNamesList.push(e.originalEvent.dataTransfer.files[i].name);
                }
            }
        }
    });

    /* On upload of files into browser, gather all file information */
    $('input:file').change(function(e) {
        e.preventDefault();
        for(var i = 0; i < this.files.length; i++) {
            if(fileInfo.fileNamesList.includes(this.files[i].name)) {
                continue;
            } else {
                fileInfo.getFileInfo(this.files[i], i);
                fileInfo.fileNamesList.push(this.files[i].name);
            }
        }
    });

    /* On click of trashcan icon for each file, delete the file from the list */
    $('body').on('click', '.delete', function(e) { //remove-file-confirm-btn
        e.preventDefault();
        let listName = $(this).next().next('input.saved_file_list').val();
        $('#listToDeleteFileFrom').val(listName);
        $('#elFileHolder').val(this.id);
        console.log(this.id);
        // console.log(this.attr('id'));

        // fileInfo.clear_file(e, this);
        // let totalDuration = fileInfo.updateDisplaySavedFileLists(listName);
        // fileInfo.clearFileFromSavedList(this, totalDuration);
    });

    $('body').on('click', '.remove-file-confirm-btn', function(e) {
        e.preventDefault();
        let totalDuration = fileInfo.updateDisplaySavedFileLists($('#listToDeleteFileFrom').val());
        fileInfo.clearFileFromSavedList($('#elFileHolder').val(), totalDuration);
        fileInfo.clear_file(e, '#' + $('#elFileHolder').val());
    })

    /* On click of checkmark icon for each file, mark out file info and update total duration */
    $('body').on('click', '.done', function(e) {
        e.preventDefault();
        if(this.style.color === 'green' || this.style.color === 'rgb(0, 128, 0)') {
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

    /* On click of checkmark icon for each file, mark out file info and update total duration */
    $('body').on('click', '.completeSavedList', function(e) {
        e.preventDefault();
        if(this.style.color === 'green' || this.style.color === 'rgb(0, 128, 0)') {
            $(this).css({'color':'#eee'});
            $(this).parents('li').css({
                'text-decoration': 'none',
                'color': '#eee'
            });
        } else {
            $(this).css({'color':'green'});
            $(this).parents('li').css({
                'text-decoration': 'line-through',
                'color': 'green'
            });
        }
    });

    /* On click of saved list item, display the saved list and all of its file information */
    $('body').on('click', '.saved-list-item', function(e) {
        if(e.target.nodeName === 'LI' || e.target.nodeName === 'SPAN') {
            var showListName = $(this).find('.saved-file-list').text();
            fileInfo.displaySavedFileListInfo(showListName);
        } else if(e.target.innerText === 'Save') {
            var showListName = $(this).parents('.modal-footer').prev('.modal-body').children('label').children('input.save-list-name').val();
            fileInfo.displaySavedFileListInfo(showListName);
        }
    });

    /*  On click of trashcan icon for saved file, delete the saved file info from local storage and display */
    // $('body').on('click', '.delete-list-confirm-btn', function(e) {
    //     let listName = $(this).prev().prev().prev('span.saved-file-list').text();
    //     fileInfo.deleteSavedList(listName);
    //     let $remove = $(e.target).parents('li.saved-list-item');
    //     $remove.remove();
    //     fileInfo.updateLocalStorage();
    // });

    /* On click of Clear List button, verify if displayed files are apart of a saved list. If they are, confirm with user if they want to delete the whole saved list as well. */
    $clearAllButton.click(function() {
        if(localStorage.getItem('fileListNames')) {
            let listName = $('input.saved_file_list:first-of-type').val();
            for(let obj in fileListNames) {
                if(fileListNames[obj].name === listName) {
                    $('.clear_list').attr('data-target', "#clearListModal");
                    return;
                } else {
                    $('.clear_list').attr('data-target', "");
                    continue;
                }
            }
            fileInfo.clear_list();
        } else {
            fileInfo.clear_list();
        }
    });

    /* On click of Clear List Confirm button, clear the entire list of saved files */
    $('.clear-list-confirm-btn, .delete-list-confirm-btn').click(function() {
        let listName = $('input.saved_file_list:first-of-type').val();
        fileInfo.deleteSavedList(listName);
        let $remove = $('li.'+listName);
        $remove.remove();
        fileInfo.updateLocalStorage();
        fileInfo.clear_list();
        $('.clear_list').attr('data-target', "");
    });

    /* On click of Clear List Deny button, clear the displayed list but DO NOT clear the saved files in the list. */
    $('.clear-list-deny-btn').click(function() {
        fileInfo.clear_list();
        $('.clear_list').attr('data-target', "");
    });

    /* On click of New List button, clear the displayed list and all variables, so a new list can be created */
    $newListButton.click(function() {
        fileInfo.clear_list();
        $('.clear_list').attr('data-target', "");
    })

    /* On click of Save button in modal window, save the current list of files */
    $('.save-list').click(function(e) {
        if(e.target.nodeName === 'LI' || e.target.nodeName === 'SPAN') {
            var showListName = $(this).find('.saved-file-list').text();
        } else if(e.target.innerText === 'Save') {
            var showListName = $(this).parents('.modal-footer').prev('.modal-body').children('label').children('input.save-list-name').val();
        }
        fileInfo.saveListInfo();
        fileInfo.displaySavedFileListInfo(showListName);
    });

    /* On show of save file modal, focus on the file list name input */
    $('#saveListModal').on('shown.bs.modal', function () {
        $('.save-list-name').trigger('focus');
    });

    /* When user is focused in the save list name input field and presses the Enter key activate the click of the save button */
    $('input.save-list-name').keypress(function(e) {
        if(e.keyCode === 13) {
            $('.save-list').click();
        }
    });

    /* Make the saved file list sortable */
    $('.file-name-list').sortable({
        axis: 'y',
        update: function() {
            fileInfo.arrange()
        }
    });

    /* Make the file table list sortable */
    $infoBody.sortable({
        axis: 'y',
        update: function() {
            fileInfo.arrange()
        }
    });

    /* Add tabular menus to the helper modal */
    $('#tabs').tabs();
    /* Add background color to indicate active menu for helper modal window */
    $('#tabs li').click(function() {
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
    });
})();
});
