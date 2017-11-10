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

	if($db){
		$utf = "SET NAMES 'utf8'";
		mysqli_query($db,$utf);
		if (!(empty($_POST['konuBaslik']) || empty($_POST['konuAciklama']))) {

			$baslik = $_POST['konuBaslik'];
			$aciklama = $_POST['konuAciklama']; 


			$query = "SELECT * FROM konular WHERE konu_baslik = '$baslik'";
			$result = mysqli_query($db,$query);
			if($row = $result->fetch_assoc()){
					echo "Farklı bir başlık adı belirleyiniz.";
					return;
			}else{
					$query = "INSERT INTO konular(konu_baslik,konu_aciklama) VALUES('$baslik','$aciklama')";
					if (!mysqli_query($db,$query)){
					  die('Errorrr: '.mysqli_error());
					}
					echo "";
					return;
				 }
		}else{
			$hata = "Girilecek Alanlar bos birakilamaz";
			echo $hata;
		}

	}else{
		die("Veritabanına baglanamadı");
	}
?>