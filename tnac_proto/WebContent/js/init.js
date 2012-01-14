function loadData(circons, hover, elem) {
	if (hover)
		loadHover(circons, elem);
	else {
		createDelegMap(circons,elem);
		loadAggResult(circons);
	}
}

function loadDelegationData(circons, deleg, hover, elem) {
	if (hover)
		loadDelegHover(circons,deleg, elem);
	else
		loadAggResult(circons + "/" + deleg);
}

function buildHoverView(data, elem) {

	html = "<h1 align='center'>" + data.circonscription.name
			+ "&nbsp;&nbsp;Sieges:" + data.circonscription.nb_sieges + "</h1>";
	for (i in data.listes) {
		l = data.listes[i];
		s = "<h3><table><tr><td>" + l.elus.length + "</td><td>" + l.name
				+ "</td><td>" + l.pourentage.toFixed(2)
				+ "%</td></tr></table></h3>";
		html = html + s;
	}
	var point = elem.getBBox(0);

	$('#map').next('.point').remove();

	$('#map').after($('<div />').addClass('point'));

	$('.point').html(html).css({
		left : 0,
		top : 500
	}).fadeIn();

}

function buildDelegHoverView(data, elem) {

	html = "<h1 align='center'>" + data.delegation.name+"</h1>";
	html=html+"<h3 align='center'> votes:"+data.resultat.electeurs.votant+"</h3>";
	html=html+"<h3 align='center'> enregistres:"+data.resultat.electeurs.enregistre+"</h3>";
	html=html+"<h3 align='center'> votes blancs:"+data.resultat.bulletins.blancs+"</h3>";
	html=html+"<h3 align='center'> votes annules:"+data.resultat.bulletins.annule+"</h3>";
	html=html+"<h3 align='center'> bulletins delivres:"+data.resultat.bulletins.delivre+"</h3>";
	html=html+"<h3 align='center'> bulletins endommage:"+data.resultat.bulletins.endommage+"</h3>";
	var point = elem.getBBox(0);

	$('#mapc').next('.pointd').remove();

	$('#mapc').after($('<div />').addClass('pointd'));

	$('.pointd').html(html).css({
		left : -200,
		top : 100
	}).fadeIn();

}


function loadDelegHover(circons,deleg, elem) {
	$.ajax({
		url : 'agg' + "/" + circons+"/"+deleg,
		type : 'get',
		success : function(data) {
			buildDelegHoverView(data, elem);
		}
	});
}

function loadHover(circons, elem) {
	$.ajax({
		url : 'elus' + "/" + circons,
		type : 'get',
		success : function(data) {
			buildHoverView(data, elem);
		}
	});
}

function createDelegMap(circons,elem) {

	$.getJSON('svg/' + circons + '.json', function(data) {
		var matrix=data.matrix;
		var f=elem.getBBox(false);
		var paths = data;
		var paper=Raphael('mapc');
		var r = paper, attributes = {
			fill : '#fff',
			stroke : '#3899E6',
			'stroke-width' : 1,
			'stroke-linejoin' : 'round'
		}, arr = new Array();
		for ( var deleg in paths) {
			if (deleg=='matrix'){
				continue;
			}
			var obj = r.path(paths[deleg].path);
			obj.attr(attributes);
			arr[obj.id] = deleg;

			obj.hover(function() {
				$('.point').fadeOut();
				var s = paths[arr[this.id]].deleg;
				loadDelegationData(circons, s, true, this);
				this.animate({
					fill : '#1669AD',
					stroke : '#9090ff',
					'stroke-width' : 2
				}, 300);

			}, function() {
				$('.pointd').fadeOut();
				this.animate({
					fill : attributes.fill,
					stroke : attributes.stroke,
					'stroke-width' : 1
				}, 300);
			}).click(function() {
				document.location.hash = arr[this.id];

				var s = paths[arr[this.id]].deleg;
				loadDelegationData(circons, s, false, this);
			});

		}

	});

}

$(function() {

	var r = Raphael('map', 1200, 820), attributes = {
		fill : '#fff',
		stroke : '#3899E6',
		'stroke-width' : 1,
		'stroke-linejoin' : 'round'
	}, arr = new Array();

	for ( var country in paths) {

		var obj = r.path(paths[country].path);

		obj.attr(attributes);

		arr[obj.id] = country;

		obj.hover(function() {
			$('.pointd').fadeOut();
			var s = paths[arr[this.id]].circons;
			loadData(s, true, this);
			this.animate({
				fill : '#1669AD',
				stroke : '#9090ff',
				'stroke-width' : 2
			}, 300);

		}, function() {
			$('.point').fadeOut();
			this.animate({
				fill : attributes.fill,
				stroke : attributes.stroke,
				'stroke-width' : 1
			}, 300);
		}).click(function() {
			$('#mapc').next('.pointd').remove();
			$('#mapc').html("");
			document.location.hash = arr[this.id];

			var s = paths[arr[this.id]].circons;
			loadData(s, false,this);

		});

	}

});
