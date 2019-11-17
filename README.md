# save_the_planet

## Starten der Anwendung:

  1. git clone in ein Verzeichnis
  2. in dieses Verzeichnis wechseln
  3. 'npm install' ausführen
  4. 'npm start' zum starten des Entwicklungsservers ausführen

## Kurzbeschreibung

Anwendung "Save_the_planet"
Kurzbeschreibung
Unsere Browserapp "Save_the_planet" stellt ein Minispiel dar, dass dem 'Cookie-Klicker' - Spielprinzip ähnelt.  
Das Ziel des Spiels ist es , immer mehr und mehr Plastik zu sammeln um den Planeten von diesem zu befreien.
Das gesammelte Plastik kann in recycle-Produkte umgewandelt werden, welche für Spielgeld verkauft werden.
Für dieses Geld können anschließend Kollektoren gekauft werden, die das Plastiksammeln für den Nutzer übernehmen und automatisch Plastik sammeln.

## Sub-Seiten
Die Webapplikation beeinhaltet folgende Seiten:
 - Eine Klicker Seite, auf dieser befindet sich der "Klicker"-Button und die Liste mit den verfügbaren Kollektoren, die nacheinander freigeschaltet werden.
 - Eine Workshop Seite, auf dieser können verschiedene Produkte hergestellt werden und somit kann das Plastik gegen Geld eingetauscht werden
 - Eine Statistik Seite, hier können verschiedene Statistiken und Graphen über den Spielverlauf hinweg angeschaut werden
 - Eine Tutorial Seite in der das Spiel mittels verschiedenen Bildern erklärt wird und die austauschbar gegen einen Artikel über die Plastikverschutzung der Weltmeere ist (Quelle: https://www.zeit.de/wissen/umwelt/2019-05/umweltschutz-artenschutz-klimawandel-loesung, ine Analyse von Elena Erdmann und Maria Mast, 9. Mai 2019) 

Ebenfalls ist es möglich mehrere Spielstände zu speichern und zu laden.

Da die Entwicklung der Sub-Seiten unterschiedlich viel Aufwand bedeutete, wurde der Entwicklungsaufwand nicht nach Sub-Seiten aufgeteilt,
sondern jedes Gruppenmitglied hat die gerade anstehenden Aufgaben durchgeführt. Hierbei wurde bestmöglichst darauf geachtet, dass jedes Gruppen-
mitglied ungefähr gleich Aufwand in die Webapplikation gesteckt hat.

## Verwendete Technologien
Die App nutzt den Node Package Manager npm als Paketverwaltung.
Als Application Bundler wurde ParcelJS verwendet.
Ebenfalls verwendet wurden die externen Bibliotheken:
  - chart.js für die Graphen
  - sweetalert für Alerts
  - Navigo als Sinle Page Application Router
  - Hacktimer, um zu verhindern dass der Browser die laufenden Intervalle beendet, wenn er minimiert wurde.

Um die Spielstände zu speichern und zu laden wurde der localStorage verwendet.

## Folgende Entwicklungswerkzeuge kamen zum Einsatz:

Webstorm & Atom: IDE zum entwicklen
git: Versionsverwaltung zur gemeinsamen Arbeit am Quellcode
npm: Paketverwaltung zum automatischen Download abhängiger Bibliotheken
Parcel: Web Application Bundler und Entwicklungsserver

Zum Koordinieren der Einzelaufgaben wurde Trello verwendet.

## Gruppenteilnehmer:
 - Kevin Hink
 - Selami Dagtasoglu
 - Eileen Bednar
 - Florian Großmann 
