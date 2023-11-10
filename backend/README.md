# BACKEND I Manger Mieux

## Root Endpoint

http://localhost/IDAW/Projet/backend/controllers

## Data

Tous les éléments envoyés et reçus sont au format JSON.

## Aliments

**Root endpoint aliments:** /aliments

### GET /getAllAliments.php

**Description:** Récupérer tous les aliments

**Code:**

- 200: OK
- 400: Aucun aliment trouvé

### GET /getAllCat.php

**Description:** Récupérer toutes les catégories des aliments

**Code:**

- 200: OK
- 400: Aucune catégorie trouvé

### GET /getAllNutriments.php

**Description:** Récupérer tous les nutriments

**Code:**

- 200: OK
- 400: Aucun nutriment trouvé

### POST /getOneAliment.php

**Description:** Récupérer tous les nutriments

**Paramètre:**

```json
{
    "id_aliment":
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

### POST /getAllEntreeUtilisateur.php

**Description:** Récupérer le journal d'un utilisateur

**Paramètre:**

```json
{
    "id_aliment":
}
```

**Code:**

- 200: OK
- 400: Aucun aliment trouvé
