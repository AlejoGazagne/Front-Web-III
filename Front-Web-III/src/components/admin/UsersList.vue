<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { theme } from '@/assets/theme';
import type { UserData } from '@/types/user';
import { editUser, fetchUsers, addUser } from '@/services/userService';

const dialog = ref(false);
const dialogAddUser = ref(false);

// Datos del formulario
const userEdit = ref<UserData>({
  id: '',
  name: '',
  mail: '',
  roles: [],
  enabled: false,
});

const pass = ref<String>()

// Opciones del selector múltiple
const options = ref(["ROLE_ADMIN", "ROLE_OPERATOR"]);

const headers = ref([
  { title: 'Nombre', key: 'username', sortable: false, width: '20rem', align: 'start' as const },
  { title: 'Mail', key: 'email', sortable: false, width: '20rem' },
  { title: 'Roles', key: 'roles', sortable: false, width: '15rem' },
  { title: 'Estado', key: 'enabled', sortable: false, width: '5rem', align: 'center' as const },
  { title: '', key: 'actions', sortable: false, width: '10rem' },
]);

const usuarios = ref<UserData[]>([]);

const handleCancel = () => {
  userEdit.value.id = '';
  userEdit.value.name = '';
  userEdit.value.mail = '';
  userEdit.value.roles = [];
  userEdit.value.enabled = false;

  dialog.value = false;
};

const handleSave = async () => {
  if (userEdit.value.name === '' || userEdit.value.mail === '' || userEdit.value.roles.length === 0) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  try {
    const response = await editUser(userEdit.value);

    if (response === 200) {
      // Actualizar la lista de usuarios
      const users = await fetchUsers();
      usuarios.value = users.map((user: any) => ({
        ...user,
      }));
    }

    userEdit.value.id = '';
    userEdit.value.name = '';
    userEdit.value.mail = '';
    userEdit.value.roles = [];
    userEdit.value.enabled = false;

    dialog.value = false;
  } catch (error) {
    
  }
}

const editUserDetails = (user: any) => {
  userEdit.value.id = user.id || '';
  userEdit.value.name = user.username || '';
  userEdit.value.mail = user.email || '';
  userEdit.value.roles = user.roles || [];
  userEdit.value.enabled = user.enabled || false;

  dialog.value = true;
};

onMounted(async () => {
  try {
    const users = await fetchUsers();
    usuarios.value = users.map((user: any) => ({
      ...user,
    }));

  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
});

const formatRoles = (roles: string[]): string => {
  const roleMapping: Record<string, string> = {
    ROLE_ADMIN: 'Administrador',
    ROLE_OPERATOR: 'Operario',
  };

  return roles
    .map(role => roleMapping[role] || role)
    .join(', ');
};

const formatEnabled = (enabled: boolean): string => {
  return enabled ? 'Habilitado' : 'Deshabilitado';
};

const handleSaveAddUser = async () => {
  if (userEdit.value.name === '' || userEdit.value.mail === '' || userEdit.value.roles.length === 0 || pass.value === '') {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  try {
    const newUser = {
      id: userEdit.value.id,
      username: userEdit.value.name,
      email: userEdit.value.mail,
      password: pass.value,
      roles: userEdit.value.roles,
      enabled: userEdit.value.enabled,
    };

    const response = await addUser(newUser);

    if (response === 201) {
      // Actualizar la lista de usuarios
      const users = await fetchUsers();
      usuarios.value = users.map((user: any) => ({
        ...user,
      }));
    }

    userEdit.value.id = '';
    userEdit.value.name = '';
    userEdit.value.mail = '';
    userEdit.value.roles = [];
    userEdit.value.enabled = false;
    pass.value = '';

    dialogAddUser.value = false;
  } catch (error) {
    
  }
}

</script>

<template>
  <div class="w-100 pr-8">
    <div class="d-flex align-center justify-space-between">
      <h2 class="text-h5 ml-6 mt-3 mb-2">Usuarios de la empresa</h2>
      <!-- Botón Agregar Producto -->
      <v-dialog v-model="dialogAddUser" max-width="500" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" :color="theme.colors.primary" class="btn" >
            <Icon icon="mdi:account-plus-outline" height="24px" class="mr-2" />
            <p>Agregar Usuario</p>
          </v-btn>
        </template>

        <v-card class="dialog-card">
          <v-card-title>Agregar Usuario</v-card-title>
          <v-card-text>
            <v-row class="d-flex justify-center">
              <div class="custom-input">
                <v-text-field
                  v-model="userEdit.name"
                  label="Nombre"
                  placeholder="Ingrese nombre de usuario"
                  outlined
                  dense
                  required
                  append-inner-icon="mdi-account"
                ></v-text-field>
              </div>

              <!-- Campo para Correo Electrónico -->
              <div class="custom-input">
                <v-text-field
                  v-model="userEdit.mail"
                  label="Correo Electrónico"
                  placeholder="ejemplo@correo.com"
                  outlined
                  dense
                  required
                  append-inner-icon="mdi-email"
                  type="email"
                  :rules="[value => !!value || 'El correo es obligatorio', value => /.+@.+\..+/.test(value) || 'Formato inválido']"
                ></v-text-field>
              </div>

              <!-- Campo para Contraseña -->
              <div class="custom-input">
                <v-text-field
                  v-model="pass"
                  label="Contraseña"
                  placeholder="******"
                  outlined
                  dense
                  required
                  type="password"
                  append-inner-icon="mdi-lock"
                  :rules="[
                    value => !!value || 'La contraseña es obligatoria',
                    value => value.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
                    ]"
                ></v-text-field>
              </div>

              <!-- Select para seleccionar múltiples opciones -->
              <div class="custom-input">
                <v-select
                  label="Seleccionar opciones"
                  placeholder="Elija una o varias opciones"
                  outlined
                  dense
                  multiple
                  required
                  :items="options"
                  v-model="userEdit.roles"
                  append-inner-icon="mdi-checkbox-multiple-marked-outline"
                ></v-select>
              </div>

              <!-- Switch para Habilitar/Deshabilitar la cuenta -->
              <div class="custom-input">
                <v-switch
                  v-model="userEdit.enabled"
                  :label="userEdit.enabled ? 'Deshabilitar' : 'Habilitar'"
                  class="custom-switch"
                  :color="theme.colors.primary"
                ></v-switch>
              </div>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-row justify="end" class="action-buttons mr-5 mb-3">
              <v-btn @click="handleCancel" variant="tonal">Cancelar</v-btn>
              <v-btn @click="handleSaveAddUser" variant="outlined">Guardar</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- TODO: agregar para agregar usuario -->
    <v-row class="mb-2">
      <v-col cols="3" class=" ml-6 mt-3">
        <p>Administradores y operarios de la empresa</p>
      </v-col>
      <v-col>
        <v-data-table-virtual
          :headers="headers"
          :items="usuarios"
        >
          <!-- Personalizar la columna de roles -->
          <template v-slot:item.roles="{ item }">
            <!-- Transformar los roles en una cadena separada por comas -->
            {{ formatRoles(item.roles) }}
          </template>

          <!-- Personalizar la columna de habilitado -->
          <template v-slot:item.enabled="{ item }">
            {{ formatEnabled(item.enabled) }}
          </template>

          <!-- personalizar la última columna -->
          <template v-slot:item.actions="{ item }">
            <div>
              <!-- Botón Agregar Producto -->
              <v-dialog v-model="dialog" max-width="500" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn variant="outlined" :color="theme.colors.secondary" v-bind="activatorProps" @click="editUserDetails(item)">
                    <Icon icon="mdi:pencil" height="15px" class="mr-2" />
                    <span>Editar</span>
                  </v-btn>
                </template>

                <v-card class="dialog-card">
                  <v-card-title>Editar Usuario</v-card-title>
                  <v-card-text>
                    <v-row class="d-flex justify-center">
                      <div class="custom-input">
                        <v-text-field
                          v-model="userEdit.name"
                          label="Nombre"
                          placeholder="Ingrese nombre de usuario"
                          outlined
                          dense
                          required
                          append-inner-icon="mdi-account"
                        ></v-text-field>
                      </div>

                      <!-- Campo para Correo Electrónico -->
                      <div class="custom-input">
                        <v-text-field
                          v-model="userEdit.mail"
                          label="Correo Electrónico"
                          placeholder="ejemplo@correo.com"
                          outlined
                          dense
                          required
                          append-inner-icon="mdi-email"
                          type="email"
                         :rules="[value => !!value || 'El correo es obligatorio', value => /.+@.+\..+/.test(value) || 'Formato inválido']"
                        ></v-text-field>
                      </div>

                      <!-- Select para seleccionar múltiples opciones -->
                      <div class="custom-input">
                        <v-select
                          label="Seleccionar opciones"
                          placeholder="Elija una o varias opciones"
                          outlined
                          dense
                          multiple
                          required
                          :items="options"
                          v-model="userEdit.roles"
                          append-inner-icon="mdi-checkbox-multiple-marked-outline"
                        ></v-select>
                      </div>

                      <!-- Switch para Habilitar/Deshabilitar la cuenta -->
                      <div class="custom-input">
                        <v-switch
                          v-model="userEdit.enabled"
                          :label="userEdit.enabled ? 'Deshabilitar' : 'Habilitar'"
                          class="custom-switch"
                          :color="theme.colors.primary"
                        ></v-switch>
                      </div>
                    </v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-row justify="end" class="action-buttons mr-5 mb-3">
                      <v-btn @click="handleCancel" variant="tonal">Cancelar</v-btn>
                      <v-btn @click="handleSave" variant="outlined">Guardar</v-btn>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.w-100 {
  width: 100%;
}

.custom-input {
  width: 90%;
}
.custom-switch .v-input__control {
  height: 10px;
  font-size: 18px;
}
</style>