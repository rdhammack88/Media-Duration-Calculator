$('document').ready(function() {

    var infoBody = $('#file-info');
    var fileInfo = {
        index: 0,

        updateIndex: function() {
            return this.index + 1;
        },


        display: function(index, name, type, len=0) {
            return `<tr><th scope="row">${index}</th><td class="fileName">${name}</td><td>${type}</td><td>${len}</td><td class="icons"><button type="button"><i class="fas fa-trash"></i></button><button type="button"><i class="fas fa-check"></i></button></td></tr>` //&nbsp;&nbsp;&nbsp;&nbsp;
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

        var fileNames = document.querySelectorAll('.fileName');
        fileNames = fileNames.length ? Array.from(fileNames) : [];
        console.log(fileNames);
        var totalFileCount = $('table > tbody > tr:last-of-type > th').html();
        if(!totalFileCount) {
            totalFileCount = 0;
        }

        for(var i = 0; i < this.files.length; i++) {
            if(fileNames.includes(this.files[i].name)) {
                continue;
            } else {
                fileNames.push(this.files[i].name);
                infoBody.append(fileInfo.display(++totalFileCount, this.files[i].name, this.files[i].type));
            }
        }

        $('#totalFileCount').text(`${totalFileCount} `);

    });
});
