
Record types
============

A usefull list of record types can be found at 
https://en.wikipedia.org/wiki/List_of_DNS_record_types

A - 1
-----
```
{ name: 'TV i Vardagsrummet.local',
  type: 1,
  class: 32769,
  ttl: 120,
  address: '192.168.1.89' }
```


PTR - 12
--------
```
{ name: '_googlecast._tcp.local',
  type: 12,
  class: 1,
  ttl: 4500,
  data: 'TV i Vardagsrummet._googlecast._tcp.local' }

```


SRV - 33
--------
```
{ name: 'TV i Vardagsrummet._googlecast._tcp.local',
  type: 33,
  class: 32769,
  ttl: 120,
  priority: 0,
  weight: 0,
  port: 8009,
  target: 'TV i Vardagsrummet.local' }
```


TXT - 16
-------
{ name: 'SkC$rm i GC$strummet._googlecast._tcp.local',
  type: 16,
  class: 32769,
  ttl: 4500,
  data: 
   [ 'id=c3cccef1d09583a377f9613567168f71',
     've=02',
     'md=Chromecast',
     'ic=/setup/icon.png',
     'fn=SkC$rm i GC$strummet',
     'ca=5',
     'st=0' ] }