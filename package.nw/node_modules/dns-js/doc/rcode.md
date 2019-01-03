RCODE
=====

http://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6

|rcode       | Name       | Description                          | Reference             |
|------------|------------|--------------------------------------|-----------------------|
| 0          | NoError    | No Error                             | [RFC1035]             |
| 1          | FormErr    | Format Error                         | [RFC1035]             |
| 2          | ServFail   | Server Failure                       | [RFC1035]             |
| 3          | NXDomain   | Non-Existent Domain                  | [RFC1035]             |
| 4          | NotImp     | Not Implemented                      | [RFC1035]             |
| 5          | Refused    | Query Refused                        | [RFC1035]             |
| 6          | YXDomain   |  Name Exists when it should not      | [RFC2136][RFC6672]    |
| 7          | YXRRSet    | RR Set Exists when it should not     | [RFC2136]             |
| 8          | NXRRSet    | RR Set that should exist does not    | [RFC2136]             |
| 9          | NotAuth    | Server Not Authoritative for zone    | [RFC2136]             |
| 9          | NotAuth    | Not Authorized                       | [RFC2845]             |
| 10         | NotZone    | Name not contained in zone           | [RFC2136]             |
| 11-15      | Unassigned |                                      |                       |    	
| 16         | BADVERS    | Bad OPT Version                      | [RFC6891]             |
| 16         | BADSIG     | TSIG Signature Failure               | [RFC2845]             |
| 17         | BADKEY     | Key not recognized                   | [RFC2845]             |
| 18         | BADTIME    | Signature out of time window         | [RFC2845]             |
| 19         | BADMODE    | Bad TKEY Mode                        | [RFC2930]             |
| 20         | BADNAME    | Duplicate key name                   | [RFC2930]             |
| 21         | BADALG     | Algorithm not supported              | [RFC2930]             |
| 22         | BADTRUNC   | Bad Truncation                       | [RFC4635]             |
| 23         | BADCOOKIE  | Bad/missing server cookie*           |                       |
| 24-3840    | Unassigned |    	                                 |                       |
| 3841-4095  | Reserved   | for Private Use              	     | [RFC6895]             |
| 4096-65534 | Unassigned |                                      |	                     |
| 65535      | Reserved   | can be allocated by Standards Action | [RFC6895]             |
------------------------------------------------------------------------------------------
*TEMPORARY - registered 2015-07-26, expires 2016-07-26 [draft-ietf-dnsop-cookies]