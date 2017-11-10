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
	//$db = mysqli_connect($host,$user,$pass,$vt,$port);
	$responseData = new stdClass();
	if ($db) {
		$utf = "SET NAMES 'utf8'";
		mysqli_query($db,$utf);
		if(isset($_GET['kadi']) && isset($_GET['sifre'])){
			$kadi = $_GET['kadi'];
			$sifre = $_GET['sifre'];
			$query = "SELECT * FROM kullanici WHERE kullanici_kadi = '$kadi' and kullanici_sifre = '$sifre'";
			$result = mysqli_query($db,$query);
			if($row = $result->fetch_assoc()){
				$responseData->data = $row;
				echo json_encode($responseData);
			}else{
				$responseData->errorMessage = 'Hatali kullanici adi/sifre.';
				echo json_encode($responseData);
			}
		}else{
			$responseData->errorMessage = 'Girilecek Alanlar boş bırakılamaz';
			echo json_encode($responseData);
		}
	}else{
		$responseData->errorMessage = 'Veritabanına baglanamadı';
		echo json_encode($responseData);
	}
 ?>