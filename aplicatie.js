function randInt(a,b){ //[a, b)
	return Math.trunc(a+(b-a)*Math.random());
}


var vPrenume=["Costica", "Gigel", "Dorel", "Maricica", "Dorica", "Gigileana", "Crinisoara", "Zoe", "Gogu", "Bob"];
var vPrefixeNume=["Bubul", "Bondar", "Dudul", "Gogul", "Zumzul"];
var vSufixeNume=["ache", "escu", "esteanu","eanu", "eschi"];
var grupe=["A", "B", "C", "D"];


function noteRandom(){
	var nrNote=randInt(1,5);
	var note=[];
	for(let i=0;i<nrNote;i++)
	{ 
		note.push(randInt(1,11));//push adauga elem la finalul vect
	}
	return note;
}


function elevRandom(){
	return {
		prenume: vPrenume[randInt(0, vPrenume.length)],
		nume: vPrefixeNume[randInt(0, vPrefixeNume.length)]+vSufixeNume[randInt(0, vSufixeNume.length)],
		grupa: grupe[randInt(0, grupe.length)],
		note: noteRandom()
	};
}
function genereazaElevi(n){
	var elevi=[];
	for(let i=0;i<n;i++){
		elevi.push(elevRandom());
	}
	console.log(elevi);
	return elevi;
}



function creeazaRand(tipCelula, vector){
	tr=document.createElement("tr"); //TO DO sa se creeze un rand
  /*
  for (let i = 0; i < vector.length; i++){
    x=vector[i];
  }

*/
	for(let x of vector){
		var celula=document.createElement(tipCelula);// <th> sau <td>
		celula.innerHTML = x; //TO DO continutul celulei trebuie sa fie valoarea din vector
		tr.appendChild(celula);// TO DO adaugati celula in rand
		if(tipCelula=="td"){
      //<td class="c1 c2 c3 c4"
			tr.classList.add(vector[2]);//clasa sa fie egala cu grupa elevului
			
			tr.onclick=function(e){ // e - informatii despre eveniment
        //ctrlKey, shiftKey, altKey
				if(document.getElementById("dezactivare").classList.contains("apasat")){
					return;
				}
        if (e.ctrlKey){ //true dc ctrl era apasat
          this.remove();
          afisLog("elevul "+this.children[1].innerHTML + " "+this.children[0].innerHTML+ " a fost sters");
        }
				 /*Selectarea unei secvente continue de randuri. Dorim ca daca dam alt+click pe un rand al tabelului r1 si apoi alt+click pe un alt rand r2, se vor selecta toate randurile dintre r1 si r2 (inclusiv aceste randuri). In momentul in care dam alt+click pe primul rand, randul primeste clasa "select_interval". Clasa dispare atunci cand se finalizeaza selectia (dam alt+click pe randul r2).*/
				else if(e.altKey){
					var sel=tabelash.getElementsByClassName("select_interval")
          if (sel.length == 0){
						this.classList.add("select_interval");
					}
					else{
						var rand_anterior_selectat=sel[0];
						rand_anterior_selectat.classList.remove("select_interval")
						var randuri= tabelash.getElementsByTagName("tbody")[0].children
						/* vreau sa obtin indicele elementului a in vectorul v
						indice =v.indexOf(a) //echivalent: Array.prototype.indexOf.call(v,a)

						vreau sa aplic indexOf pe colectia randuri
						nu pot randuri.indexOf(a) pt ca nu e metoda
						Array.prototype.indexOf.call() // primul element pe care il transmit in call este this-ul
						*/
						let ind1= Array.prototype.indexOf.call(randuri,rand_anterior_selectat);
						let ind2= Array.prototype.indexOf.call(randuri,this);
						if(ind1>ind2)
            {
              let aux=ind1;
              ind1=ind2;
              ind2=aux;
            }
						// acum stim ca ind1 <= ind2
						for(let i=ind1;i<=ind2;i++)
              randuri[i].classList.add("selectat");

					}
        }
        else{
				  this.classList.toggle("selectat");// daca exista clasa, o sterge, daca nu o adauga
        }
			}
		}
	}
	return tr;
}

function creeazaTabel(elevi){
	if(!elevi || elevi.length==0) return;
	
	var tabel=document.createElement("table");//<table></table>
	tabel.id="tab";//<table id="tab"></table>
	var thead=document.createElement("thead");// TO DO - creare thead
	tabel.appendChild(thead) // TO DO - adugare thead in tabel
	var rand=creeazaRand("th",Object.keys(elevi[0])); // <tr><th>nume</th>.....
  //["nume","prenume","grupa","note"]
	console.log("Proprietati:");console.log(Object.keys(elevi[0]));
	thead.appendChild(rand);
		
	
	var tbody=document.createElement("tbody");
	tabel.appendChild(tbody);
	for(let elev of elevi){ //TO DO vrem ca variabila elev sa aiba pe rand ca valoare fiecare element din elevi
		rand=creeazaRand("td",Object.values(elev));//<tr><td></td>....
		console.log("Valori:");console.log(Object.values(elev));
		tbody.appendChild(rand);

	}
	return tabel;
}

var contor= 0;

function afisLog(sir){
  contor++;
  var info=document.getElementById("info");
  var p=document.createElement("p");
  p.innerHTML="["+ new Date() +"] "+sir;
  info.title=contor;
  info.appendChild(p);
}

//<body onload="f()">
window.onload=function(){
	var v_elevi=genereazaElevi(10);
	tabelash=creeazaTabel(v_elevi);///global
	document.getElementById("container_tabel").appendChild(tabelash);// <table>...

	/*La click pe butonul "Adauga elev inceput" se va adauga un elev aleator la inceputul tabelului (Indicatii: insertBefore, children, firstChild)*/
	/* container.insertBefore(nodNou, nodInFataCaruiaInserez)*/
	document.getElementById("add_inceput").onclick=function(){
    let elev=elevRandom();
    var rand=creeazaRand("td",Object.values(elev));
    var tbody=tabelash.getElementsByTagName("tbody")[0];
    if(tbody.children.length) // if(tbody.firstChild)
      tbody.insertBefore(rand,tbody.firstChild);   /* children[0] */
    else tbody.appendChild(rand);
    };
   
	 /*La click pe butonul "Adauga elev sfarsit" se va adauga un elev aleator la sfarsitul tabelului (Indicatii: appendChild)*/
	 document.getElementById("add_sfarsit").onclick=function(){
    let elev=elevRandom();
    var rand=creeazaRand("td",Object.values(elev));
    var tbody=tabelash.getElementsByTagName("tbody")[0];
    tbody.appendChild(rand);
    };

		/*Inversarea a doua coloane. La click pe butonul "inverseaza nume-prenume", sa se inverseze primele doua coloane.*/
		var indice_nume=1
		document.getElementById("inverseaza_np").onclick=function(){
		indice_nume=1-indice_nume
    var randuri=tabelash.getElementsByTagName("tr");
    for(let rand of randuri){
			rand.insertBefore(rand.children[1],rand.children[0])
		}
  };

	/*La click pe butonul "Deselecteaza toti elevii" se vor deselecta toate randurile din tabel (li se sterge clasa "selectat").*/
    document.getElementById("deselectare").onclick=function(){

    var randuri=tabelash.getElementsByClassName("selectat");
		/* colectie dinamica
		0 1 2 3
		rand.classList.remove("selectat") -> rand iese din randuri
		1 2 3 care devin 0 1 2
		*/
    while(randuri.length)
      randuri[0].classList.remove("selectat")
      
    };

		/*Dezactivarea unei functii asocitate unui eveniment. La click pe butonul "Dezactiveaza actiuni randuri" (cand nu are clasa "apasat"), se vor dezactiva toate actiunile care se intamplau la click pe un rand (selectare/stergere). In plus butonul va primi clasa "apasat". La click pe buton cand are deja clasa "apasat" se reseteaza toate actiunile iar butonul pierde clasa "apasat". Daca am vrea ca atunci cand actiunile sunt dezactivate si dam click pe un rand sa dea un alert cu "Actiuni dezactivate ce ar trebui sa facem?" (scrieti intr-un comentariu).*/

		document.getElementById("dezactivare").onclick=function(){
			this.classList.toggle("apasat");
		}

    /*La click pe butonul "Sterge elevii din clasa ..." se va afisa un prompt care va cere numele clasei. Daca se introduce un nume corect de clasa, se selecteaza toti elevii din clasa data (deselectand in prealabil evntuali alti elevi selectati). Apoi se afiseaza o ferestra de tip confirm care intreaba daca realmente vrem sa stergem toti elevii. Daca se confirma operatia, se sterg toti elevii si se da un alert cu cati elevi au fost stersi. Daca se da "Cancel", nu se mai sterg elevii, dar randurile raman in continuare selectate. (Indicatii: querySelectorAll, Array.filter()).*/

    document.getElementById("sterge").onclick=function(){
			var rasp_prompt=prompt("Sterge elevii din clasa ...", "A");
			if(!grupe.includes(rasp_prompt)) return;
			var randuri=tabelash.querySelectorAll("."+ rasp_prompt);
			//e colectie statica
			for (rand of randuri)
          rand.classList.add("selectat");
      var rasp_confirm=confirm("Stergi?");
			if(rasp_confirm){
				for (rand of randuri)
          rand.remove();
			}
		}
		/*La click pe butonul "Sorteaza elevi dupa nume" se vor sorta elevii in ordine alfabetica a numelui. Cum am fi facut daca voiam sa sortam dupa nume+prenume? (Indicatii: Array.sort(), appendChild).*/

document.getElementById("sorteaza_nume").onclick=function(){
			var tbody=tabelash.getElementsByTagName("tbody")[0];
      var randuri=tbody.children;//tbody.getElementsByTagName("tr")
      // randuri.sort() nu va merge pt ca randuri nu e Array
      //Array.prototype.sort.call(randuri,...) nu merge pt ca randuri e immutable fiindca e colectie
			//vector_nou= v.slice(2,7) va creea un subvector (vector nou) in care copiaza elementele de la 2 la 7 exclusiv (pana la 6)
			//vector_nou= v.slice(2) copiaza de la 2 la final
			//vector_nou= v.slice() copiaza tot vectorul
			var vranduri=Array.prototype.slice.call(randuri);
			// [4,1,5].sort() ---> [1,4,5]
			/* vector.sort(function(a,b){ //compara elementele a si b din vector
				returneaza:
				0 daca a==b
				<0 daca a<b
				>0 daca a>b
			})*/     
      
      vranduri.sort(function(a,b){
        return a.children[indice_nume].innerHTML.localeCompare(b.children[indice_nume].innerHTML);//sir1.localeCompare(sir2)
      });

      for(let rand of vranduri){
        tbody.appendChild(rand);
			}

   }

	function medie(rand){// randul e un <tr>
		var note=rand.children[3].innerHTML.split(',');
		var suma= note.reduce(function(total, num) {
      return total+Number(num);
    }, 0);
		return suma/note.length;
	}
	/*La click pe butonul "Sorteaza elevi dupa medie" se vor sorta elevii dupa medie. (Indicatii: Array.sort(), Array.reduce(), appendChild)*/
		document.getElementById("sorteaza_medie").onclick=function(){
			var tbody=tabelash.getElementsByTagName("tbody")[0];
      var randuri=tbody.children;//tbody.getElementsByTagName("tr")
 			var vranduri=Array.prototype.slice.call(randuri);
		     
      vranduri.sort(function(a,b){// a si b sunt <tr>
        return medie(a)-medie(b);
      });

      for(let rand of vranduri){
        tbody.appendChild(rand);
			}

   }
	 /*La click pe butonul "Goleste tabel" sa se stearga toate randurile din tbody.*/
	 	document.getElementById("goleste_tabel").onclick=function(){
			var tbody=tabelash.getElementsByTagName("tbody")[0];
			tbody.innerHTML=""
		}
		/*La click pe butonul "Pastreaza elevi admisi" se vor pastra in tabel toti elevii cu medie peste 5.*/
    document.getElementById("select_elevi").onclick=function() {
      var tbody=tabelash.getElementsByTagName("tbody")[0];
      var randuri=tbody.children;//tbody.getElementsByTagName("tr")

      for(let i=0; i<randuri.length;i++)
      {
        if (medie(randuri[i]) < 5){
          randuri[i].remove();
          i-=1;
        }
        
      }
    }
	/*La click pe butonul "Verifica elevi admisi" se va verifica daca toti elevii au medie peste 5 (si se va da un alert cu rezultatul). (Indicatii: Array.every()*/
  document.getElementById("verifica_elevi").onclick=function() {
      var tbody=tabelash.getElementsByTagName("tbody")[0];
      var randuri=tbody.children;//tbody.getElementsByTagName("tr")
      var isOk = true;
      for(let i=0; i<randuri.length;i++)
      {
        if (medie(randuri[i]) < 5){
          isOk = false;
        }
      
      }
			/* var isOk=Array.prototype.every.call(randuri,function(rand){
        return medie(rand)>=5;
      })
			[-1,3,4,5].every(function(elem){return elem>0} )
			
			*/

      if(!isOk){
        alert("Nu");
      }else{
        alert("Da");
      }
    }
	/*La click pe butonul "Gaseste elev" se va scrie intr-un prompt prenumele unui elev si se va raspunde cu un alert cu numarul randului (sau "nu a fost gasit") in caz ca nu e gasit. Daca sunt doi elevi cu acelasi prenume se va da in alert prenumele primului.*/
document.getElementById("gaseste_elev").onclick=function() {
		var prenume=prompt("Prenume?")
    var tbody=tabelash.getElementsByTagName("tbody")[0];
    var randuri=tbody.children;//tbody.getElementsByTagName("tr")
		var ind=Array.prototype.findIndex.call(randuri,function(rand){
      return prenume==rand.firstChild.innerHTML;
    })//returneaza -1 daca nu gaseste un rand cu proprietatea testata in functie
		if ( ind == -1 ) alert("nu a fost gasit")
    else alert(ind)
	}
/*La click pe butonul "Inverseaza randuri" sa se afiseze randurile din tabel in ordine inversa*/
document.getElementById("inverseaza").onclick=function() {
    var tbody=tabelash.getElementsByTagName("tbody")[0];
    var randuri=tbody.children
		var v_randuri=Array.prototype.slice.call(randuri)
    for (let i=v_randuri.length-1; i>=0; i--){
      tbody.appendChild(v_randuri[i])
    } 

}
/*La click pe butonul "Status elevi" se va afisa in divul cu id-ul "info", nota(nu media) minimima si maxima a elevilor din tabel.*/
document.getElementById("status").onclick=function() {
  var tbody=tabelash.getElementsByTagName("tbody")[0];
  var randuri=tbody.children;
	var min_total=10;
  for (let rand of randuri) {
    var note = rand.children[3].innerHTML.split(",");
    var min_r= note.reduce(function(total, num) {
      return Math.min(total, Number(num));
    }, 10);
		min_total=Math.min(min_total, min_r);
  }
	afisLog("Minim: "+min_total);	
}
/*La click pe butonul "Nota 10!!!" se vor schimba toate notele elevilor selectati in nota 10. Atentie, daca, de exemplu, un elev avea 3 note inainte va avea 3 note de 10, dupa click. (Indicatii: Array.fill(), String.split(), Array.join())*/

document.getElementById("nota_10").onclick=function(){
  var tbody=tabelash.getElementsByTagName("tbody")[0];
  var randuri=tbody.getElementsByClassName("selectat");
  for (let rand of randuri) {
    var note = rand.children[3].innerHTML.split(",");
    note.fill("10");
    rand.children[3].innerHTML=note.join(",");
	}
}
/*La click pe butonul "Ascunde info" se va ascunde (nu sterge) divul cu id-ul "info", iar butonul isi va schimba numele in "Afiseaza info". La click din nou pe buton, divul se reafiseaza si butonul revine la textul initial.*/
document.getElementById("toggle_info").onclick=function(){
  var info = document.getElementById("info");
  if(this.innerHTML=="Ascunde info"){
    this.innerHTML="Afiseaza info";
		info.style.display="none";
  }
	else{
    this.innerHTML="Ascunde info";
		info.style.display="block";		
	}
}

}// de la onload
/*Pentru elevii selectati, daca se apasa una din tastele A,B,C, sau D, li se schimba clasa (atat textul din tabel cat si clasa elementului la valoarea tastei apasate.*/
window.onkeypress=function(e){
	//codul tastei apasate e in e.key
	var gr=e.key.toUpperCase()
	var tbody=tabelash.getElementsByTagName("tbody")[0];
  var randuri=tbody.getElementsByClassName("selectat");
  for (let rand of randuri) {
    rand.classList.remove("A", "B", "C", "D");
    rand.classList.add(gr);
		rand.children[2].innerHTML=gr
	}
}


/* */