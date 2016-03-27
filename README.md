# gulpexample

#Show the old version packages
npm outdated
#Get the latest dependency packages
npm update 
#Use the current versions
npm install 
#For debug testing
gulp default 
#Build app in dist folder
gulp build 


#Notes
Want to build only one style file
```html
<!--build:css css/styles.min.css-->
<link rel="stylesheet" href="css/test1.css">
<link rel="stylesheet" href="css/test2.css">
<!--endbuild-->
```
Want to build only one js file
```html
<!--build:js js/main.min.js -->
<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/jquery.scrolly.min.js"></script>
<script src="js/lib/main.js"></script>
<!-- endbuild -->
```
#Resource 
http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
