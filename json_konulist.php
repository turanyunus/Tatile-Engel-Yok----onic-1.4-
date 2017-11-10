<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: X-Requested-With');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Allow-Methods: POST,GET,OPTIONS, DELETE,PUT');

	header('Cache-Control:public, max-age=100');
	$host = "localhost";
	$user = "turanyun_yunus";
	$pass = "19071907";
	$vt = "turanyun_tatil";
	
	
	$db = mysqli_connect($host,$user,$pass,$vt);
	if ($db) {
		$utf = "SET NAMES 'utf8'";
		mysqli_query($db,$utf);
		$query = "SELECT * FROM konular ORDER BY konu_id DESC LIMIT 10";

		if (isset($_GET['id'])) {
			$query = $query.' WHERE konu_id = '.$_GET['id'];
			$result = mysqli_query($db,$query);
			$data = $result->fetch_assoc();
		} else {
			$result = mysqli_query($db,$query);
			$data = array();
			while($row = $result->fetch_assoc()){
				$data[]=$row;
			}	
		}
		
		echo json_encode($data);

	}else{
		die("Baglanırken hata oluştu");
	}
 ?>