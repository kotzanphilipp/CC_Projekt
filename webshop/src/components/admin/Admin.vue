<template>
  <div>
    <h1>Willkommen Admin</h1>
    <table>
      <tr>
        <td>
          <router-link to="/addProduct" class="deco-none">
            <button>Artikel hinzufügen</button>
          </router-link>
        </td>
        <td>
          <router-link to="/showAllProducts" class="deco-none">
            <button>Alle Artikeln anzeigen</button>
          </router-link>
        </td>
        <td>
          <router-link to="/showAllUsers" class="deco-none">
            <button>Alle Users anzeigen</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>
