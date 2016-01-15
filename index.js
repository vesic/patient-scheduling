// Doktor
function Doktor(ime, prezime, specijalizacija) {
  this._ime = ime || 'ime';
  this._prezime = prezime || 'prezime';
  this._specijalizacija = specijalizacija || 'specijalizacija';
  this._pacijenti = [];
  
  console.log(new Date().toLocaleString(), '\n', this.toString(), 'Kreiran');
}

Doktor.prototype.zakazujePregled = function(pacijent, pregled) {
  pacijent.obavljaPregled(pregled);
}

Doktor.prototype.dodajPacijenta = function(pacijent) {
  this._pacijenti.push(pacijent);
}

Doktor.prototype.listajPacijente = function() {
  this._pacijenti.forEach(pacijent => {
    console.log(pacijent.toString());
  })
}

Doktor.prototype.toString = function() {
  return `Doktor:\n${this._ime}, ${this._prezime} ${this._specijalizacija}\n`;
}

// Pacijent
function Pacijent(ime, prezime, jmbg, brojKartona) {
  Doktor.apply(this, [ime, prezime]);
  this._jmbg = jmbg || 'default';
  this._brojKartona = brojKartona || 'default';
}

Pacijent.prototype = Object.create(Pacijent.prototype);
Pacijent.prototype.constructor = Pacijent;

Pacijent.prototype.biraDoktora = function(doktor) {
  if (doktor instanceof Doktor) {
    this._doktor = doktor;
    console.log(`${this._ime} bira doktora ${doktor._ime}`);
  } else { 
    throw {
      name: "Doktor Greska",
      message: "Greska prilikom izbora doktora"
    }
  }
}

Pacijent.prototype.obavljaPregled = function(pregled) {
  console.log(`${new Date().toLocaleString()}: Pregled u toku`);
  for (var tip in pregled._tip) {
    pregled._tip[tip] = Pregled.prototype.simulacijaRezultata(100);
  }
  setTimeout(() => {
    console.log('Pregled zavrsen rezultati:\n', pregled._tip);
  }, 2000);
}

Pacijent.prototype.toString = function() {
  return `Pacijent:\n${this._ime}, ${this._prezime}\n`;
}

// Pregled
function Pregled(tipPregleda) {
  this._datum = new Date;
    // dozvoljeni tipovi
  var tipoviPregleda = Object.keys(Pregled.prototype.tip);
  // podrazumevani tip
  tipPregleda = 
    (tipoviPregleda.indexOf(tipPregleda) !== -1) 
    ? tipPregleda
    : 'nivo holesterola';
    
  this._tip = Pregled.prototype.tip[tipPregleda];
}

Pregled.prototype.tip = {
  'krvni pritisak': {
    'gornja vrednost': undefined,
    'donja vrednost': undefined,
    'puls': undefined
  },
  'nivo secera': {
    'vrednost': undefined,
    'vreme poslednjeg obroka': undefined,
  },
  'nivo holesterola': {
    'vrednost': undefined,
    'vreme poslednjeg obroka': undefined
  }
}

Pregled.prototype.simulacijaRezultata = function(max) {
  return Math.floor(Math.random() * max) + 1;
}

Pregled.prototype.toString = function() {
  return `Pregled`;
}

// Simulacija
var doktor = new Doktor('Milan');
var pacijent = new Pacijent('Dragan');
doktor.dodajPacijenta(pacijent);

try {
  pacijent.biraDoktora(doktor);
} catch (e) {
  console.log(e.message);
}

var pregled1 = new Pregled('nivo secera');
doktor.zakazujePregled(pacijent, pregled1);

var pregled2 = new Pregled('krvni pritisak');
doktor.zakazujePregled(pacijent, pregled2);
