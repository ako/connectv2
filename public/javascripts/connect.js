var medewerkerViewModel = function(){
    var self = this;
    self.medewerkerId = ko.observable(0);
    self.medewerkerVoornaam = ko.observable('voornaam');
    self.medewerkerAchternaam = ko.observable('achternaamx');
    this.queryMedewerker = function(){
        console.log('queryMedewerker');
        $.getJSON("/medewerker/1",function(data){
            console.log("received: " + data.voornaam);
            self.medewerkerId(data.id);
            self.medewerkerVoornaam(data.voornaam);
            self.medewerkerAchternaam(data.achternaam);
            console.log("updated: " + self.medewerkerVoornaam());
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            console.log("error: " + textStatus + " " + errorThrown);
        });
    };
};

var initialMedewerkers = [
    {medewerkerId: 0, medewerkerVoornaam: "x", medewerkerAchternaam: "y"},
    {medewerkerId: 1, medewerkerVoornaam: "a", medewerkerAchternaam: "b"},
    {medewerkerId: 2, medewerkerVoornaam: "c", medewerkerAchternaam: "d"},
    {medewerkerId: 3, medewerkerVoornaam: "e", medewerkerAchternaam: "e"}
];

var medewerkerListViewModel = function(initData){
    var self = this;
    self.medewerkers = ko.observableArray(ko.utils.arrayMap(initData,function(medewerker){
        return {
            medewerkerId: medewerker.medewerkerId,
            medewerkerVoornaam: medewerker.medewerkerVoornaam,
            medewerkerAchternaam: medewerker.medewerkerAchternaam
        };
    }));
    self.queryMedewerkers = function(){
        console.log('queryMedewerkers');
        $.getJSON("/medewerkers/all",function(data){
            console.log("received: " + data);
			self.medewerkers.removeAll();
            _.each(data,function(mw){
				self.medewerkers.push({
            medewerkerId: mw.id,
            medewerkerVoornaam: mw.voornaam,
            medewerkerAchternaam: mw.achternaam
				});
			});
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            console.log("error: " + textStatus + " " + errorThrown);
        });
    };
    self.queryMedewerkers();
}

var connectApp = (function(){
    var init = function(){
        console.log('init');
        ko.applyBindings(new medewerkerViewModel(),$("#medewerkerView")[0]);
        ko.applyBindings(new medewerkerListViewModel(initialMedewerkers),$("#medewerkerListView")[0]);
    };
    return {
        initApp: init
    };
})();
