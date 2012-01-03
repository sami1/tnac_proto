$(function(){
	
	var r = Raphael('map', 1200, 820),
		attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        },
		arr = new Array();
	
	for (var country in paths) {
		
		var obj = r.path(paths[country].path);
		
		obj.attr(attributes);
		
		arr[obj.id] = country;
		
		obj
		.hover(function(){
			this.animate({
				fill: '#1669AD',
        stroke: '#9090ff',
        'stroke-width': 2
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill,
        stroke: attributes.stroke,
        'stroke-width': 1
			}, 300);
		})
		.click(function(){
			document.location.hash = arr[this.id];
			
			var s=paths[arr[this.id]].name;
			if (s=="Gabes"){
				loadAggResult("510");
			}
			if (s=="Gafsa"){
				loadAggResult("610");
			}
			if (s=="Jendouba"){
				loadAggResult("220");
			}
			if (s=="Kasserine"){
				loadAggResult("420");
			}
			if (s=="Kairouan"){
				loadAggResult("410");
			}
			if (s=="Kebili"){
				loadAggResult("630");
			}
			if (s=="Medenine"){
				loadAggResult("520");
			}
			if (s=="Tataouine"){
				loadAggResult("530");
			}
			else if (s=="Tozeur"){
				loadAggResult("620");
			}
			else if (s=="Zaghouan"){
				loadAggResult("160");
			}
			else if (s=="Monastir"){
				loadAggResult("320");
			}
			else if (s=="SidiBouzid"){
				loadAggResult("430");
			}
			else if (s=="Siliana"){
				loadAggResult("240");
			}
			else if (s=="Sousse"){
				loadAggResult("310");
			}
			else if (s=="Bizerte"){
				loadAggResult("170");
			}
			else if (s=="Nabeul_1"){
				loadAggResult("151");
			}
			else if (s=="Nabeul_2"){
				loadAggResult("152");
			}
			else if (s=="Sfax_2"){
				loadAggResult("342");
			}
			else if (s=="Sfax_1"){
				loadAggResult("341");
			}
			else if (s=="Allemagne"){
				loadAggResult("400");
			}
			else if (s=="Italie"){
				loadAggResult("300");
			}
			else if (s=="France_2"){
				loadAggResult("200");
			}
			else if (s=="France_1"){
				loadAggResult("100");
			}
			else if (s=="Beja"){
				loadAggResult("210");
			}
			else if (s=="Tataouine"){
				loadAggResult("530");
			}
			else if (s=="Tunis_1"){
				loadAggResult("111");
			}
			else if (s=="Tunis_1_small"){
				loadAggResult("111");
			}
			else if (s=="Tunis_2"){
				loadAggResult("112");
			}
			else if (s=="Tunis_2_small"){
				loadAggResult("112");
			}
			else if (s=="Ariana"){
				loadAggResult("120");
			}
			else if (s=="Ariana_small"){
				loadAggResult("120");
			}
			else if (s=="Ben_Arous"){
				loadAggResult("130");
			}
			else if (s=="Ben_Arous_small"){
				loadAggResult("130");
			}
			else if (s=="Manouba"){
				loadAggResult("140");
			}
			else if (s=="Manouba_small"){
				loadAggResult("140");
			}
			else if (s=="Pays_Arabes"){
				loadAggResult("600");
			}
			else if (s=="Amerique"){
				loadAggResult("500");
			}
			else if (s=="Le_Kef")
			{
				loadAggResult("230");
			}
			
		});


		 
		
	}
		
			
});

