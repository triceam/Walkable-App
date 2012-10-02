Walkable-App
============

Author: <a href="http://tricedesigns.com" target="_blank">Andrew Trice</a> - <a href="http://www.twitter.com/andytrice" target="_blank">@andytrice</a>  

Walkable Restaurants provides you with an easy way to find a bite to eat or refreshing drink anywhere in the US. Either select a type of cuisine, or enter a search phrase, and the Walkable Restaurants app will find destinations that are nearby.
Only destinations near your current location will be returned in your search result. If we are able to calculate travel times based upon walking and train schedules, then we will only return destinations within a 20-minute walk. If we are not able to calculate walk time, only destinations within 2.5 miles of your current location will be displayed. 

Walking time calculations are only available for CA, FL, & NY. All other locations will display distance in miles. Additional states may be available in the future for walking/train transit times.
Data Services

All walking/travel time distance calculations are obtained through <a href="http://www.traveltimeapp.com/" target="_blank">Travel Time, by Igeolise</a>.  This service calcualtes travel time between geographic locations based upon walking, driving, and mass transit systems.
<hr/>
All point-of-interest (POI) information is obtained through services provided by <a href="http://www.factual.com/" target="_blank">factual.com</a>.  This application uses the <a href="http://www.factual.com/data-apis/places/restaurants" target="_blank">U.S. Restaurants</a> data set, which provides information for over 800,000 restaurants across the United States, including location, price ratings, cuisine, and more.
        
        
<h3>Open Source</h3>

The Walkable Restaurants application source code is freely available and open source on GitHub. Application source code is intended to be used as a learning tool for building PhoneGap applications using backbone.js, but there are no limitations on its use following the MIT license:

THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


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