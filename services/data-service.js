app.service('dataService', function() {
    this.savedRecord = function(a) { 
        console.log(a)
        return a
    };
});