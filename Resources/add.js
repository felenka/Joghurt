/*
 * okno dodawania zamowienia
 */
var win3 = Titanium.UI.currentWindow;
win3.title = 'Dodawanie zamowienia';

function zamowienie() {
	this.nazwa = "";
	this.numer = "";
	this.date_start = "";
	this.date_stop = "";
}

var picker = null;

var numerZamowienia_lb = Titanium.UI.createLabel({
	left : 10,
	width : 300,
	color : '#777',
	backgroundColor : '#DDDDDD',
	font : {
		fontSize : 13
	},
	text : 'Numer zamowienia'
});
var numerZamowienia_tf = Titanium.UI.createTextField({
	hintText : 'Wpisz dane...',
	value : null,
	color : '#336699',
	heigh : 35,
	left : 10,
	width : 300,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
var nazwaZamowienia_lb = Titanium.UI.createLabel({
	left : 10,
	width : 300,
	color : '#777',
	backgroundColor : '#DDDDDD',
	font : {
		fontSize : 13
	},
	text : 'Nazwa zamowienia'
});

var nazwaZamowienia_tf = Titanium.UI.createTextField({
	color : '#336699',
	hintText : 'Wpisz dane...',
	heigh : 35,
	value : null,
	left : 10,
	width : 300,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
var dataStart_lb = Titanium.UI.createLabel({
	left : 10,
	width : 300,
	color : '#777',
	backgroundColor : '#DDDDDD',
	font : {
		fontSize : 13
	},
	text : 'Data rozpoczecia: [dd-mm-rrrr]'
});
var dataStop_lb = Titanium.UI.createLabel({
	left : 10,
	width : 300,
	color : '#777',
	backgroundColor : '#DDDDDD',
	font : {
		fontSize : 13
	},
	text : 'Data zakonczenia: [dd-mm-rrrr]'
});

var dataStart_lb2 = Titanium.UI.createLabel({
	color : '#3D4460',
	text : "",
	font : {
		fontSize : 17,
		fontWeight : 'normal'
	},
	top : 11,
	left : 102,
	height : 20,
	width : 180,
	textAlign : 'right'
});

var dataStop_lb2 = Titanium.UI.createLabel({
	color : '#3D4460',
	text : "",
	font : {
		fontSize : 17,
		fontWeight : 'normal'
	},
	top : 11,
	left : 102,
	height : 20,
	width : 180,
	textAlign : 'right'
});

var datePickerView = Titanium.UI.createView({
	height : 300,
	bottom : -600,
	backgroundColor : '#3D4460'
});

var datePicker = Titanium.UI.createPicker({
	top : 40,
	type : Titanium.UI.PICKER_TYPE_DATE
});
datePicker.selectionIndicator = true;
datePickerView.add(datePicker);

var slideIn = Titanium.UI.createAnimation({
	bottom : -50
});
var slideOut = Titanium.UI.createAnimation({
	bottom : -400
});
// elementy wchodzace w sklad tabeli
var array = [];

var dateRow = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow'
});
var dateRow2 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow2'
});
var dateRow3 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow3'
});
var dateRow4 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow4'
});
var dateRow5 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow5'
});
var dateRow6 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow6'
});
var dateRow7 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow7'
});
var dateRow8 = Titanium.UI.createTableViewRow({
	height : 45,
	className : 'dateRow8'
});

dateRow.add(numerZamowienia_lb);
dateRow2.add(numerZamowienia_tf);
dateRow3.add(nazwaZamowienia_lb);
dateRow4.add(nazwaZamowienia_tf);
dateRow5.add(dataStart_lb);
dateRow6.add(dataStart_lb2);
dateRow7.add(dataStop_lb);
dateRow8.add(dataStop_lb2);

array.push(dateRow);
array.push(dateRow2);
array.push(dateRow3);
array.push(dateRow4);
array.push(dateRow5);
array.push(dateRow6);
array.push(dateRow7);
array.push(dateRow8);
// tworzenie tabeli na podstawie w/w elementow
var tableView = Titanium.UI.createTableView({
	data : array,
	style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
	top : 10
});
win3.add(tableView);

// detektor zdarzen do animowania wpisu daty i pozostalych danych
tableView.addEventListener('click', function(e) {
	switch (e.rowData.className) {

	case ("dateRow5" || "dateRow6"):
		picker = 0;
		datePickerView.animate(slideIn);

		break;
	case ("dateRow7" || "dateRow8"):
		picker = 1;
		datePickerView.animate(slideIn);

		break;
	}

});
win3.add(datePickerView);

// metoda wstawiajaca wybrana date do pol
datePicker.addEventListener('change', function(e) {
	if (picker == 0) {
		dataStart_lb2.text = e.value;

	} else {
		dataStop_lb2.text = e.value;
	}
	tableView.setData(array);
});

// przycisk = przejscie do menu glownego
var bt2 = Titanium.UI.createButton({
	title : 'Menu glowne',
	left : 10,
	top : 390,
	heigh : 40,
	width : 100
});
bt2.addEventListener('click', function() {
	var win = Titanium.UI.createWindow({
		url : 'app.js'
	});
	Titanium.UI.currentTab.open(win, {
		animated : true
	});
});
// przycisk = zatwierdzenie daty
var bt3 = Titanium.UI.createButton({
	title : 'Zatwierdz date',
	top : 390,
	heigh : 40,
	width : 100
});

bt3.addEventListener('click', function() {
	datePickerView.animate(slideOut);
});
win3.add(bt2);
win3.add(bt3);

// przycisk = zapisz danych
var bt1 = Titanium.UI.createButton({
	title : 'Zapisz',
	top : 390,
	right : 10,
	width : 100,
	heigh : 35
});
win3.add(bt1);

// zapis danych do bazy
bt1.addEventListener('click', function() {

	// Titanium.API.info(dataStart_lb2.text + "ooo"+dataStop_lb2.text);
	if (dataStart_lb2.text > dataStop_lb2.text) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Data rozpoczecia pozniejsza niz data konca',
			buttonNames : [ 'OK' ]
		});
		alertDialog.show();
	} else {
		var zamow = new zamowienie();
		zamow.numer = numerZamowienia_tf.value;
		zamow.nazwa = nazwaZamowienia_tf.value;
		zamow.date_start = dataStart_lb2.text;
		zamow.date_stop = dataStop_lb2.text;
		// sprawdzenie czy wszystkie elementy zostaly podane
		if (zamow.numer === '' || zamow.nazwa === '' || zamow.date_start === ''
				|| zamow.date_stop === '') {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Brak danych, wypelnij wszystkie pola.',
				buttonNames : [ 'OK' ]
			});
			alertDialog.show();
		} else {
			numerZamowienia_tf.value = "";
			nazwaZamowienia_tf.value = "";
			dataStart_lb2.value = "";
			dataStop_lb2.value = "";

			var jsonNodeData = Titanium.JSON.stringify(zamow);
			var props = Titanium.App.Properties.listProperties();
			var propsCount = props.length;
			var nameProps = zamow.numer;

			if (Titanium.App.Properties.getString(nameProps) === null) {
				Titanium.API.info("name props" + nameProps);
				Titanium.App.Properties.setString(nameProps, jsonNodeData);
				var alertDialog = Titanium.UI.createAlertDialog({
					title : 'Dodane do bazy',
					buttonNames : [ 'OK' ]
				});
				alertDialog.show();
			} else {
				var alertDialog = Titanium.UI.createAlertDialog({
					title : 'Zamowienie o danym numerze juz istnieje.',
					buttonNames : [ 'OK' ]
				});
				alertDialog.show();
			}

		}
	}
});
win3.add(bt1);
