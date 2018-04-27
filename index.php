<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
    <link rel="icon" href="favicon.png" type="image/x-icon"> -->
    <link rel="apple-touch-icon" sizes="57x57" href="./icons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="./icons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="./icons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="./icons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="./icons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="./icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="./icons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="./icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="./icons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="./icons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./icons/favicon-16x16.png">
    <link rel="manifest" href="./icons/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="./icons/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <title>Media Duration</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">

    <link rel="stylesheet" href="styles/css/main.css">

    <!-- Font-Awesome CDN -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top justify-content-between">
        <a class="navbar-brand ml-md-5" href="./">
            <i class="fa fa-clock mr-3"></i>
            Media Duration Calculator
        </a>

        <div class="help mx-md-5">
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#helperModal" data-title="Get Help">
              <i class="fa fa-question"></i>
            </button>
        </div>
    </nav>

    <!-- Help Modal Window -->
    <div class="modal fade" id="helperModal" tabindex="-1" role="dialog" aria-labelledby="helperModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="helperModalTitle">How to use the Media Calculator</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Find out the total time of a set of videos or songs you have, by either simply dragging-and-dropping the files anywhere into the browsers webpage, or by clicking the upload button. You can then delete the whole file from the list by clicking on the &nbsp; <i class="fas fa-trash"></i> Trashcan &nbsp; icon next to the file information, or just mark it done by clicking the &nbsp; <i class="fas fa-check"></i> Checkmark &nbsp; icon next to the file information. You can delete the entire list by clicking the "Clear List" button above the file table.
            <br/> If you would like to save your list, you can do so by clicking the blue Save List button. It will prompt you to provide a name for the saved list. It will then generate a list of the saved files, which you can then click on the saved file list name, and the files within the saved list will be displayed to the screen. You can delete the saved list by clicking the &nbsp; <i class="fas fa-trash"></i> Trashcan &nbsp; icon next to the saved file list name. <br/> Upon displaying the saved files, if you click the &nbsp; <i class="fas fa-trash"></i> Trashcan &nbsp; icon next to the file information in the file list table, the file info will also be completely removed from the saved list of files. Go ahead and drag some files to the browser and see how easy it is to use.
            <br/><br/>
            ** Note: Dragging/Uploading of whole folders not currently supported. You will have to Drag/Upload files only. Also, certain files for some reason may not drag into browser, if this is the case, try to upload the file through the upload button.
            <br/><br/>
            ** SUPPORTED FILE TYPES INCLUDE : '.mp4', '.avi', '.mpeg', '.mp3'
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div> <!-- Help Modal Window -->

    <!-- Save List Modal Window -->
    <div class="modal fade" id="saveListModal" tabindex="-1" role="dialog" aria-labelledby="saveListModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="saveListModalTitle">Save the file list locally</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <label> File List Name: <br/><br/>
                    <input type="text" name="save_list_name" class="save-list-name" value="">
                </label>
                <p class="text-danger text-center saved-name-error"></p>
            </div>
            <div class="modal-footer">
                <div class="save-list-btn">
                    <button type="button" class="btn btn-success save-list" data-dismiss="modal">Save</button>
                </div>
                <div class="close-modal-btn">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>

            </div>
          </div>
        </div>
    </div> <!-- Save List Modal Window -->

    <div class="container">
        <div class="file-load" id="file-load" dropzone="copy">
        	<div class="file-drop" dropzone="copy">
        		<form action="file-load.php" method="get">
                    <label for="multimedia_upload" id="file-drop" dropzone="copy"><span data-title="Upload Files">Choose files to upload.</span></label>
        			<input type="file" id="multimedia_upload" name="multimedia_upload" multiple="multiple" accept=".mp4, .avi, .mpeg, .flv, .mp3">
        		</form>
        	</div>
        </div> <!-- .file-load -->

        <div class="file-list-of-names">
            <h2>Recently Saved File Lists</h2>
            <ul class="list-group file-name-list"></ul>
        </div>

        <div class="clear-all">
            <button type="button" name="clear_list" class="btn btn-large clear_list" data-title="Clear List">Clear List</button>
        </div> <!-- .clear-all -->

        <div class="save-all">
            <!-- <a href="./" role="button" name="save_list" class="btn btn-large save_list" >Save List</a> -->
            <button type="button" name="save_list" class="btn btn-large save_list" data-toggle="modal" data-target="#saveListModal" data-title="Save List" >Save List</button>
        </div> <!-- .save-all -->

        <div class="file-info-container">
        	<table class="table table-striped table-dark table-responsive-sm">
        		<thead>
        			<tr>
        				<th scope="col">#</th>
        				<th scope="col">File Name</th>
        				<th scope="col">File Type</th>
        				<th scope="col">File Duration</th>
                        <th scope="col">Delete/Done</th>
        			</tr>
        		</thead>
        		<tbody id="file-info-body"></tbody>
                <tfoot>
                    <tr>
                        <th scope="col" colspan="2"><span id="totalFileCount">0</span> Files</th>
                        <th scope="col" class="totalText">
                            Total Duration:
                        </th>
                        <th scope="col" colspan="1" id="totalDuration">
                            <span>
                                <span class="totalHours">00 </span> :
                                <span class="totalMinutes"> 00 </span> :
                                <span class="totalSeconds"> 00 </span>
                            </span>
                        </th>
                        <th id="durationTotal"></th>
                        <!-- <th scope="col" class="timeFormat"> -->
                            <!-- <input type="checkbox" name="timeFormat" value="minutes" checked>
                            <input type="checkbox" name="seconds" value="seconds">

                            <button type="button" class="minutes activeFormat">M</button>
                            <button type="button" class="seconds">S</button>
                            <span class="minutes activeFormat">M</span> /
                            <span class="seconds">S</span> -->

                            <!-- <label for="formatToggle" class="format-toggle">
                              <input type="checkbox" id="formatToggle" class="format-toggle__input"  name="timeFormat" value="minutes" checked/>
                              <span class="format-toggle__button"></span>
                            </label> -->
                        <!-- </th> -->
                    </tr>
                </tfoot>
        	</table>
        </div> <!-- .file-info-container -->

    </div> <!-- .container -->

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
    <script src="./libs/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
    <script src="js/app.js" defer></script>
</body>
</html>
