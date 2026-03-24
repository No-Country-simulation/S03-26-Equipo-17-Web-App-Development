# Diagrama de Clases — Backend CRM NoCountry

```mermaid
classDiagram
    direction TB

    %% ENUMS CRÍTICOS
    class Rol {
        <<enumeration>>
        ADMIN
        VENDEDOR
    }

    class EstadoLead {
        <<enumeration>>
        NUEVO
        EN_SEGUIMIENTO
        CLIENTE
        PERDIDO
    }

    class TipoInteraccion {
        <<enumeration>>
        WHATSAPP
        EMAIL
        CAMBIO_ESTADO
    }

    %% ENTIDADES POR FEATURE
    
    namespace feature_auth {
        class Usuario {
            +Long id
            +String nombre
            +String email
            +String password
            +Rol rol
            +Boolean activo
        }
    }

    namespace feature_lead {
        class Lead {
            +Long id
            +String nombre
            +String email
            +String telefono
            +EstadoLead estado
            +Boolean stale
            +LocalDateTime createdAt
            +LocalDateTime lastActivity
            +Long deletedBy
        }
    }

    namespace feature_interaction {
        class Interaction {
            +Long id
            +TipoInteraccion tipo
            +String contenido
            +LocalDateTime fecha
            +Long leadId
        }
    }

    %% RELACIONES LÓGICAS
    Usuario --> Rol : tiene
    Lead --> EstadoLead : tiene
    Lead "n" --> "1" Usuario : asignadoA
    Interaction "n" --> "1" Lead : perteneceA
    Interaction --> TipoInteraccion : es
