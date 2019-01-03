Notes
=====

## Queries
From [RFC 6762 - Section 5](https://tools.ietf.org/html/rfc6762#section-5)
> There are two kinds of Multicast DNS queries: one-shot queries of the
> kind made by legacy DNS resolvers, and continuous, ongoing Multicast
> DNS queries made by fully compliant Multicast DNS queriers, which
> support asynchronous operations including DNS-Based Service Discovery
> [RFC6763](https://tools.ietf.org/html/rfc6763).

I would like to support both methods where the continous method is the
primary and one-shot only to be used when you actually just want to do 
a single lookup and then stop.

### One-Shot
Timeout should be about 2-3 seconds according to RFC6762.

> regardless of whether they are sent from a dynamic port or from a 
> fixed port, these queries MUST NOT be sent using UDP source 
> port 5353, since using UDP source port 5353 signals the presence of 
> a fully compliant Multicast DNS querier

Ok one-shot is NOT allowed to be sent from 5353, that explains why I 
have seen both. 


### Continuous Multicast DNS Querying



## Regarding what ports and interfaces to use

From [RFC 6762 - Section 5.2](https://tools.ietf.org/html/rfc6762#section-5.2)
> A compliant Multicast DNS querier, which implements the rules
> specified in this document, MUST send its Multicast DNS queries from
> UDP source port 5353 (the well-known port assigned to mDNS), and MUST
> listen for Multicast DNS replies sent to UDP destination port 5353 at
> the mDNS link-local multicast address (224.0.0.251 and/or its IPv6
> equivalent FF02::FB).

If trying to bind to 5353 for the purpose of running a fully compliant querier and
if there is an already running service on that computer bound to the same port 
there might be issues unless there is a way of sharing a port. 

[RFC 6762 - Section 15 - Considerations for multiple responders on the same machine](https://tools.ietf.org/html/rfc6762#section-15)
> all Multicast DNS implementations SHOULD use the
> SO_REUSEPORT and/or SO_REUSEADDR options (or equivalent as
> appropriate for the operating system in question)

Node >=0.12.x have an option to `dgram.createSocket()` that is called  reuseAddr 
which should correspond to SO_REUSEADDR. Node <=0.10.x does not have this option
and might have issues sharing the address and port with other services.

But there might still be some other issues as noted in section 15.4
https://tools.ietf.org/html/rfc6762#section-15.4


## IPV6

224.0.0.251:5353 is equivalent to [FF02::FB]:5353
