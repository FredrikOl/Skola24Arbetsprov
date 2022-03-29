$(document).ready(function(){	
	
	$('#addFranvaro').click(function(){
		let card = new Card(absences, absenceReasons);
		$('#franvarolist').prepend(card.getElement()); //Nya frånvaron läggs först i listan
	});
});
 
class Card{	
	constructor(exampleAbsences, exampleReasons){
		this.exampleAbsences = exampleAbsences;
		this.exampleReasons = exampleReasons;
		this.randomizeData();
	}
	
	getElement(){
		let card = $("<div/>").addClass('franvaro');
		let namn = $("<div/>").addClass('namn').html(this.namn).appendTo(card);
		let datum = $("<div/>").addClass('datum').html(this.datum).appendTo(card);
		let orsak = $("<div/>").addClass('orsak').html(this.orsak).appendTo(card);
		return card;
	}
	
	randomizeData = () => {
		let randomData = this.exampleAbsences[
			Math.floor(Math.random() * this.exampleAbsences.length)
		];
		this.namn = randomData.firstName + ' ' + randomData.lastName;
		this.datum = this.getDateText(randomData.dateTimeFrom,randomData.dateTimeTo);
		this.orsak = this.getOrsak(randomData.reasonGuid);
	}
	
	getDateText = (from, tom) => {
		 //Todo: Refaktorisera till datumobjekt
		 if (!tom){
			 return from.substr(0,10) + " - " + 'Tillsvidare';
		 }
		 if (from.substr(11) == '00:00:00' && tom.substr(11) == '23:59:59'){
			if (from.substr(0,11) == tom.substr(0,11)){
				return from.substr(0,11)
			}
			return from.substr(0,11) + " - " + tom.substr(0,11);
		 }
		 if (from.substr(0,11) == tom.substr(0,11)){
			 return from.substr(0,16) + " - " + tom.substr(11);
		 }
		 return from.substr(0,16) + " - " + tom.substr(0,16);
	 }
	 
	 getOrsak = (reasonGuid) => {
		let orsak = this.exampleReasons.filter(
			(x) => x.guid === reasonGuid
		 );
		 return orsak.length > 0 ? orsak[0].id : "";
	 }
}
