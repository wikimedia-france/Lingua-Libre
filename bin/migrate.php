<?php

try {
	$db = new PDO('mysql:dbname=lingua_libre;host=127.0.0.1;charset=utf8', 'root', 'plopplop');

	$rows = $db->query("select * from sounds;", PDO::FETCH_ASSOC);
	foreach($rows as $row) {
		print_r($row);
	}
	
} catch (PDOException $e) {
	echo 'PDO Error: '.$e->getMessage();
}


