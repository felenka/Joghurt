var win = Titanium.UI.currentWindow;
win.title = 'Usuwanie zamowien';
var l = Titanium.UI.createLabel({
	top : 10,
	left : 10,
	width : 300,
	heigh : 35,
	color : '#777',
	font : {
		fontSize : 13
	},
	text : 'Wpisz kod zabezpieczajacy'
});

var tf = Titanium.UI.createTextField({
	top : 50,
	left : 10,
	width : 300,
	heigh : 35
});
var usun_bt = Titanium.UI.createButton({
	title : 'Usun baze zamowien',
	top : 350,
	right : 10,
	width : 150,
	heigh : 35

});
// usuwanie bazy danych
var props = Titanium.App.Properties.listProperties();
usun_bt.addEventListener('click', function(e) {
	// sprawdzanie poprawnosci kodu, domyslnie przypisane '1234'
	if (tf.value === '1234') {
		for ( var c = 0; c < props.length; c++) {
			Titanium.App.Properties.removeProperty(props[c]);
		}

		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Dane usuniete',
			buttonNames : [ 'OK' ]
		});
		alertDialog.show();
	} else {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Wprowadz poprawny kod',
			buttonNames : [ 'OK' ]
		});
		alertDialog.show();
	}
});
// przycisk = przejdz do menu glownego
var menuGlowne_usun_bt = Titanium.UI.createButton({
	title : 'Menu glowne',
	top : 350,
	left : 10,
	width : 150,
	heigh : 35

});

menuGlowne_usun_bt.addEventListener('click', function(e) {
	var win = Titanium.UI.createWindow({
		url : 'app.js',
		title : 'Dodaj'
	});
	Titanium.UI.currentTab.open(win, {
		animated : true
	});
});

win.add(l);
win.add(tf);
win.add(usun_bt);
win.add(menuGlowne_usun_bt);
