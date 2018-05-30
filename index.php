<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Media Duration Calculator Application">
    <meta name="author" content="Dustin Hammack">

    <!-- Icon reference links -->
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

    <title>Playlist Maker</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    <!-- jQuery UI CSS -->
    <link rel="stylesheet" href="libs/jquery-ui.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles/css/main.css">
    <!-- Font-Awesome CDN -->
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top justify-content-between">
        <a class="navbar-brand ml-md-5" href="./">
            <i class="fa fa-clock mr-3"></i>
            Playlist Maker
        </a>

        <div class="help mx-md-5">
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#helperModal" data-title="Get Help">
              <i class="fa fa-question"></i>
            </button>
        </div>
    </nav> <!-- Navigation Bar -->

    <!-- Help Modal Window -->
    <div class="modal fade" id="helperModal" tabindex="-1" role="dialog" aria-labelledby="helperModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="helperModalTitle">How to use Playlist Maker</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div id="tabs">
                  <ul>
                     <li class="active"><a href="#overviewHelp">Basic Overview</a></li>
                     <li><a href="#saveListHelp">How to save lists</a></li>
                     <!-- <li><a href=""></a></li> -->
                  </ul>
                  <div id="overviewHelp">
                      Find out the total time of a set of videos or songs you have, by either simply dragging-and-dropping the files anywhere into the browsers webpage, or by clicking the upload button. You can then delete the whole file from the list by clicking on the &nbsp; <i class="fas fa-trash"></i> Trashcan &nbsp; icon next to the file information, or just mark it done by clicking the &nbsp; <i class="fas fa-check"></i> Checkmark &nbsp; icon next to the file information. You can delete the entire list by clicking the "Clear List" button above the file table. Go ahead and drag some files to the browser and see how easy it is to use.

                      <br/><br/>
                      <span class="note">** Note: Dragging/Uploading of whole folders not currently supported. You will have to Drag/Upload files only. Also, certain files for some reason may not drag into browser, if this is the case, try to upload the file through the upload button.
                      <br/><br/>
                      ** SUPPORTED FILE TYPES INCLUDE : '.mp4', '.avi', '.mpeg', '.mp3'</span>
                  </div>
                  <div id="saveListHelp">
                      If you would like to save your list, you can do so by clicking the blue Save List button. It will prompt you to provide a name for the list. It will then generate a list of the saved files, which you can then click on the list name, and the files within the saved list will be displayed to the screen. You can delete the saved list by clicking the &nbsp; <i class="fas fa-trash"></i> Trashcan &nbsp; icon next to the list name. <br/> Upon displaying the saved files, if you click the &nbsp; <i class="fas fa-trash"></i> Trashcan &nbsp; icon next to the file information in the file list table, the file info will also be completely removed from the saved list of files.
                  </div>
              </div>

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

    <!-- Clear List Modal Window -->
    <div class="modal fade" id="clearListModal" tabindex="-1" role="dialog" aria-labelledby="clearListModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="clearListModalTitle">Delete saved list contents?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <h4 class="">Would You like to delete the saved list and all of its contents as well?</h4>
                <br/>
                <p class="text-danger text-left clear-name-error"><small>Warning: this can not be undone!</small></p>
            </div>
            <div class="modal-footer">
                <!-- <div class="modal-footer-btns"> -->
                    <div class="clear-list-deny">
                        <button type="button" class="btn clear-list-deny-btn" data-dismiss="modal">No</button>
                    </div>
                    <div class="clear-list-confirm">
                        <button type="button" class="btn btn-danger clear-list-confirm-btn" data-dismiss="modal">Yes</button>
                    </div>
                <!-- </div> -->
            </div>
          </div>
        </div>
    </div> <!-- Clear List Modal Window -->

    <!-- Delete Saved List Modal Window -->
    <div class="modal fade" id="deleteListModal" tabindex="-1" role="dialog" aria-labelledby="deleteListModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteListModalTitle">Delete saved list?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <h4 class="">Are you sure you want to delete this saved list?</h4>
                <br/>
                <p class="text-danger text-left clear-name-error"><small>Warning: this can not be undone!</small></p>
            </div>
            <div class="modal-footer">
                <!-- <div class="modal-footer-btns"> -->
                    <div class="clear-list-deny">
                        <button type="button" class="btn delete-list-deny-btn" data-dismiss="modal">No</button>
                    </div>
                    <div class="clear-list-confirm">
                        <button type="button" class="btn btn-danger delete-list-confirm-btn" data-dismiss="modal">Yes</button>
                    </div>
                    <input type="hidden" class="deleteModalListName" value="">
                <!-- </div> -->
            </div>
          </div>
        </div>
    </div> <!-- Delete Saved List Modal Window -->

    <!-- Delete File Modal Window -->
    <div class="modal fade" id="deleteFileModal" tabindex="-1" role="dialog" aria-labelledby="deleteFileModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteFileModalTitle">Delete File?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <h4 class="">Are you sure you want to remove this file?</h4>
                <br/>
                <p class="text-danger text-left clear-name-error"><small>Warning: this can not be undone!</small></p>
            </div>
            <div class="modal-footer">
                <!-- <div class="modal-footer-btns"> -->
                    <div class="remove-file-deny">
                        <button type="button" class="btn remove-file-deny-btn" data-dismiss="modal">No</button>
                    </div>
                    <div class="remove-file-confirm">
                        <button type="button" class="btn btn-danger remove-file-confirm-btn" data-dismiss="modal">Yes</button>
                    </div>
                    <div class="fileToDelete">
                        <input type="hidden" id="listToDeleteFileFrom">
                        <input type="hidden" id="elFileHolder">
                    </div>
                <!-- </div> -->
            </div>
          </div>
        </div>
    </div> <!-- Delete File Modal Window -->

    <!-- Body Content Container -->
    <div class="container">
        <!-- File dropzone -->
        <div class="file-load" id="file-load" dropzone="copy">
        	<div class="file-drop" dropzone="copy">
        		<form> <!--  action="file-load.php" method="get" -->
                    <label for="multimedia_upload" id="file-drop" dropzone="copy"><span data-title="Upload Files">Choose files to upload.</span></label>
        			<input type="file" id="multimedia_upload" name="multimedia_upload" multiple="multiple" accept=".mp4, .avi, .mpeg, .flv, .mp3">
        		</form>
        	</div>
        </div> <!-- .file-load -->

        <!-- Saved file lists display -->
        <div class="file-list-of-names">
            <h2>Saved Playlists</h2>
            <ul class="list-group file-name-list"></ul>
        </div>

        <!-- New, Clear and Save Buttons -->
        <div class="new-list">
            <button type="button" class="btn new-list-btn" data-title="New List"><!--btn-success-->
                <i class="fa fa-plus"></i>
                New List
            </button>
        </div> <!-- .new-list -->
        <div class="clear-all">
            <button type="button" name="clear_list" class="btn btn-large clear_list"  data-toggle="modal" data-target="" data-title="Clear List">
                <i class="fas fa-trash-alt"></i>
                Clear List
            </button> <!-- #clearListModal -->
        </div> <!-- .clear-all -->
        <div class="save-all">
                <button type="button" name="save_list" class="btn btn-large save_list" data-toggle="modal" data-target="#saveListModal" data-title="Save List">
                <i class="far fa-save"></i>
                Save List
            </button>
        </div> <!-- .save-all -->

        <!-- File list display -->
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
                    </tr>
                </tfoot>
        	</table>
        </div> <!-- .file-info-container -->

    </div> <!-- Body Content Container -->

    <!-- Bootstrap and jQuery Scripts
    ================================================== -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
        integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js"
        integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4"
        crossorigin="anonymous"></script>
    <!-- Fallback script for jQuery UI -->
    <script src="./libs/jquery-ui.min.js"></script>
    <!-- Custom Scripts -->
    <script src="js/app.js" defer></script>
</body>
</html>
