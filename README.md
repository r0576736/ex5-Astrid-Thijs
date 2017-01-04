# ex5-Astrid-Thijs
Samengewerkt met Jelle Van Loock voor de resources. 
Genzo Vandervelden heeft met geholpen bij de code.

Storage:  
  Hierin zit de data opgeslagen van de 3 resources:
  
    saveDevice  = Toestel opslagen
    AllDevices  = Alle toestellen opvragen
    findDevice  = Een toestel opzoeken
    
    saveAlarm   = Alarm opslagen
    AllAlarms   = lijst van alle alarmen opvragen
    findDevice  = een alarm opzoeken
    
    saveWhiteList = record opslagen in 'WhiteLists'
    AllWhiteLists = lijst weergeven van alle records in 'WhiteLists'
    findWhiteList = een record opzoeken in 'WhiteLists'


Validate:
  Hier wordt de data gevalideerd. Velden mogen niet leeg zijn. 

Main:
  1ste alle extensies installeren (express, body-parser, uuid).
  Validate en Storage linken opvragen in de Main.
  Methodes GET; GET/:id; POST implementeren per resource ('Devices', 'Alarms', 'WhiteLists').
  Via console.log de file checken. 
  Server starten op https://localhost:1234
  
  
Astrid Thijs.
