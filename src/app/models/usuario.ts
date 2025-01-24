export interface Usuario {
    _id:            String;
    nombre:         String;
    correo:         String;
    password:       String;
    carros:         any[];
    fotoPerfil?:    String;
    __v:            number;
}
