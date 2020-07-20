window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/useri.json)
	ajaxRequest.open("GET", "../../useri.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vectorul de useri din obJson
			for(let i=0;i<obJson.useri.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un useri din vectorul de useri din json {useri: obJson.useri[i]}
				//practic obJson.useri[i] e redenumit ca "useri" in template si putem sa ii accesam proprietatile: useri.id etc
				textTemplate+=ejs.render("<div class='templ_useri'>\
				<p>Id: <%= useri.id %></p>\
				<p>Username: <%= useri.username %></p>\
				<p>Data Inregistrarii: <%= useri.dataInreg %> </p>\
				</div>", 
				{useri: obJson.useri[i]});
			} 
			//adaug textul cu afisarea userilor in container
			container.innerHTML=textTemplate;
	}
}