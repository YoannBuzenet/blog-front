### TODO

- Belle page Mon compte pour modifier son pseudo (ou autre)
- Affichage d'un tweet dans le wysiwyg
- Affichage d'une video YT dans le WYSIWYG
- On peut commenter si on logué !
- Login page affiche un slider des images et pas une image figée (et apparait en fondu)
- refacto les contextes dans \_app
- Checker qu'il y ait bien une width min parametrable sur le crop de RIM
- Mettre la fonction de ratio de crop definissable par appel dans RIM
- back office : pouvoir indiquer quel article est lié au current
- Créer une fonction de gestion des erreurs et message d'erreur (à la isValid de courtage) qui renvoie le bon string à afficher en fonction du type d'erreur (pour appliquer où ?)

### Un peu plus tard

- Levels d'accès
- Tags
- Menu
- loader sur le fetch de posts (isLoading déjà fonctionnel, juste à mettre le loader)
- Remplir le footer
- Commentaires !
- Dockeriser le tout dans un docker-compose

### Plus tard

- Passer progressivement l'app en typescript
- Passer l'app en hexagonal

### A noter pour docker

-

## Dev local avec react-image-manager

- Dans `package.json`
  "react-image-manager": "file:../react-image-manager",
