window.onload=function()
{
	document.getElementById("textplayer").innerHTML+="Pe cine vrei sa omori?";
	var ob={
			meserie:"Pieton",
			statut:"In viata"
		};
	var jucatori=new Array();
	for(i=0;i<=7;i++)
	{
		jucatori.push({meserie:"Pieton",statut:"In viata"});
	}
	var Nrmafiot1=Math.floor(Math.random() * 8);
	//Nrmafiot1=0;
	var Nrmafiot2=Math.floor(Math.random() * 8);
	while(Nrmafiot1==Nrmafiot2)
	{
		
		Nrmafiot2=Math.floor(Math.random() * 8);
	}
	jucatori[Nrmafiot1].meserie="Mafiot";
	jucatori[Nrmafiot2].meserie="Mafiot";
	for(i=0;i<8;i++)
			document.getElementById("listaJucatori").innerHTML+="jucatorul "+i+"="+jucatori[i].meserie+"<br>";
	while(NrMafiotiInViata(jucatori)!=0 && NrPietoniInViata(jucatori)>NrMafiotiInViata(jucatori))
	{
		//NOAPTE RANDUL MAFIOTILOR
		victima=NoapteMafioti(jucatori,Nrmafiot1,Nrmafiot2);
		jucatori[victima].statut="mort";
		alert("a murit jucatorul "+victima);
		document.getElementById("listaJucatori").innerHTML="";
		for(i=0;i<8;i++)
			if(jucatori[i].statut=="In viata")
				document.getElementById("listaJucatori").innerHTML+="jucatorul "+i+"="+jucatori[i].meserie+"<br>";
		//ZI 
		var spanzurat=Zi(jucatori);
		jucatori[spanzurat].statut="mort";
		alert("a fost spanzutar jucatorul "+spanzurat);
		document.getElementById("listaJucatori").innerHTML="";
		for(i=0;i<8;i++)
			if(jucatori[i].statut=="In viata")
				document.getElementById("listaJucatori").innerHTML+="jucatorul "+i+"="+jucatori[i].meserie+"<br>";
	}
	//REZULTATE
	if(NrMafiotiInViata(jucatori)==0)
		document.getElementById("listaJucatori").innerHTML+="<h1>Pietoni au castigat!!!</h1>";
	else
		document.getElementById("listaJucatori").innerHTML+="<h1>Mafiotii au castigat!!!</h1>";
}
var ButonApasat=0;
function NrPietoniInViata(jucatori)
{
	var s=0;
	for(i=0;i<8;i++)
		if(jucatori[i].meserie=="Pieton" && jucatori[i].statut=="In viata")
			s++;
	return s;
}
function NrMafiotiInViata(jucatori)
{
	var s=0;
	for(i=0;i<8;i++)
		if(jucatori[i].meserie=="Mafiot" && jucatori[i].statut=="In viata")
			s++;
	return s;
}
function NoapteMafioti(jucatori,Nrmafiot1,Nrmafiot2)
{
	var victime=new Array();
	if(jucatori[Nrmafiot1].statut=="In viata")
	{
		if(Nrmafiot1==-1)
		{
			ButonApasat=0;
		    victima1=document.getElementById("sele").value;
			alert("ai ales "+victima1);
			victime.push(victima1);
		}
		else
		{
			var victima1=Math.floor(Math.random() * 8);
			while(victima1==Nrmafiot1 || victima1==Nrmafiot2 || jucatori[victima1].statut=="mort")
				victima1=Math.floor(Math.random() * 8);
			victime.push(victima1);
		//alert("a fost ales de mafiotul1 jucatorul "+victima1);
		}
		
	}
	if(jucatori[Nrmafiot2].statut=="In viata")
	{
		var victima2=Math.floor(Math.random() * 8);
		while(victima2==Nrmafiot1 || victima2==Nrmafiot2 || jucatori[victima2].statut=="mort")
			victima2=Math.floor(Math.random() * 8);
		victime.push(victima2);
		//alert("a fost ales de mafiotul2 jucatorul "+victima2);
	}
	var victimaAleasa=Math.floor(Math.random() * NrMafiotiInViata(jucatori));
	//alert("Va murii jucatorul "+victime[victimaAleasa]);
	return victime[victimaAleasa];
}
function Zi(jucatori)
{
	var Suspecti=new Array();
	for(i=0;i<8;i++)
			if(jucatori[i].statut=="In viata")
			{
				
				var suspect=Math.floor(Math.random() * 8);
				while(jucatori[suspect].statut=="mort")
						suspect=Math.floor(Math.random() * 8);
				Suspecti.push(suspect);
			}
	
	var suspectAles=Math.floor(Math.random() * (NrMafiotiInViata(jucatori)+NrPietoniInViata(jucatori)));
	return Suspecti[suspectAles];
}