# BACKEND I Manger Mieux

## Root Endpoint

http://localhost/IDAW/Projet/backend/controllers

## Data

Tous les éléments envoyés et reçus sont au format JSON.

## Aliments

**Root endpoint aliments:** /aliments

### GET /getAllAliments.php

**Description:** Récupérer tous les aliments

**Réponse:**

```json
{
    "aliments":
    [
        {
            "id":,
            "categorie_id":,
            "nom":,
            "isLiquide": "1 si liquide 0 sinon"
        }
    ]

}
```

**Code:**

- 200: OK
- 400: Aucun aliment trouvé

### GET /getAllCat.php

**Description:** Récupérer toutes les catégories des aliments

**Réponse:**

```json
{
    "categories":
    [
        {
            "id":,
            "nom":
        }
    ]

}
```

**Code:**

- 200: OK
- 400: Aucune catégorie trouvé

### GET /getAllNutriments.php

**Description:** Récupérer tous les nutriments

**Réponse:**

```json
{
    "nutriments":
    [
        {
            "id":,
            "nom":
        }
    ]

}
```

**Code:**

- 200: OK
- 400: Aucun nutriment trouvé

### POST /getOneAliment.php

**Description:** Récupérer un aliment

**Paramètre:**

```json
{
    "id_aliment":
}
```

**Réponse:**

```json
{
    "id":,
    "categorie_id":,
    "nom":,
    "isLiquide": "1 si liquide 0 sinon"
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 404: Aucun aliment trouvé

### POST /getQuantiteNutrimentAliment.php

**Description:** Récupérer la quantité d'un nutriment d'un aliment

**Paramètre:**

```json
{
    "alimentId":,
    "nutrimentId":
}
```

**Réponse:**

```json
{
   "quantite":
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 404: Aucune relation trouvée

### POST /getNutrimentsAliment.php

**Description:** Récupérer les nutriments d'un aliment

**Paramètre:**

```json
{
    "alimentId":,
}
```

**Réponse:**

```json
{
    "contient":
    [
        {
            "nutrimentId":,
            "quantite":
        }
    ]

}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 404: Aucun nutriment trouvée

### POST /createAliment.php

**Description:** Créer un aliment

**Paramètre:**

```json
{
    "categorie_id":,
    "nom":,
    "isLiquide": boolean,
}
```

**Code:**

- 201: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de créer un aliment

### POST /createRelationAlimentNutriment.php

**Description:** Créer une relation entre un aliment et un nutriment

**Paramètre:**

```json
{
    "alimentId":,
    "nutrimentId":,
    "quantite":
}
```

**Code:**

- 201: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de créer une relation

### PUT /updateAliment.php

**Description:** Modifier un aliment

**Paramètre:**

```json
{
    "id":,
    "nom":,
    "categorie_id":,
    "isLiquide": boolean
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de modifier l'aliment

### PUT /updateRelationAlimentNutriment.php

**Description:** Modifier une relation entre un aliment et un nutriment

**Paramètre:**

```json
{
    "alimentId":,
    "nutrimentId":,
    "quantite":
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de modifier la relation

### DELETE /deleteAliment.php

**Description:** Supprimer un aliment

**Paramètre:**

```json
{
    "id_aliment":
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 503: Impossible de supprimer l'aliment

### DELETE /deleteNutrimentsAliment.php

**Description:** Supprimer les nutriments d'un aliment

**Paramètre:**

```json
{
    "alimentId":
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 503: Impossible de supprimer les relations

## Journal

**Root endpoint aliments:** /journal

### GET /getAutocompleteAliment.php?aliment=${mot}'

**Description:** Permet de récupérer une liste d'aliments en fonction d'un mot clé avec une limite de 20 éléments

**Réponse:**

```json
{
    "aliments":
    [
        {
            "id":,
            "nom":
        }
    ]
}
```

**Code:**

- 200: OK
- 400: Aucun aliment trouvé

### POST /getAllEntreeUtilisateur.php

**Description:** Récupérer le journal d'un utilisateur

**Paramètre:**

```json
{
    "utilisateurId":
}
```

**Réponse:**

```json
{
    "id":,
    "aliment":,
    "cat":,
    "quantite":,
    "date": "AAAA-MM-J hh:mm:ss",
    "isLiquide": "1 si liquide 0 sinon"

}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 404: Aucune entrée trouvé

### POST /getAllEntreeUtilisateurDate.php

**Description:** Récupérer le journal d'un utilisateur en fonction d'une date

**Paramètre:**

```json
{
    "utilisateurId":,
    "date": "AAAA-MM-J"
}
```

**Réponse:**

```json
{
    "id":,
    "alimentId":,
    "quantite":,
    "date": "AAAA-MM-J hh:mm:ss"
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 404: Aucune entrée trouvé

### POST /getOneEntree.php

**Description:** Récupérer une entrée

**Paramètre:**

```json
{
    "entreeId":,
}
```

**Réponse:**

```json
{
    "id":,
    "alimentId":,
    "alimentNom":,
    "quantite":,
    "date": "AAAA-MM-J hh:mm:ss"
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 404: Aucune entrée trouvé

### POST /createEntreeJournal.php

**Description:** Créer une entrée

**Paramètre:**

```json
{
    "utilisateurId":,
    "alimentId":,
    "quantite":,
    "date": "AAAA-MM-J hh:mm",
}
```

**Code:**

- 201: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de créer un aliment

### PUT /updateEntreeJournal.php

**Description:** Modifier une entrée

**Paramètre:**

```json
{
    "entreeId":,
    "alimentId":,
    "quantite":,
    "date": "AAAA-MM-J hh:mm"
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de modifier l'entrée

### DELETE /deleteAllEntreeAliment.php

**Description:** Supprimer toutes les entrées comportant un aliment donné en paramètre

**Paramètre:**

```json
{
    "alimentId":
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 503: Impossible de supprimer les entrées

### DELETE /deleteAllEntreeUtilisateur.php

**Description:** Supprimer le journal d'un utilisateur

**Paramètre:**

```json
{
    "utilisateurId":
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 503: Impossible de supprimer les entrées

### DELETE /deleteAllEntreeJournal.php

**Description:** Supprimer une entrée

**Paramètre:**

```json
{
    "entreeId":
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 503: Impossible de supprimer l'entrée

## Utilisateurs

**Root endpoint aliments:** /utilisateurs

### GET /getAllPratiqueSportive.php

**Description:** Récupérer toutes les pratiques sportives

**Réponses:**

```json
 {
    "pratique_sportive":
    [
        {
            "id":,
            "nom":
        }
    ]
 }
```

**Code:**

- 200: OK
- 400: Aucune pratique sportive trouvée

### POST /paramUtilisateur.php

**Description:** Récupérer les paramètres d'un utilisateur donné en paramètre

**Paramètre:**

```json
{
    "id":
}
```

**Réponse:**

```json
{
  "utilisateur":
  {
    "ID":,
    "PRA_ID":,
    "NOM_UTILISATEUR":,
    "EMAIL":,
    "PASSWORD":,
    "SEXE":,
    "AGE":,
    "POIDS":,
    "TAILLE"
  }
}
```

**Code:**

- 200: OK
- 400: Aucun utilisateur trouvé

### POST /connexionUtilisateur.php

**Description:** Se connecter à l'application

**Paramètre:**

```json
{
    "email":,
    "password":
}
```

**Réponse:**

```json
{
  "id":
}
```

**Code:**

- 200: OK
- 400: Mauvais email ou mot de passe

### POST /createUtilisateur.php

**Description:** Créer un utilisateur

**Paramètre:**

```json
{
    "email":,
    "nom_utilisateur",
    "password":,
    "sexe":"1 pour femme 0 pour homme",
    "poids":,
    "taille":,
    "age":,
    "pratique_sportive":
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de créer un utilisateur

### PUT /updatePassword.php

**Description:** Modifier le mot de passe

**Paramètre:**

```json
{
    "utilisateurId":,
    "new_password":,

}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de modifier l'utilisateur

### PUT /updateUtilisateur.php

**Description:** Modifier l'utilisateur

**Paramètre:**

```json
{
    "id":,
    "email":,
    "nom_utilisateur",
    "sexe":"1 pour femme 0 pour homme",
    "poids":,
    "taille":,
    "age":,
    "pratique_sportive":
}
```

**Code:**

- 200: OK
- 400: Les champs ne sont pas tous renseignés
- 503: Impossible de modifier l'utilisateur

### DELETE /deleteUtilisateur.php

**Description:** Supprimer l'utilisateur

**Paramètre:**

```json
{
    "id_utilisateur":
}
```

**Code:**

- 200: OK
- 400: Le champ n'est pas renseigné
- 503: Impossible de supprimer l'utilisateur
