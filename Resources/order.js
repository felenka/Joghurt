/*
 * wyswietla zawartosc zamowienia dla wybranego elementu z listy

 */

var win = Titanium.UI.currentWindow;

var tit = Titanium.UI.currentWindow.test;
function zamowienie() {
	this.nazwa = "";
	this.numer = "";
	this.date_start = "";
	this.date_stop = "";
}
Titanium.API.info("w order.js" + tit);
var value = Titanium.App.Properties.getString(tit);
var order = new zamowienie();
order = Titanium.JSON.parse(value);

// Titanium.API.info(value+"zamowienie"+ order.nazwa + " "+order.numer +"
// "+order.date_start + " "+ order.date_stop );;

if (order !== null) {
	var l = Titanium.UI.createLabel({
		text : 'Numer zamowienia',
		height : 35,
		width : 300,
		color : '#000000',
		backgroundColor : '#DDDDDD',
		top : 10
	});

	var l1 = Titanium.UI.createLabel({
		text : order.numer,
		height : 35,
		width : 300,
		top : 50
	});

	var l2 = Titanium.UI.createLabel({
		text : 'Nazwa zamowienia',
		height : 35,
		width : 300,
		color : '#000000',
		backgroundColor : '#DDDDDD',
		top : 90
	});
	var l3 = Titanium.UI.createLabel({
		text : order.nazwa,
		height : 35,
		width : 300,
		top : 130
	});
	var l4 = Titanium.UI.createLabel({
		text : 'Data rozpoczecia',
		height : 35,
		width : 300,
		color : '#000000',
		backgroundColor : '#DDDDDD',
		top : 170
	});
	var l5 = Titanium.UI.createLabel({
		text : order.date_start,
		height : 35,
		width : 300,
		top : 210
	});
	var l6 = Titanium.UI.createLabel({
		text : 'Data zakonczenia',
		height : 35,
		width : 300,
		color : '#000000',
		backgroundColor : '#DDDDDD',
		top : 250
	});
	var l7 = Titanium.UI.createLabel({
		text : order.date_stop,
		height : 35,
		width : 300,
		top : 290
	});

	win.add(l);
	win.add(l1);
	win.add(l2);
	win.add(l3);
	win.add(l4);
	win.add(l5);
	win.add(l6);
	win.add(l7);

	var bt = Titanium.UI.createButton({
		title : 'Edytuj',
		top : 370,
		right : 10,
		heigh : 40,
		width : 100
	});

	win.add(bt);
	bt.addEventListener('click', function() {
		var win = Titanium.UI.createWindow({
			url : 'edit.js',
			test : tit,
			title : tit
		});
		Titanium.UI.currentTab.open(win, {
			animated : true
		});
	});
	var bt2 = Titanium.UI.createButton({
		title : 'Lista zamowien',
		top : 370,
		left : 10,
		heigh : 40,
		width : 100
	});

	win.add(bt2);
	bt2.addEventListener('click', function() {
		var win = Titanium.UI.createWindow({
			url : 'list.js',
			title : 'lista'
		});

		Titanium.UI.currentTab.open(win, {
			animated : true
		});
	});
}
