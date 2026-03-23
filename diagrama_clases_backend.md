# Diagrama de Clases — Backend CRM NoCountry

```mermaid
classDiagram
    direction TB

    %% ─────────────────────────────────────────
    %%  ENUMS
    %% ─────────────────────────────────────────

    class Rol {
        <<enumeration>>
        ADMIN
        VENDEDOR
        SUPERVISOR
    }

    class EstadoLead {
        <<enumeration>>
        NUEVO
        EN_SEGUIMIENTO
        CLIENTE
        PERDIDO
    }

    class EstadoOportunidad {
        <<enumeration>>
        ABIERTA
        GANADA
        PERDIDA
        EN_NEGOCIACION
    }

    class TipoActividad {
        <<enumeration>>
        LLAMADA
        EMAIL
        REUNION
        DEMO
        SEGUIMIENTO
    }

    class EstadoTarea {
        <<enumeration>>
        PENDIENTE
        EN_PROGRESO
        COMPLETADA
        CANCELADA
    }

    class PrioridadTarea {
        <<enumeration>>
        BAJA
        MEDIA
        ALTA
        URGENTE
    }

    %% ─────────────────────────────────────────
    %%  USUARIO
    %% ─────────────────────────────────────────

    class Usuario {
        +Long id
        +String nombre
        +String apellido
        +String email
        +String password
        +Rol rol
        +Boolean activo
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +LocalDateTime deletedAt
    }

    %% ─────────────────────────────────────────
    %%  LEAD
    %% ─────────────────────────────────────────

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
        +LocalDateTime deletedAt
    }

    %% ─────────────────────────────────────────
    %%  EMPRESA
    %% ─────────────────────────────────────────

    class Empresa {
        +Long id
        +String nombre
        +String sector
        +String sitioWeb
        +String telefono
        +String direccion
        +String ciudad
        +String pais
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }

    %% ─────────────────────────────────────────
    %%  CONTACTO
    %% ─────────────────────────────────────────

    class Contacto {
        +Long id
        +String nombre
        +String apellido
        +String email
        +String telefono
        +String cargo
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +LocalDateTime deletedAt
    }

    %% ─────────────────────────────────────────
    %%  OPORTUNIDAD
    %% ─────────────────────────────────────────

    class Oportunidad {
        +Long id
        +String nombre
        +String descripcion
        +BigDecimal valorEstimado
        +EstadoOportunidad estado
        +LocalDate fechaCierre
        +Integer probabilidad
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
        +LocalDateTime deletedAt
    }

    %% ─────────────────────────────────────────
    %%  PRODUCTO
    %% ─────────────────────────────────────────

    class Producto {
        +Long id
        +String nombre
        +String descripcion
        +BigDecimal precio
        +Boolean activo
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }

    %% ─────────────────────────────────────────
    %%  LINEA DE OPORTUNIDAD (tabla intermedia)
    %% ─────────────────────────────────────────

    class LineaOportunidad {
        +Long id
        +Integer cantidad
        +BigDecimal precioUnitario
        +BigDecimal descuento
        +BigDecimal subtotal
    }

    %% ─────────────────────────────────────────
    %%  ACTIVIDAD
    %% ─────────────────────────────────────────

    class Actividad {
        +Long id
        +TipoActividad tipo
        +String descripcion
        +LocalDateTime fechaHora
        +Integer duracionMinutos
        +String resultado
        +LocalDateTime createdAt
    }

    %% ─────────────────────────────────────────
    %%  TAREA
    %% ─────────────────────────────────────────

    class Tarea {
        +Long id
        +String titulo
        +String descripcion
        +EstadoTarea estado
        +PrioridadTarea prioridad
        +LocalDate fechaVencimiento
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }

    %% ─────────────────────────────────────────
    %%  NOTA
    %% ─────────────────────────────────────────

    class Nota {
        +Long id
        +String contenido
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }

    %% ─────────────────────────────────────────
    %%  NOTIFICACION
    %% ─────────────────────────────────────────

    class Notificacion {
        +Long id
        +String titulo
        +String mensaje
        +Boolean leida
        +LocalDateTime createdAt
        +LocalDateTime leidaAt
    }

    %% ─────────────────────────────────────────
    %%  ETIQUETA
    %% ─────────────────────────────────────────

    class Etiqueta {
        +Long id
        +String nombre
        +String color
    }

    %% ─────────────────────────────────────────
    %%  RELACIONES
    %% ─────────────────────────────────────────

    %% Usuario tiene un Rol
    Usuario --> Rol : tiene

    %% Lead tiene un EstadoLead y puede ser asignado a un Usuario
    Lead --> EstadoLead : tiene
    Lead "muchos" --> "1" Usuario : asignadoA

    %% Contacto pertenece a una Empresa y puede originarse en un Lead
    Contacto "muchos" --> "0..1" Empresa : pertenece
    Contacto "0..1" --> "0..1" Lead : convertidoDe

    %% Oportunidad tiene un EstadoOportunidad, pertenece a un Contacto,
    %% es gestionada por un Usuario y puede asociarse a una Empresa
    Oportunidad --> EstadoOportunidad : tiene
    Oportunidad "muchos" --> "1" Contacto : asociadaA
    Oportunidad "muchos" --> "1" Usuario : gestionadaPor
    Oportunidad "muchos" --> "0..1" Empresa : de

    %% LineaOportunidad relaciona Oportunidad con Producto
    LineaOportunidad "muchos" --> "1" Oportunidad : perteneceA
    LineaOportunidad "muchos" --> "1" Producto : contiene

    %% Actividad se registra sobre un Lead o Contacto, y la realiza un Usuario
    Actividad --> TipoActividad : esDeTipo
    Actividad "muchos" --> "0..1" Lead : sobreLead
    Actividad "muchos" --> "0..1" Contacto : sobreContacto
    Actividad "muchos" --> "0..1" Oportunidad : sobreOportunidad
    Actividad "muchos" --> "1" Usuario : realizadaPor

    %% Tarea puede estar asociada a Lead/Contacto/Oportunidad y asignada a Usuario
    Tarea --> EstadoTarea : tiene
    Tarea --> PrioridadTarea : tiene
    Tarea "muchos" --> "1" Usuario : asignadaA
    Tarea "muchos" --> "0..1" Lead : sobreLead
    Tarea "muchos" --> "0..1" Contacto : sobreContacto
    Tarea "muchos" --> "0..1" Oportunidad : sobreOportunidad

    %% Nota puede asociarse a Lead/Contacto/Oportunidad y creada por Usuario
    Nota "muchos" --> "1" Usuario : creadaPor
    Nota "muchos" --> "0..1" Lead : sobreLead
    Nota "muchos" --> "0..1" Contacto : sobreContacto
    Nota "muchos" --> "0..1" Oportunidad : sobreOportunidad

    %% Notificacion pertenece a un Usuario
    Notificacion "muchos" --> "1" Usuario : paraUsuario

    %% Etiquetas pueden aplicarse a Lead y Contacto (relación muchos a muchos)
    Lead "muchos" --> "muchos" Etiqueta : tieneTags
    Contacto "muchos" --> "muchos" Etiqueta : tieneTags
```

---

## Descripción de entidades

| Entidad | Descripción |
|---|---|
| **Usuario** | Empleado del sistema (vendedor, supervisor o admin). Gestiona leads, contactos, tareas y oportunidades. |
| **Rol** | Enum de roles de usuario: `ADMIN`, `VENDEDOR`, `SUPERVISOR`. |
| **Lead** | Prospecto o cliente potencial. Estado inicial del funnel de ventas. Puede convertirse en `Contacto`. |
| **EstadoLead** | Enum del ciclo de vida de un lead: `NUEVO → EN_SEGUIMIENTO → CLIENTE / PERDIDO`. |
| **Empresa** | Organización o compañía a la que pertenecen los contactos. |
| **Contacto** | Lead convertido con información detallada. Puede estar vinculado a una `Empresa`. |
| **Oportunidad** | Posibilidad de venta asociada a un contacto. Contiene valor estimado y probabilidad de cierre. |
| **EstadoOportunidad** | Enum del ciclo de vida de una oportunidad: `ABIERTA`, `EN_NEGOCIACION`, `GANADA`, `PERDIDA`. |
| **Producto** | Bien o servicio del catálogo que se puede incluir en oportunidades. |
| **LineaOportunidad** | Relación entre `Oportunidad` y `Producto` con cantidad, precio y descuento. |
| **Actividad** | Interacción registrada (llamada, email, reunión) sobre un lead, contacto u oportunidad. |
| **TipoActividad** | Enum del tipo de actividad: `LLAMADA`, `EMAIL`, `REUNION`, `DEMO`, `SEGUIMIENTO`. |
| **Tarea** | Acción pendiente asignada a un usuario, relacionada con un lead, contacto u oportunidad. |
| **EstadoTarea** | Enum del estado de una tarea: `PENDIENTE`, `EN_PROGRESO`, `COMPLETADA`, `CANCELADA`. |
| **PrioridadTarea** | Enum de prioridad: `BAJA`, `MEDIA`, `ALTA`, `URGENTE`. |
| **Nota** | Anotación libre sobre un lead, contacto u oportunidad, creada por un usuario. |
| **Notificacion** | Aviso interno generado por el sistema y dirigido a un usuario. |
| **Etiqueta** | Etiqueta/tag reutilizable para clasificar leads y contactos. |
