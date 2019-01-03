EDNS
====
Extension Mechanisms for DNS

This document will give some hints to litterature about edns
and how it's done in this project.

* https://tools.ietf.org/html/rfc6891
* https://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS



OPT RR, 41/0x29
---------------
OPT RR MAY be placed anywhere in the additional data section,
it MUST be the only OPT RR in that message.

###Wireformat
Wireformat is described in section 6.1.2 of RFC6891

Fixed part
```
+------------+--------------+------------------------------+
| Field Name | Field Type   | Description                  |
+------------+--------------+------------------------------+
| NAME       | domain name  | MUST be 0 (root domain)      |
| TYPE       | u_int16_t    | OPT (41)                     |
| CLASS      | u_int16_t    | requestor's UDP payload size |
| TTL        | u_int32_t    | extended RCODE and flags     |
| RDLEN      | u_int16_t    | length of all RDATA          |
| RDATA      | octet stream | {attribute,value} pairs      |
+------------+--------------+------------------------------+
```

Varable part
```
             +0 (MSB)                            +1 (LSB)
   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
0: |                          OPTION-CODE                          |
   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
2: |                         OPTION-LENGTH                         |
   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
4: |                                                               |
   /                          OPTION-DATA                          /
   /                                                               /
   +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
```


