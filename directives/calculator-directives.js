app.directive('focus', function($timeout) {
    return {
        scope : {
            trigger : '@focus'
        },
        link : function(scope, element) {
            element[0].focus();
        }
           
    };
});  
app.directive("savedRecord", function() {
    return {
        scope: {},  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        template: '<li></li>',
        link:function(scope,element,attrs){
            console.log("Element directive")
            element.addClass('elentSelector')
        }
    };
})
//keyboard
app.directive('myd1', function(){
  return {
    priority : 100,
    template: '<span>directive template1</span>',
    replace: true
  }
});
 //Keyboard Input
app.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');

            if (digits.split('.').length > 2) {
              digits = digits.substring(0, digits.length - 1);
            }

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
  };
});