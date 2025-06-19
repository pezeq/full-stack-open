``` mermaid
    sequenceDiagram
        participant browser
        participant server



        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server

        note right of browser: The browser sends only one request to the server.

        server->>browser: JSON file
        deactivate server

        note left of server: A new resource is created at server-side
        note right of browser: The client-browser understand that a resource was created and access it,
        note right of browser: without the need of redirection.
```