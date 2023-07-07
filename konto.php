<!DOCTYPE html>
<html lang="pl">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Logowanie</title>
  <link rel="stylesheet" href="stylePHP.css">
</head>

<body>
  <img src="grafika/logoCrown.png">
  <div class="wrap">
    <div class="reg">
      <h1>Zarejestruj się</h1>
      <form action="konto.php" method="post">
        <input type="text" placeholder="Login" name="loginReg" class="bar" /><br />
        <input type="password" placeholder="Hasło" name="passReg" class="bar" /><br />
        <input type="submit" name="regBtn" value="Załóż konto" />
      </form>
      <?php
              if(isset($_POST['regBtn'])){
                $loginReg = $_POST["loginReg"];
                $passReg = $_POST["passReg"];
                $connect = mysqli_connect("localhost", "root", "", "logowanie");
    
                $result = mysqli_query($connect, "SELECT login FROM konta;");
                $accountExists = 0;
                while($wynik = mysqli_fetch_row($result)){
                  if($wynik[0] == $loginReg){
                    $accountExists = 1;
                  }
                }
    
                if(!isset($loginReg) || empty($passReg)){
                  echo "<p style='color: rgb(207, 152, 11);'>Wypełnij dane</p>";
                }else if(!$accountExists){
                  mysqli_query($connect, "INSERT INTO konta (login, haslo) values ('$loginReg', '$passReg');");
                  echo "<p style='color: green;'>Konto pomyslnie założone</p>";
                }else{
                  echo "<p style='color: rgb(207, 152, 11);'>Konto o podanym adresie istnieje!</p>";
                }
    
                mysqli_close($connect);
              }
            ?>
    </div>
    <div class="log">
      <h1>Zaloguj się</h1>
      <form action="konto.php" method="post">
        <input type="text" placeholder="Login" name="loginLog" class="bar" /><br />
        <input type="password" placeholder="Hasło" name="passLog" class="bar" /><br />
        <input type="submit" name="logBtn" value="Zaloguj się do konta" />
      </form>
      <?php
              if(isset($_POST['logBtn'])){
                $loginLog = $_POST["loginLog"];
                $passLog = $_POST["passLog"];
                $connect = mysqli_connect("localhost", "root", "", "logowanie");
                $result = mysqli_query($connect, "SELECT login, haslo FROM konta;");
                $flag = 0;
                while($wynik = mysqli_fetch_row($result)){
                  if($wynik[0] == $loginLog && $wynik[1] == $passLog){
                    $flag = 1;
                  }
                }
                if(!isset($loginLog) || empty($passLog)){
                  echo "<p style='color: rgb(207, 152, 11);'>Wypełnij dane</p>";
                }else if($flag){
                  header("Location: ./mainPage.html");
                }else{
                  echo "<p style='color: rgb(207, 152, 11);'>Niepoprawne dane!</p>";
                }
                mysqli_close($connect);
              }
            ?>
    </div>
  </div>
</body>

</html>