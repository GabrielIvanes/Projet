<?php

require_once('header.php');active_menu('profil');
echo '<div class="main-contenu">';

$isUpdate = false;

echo '
<div class="profil connexion-wrapper">
    <h1>Se connecter</h1>
    <form action="" method="POST" id="connexion">
        <div class="form-group">
            <label for="email">E-mail :</label>
            <input type="text" id="email" name="email" placeholder="john.doe@exemple.com">
        </div>
        <div class="form-group" id="password">
            <label for="password">Mot de Passe :</label>
            <input type="password" id="password-input" name="password">
            <i class="fa-solid fa-eye icon" onclick="formUserEyeClick();"></i>
        </div>
        <div class="form-group">
            <input type="submit" value="Se connecter">
        </div>
    </form>
    <div class="creer-compte" onclick="changementProfilContenu();">Créer un compte</div>
</div>
';


echo '
<div class="profil inscription-wrapper">
    <h1>S\'inscrire</h1>
    <form action="" method="POST" id="inscription">
        <div class="form-group">
            <label for="email">E-mail :</label>
            <input type="text" id="email" name="email" placeholder="john.doe@exemple.com" required>
        </div>
        <div class="form-group" id="password">
            <label for="password">Mot de Passe :</label>
            <input type="password" id="password-input" name="password" required>
            <i class="fa-solid fa-eye icon" onclick="formUserEyeClick();"></i>
        </div>
        <div class="form-group">
            <label for="sexe">Sexe :</label>
            <div class="radio">
                <label for="sexe-M">Masculin</label>
                <input type="radio" id="sexe-M" name="sexe" value="masculin" required>
            </div>
            <div class="radio">
                <label for="sexe-F">Féminin</label>
                <input type="radio" id="sexe-F" name="sexe" value="feminin" required>
            </div>
        </div>
        <div class="row"> 
            <div class="form-group poids-wrapper">
                <label for="poids">Poids (en kg) :</label>
                <input type="text" id="poids" name="poids" placeholder="kg" required>
            </div>
            <div class="form-group taille-wrapper">
                <label for="taille">Taille (en cm) :</label>
                <input type="text" id="taille" name="taille" placeholder="cm" required>
            </div>
            <div class="form-group age-wrapper">
                <label for="age">Âge :</label>
                <input type="text" id="age" name="age" required>
            </div>
        </div>
    
        <div class="form-group pratique-sportive-wrapper">
            <label for="pratique-sportive">Pratique sportive :</label>

            <div class="radio">
                <label for="sedentaire">Sédentaire</label>
                <input type="radio" id="sedentaire" name="pratique-sportive" value="sedentaire" required>
            </div>
            <div class="radio">
                <label for=actif">Actif</label>
                <input type="radio" id=actif" name="pratique-sportive" value="actif" required>
            </div>


            <div class="radio">
                <label for=tres-actif">Très actif</label>
                <input type="radio" id=tres-actif" name="pratique-sportive" value="tres-actif" required>
            </div>
            <div class="radio">
                <label for=extrement-actif">Extrêment actif</label>
                <input type="radio" id=extrement-actif" name="pratique-sportive" value="extrement-actif" required>
            </div>

        </div>
        <div class="form-group">
            <input type="submit" value="S\'inscrire">
        </div>
    </form>
</div>
';

echo '
<div class="profil parametre-wrapper">
    <h1>Paramètre de l\'utilisateur</h1>
    <div class="parametre">
        <div>
            <div class="label">E-mail :</div>
            <div class="email">John.doe@exemple.com</div>
        </div>
        <div>
            <div class="label">Sexe :</div>
            <div class="sexe">Masculin</div>
        </div>
        <div class="row"> 
            <div class="poids-wrapper">
                <div class="label">Poids (en kg) :</div>
                <div class="poids">90 kg</div>
            </div>
            <div class="taille-wrapper">
                <div class="label">Taille (en cm) :</div>
                <div class="taille">100 cm</div>
            </div>
            <div class="age-wrapper">
                <div class="label">Âge :</div>
                <div class="age">40 ans</div>
            </div>
        </div>
    
        <div class="pratique-sportive-wrapper">
            <div class="label">Pratique sportive :</div>
            <div class="pratique-sportive">Extrêmement actif</div>
        </div>
        <div class="modifier-wrapper">
            <button class="modifier">Modifier</button>
        </div>
    </form>
</div>
';

require_once('footer.php');
?>