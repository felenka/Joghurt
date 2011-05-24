/*
 * okno listy zamowien
 */
Titanium.UI.currentWindow.title = 'Lista zamowien';
function zamowienie(){
    this.nazwa = "";
    this.numer = "";
    this.date_start = "";
    this.date_stop = "";
}
var table = null;
var wybranyWiersz = null;

// przycisk = przejscie do menu glownego
var menuGlowne_bt = Titanium.UI.createButton({
    title: 'Menu glowne',
    top: 5,
    left: 10,
    heigh: 30,
    width: 100
});

menuGlowne_bt.addEventListener('click', function(){
    var win = Titanium.UI.createWindow({
        url: 'app.js'
    });
    Titanium.UI.currentTab.open(win, {
        animated: true
    });
});

//przycisk = usuniecie wybranego elementu
var usun_bt = Titanium.UI.createButton({
    title: 'Usun',
    top: 5,
    right: 10,
    heigh: 30,
    width: 100
});

usun_bt.addEventListener('click', function(e){
    if (wybranyWiersz !== null) {
        if (wybranyWiersz.test) {
            Titanium.API.info("test wybrany wiersz" +wybranyWiersz.test);
			//var value = Titanium.App.Properties.getString(wybranyWiersz.test);
			//Titanium.API.info("v"+ value);
			Titanium.App.Properties.removeProperty(wybranyWiersz.test);
            var win = Titanium.UI.createWindow({
                url: 'list.js',
                title: 'lista',
			});
            Titanium.UI.currentTab.open(win, {
                animated: true
            });
        }}
        else {
            var alertDialog = Titanium.UI.createAlertDialog({
                title: 'Wybierz element do usuniecia',
                buttonNames: ['OK']
            });
            alertDialog.show();
        }
    
});

//przycisk = podglad elementu
var pokaz_bt = Titanium.UI.createButton({
    title: 'Pokaz',
    top: 5,
    heigh: 30,
    width: 100
});

pokaz_bt.addEventListener('click', function(e){
    var win = null;
    if (wybranyWiersz !== null) {
        if (wybranyWiersz.test) {
            var win = Titanium.UI.createWindow({
                url: 'order.js',
                title: wybranyWiersz.title,
				test: wybranyWiersz.test
            });
            
            Titanium.UI.currentTab.open(win, {
                animated: true
            });
        }
    }
    else {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Wybierz zamowienie do obejrzenia.',
            buttonNames: ['OK']
        });
        alertDialog.show();
        
    }
});
Titanium.UI.currentWindow.add(usun_bt);
Titanium.UI.currentWindow.add(menuGlowne_bt);
Titanium.UI.currentWindow.add(pokaz_bt);

table = Titanium.UI.createTableView({
    top: 55
});


//stworzenie tabeli elementow
var section = Titanium.UI.createTableViewSection();

section.headerTitle = "Lista zamowien";
section.height = 35;

var props = Titanium.App.Properties.listProperties();
for (var c=0;c<props.length;c++)
{
	var z = new zamowienie();
    var value = Titanium.App.Properties.getString(props[c]);
	z = Titanium.JSON.parse(value);
	//Titanium.API.info("xxx"+props[c]+"xxx"+value+"xxx"+z.numer);
    var row1 = Titanium.UI.createTableViewRow({title: z.numer, test: props[c]}); section.add(row1);
}

//detektor zdarzen zwiazany z zaznaczaniem wybranego elementu
table.addEventListener('click', function(e){

    if (e.rowData.backgroundColor === "#000000") {
        if (wybranyWiersz !== null) {
            wybranyWiersz.backgroundColor = "#000000";
            wybranyWiersz = null;
        }
        wybranyWiersz = e.rowData;
        e.rowData.backgroundColor = "#666699";
    }
    else {
        e.rowData.backgroundColor = "#000000";
        wybranyWiersz = null;
    }
});
table.setData([section]);

Titanium.UI.currentWindow.add(table);