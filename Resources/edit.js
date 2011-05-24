/*
 * edycja wybranego zamowienia
 * wykorzystywane elementy jak w pliku dodaj.js
 */
function zamowienie() {
	this.nazwa = "";
	this.numer = "";
	this.date_start = "";
	this.date_stop = "";
}
var win = Titanium.UI.currentWindow;

var tit = Titanium.UI.currentWindow.test;
Titanium.UI.currentWindow.title = 'Zamowienie';

var l = Titanium.UI.createLabel({
	text : 'Wprowadz zmiany w edytowalne pola',
	top : 10,
	heigh : 40,
	left : 10,
	width : 300
});
win.add(l);
var datePickerView = Titanium.UI.createView({
	height : 300,
	bottom : -600,
	backgroundColor : '#3D4460'
});
var picker = 0;
var flaga = 0;
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
datePicker.addEventListener('change', function(e) {
	if (picker == 0) {
		dataStart_tf.text = e.value;

	} else {
		dataStop_tf.text = e.value;
	}
});

var value = Titanium.App.Properties.getString(tit);

var order = new zamowienie();
order = Titanium.JSON.parse(value);
if (order !== null) {

	var numerZamowienia_lb = Titanium.UI.createLabel({
		text : 'Numer zamowienia: ' + order.numer,
		heigh : 35,
		left : 10,
		width : 300,
		font : {
			fontSize : 14
		},
		top : 50,
		ellipsize : true
	});

	var nazwaZamowienia_lb = Titanium.UI.createLabel({
		text : 'Nazwa zamowienia: ' + order.nazwa,
		heigh : 35,
		left : 10,
		width : 300,
		font : {
			fontSize : 14
		},
		top : 90,
		ellipsize : true
	});
	var nazwaZamowienia_tf = Titanium.UI.createTextField({
		color : '#336699',
		heigh : 35,
		value : null,
		top : 120,
		left : 10,
		width : 300,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	var dataStart_lb = Titanium.UI.createLabel({
		text : 'Data rozpoczecia' + '     Kliknij...',
		heigh : 35,
		left : 10,
		width : 300,
		top : 175,
		ellipsize : true
	});
	var dataStart_tf = Titanium.UI.createLabel({

		text : order.date_start,
		color : '#FFFFFF',
		heigh : 35,
		value : null,
		top : 200,
		left : 10,
		width : 300,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	dataStart_tf.addEventListener('click', function() {
		picker = 0;
		datePickerView.animate(slideIn);

	});
	var dataStop_lb = Titanium.UI.createLabel({
		text : 'Data zakonczenia' + '     Kliknij...',
		heigh : 35,
		left : 10,
		width : 300,
		top : 255,
		ellipsize : true
	});
	var dataStop_tf = Titanium.UI.createLabel({
		color : '#FFFFFF',
		value : null,
		text : order.date_stop,
		heigh : 35,
		top : 280,
		left : 10,
		width : 300,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	dataStop_tf.addEventListener('click', function(e) {
		picker = 1;
		datePickerView.animate(slideIn);

	});
	function sprawdzDate() {
		if (dataStart_tf.text > dataStop_tf.text) {
			flaga = 1;
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Data rozpoczecia pozniejsza niz data koncowa',
				buttonNames : [ 'OK' ]
			});
			alertDialog.show();
		} else {
			flaga = 0;
		}

	}
	var zapisz_bt = Titanium.UI.createButton({
		title : 'Zapisz',
		top : 360,
		heigh : 35,
		width : 100,
		right : 10
	});
	// metoda edycji danych
	zapisz_bt.addEventListener('click', function() {
		sprawdzDate();
		if (flaga == 0) {
			// var db = Titanium.Database.open('mydb');
			if (nazwaZamowienia_tf.value !== '') {
				order.nazwa = nazwaZamowienia_tf.value;
			}
			if (dataStart_tf.text !== order.date_start) {
				order.date_start = dataStart_tf.text;
			}
			if (dataStop_tf.text !== order.date_stop) {
				order.date_stop = dataStop_tf.text;
			}
			var jsonNodeData = Titanium.JSON.stringify(order);
			var props = Titanium.App.Properties.listProperties();
			var propsCount = props.length;
			var nameProps = 'order' + propsCount;
			Titanium.App.Properties.setString(tit, jsonNodeData);

			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Dane zaktualizowane.',
				buttonNames : [ 'OK' ]
			});
			alertDialog.show();
			var win = Titanium.UI.createWindow({
				url : 'list.js',
				title : "Lista zamowien"
			});

			Titanium.UI.currentTab.open(win, {
				animated : true
			});
		}

	});

	var listaZamowien_bt = Titanium.UI.createButton({
		title : 'Lista zamowien',
		top : 360,
		left : 10,
		heigh : 40,
		width : 100
	});

	listaZamowien_bt.addEventListener('click', function() {
		var win = Titanium.UI.createWindow({
			url : 'list.js',
			title : "Lista zamowien"
		});
		Titanium.UI.currentTab.open(win, {
			animated : true
		});
	});
	var zatwierdzDate_bt = Titanium.UI.createButton({
		title : 'Zatwierdz date',

		top : 360,
		heigh : 40,
		width : 100
	});

	zatwierdzDate_bt.addEventListener('click', function() {
		datePickerView.animate(slideOut);
	});

	win.add(numerZamowienia_lb);
	win.add(nazwaZamowienia_lb);
	win.add(nazwaZamowienia_tf);
	win.add(dataStart_lb);
	win.add(dataStart_tf);
	win.add(dataStop_lb);
	win.add(dataStop_tf);
	win.add(datePickerView);
	win.add(zapisz_bt);
	win.add(listaZamowien_bt);
	win.add(zatwierdzDate_bt);

}
