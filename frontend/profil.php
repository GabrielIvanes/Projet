<?php
require_once('header.php');

echo '
<div class="profil">
    <h1>Se connecter</h1>
    <form action="" method="POST" id="login">
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
            <input type="submit" value="Se Connecter">
        </div>
    </form>
</div>
';


require_once('footer.php');
?>