<?php 

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: X-Requested-With');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Allow-Methods: POST,GET,OPTIONS, DELETE,PUT');

	header('Cache-Control:public, max-age=100');

	$host = "localhost";
	$port = "3307";
	$user = "turanyun_yunus";
	$pass = "19071907";
	$vt = "turanyun_tatil";
	
	$db = mysqli_connect($host,$user,$pass,$vt);

	if ($db) {
		$utf = "SET NAMES 'utf8'";
		mysqli_query($db,$utf);
		if(!(empty($_POST['kadi']) || empty($_POST['sifre']) || empty($_POST['sifreT']) || empty($_POST['email']))){			
			$kadi = $_POST['kadi'];
			$sifre = $_POST['sifre'];
			$sifreT = $_POST['sifreT'];
			$email = $_POST['email'];
			
			if ($sifre != $sifreT) {
				echo "Sifreler birbiri ile bagdaşmıyor";
				return;
			}
			
			if (strlen($sifre) < 8){
				echo "Şifreniz en az 8 karakter olmalıdır.";
				return;
			}
			
			$query = "SELECT * FROM kullanici WHERE kullanici_kadi = '$kadi'";
			$result = mysqli_query($db,$query);
			if($row = $result->fetch_assoc()){
				echo "Farklı bir kullanıcı adı belirleyiniz.";
				return;
			}else{
				$query = "INSERT INTO kullanici(kullanici_kadi,kullanici_email,kullanici_sifre,kullanici_sifreT) VALUES('$kadi','$email','$sifre','$sifreT')";
				if (!mysqli_query($db,$query)){
				  die('Errorrr: '.mysqli_error());
				}
				echo "";
				return;
			}
		}else{
			$hata = "Girilecek Alanlar boş bırakılamaz";
			echo $hata;
		}
	}else{
		die("Veritabanına baglanamadı");
	}
 ?>