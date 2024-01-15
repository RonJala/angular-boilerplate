export interface User {
    id?: number; // Identificador del usuario (opcional, ya que podría ser asignado por el servidor)
    name: string;
    last_name: string;
    email: string;
    password: string;
    profile_picture?: string; // URL de la foto de perfil (opcional)
    created_at?: string; // Fecha de creación (opcional, ya que podría ser asignado por el servidor)
    updated_at?: string; // Fecha de actualización (opcional, ya que podría ser asignado por el servidor)
  }