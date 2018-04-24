<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="">

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

        <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

         <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
        </div> -->
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
            A save feature is currently being implented, so stay tuned for more features! Go ahead and drag some files to the browser and see how easy it is to use.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
        <div class="file-load" id="file-load" dropzone="copy">
        	<div class="file-drop" dropzone="copy">
        		<form action="file-load.php" method="get">
                    <label for="multimedia_upload" id="file-drop" dropzone="copy"><span>Choose files to upload.</span></label>
        			<input type="file" id="multimedia_upload" name="multimedia_upload" multiple="multiple" accept=".mp4, .avi, .mpeg, .flv, .mp3">
        		</form>
        	</div>
        </div> <!-- .file-load -->

        <div class="clear-all">
            <button type="button" name="clear_list" class="btn btn-large clear_list">Clear List</button>
        </div> <!-- .clear-all -->

        <div class="save-all">
            <a href="./index.php" type="button" name="save_list" class="btn btn-large save_list" download>Save List</a>
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
