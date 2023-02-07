### next steps short term

- responsive navbar

### features manquantes

- sibling management for articles in the back office (use react select + get post by title after X characters)

#### bugs

- MyAccount doit filtrer si on n'est pas connecté
- Dans un article, la redirection ne marche pas si on change de langue depuis la navbar, ça ne charge rien
- Dans un article, le toast dure bien trop longtemps
- Dans un article, le toast n'est pas traduit
- s'inscrire avec mon mail crée un nouvel user et modifie les 2 au lieu d'en avoir un nickel

### backlog

- Belle page Mon compte pour modifier son pseudo (ou autre)
- Affichage d'un tweet dans le wysiwyg
- Affichage d'une video YT dans le WYSIWYG
- On peut commenter si on logué !
- Login page affiche un slider des images et pas une image figée (et apparait en fondu)
- Checker qu'il y ait bien une width min parametrable sur le crop de RIM
- Mettre la fonction de ratio de crop definissable par appel dans RIM
- back office : pouvoir indiquer quel article est lié au current (gestion sibling)
- Créer une fonction de gestion des erreurs et message d'erreur (à la isValid de courtage) qui renvoie le bon string à afficher en fonction du type d'erreur (pour appliquer où ?)
- Remplir le footer

### next steps later

- Refacto en hexagonal
- Plus de classes

### pas important

- Check si on a un système de Logger et si c'est pas le cas, en implémenter un
