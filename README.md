# mop-question-answers

api/ - server side kod
frontend/ - client side kod

Task je uradjen na MEAN stacku,
Redux je koristen za state management i fetching podataka.
Material-UI za React je iskoristen za UI, sa integrisanim stilovima i elementima.

Load More funkcionalnost je implementirana ali nije ukljucena, dodavanje answera je implementirano samo na backendu, kao i like funkcionalnost.Usljed tehnickh poteskoca ostao sam bez dovoljno vremena da to implementiram i zavrsim task 100%, ali implementacija je straightforward i da ima smisla traziti vise vremena bila bi zavrsena.


Pokretanje:
1. Potrebno je lokalno imati MongoDB instaliran, provjeriti status sa
`sudo service mongod status`, po potrebi resetovati sa `sudo service mongod reset`.
U root folderu repozitorija pokrenuti novi instancu lokalnog mongo servera.
`sudo mongod --port 27017 --dbpath=./data.`
Baza se kreira pri prvom pokretanju server-side koda, nazalost nisam stigao napraviti nikakav seed
niti deployati na Heroku da bude lakse.
Tako da bi flow trebao biti prvo registracija usera, zatim dodavanje pitanja.

2.Najbrze je pokrenuti tako da otvorimo api/ i frontend/ foldere u odvojenim instancama terminala,
u oba foldera odraditi `npm install` i poslije toga `npm start`.
Client terminal ce automatski otvoriti instancu browera
poslije uspjesnog npm start.
