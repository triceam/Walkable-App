Walkable-App
============

Walkable Restaurants provides you with an easy way to find a bite to eat or refreshing drink anywhere in the US. Either select a type of cuisine, or enter a search phrase, and the Walkable Restaurants app will find destinations that are nearby.
Only destinations near your current location will be returned in your search result. If we are able to calculate travel times based upon walking and train schedules, then we will only return destinations within a 20-minute walk. If we are not able to calculate walk time, only destinations within 2.5 miles of your current location will be displayed. 

Walking time calculations are only available for CA, FL, & NY. All other locations will display distance in miles. Additional states may be available in the future for walking/train transit times.
Data Services

All walking/travel time distance calculations are obtained through <a href="http://www.traveltimeapp.com/" target="_blank">Travel Time, by Igeolise</a>.  This service calcualtes travel time between geographic locations based upon walking, driving, and mass transit systems.
<hr/>
All point-of-interest (POI) information is obtained through services provided by <a href="http://www.factual.com/" target="_blank">factual.com</a>.  This application uses the <a href="http://www.factual.com/data-apis/places/restaurants" target="_blank">U.S. Restaurants</a> data set, which provides information for over 800,000 restaurants across the United States, including location, price ratings, cuisine, and more.
        
        
<h3>Attribution</h3>

The following creative commons assets were used in this application:
<ul style="margin: 8px; padding: 0px;">

            <li><a href="http://commons.wikimedia.org/wiki/File:Roasted_coffee_beans.jpg" target="_blank">Roasted Coffee Beans - Wikimeda</a></li>
            <li><a href="http://commons.wikimedia.org/wiki/File:Rotiniwithtomatosauce.jpg" target="_blank">Rotini With Tomato Sauce - Wikimeda</a></li>
            <li><a href="http://commons.wikimedia.org/wiki/File:Kopfsalat_Setzlinge.JPG" target="_blank">Lettuce, from Wikimeda</a></li>
            <li><a href="http://thenounproject.com/noun/magnifying-glass/#icon-No95" target="_blank">Magnifying Glass - The Noun Project</a></li>
            <li><a href="http://thenounproject.com/noun/walking/#icon-No250" target="_blank">Walking - The Noun Project</a></li>
            <li><a href="http://thenounproject.com/noun/star/#icon-No2889" target="_blank">Star - The Noun Project</a></li>
        </ul>
        
<h3>Open Source</h3>

The Walkable Restaurants application source code is freely available and open source on GitHub. Application source code is intended to be used as a learning tool for building PhoneGap applications using backbone.js.
Additional open source libraries used in this app include:

<ul style="margin: 8px; padding: 0px;">

            <li><a href="http://phonegap.com" target="_blank">PhoneGap</a></li>
            <li><a href="http://twitter.github.com/bootstrap/" target="_blank">Twitter Bootstrap (UI)</a></li>
            <li><a href="leaflet.cloudmade.com" target="_blank">Leaflet (Maps)</a></li>
            <li><a href="http://backbonejs.org/" target="_blank">Backbone.js</a></li>
            <li><a href="triceam.github.com/app-UI/" target="_blank">App-UI</a></li>
            <li><a href="underscorejs.org" target="_blank">Underscore.js</a></li>
            <li><a href="jquery.com" target="_blank">jQuery</a></li>
            <li><a href="cubiq.org/iscroll" target="_blank">iScroll</a></li>

        </ul>


The server-side portion of this application simply aggregates data from Factual and Travel Time, and is developed with <a href="nodejs.org" target="_blank">node.js</a>, using the <a href="http://expressjs.com/" target="_blank">expressjs</a> framework.