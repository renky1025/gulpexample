# gulpexample
// to show the old version packages
npm outdated
// to get the latest dependency packages
npm update 
// or use the current versions
npm install 
// for debug testing
gulp default 
// build app in dist folder
gulp build 


Resource : http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

Notes:
in html
To build only one style file
<!--build:css css/styles.min.css-->
<link rel="stylesheet" href="css/test1.css">
<link rel="stylesheet" href="css/test2.css">
<!--endbuild-->
To build only one js file
<!--build:js js/main.min.js -->
<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/jquery.scrolly.min.js"></script>
<script src="js/lib/main.js"></script>
<!-- endbuild -->