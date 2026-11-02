# Architecture Decision Records

## ADR-001: Web first
**Decision:** Build a responsive Next.js web app first.  
**Reason:** Fastest validation path, one deployment surface, easy client/user access, reusable backend for later Android app.  
**Revisit when:** validated demand requires deeper device integration or offline behavior.

## ADR-002: Modular monolith for MVP
**Decision:** Use Next.js route handlers and domain modules before introducing separate microservices.  
**Reason:** Lower operational overhead for a small MVP.  
**Revisit when:** team scale, throughput or deployment boundaries justify extraction.

## ADR-003: Curated catalogue before AI
**Decision:** Use verified structured data and deterministic ranking before adding generative AI.  
**Reason:** Prevent fabricated places, prices and availability; establish measurable baseline.

## ADR-004: Enquiry/affiliate before direct booking
**Decision:** MVP links to trusted partners or captures enquiries; it does not process customer booking payments.  
**Reason:** Avoid premature payment, refund, cancellation and supplier operations complexity.
