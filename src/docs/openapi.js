const openapi = {

    openapi: "3.0.3",

    info: {
        title: "Rural App API",
        version: "1.0.0",
        description:
            "API monolítica de Rural App preparada para evolucionar a microservicios."
    },

    servers: [
        {
            url: "http://localhost:3000",
            description: "Desarrollo local"
        }
    ],

    tags: [
        {
            name: "Roles",
            description: "Administración de roles"
        }
    ],

    paths: {

        "/api/roles": {

            get: {

                tags: ["Roles"],

                summary: "Listar roles",

                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: {
                            type: "integer",
                            minimum: 1,
                            default: 1
                        }
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: {
                            type: "integer",
                            minimum: 1,
                            maximum: 100,
                            default: 10
                        }
                    }
                ],

                responses: {

                    "200": {
                        description: "Roles encontrados"
                    },

                    "500": {
                        description: "Error interno"
                    }
                }
            },

            post: {

                tags: ["Roles"],

                summary: "Crear rol",

                requestBody: {

                    required: true,

                    content: {

                        "application/json": {

                            schema: {
                                $ref: "#/components/schemas/RoleRequest"
                            }
                        }
                    }
                },

                responses: {

                    "201": {
                        description: "Rol creado"
                    },

                    "400": {
                        description: "Datos inválidos"
                    },

                    "409": {
                        description: "Rol duplicado"
                    }
                }
            }
        },

        "/api/roles/{uuid}": {

            get: {

                tags: ["Roles"],

                summary: "Obtener rol",

                parameters: [
                    {
                        name: "uuid",
                        in: "path",
                        required: true,

                        schema: {
                            type: "string"
                        }
                    }
                ],

                responses: {

                    "200": {
                        description: "Rol encontrado"
                    },

                    "404": {
                        description: "Rol no encontrado"
                    }
                }
            },

            put: {

                tags: ["Roles"],

                summary: "Actualizar rol",

                parameters: [
                    {
                        name: "uuid",
                        in: "path",
                        required: true,

                        schema: {
                            type: "string"
                        }
                    }
                ],

                requestBody: {

                    required: true,

                    content: {

                        "application/json": {

                            schema: {
                                $ref: "#/components/schemas/RoleRequest"
                            }
                        }
                    }
                },

                responses: {

                    "200": {
                        description: "Rol actualizado"
                    },

                    "404": {
                        description: "Rol no encontrado"
                    },

                    "409": {
                        description: "Rol duplicado"
                    }
                }
            },

            delete: {

                tags: ["Roles"],

                summary: "Eliminar rol",

                parameters: [
                    {
                        name: "uuid",
                        in: "path",
                        required: true,

                        schema: {
                            type: "string"
                        }
                    }
                ],

                responses: {

                    "200": {
                        description: "Rol eliminado"
                    },

                    "404": {
                        description: "Rol no encontrado"
                    }
                }
            }
        }
    },

    components: {

        schemas: {

            RoleRequest: {

                type: "object",

                required: [
                    "name"
                ],

                properties: {

                    name: {
                        type: "string",
                        example: "ADMIN"
                    },

                    description: {
                        type: "string",
                        example:
                            "Administrador de Rural App"
                    },

                    active: {
                        type: "boolean",
                        example: true
                    }
                }
            }
        }
    }
};

module.exports = openapi;