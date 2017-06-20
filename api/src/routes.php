<?php
// Routes

class ApiController {
    protected $container;
    protected $db = [];

    protected $db_filename = __DIR__ . '/../../db/database.txt';
    protected $grabdataURL = 'https://driveelectric.org.nz/';

	public function __construct(\Slim\Container  $container) {
        $this->container = $container;
	}

	public function GetAll($request, $response, $args) {
		self::_read_db();
		return $response->withJson($this->db);
	}

	public function GetActual($request, $response, $args) {
		self::_read_db();
		return $response->withJson(end($this->db));
	}

	public function GrabData($request, $response, $args) {
		self::_read_db();
		
		$data = file_get_contents($this->grabdataURL);
		preg_match('/id="numcount_evs_in_nz" (.*) data-number-value="(\d+)"/', $data, $matches);
		$actual_amount = $matches[2];

		$last_row = end($this->db);

		$date = new DateTime(date('01.m.Y'));
		$date->sub(new DateInterval('P1M'));

		if ((int)$last_row['real_amount'] != (int)$actual_amount) {
			$new_row = [
				'date_added' => time(),
				'date_cover' => $date->format('d.m.Y'),
				'real_amount' => $actual_amount
			];
			file_put_contents($this->db_filename, json_encode($new_row) . "\n", FILE_APPEND);
		}

		return $response;
	}

	protected function _read_db() {
		$db = file($this->db_filename);
		$this->db = $this->_to_json($db);
	}

	protected function _to_json($data) {
		$result = [];
		foreach ($data as $key => $row) {
			$result[] = json_decode($row, 1);
		}
		return $result;
	}
}

$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/get-all/', \ApiController::class . ':GetAll');
$app->get('/get-actual/', \ApiController::class . ':GetActual');
$app->get('/grab-data/', \ApiController::class . ':GrabData');
