var app = angular.module('app', []);
  
app.controller('CalculatorController', function($scope, CalculatorService, detailService, delFilter) {
    $scope.calculation="";
    $scope.result=null;
    $scope.calNumber="";
    oldOperator=""
    $scope.operatorClicked="false"
    $scope.initialScope = function(){
        if(detailService.get() == '');
            $scope.disable = false;
    }
    $scope.setFocus = function(){
        $("#calNumber").focus()
    }
    //reset calculator input value
    $scope.reset=function(){
        $scope.calNumber=""
        $scope.setFocus();
    }
   //delete calculator input value and result/calculation value
    $scope.clear=function(){
        $scope.calNumber=0;
        $scope.calculation="";
        $scope.result=null;
        var index={}
        detailService.set(index);
        $scope.setFocus();
    }
    //delete last charactor in input
    $scope.del=function(){
        $scope.calNumber=delFilter(parseFloat($scope.calNumber));
    }
    //Soft keyboard input
    $scope.numPressed = function(num) {
        $scope.calNumber = $scope.calNumber +""+num;
        //$scope.calNumber = parseFloat($scope.calNumber);
        $scope.setFocus();
        $scope.operatorClicked="false";
    }
    $scope.records = [];
    var inx = 0;
    var inx;
    var newval;
    $scope.calc=$scope.calculation;
    $scope.storage =function(){
        $scope.rno=detailService.get();
         var validObj = Object.getOwnPropertyNames(detailService.get()).length
        if(validObj<4){//object has 4properties
            $scope.records.push({recordNo:inx,res:$scope.result,cal:$scope.calculation});
            inx++; 
        }
        else{
        //UPDATE existing record
         var answer = confirm("Update data?")
            if (answer){
                $scope.index=detailService.get();
                $scope.index.cal=$scope.calculation;
                $scope.index.res=$scope.result;
                var index={}
                detailService.set(index);
            }
            else{
                $scope.clear()
            }
           
        }
        console.log($scope.rno)
        $scope.setFocus();
        $scope.clear();
         if($scope.records.length != 0)
                $scope.disable = true
    }
    $scope.delete =function(){
        if($scope.disable == true){
            $scope.index=detailService.get();
            $scope.records.splice($scope.index, 1);
            if($scope.records.length == 0)
                $scope.initialScope();
        }
        
    }
    $scope.savedRecord =function(index){
        //var row=detailService.get()
       /* if(detailService.get() == '')
            $scope.disable = true;*/
        detailService.set(index);
        //console.log(Object.getOwnPropertyNames(detailService.get()).length);
        //detailService.get().getOwnPropertyNames(obj).length
        $scope.selected = index;
        $scope.calculation = index.cal;
        $scope.result = index.res;
    }
    $scope.isActive = function(index) {
        return $scope.selected === index;
    };
    $scope.calculate = function(operator){
     if($scope.operatorClicked=="false"){
            if($scope.result == null){
               $scope.result =  parseFloat($scope.calNumber);
               $scope.calculation = ""+$scope.result;
               oldOperator = operator;
            }else if($scope.calNumber == ""){
                oldOperator = operator;
            }else{
                if(oldOperator !='=')
                    $scope.calculation =  $scope.calculation +" "+ oldOperator +" "+ $scope.calNumber;
                $scope.result = CalculatorService.maths(parseFloat($scope.result), parseFloat($scope.calNumber), oldOperator);
                $scope.calNumber = 0; 
                oldOperator = operator;
            }
            $scope.reset();
            if(oldOperator !='=')
                $scope.operatorClicked = "true";
        }
    }
});