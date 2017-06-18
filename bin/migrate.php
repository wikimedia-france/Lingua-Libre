<?php

try {
	$db = new PDO('mysql:dbname=lingua_libre;host=127.0.0.1;charset=utf8', 'root', 'plopplop');

	$rows = $db->query("select sounds.id as sound, idiolects.id as idiolect from sounds left join idiolects on sounds.speaker_id = idiolects.speaker_id AND sounds.lang_id = language_id;", PDO::FETCH_ASSOC);
	foreach($rows as $row) {
//		print_r($row);
		echo $row["sound"]." => ";
		if (!$row["idiolect"]) {
			echo "NOT FOUND!";
		}
		else {
			$query = $db->prepare("UPDATE sounds SET idiolect_id=:idiolect WHERE id=:sound;");
			$query->bindParam(":sound", $row["sound"]);
			$query->bindParam(":idiolect", $row["idiolect"]);

			echo $row["idiolect"]."… ";
			echo $query->execute() ? "OK" : "Failed";
		}
		echo "\n";
	}
	
} catch (PDOException $e) {
	echo 'PDO Error: '.$e->getMessage();
}


