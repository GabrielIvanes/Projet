# BACKEND I Manger Mieux

## Root Endpoint

[a link](http://localhost/IDAW/Projet/backend/controllers)

## Data

Tous les éléments envoyés et reçus sont au format JSON.

## Aliments

**Root endpoint aliments:** [a link](/aliments)

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
- 400: Les champs ne sont pas renseignés
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
