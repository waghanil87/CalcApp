 
app.service('MathService', function() {
    this.add = function(a, b) { return a + b };
    this.subtract = function(a, b) { return a - b };
    this.multiply = function(a, b) { return a * b };
    this.divide = function(a, b) { return a / b };
});
//define service
app.service('detailService', function() {
    var Details='';
    this.set = function (index) {
        var validObj = Object.getOwnPropertyNames(index).length
        if(validObj<4){
            $('.records a').removeClass('active')
        }
        Details= index;
    },

    this.get = function () {
        return Details;
    }
})
app.service('CalculatorService', function(MathService){
    var total;
       this.maths = function(a,b,operator) { 
        total=a;
        //debugger;
        if(operator=='='){
            comparision=operator;
            operator=oldOperator;
        }
        if(operator=='+')
            return MathService.add(a,b);
        else if (operator=='-')
            return MathService.subtract(a,b);
        else if (operator=='*')
            return MathService.multiply(a,b);
        else if (operator=='/')
            return MathService.divide(a,b);
        else if (operator=='%')
            return a % b;
        else if (operator=='log')
            return Math.log(b);
        else if (operator=='sin')
            return Math.sin(b);
        else if (operator=='cos')
            return Math.cos(b);
        else if (operator=='sqrt')
            return Math.sqrt(b);
        else if(operator=='^'){
            for(var i=0; i<b; i++){
                total=total *a;
                return total;
            }
        }
        if(comparision == '='){
            console.log(a)
            console.log(b)
            return a;
        }
    };

});
app.service('delFilter', function(){
    return function(number){
        var newnumber = number;
        newnumber=newnumber.toString();
        newnumber=newnumber.substring(0, newnumber.length-1);
        if(newnumber.length>0)
            return newnumber;
        else
            return 0;
    }
})