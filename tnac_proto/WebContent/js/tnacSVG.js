var glengthRoot;
var gIndex=0;
var gArray;

function getPieData(listes,totalVote){
	var container = new Array();
	var p=0;
	var cumul=0;
	for (i in listes){
		var obj=listes[i];
		var newObj=new Array();
		newObj[0]=obj.name;
		newObj[1]=obj.vote;
		cumul+=obj.vote;
		container[i]=newObj;
		p=p+obj.pourcentage;
		if (obj.pourcentage<2 || (p>=90 && p<=99)){
			var lastObj=new Array();
			var r=listes.length-parseInt(i)-1;
			lastObj[0]="Autres ("+r+" listes)";
			lastObj[1]=totalVote-cumul;
			container[parseInt(i)+1]=lastObj;
			break;
		}
		
	}
	return container;
}

function getKendoPieData(listes,totalVote){
	var container = new Array();
	var p=0;
	var cumul=0;
	for (i in listes){
		var obj=listes[i];
		var newObj=new Object();
		newObj.category=obj.name;
		newObj.value=obj.vote;
		cumul+=obj.vote;
		container[i]=newObj;
		p=p+obj.pourcentage;
		if (obj.pourcentage<2 || (p>=90 && p<=99)){
			var lastObj=new Object();
			var r=listes.length-parseInt(i)-1;
			lastObj.category="Autres ("+r+" listes)";
			lastObj.value=totalVote-cumul;
			container[parseInt(i)+1]=lastObj;
			break;
		}
		
	}
	return container;
}





function loadAggResult(path){
	$.ajax({
		   url: 'agg/'+path,
		   type: 'get',
		   success: function(data) {
			   buildView(data);
		   }
		});
}

function loadResult(path){
	$.ajax({
		   url: 'bureau'+"/"+path,
		   type: 'get',
		   success: function(data) {
			   buildView(data);
		   }
		});
}

function buildView(data){
	  if (data.error==0){
		  $("#mainView").html("<h1>NO DATA AVAILABLE FROM ISIE</h1>");
		  return;
	  }
	  $("#mainView").hide();
	  var table=buildOverview(data);
	  var container='<center><div id="container" class="highcharts-container" style="height: 600px; clear: both;width:800px"></div></center>';

	  $("#mainView").html(table+container);

	  
      $("#container").kendoChart({
          theme: $(document).data("kendoSkin") || "default",
          title: {
              text: "Resultat par Bureau de vote"
          },
          legend: {
              position: "bottom"
          },
          seriesDefaults: {
              labels: {
                  visible: true,
                  template: "${ category } #= kendo.format('{0:P}', percentage)#",
              }
          },
          series: [{
              type: "pie",
              data: getKendoPieData(data.resultat.listes,data.resultat.bulletins.correct)
          		}],
             tooltip: {
              visible: true,
              template: "${ category } #= kendo.format('{0:P}', percentage)#",
          }
      });
  

	  
	  window.resizeBy(1, 0); 
	  window.resizeBy(-1, 0); 
	  $("#mainView").show();

}

function buildOverview(data)
{
	var s="<table class='overview'><thead><tr><td>circonscription</td><td>delegation</td><td>centre_vote</td><td>bureau_vote</td><td>Registered</td><td>Voted</td></tr></thead>";
	s=s+"<tbody><tr><td>"+data.circonscription.name+"</td><td>"+data.delegation.name+"</td><td>"+data.centre_vote.name+"</td><td>"+data.bureau_vote.name;
	s=s+"</td><td>"+data.resultat.electeurs.enregistre+"</td><td>"+data.resultat.electeurs.votant+"</td></tr></tbody></table>";
	return s;
}


$(document).ready(function(){


}); 