var glengthRoot;
var gIndex=0;
var gArray;


function buildRoot(){
	var appendElements = function() {
		var index=$("#tnacTree").children().length;
		var oldHtml= $("#tnacTree").html();
		var li=buildTreeItem(gArray[index].resource!=undefined,gArray[index]);
		$("#tnacTree").html(oldHtml+li);
		$("#progressbar").progressbar({ value: ((index+1)/glengthRoot)*100 });
		if (index==glengthRoot-1){
			   $("#progressbar").progressbar({ value: 97});
			   $("#tnacTree").treeview({
			    	collapsed: true,
			  });	
			   $("#progress").hide();
			   $("#progressbar").hide();
			   $("#tnacTree").show();	
			   $("a.res").click(function(event){
					 event.preventDefault();
					 loadResult($(this).attr("href"));
				 });
			   $("a.agg").click(function(event){
					 event.preventDefault();
					 loadAggResult($(this).attr("href"));
				 });

			   
		}
		else setTimeout(appendElements, 10);
	};
	setTimeout(appendElements, 10);
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

	  $("#mainView").html(table);
 
	  $("#mainView").show();

}

function anomalie(data){
	var s="";
	if (data.resultat.bulletins.delivre!=data.resultat.bulletins.dans_urne+data.resultat.bulletins.endommage+data.resultat.bulletins.non_utilise)
		s=s+"Bulletins delivres!=somme bulletins<br/>";
	if (data.resultat.electeurs.enregistre<data.resultat.electeurs.votant)
		s=s+"Electeur Enregistres>Votants<br/>";
	
	if (data.resultat.bulletins.delivre<data.resultat.electeurs.votant)
		s=s+"Bulletins delivres>Votants<br/>";
	
	return s;
}

function buildOverview(data)
{
	var s="<table class='overview'><thead><tr><td>circonscription</td><td>delegation</td><td>centre_vote</td><td>bureau_vote</td><td>Registered</td><td>Voted</td></tr></thead>";
	s=s+"<tbody><tr><td>"+data.circonscription.name+"</td><td>"+data.delegation.name+"</td><td>"+data.centre_vote.name+"</td><td>"+data.bureau_vote.name;
	s=s+"</td><td>"+data.resultat.electeurs.enregistre+"</td><td>"+data.resultat.electeurs.votant+"</td></tr>";
	s=s+"</tbody></table>";
	
	s=s+"<table class='overview'><thead><tr><td>Delivres</td><td>Utilises</td><td>Endommages</td><td>Non Utilises</td><td>% delivre/utilise</td><td>Anomalie</td></tr></thead>";
	s=s+"<tbody><tr><td>"+data.resultat.bulletins.delivre+"</td><td>"+data.resultat.bulletins.dans_urne+"</td><td>"+data.resultat.bulletins.endommage+"</td><td>"+data.resultat.bulletins.non_utilise;
	s=s+"</td><td>"+((data.resultat.bulletins.dans_urne/data.resultat.bulletins.delivre)*100)+"%</td><td>"+anomalie(data)+"</td></tr>";
	s=s+"</tbody></table>";
	return s;
}

function buildSubtree(array){
	var html="";
	for (c in array){
		var li=buildTreeItem(array[c].resource!=undefined,array[c]);
		html=html+li;
	}
	return html;
	
}

function buildTreeItem(isFolder,c){
	var classItem=(isFolder)?"folder":"file";
	var result="<li><span res='"+c.resource+"' code='"+c.code+"' class='"+classItem+"'>"+link(c.name,isFolder,c.path)+"</span>";
	if (isFolder){
		result=result+"<ul>"+buildSubtree(c.children)+"</ul>";
	}
	return result+ "</li>";
}

function link (name,isFolder,path)
{
	if (isFolder)
		return '<a class="agg" href="'+path+'">'+name+'</a>';
	else{
		return '<a class="res" href="'+path+'">'+name+'</a>';
	}
	
}

$(document).ready(function(){
	   $("#tnacTree").kendoTreeView();	
	   $("a.res").click(function(event){
			 event.preventDefault();
			 loadResult($(this).attr("href"));
		 });
	   $("a.agg").click(function(event){
			 event.preventDefault();
			 loadAggResult($(this).attr("href"));
		 });

//	$.ajax({
//		   url: 'md',
//		   type: 'get',
//		   success: function(data) {
//			   $("#progressbar").progressbar({ value: 1 });
//			   $("#tnacTree").hide();
//			   gArray=data.children;
//			   glengthRoot=gArray.length;
//			   buildRoot();
//			}
//		});

}); 