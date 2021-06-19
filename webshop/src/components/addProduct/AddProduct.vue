<template>
  <div>
    <h1>Artikel hinzufügen</h1>
    <form action="">
      <label for="name">Artikel Name:</label><br />
      <input type="text" id="name" name="name" /><br /><br />
      <label for="price">Artikel Preis:</label><br />
      <input type="text" id="price" name="price" /><br /><br />
      <label for="description">Artikel Beschreibung:</label><br />
      <input type="text" id="description" name="description" /><br /><br />
      <label for="image">Artikel Bild hochladen:</label><br />
      <input type="file" id="image" name="image" /><br /><br />
      <input type="submit" value="hinzufügen" />
    </form>
  </div>
</template>
