# caps

CAPS Phase 2: Continue working on a multi-day build of our delivery tracking system, creating an event observable over a network with Socket.io.

In this phase, we’ll be moving away from using Node Events for managing a pool of events, instead refactoring to using the Socket.io libraries. This allows communication between Server and Client applications.

The intent here is to build the data services that would drive a suite of applications where we can see pickups and deliveries in real-time.



-[class 12 instructor README](https://github.com/codefellows/seattle-javascript-401d58/tree/main/class-12)

-[Github action link](https://github.com/QILINXIE02/caps/actions)

-[PR to main](https://github.com/QILINXIE02/caps/pull/3)

UML diagram: ![alt text](image-1.png)

node src/socketServer.js: ![alt text](image-2.png)
node src/driver.js: ![alt text](image-4.png)
node src/vendor.js: ![alt text](image-3.png)

====================

CAPS Phase 1: Begin the build of an application for a product called CAPS - The Code Academy Parcel Service. 

Code Academy Parcel Service (CAPS)
A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what’s in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).

-[class 11 instructor README](https://github.com/codefellows/seattle-javascript-401d58/tree/main/class-11)

-[Github action link](https://github.com/QILINXIE02/caps/actions)

-[PR to main](https://github.com/QILINXIE02/caps/pull/1)

UML diagram:
![alt text](image.png)