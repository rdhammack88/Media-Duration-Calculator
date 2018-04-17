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
<body dropzone="none">
    <!-- <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
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
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav> -->

    <div class="container">
        <div class="file-load" id="file-load" dropzone="copy">
        	<div class="file-drop" dropzone="copy">
        		<form action="file-load.php" method="get">
                    <label for="multimedia_upload" id="file-drop" dropzone="copy"><span>Choose files to upload.</span></label>
        			<input type="file" id="multimedia_upload" name="multimedia_upload" multiple="multiple" accept=".mp4, .avi, .mpeg, .mp3">
        		</form>
        	</div>
        </div>

        <div class="clear">
            <button type="button" name="clear_list" class="btn btn-large clear_list">Clear List</button>
        </div>

        <div class="file-info-container">
        	<table class="table table-striped table-dark table-responsive-md">
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
                        <!-- <th scope="col"></th> -->
                        <!-- <th scope="col"></th> -->
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
        </div>
    </div>
    <!-- /.container -->


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
