/*
 * plik glowny
 * okno startowe
 */
  var props = Titanium.App.Properties.listProperties();
//Titanium.API.info(props.length);

function zamowienie(){
    this.nazwa = "";
    this.numer = "";
    this.date_start = "";
    this.date_stop = "";
}
var z = new zamowienie();

for (var c=0;c<props.length;c++)
{
    var value = Titanium.App.Properties.getString(props[c]);
	z = Titanium.JSON.parse(value);
   Titanium.API.info(z.nazwa+" = "+z.numer);
}
 
Titanium.UI.setBackgroundColor('#000');

function zamowienie(){
    this.nazwa = "";
    this.numer = "";
}

var tabGroup = Titanium.UI.createTabGroup();
var winGlowne = Titanium.UI.createWindow({
    title: 'Menu glowne',
    backgroundColor: '#000'
});
var tab = Titanium.UI.createTab({
    title: 'JOGURT',
    height: 20,
    window: winGlowne
});

var data = [{
    title: 'Dodaj zamowienie.',
    hasChild: true,
    test: 'add.js'
}, {
    title: 'Lista zamowien.',
    hasChild: true,
    test: 'list.js'
}, {
    title: 'Usuwanie bazy zamowien.',
    hasChild: true,
    test: 'restart.js'
}, ];
var warunek = true;
//tworzymy tabele, w ktorej zawarte sa elementy
var tableview = Titanium.UI.createTableView({
    data: data
});

//tworzymy detektor zdarzen
tableview.addEventListener('click', function(e){

    if (e.rowData.test) {
       
            //przechodzimy do wybranej opcji
            var win = Titanium.UI.createWindow({
                url: e.rowData.test,
                title: e.rowData.title,
				
            });
            
            Titanium.UI.currentTab.open(win, {
                animated: true
            });
            
      //  }
    }
});
//przycisk sluzacy do odswiezania okna
var bt = Titanium.UI.createButton({
    title: 'Odswiez',
    top: 350,
    height: 40,
    
    width: 100
});

bt.addEventListener('click', function(){
    var win = Titanium.UI.createWindow({
        url: 'app.js',
        title: 'Starts'
    });
    Titanium.UI.currentTab.open(win, {
        animated: true
    });
});

winGlowne.add(tableview);
winGlowne.add(bt);

tabGroup.addTab(tab);

tabGroup.open();
