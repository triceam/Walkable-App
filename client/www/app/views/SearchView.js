templates.searchView = "app/views/SearchView.html";

window.SearchView = Backbone.View.extend({

    title: "Searching...",

    initialize: function(options) {

        this.render();
        this.view = this.$el;

        if(GeoWatcher.isValidLocation()) {
            var self = this;
            this.searchString = options.searchString;

            this.onSearchResult = function(result){
                self.searchResult(result);
            }
            this.onSearchError = function(error){
                self.searchError(error);
            }

            //delay long enough for transition to complete
            setTimeout(function(){SearchManager.search( self.searchString, self.onSearchResult, self.onSearchError );}, 401 );
        }
        else {
            var view = new InvalidLocationView();
            window.viewNavigator.pushView( view );
        }
    },

    events:{
    },

    render:function (eventName) {
        this.$el.html(templates.searchView);

        this.$el.css("height", "100%");
        return this;
    },

    searchResult: function(result) {
        console.log(result);

        //var result = {"points":[{"open_24hrs":true,"accessible_wheelchair":true,"address":"2 W 32nd St","address_extended":"Frnt 3","attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Japanese, Vietnamese, Korean, American, Asian, Soup","factual_id":"168a1af6-bbe8-4f7d-87a0-0f31f1e529bf","groups_goodfor":true,"hours":"{\"1\":[[\"00:00\",\"24:00\"]],\"2\":[[\"00:00\",\"24:00\"]],\"3\":[[\"00:00\",\"24:00\"]],\"4\":[[\"00:00\",\"24:00\"]],\"5\":[[\"00:00\",\"24:00\"]],\"6\":[[\"00:00\",\"24:00\"]],\"7\":[[\"00:00\",\"24:00\"]]}","kids_goodfor":true,"latitude":40.74712,"locality":"New York","longitude":-73.986213,"meal_deliver":false,"meal_dinner":true,"meal_lunch":true,"meal_takeout":true,"name":"Pho 32 N Shapu","parking":true,"payment_cashonly":false,"postcode":"10001","price":3,"rating":3.5,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(212) 695-0888","website":"http://www.pho32shabu.com","$distance":441.46808,"travel_time":535},{"accessible_wheelchair":true,"address":"120 Christopher St","attire":"casual","country":"US","cuisine":"Thai, Vietnamese","factual_id":"ea4d804d-c939-413d-b3d2-30fd460471fc","kids_goodfor":true,"latitude":40.733029,"locality":"New York","longitude":-74.005621,"meal_deliver":true,"name":"Pho Sure","payment_cashonly":false,"postcode":"10014","rating":4,"region":"NY","status":"1","tel":"(212) 929-0811","$distance":1848.5337,"travel_time":819},{"address":"148 Lafayette St","category":"Food & Beverage > Restaurants","country":"US","factual_id":"1a1bf908-6d02-4531-8a85-404817e03ae0","latitude":40.719481286,"locality":"New York","longitude":-73.99963079,"name":"New Pho Blosa Restaurant","postcode":"10013","region":"NY","status":"1","tel":"(212) 625-1873","$distance":2970.4497,"travel_time":1069},{"open_24hrs":false,"accessible_wheelchair":true,"address":"13 Saint Marks Pl","attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, Japanese, Thai","factual_id":"7a4148d9-8232-4674-9708-bcf955f2191a","groups_goodfor":true,"hours":"{\"1\":[[\"10:00\",\"2:00\"]],\"2\":[[\"10:00\",\"2:00\"]],\"3\":[[\"10:00\",\"2:00\"]],\"4\":[[\"10:00\",\"2:00\"]],\"5\":[[\"10:00\",\"2:00\"]],\"6\":[[\"10:00\",\"2:00\"]],\"7\":[[\"10:00\",\"2:00\"]]}","kids_goodfor":true,"latitude":40.729229,"locality":"New York","longitude":-73.988949,"meal_deliver":true,"meal_dinner":true,"meal_lunch":true,"meal_takeout":true,"name":"Pho 32 and Shabu","payment_cashonly":false,"postcode":"10003","price":2,"rating":3,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(212) 777-0606","$distance":1801.941,"travel_time":1105},{"open_24hrs":false,"address":"3 Pike St","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Asian, Vietnamese","factual_id":"67931f15-778f-4e34-a7d7-df27beff139f","hours":"{\"1\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]],\"2\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]],\"3\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]],\"4\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]],\"5\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]],\"6\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]],\"7\":[[\"7:00\",\"11:00\",\"Breakfast\"],[\"12:00\",\"14:30\",\"Lunch\"]]}","latitude":40.71426,"locality":"New York","longitude":-73.992558,"name":"Pho Bang","postcode":"10002","rating":3.5,"region":"NY","status":"1","tel":"(212) 233-3947","$distance":3461.5706,"travel_time":1231},{"address":"85 Baxter St","alcohol":true,"category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, Chinese, Asian","factual_id":"041dea71-4f38-4498-8c38-182fc9914a51","latitude":40.716749,"locality":"New York","longitude":-73.999799,"meal_breakfast":true,"meal_lunch":true,"meal_takeout":true,"name":"Pho Pasteur","parking":true,"payment_cashonly":false,"postcode":"10013","price":2,"rating":4,"region":"NY","reservations":true,"status":"1","tel":"(212) 608-3656","$distance":3268.9172,"travel_time":1253},{"accessible_wheelchair":true,"address":"4107 Kissena Blvd","attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, Asian","factual_id":"73b394b1-3b70-4324-9abb-878815382c2a","groups_goodfor":true,"kids_goodfor":true,"latitude":40.75791,"locality":"Flushing","longitude":-73.828473,"meal_cater":true,"meal_deliver":true,"meal_takeout":true,"name":"Pho Bang Restaurant","parking":true,"payment_cashonly":true,"postcode":"11355","rating":3.5,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(718) 939-5520","$distance":13754.206,"travel_time":1276},{"open_24hrs":false,"accessible_wheelchair":true,"address":"89 E Broadway","alcohol":true,"alcohol_beer_wine":true,"attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, Asian, Chinese","factual_id":"a74e8e13-3eaf-408b-95a3-974b6e3bda4a","groups_goodfor":true,"hours":"{\"1\":[[\"9:00\",\"21:30\"]],\"2\":[[\"9:00\",\"21:30\"]],\"3\":[[\"9:00\",\"21:30\"]],\"4\":[[\"9:00\",\"21:30\"]],\"5\":[[\"9:00\",\"21:30\"]],\"6\":[[\"9:00\",\"21:30\"]],\"7\":[[\"9:00\",\"21:30\"]]}","kids_goodfor":true,"latitude":40.713512,"locality":"New York","longitude":-73.993682,"meal_breakfast":true,"meal_cater":true,"meal_deliver":true,"meal_dinner":true,"meal_lunch":true,"meal_takeout":true,"name":"Pho 89 Restaurant","parking":true,"parking_street":true,"payment_cashonly":false,"postcode":"10002","price":1,"rating":3,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(212) 766-8899","$distance":3549.6426,"travel_time":1344},{"open_24hrs":false,"accessible_wheelchair":false,"address":"157 Mott St","alcohol":true,"alcohol_beer_wine":true,"alcohol_byob":true,"attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, Asian, Thai","factual_id":"8a745479-a937-4cd7-a191-5c7fae8cd9dd","fax":"(212) 966-4732","founded":"1985","groups_goodfor":true,"hours":"{\"1\":[[\"10:00\",\"22:00\"]],\"2\":[[\"10:00\",\"22:00\"]],\"3\":[[\"10:00\",\"22:00\"]],\"4\":[[\"10:00\",\"22:00\"]],\"5\":[[\"10:00\",\"22:00\"]],\"6\":[[\"10:00\",\"22:00\"]],\"7\":[[\"10:00\",\"22:00\"]]}","kids_goodfor":true,"latitude":40.719511,"locality":"New York","longitude":-73.996563,"meal_cater":true,"meal_deliver":false,"meal_dinner":true,"meal_lunch":true,"meal_takeout":true,"name":"Mott Pho Bang Restaurant","options_vegetarian":true,"parking":true,"parking_street":true,"payment_cashonly":true,"postcode":"10013","price":1,"rating":4,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(212) 966-3797","$distance":2914.0476,"travel_time":1350},{"open_24hrs":true,"accessible_wheelchair":true,"address":"13671 Roosevelt Ave","alcohol":true,"attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese","factual_id":"75577c0e-178e-44b1-a698-9f47185bd38c","groups_goodfor":true,"hours":"{\"1\":[[\"00:00\",\"24:00\"]],\"2\":[[\"00:00\",\"24:00\"]],\"3\":[[\"00:00\",\"24:00\"]],\"4\":[[\"00:00\",\"24:00\"]],\"5\":[[\"00:00\",\"24:00\"]],\"6\":[[\"00:00\",\"24:00\"]],\"7\":[[\"00:00\",\"24:00\"]]}","kids_goodfor":true,"latitude":40.760188,"locality":"Flushing","longitude":-73.827715,"meal_deliver":false,"meal_dinner":true,"meal_lunch":true,"meal_takeout":true,"name":"Pho Hoa Restaurant","parking":true,"payment_cashonly":false,"postcode":"11354","price":1,"rating":3,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(718) 460-6200","website":"http://www.phohoa.com/","$distance":13845.358,"travel_time":1353},{"open_24hrs":false,"accessible_wheelchair":true,"address":"277 Grand St","alcohol":true,"attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, American, Asian","factual_id":"4498bf02-7569-4d7a-aca3-ea13f12ffcac","groups_goodfor":true,"hours":"{\"1\":[[\"10:30\",\"22:30\"]],\"2\":[[\"10:30\",\"22:30\"]],\"3\":[[\"10:30\",\"22:30\"]],\"4\":[[\"10:30\",\"22:30\"]],\"5\":[[\"10:30\",\"22:30\"]],\"6\":[[\"10:30\",\"22:30\"]],\"7\":[[\"10:30\",\"22:30\"]]}","kids_goodfor":true,"latitude":40.717872,"locality":"New York","longitude":-73.9927709666667,"meal_cater":true,"meal_deliver":true,"meal_dinner":true,"meal_lunch":true,"meal_takeout":true,"name":"Pho Grand","parking":true,"payment_cashonly":false,"postcode":"10002","price":2,"rating":4,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(212) 965-5366","website":"http://phograndny.com/","$distance":3061.1624,"travel_time":1371},{"address":"3802 Prince St","attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese, Asian","factual_id":"9cce2d61-9ce6-4ebc-9970-5de4d4e23d0d","founded":"2002","groups_goodfor":true,"kids_goodfor":true,"latitude":40.760135,"locality":"Flushing","longitude":-73.832611,"meal_cater":true,"meal_deliver":true,"meal_takeout":true,"name":"Pho Vietnamese Restaurant","payment_cashonly":true,"postcode":"11354","price":1,"rating":2.5,"region":"NY","reservations":false,"seating_outdoor":false,"status":"1","tel":"(718) 461-8686","$distance":13435.255,"travel_time":1421},{"accessible_wheelchair":true,"address":"21 Mott St","attire":"casual","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Asian, Fusion, Vietnamese","factual_id":"04f2afa3-d6ef-48f3-8d81-ecc6a8e3da80","groups_goodfor":true,"kids_goodfor":true,"latitude":40.714407,"locality":"New York","longitude":-73.999023,"meal_deliver":true,"meal_takeout":true,"name":"Pho 21 Asian Fusion","payment_cashonly":false,"postcode":"10013","rating":3.5,"region":"NY","reservations":true,"seating_outdoor":false,"status":"1","tel":"(212) 227-5747","website":"http://www.phograndny.com","$distance":3509.608,"travel_time":1442},{"address":"4534 Bell Blvd","category":"Food & Beverage > Restaurants","country":"US","cuisine":"Vietnamese","factual_id":"e2234235-1dad-4ba9-b553-1c774b330965","latitude":40.759319,"locality":"Bayside","longitude":-73.768809,"meal_cater":true,"meal_takeout":true,"name":"Pho 32 N Shabu Restaurant","parking":true,"payment_cashonly":false,"postcode":"11361","price":1,"rating":4.5,"region":"NY","status":"1","tel":"(718) 767-4960","$distance":18773.14,"travel_time":1703},{"accessible_wheelchair":true,"address":"249 Newark Ave","attire":"casual","country":"US","cuisine":"Vietnamese","factual_id":"98c499ec-10fb-4ed5-9eb5-3a7326b9febf","groups_goodfor":true,"kids_goodfor":true,"latitude":40.722715,"locality":"Jersey City","longitude":-74.0484301,"meal_takeout":true,"name":"Pho Thanh Hoai Restaurant","postcode":"07302","rating":3.5,"region":"NJ","reservations":false,"seating_outdoor":false,"status":"1","tel":"(201) 239-1988","$distance":5461.5835,"travel_time":1705}],"polygons":[[[40.640585,-73.91893],[40.679764,-74.08365],[40.6670345,-74.2158598],[40.667438,-74.217394],[40.6842744,-74.2376431],[40.685005,-74.238344],[40.7648764,-74.2186652],[40.7651892,-74.2185849],[40.8004827,-74.2045356],[40.800717,-74.203944],[40.8439732,-74.0787441],[40.936875,-73.902035],[40.9370265,-73.9016077],[40.9116033,-73.7838266],[40.911504,-73.7836349],[40.797412,-73.697615],[40.79718,-73.69751],[40.7306388,-73.6808337],[40.6750017,-73.7648869],[40.640585,-73.91893]]]}

        try {
        var jsonResult = JSON.parse(result);

        var self = this;

        //cleanup once removed from view
        setTimeout(function(){
            self.$el.empty();
        }, 550 );

        var view = new SearchResultsView({ model:jsonResult, searchString:this.searchString });
        window.viewNavigator.replaceView( view );
        }
        catch(e){
            alert(e.toString())
        }
    },

    searchError: function(error) {
        console.log(error);

        //cleanup once removed from view
        setTimeout(function(){
            self.$el.empty();
        }, 500 );

        var view = new SearchResultsView({ model:{points:[], polygons:[]}, searchString:this.searchString });
        window.viewNavigator.replaceView( view );
    }



});