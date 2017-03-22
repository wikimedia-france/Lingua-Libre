<?php
namespace AppBundle\Twig;

class AppExtension extends \Twig_Extension
{
	public function getFilters()
	{
		return array(
			new \Twig_SimpleFilter('toArr', array($this, 'toArrFilter')),
		);
	}

	public function toArr(&$arr, $keys = array()) {
		$result = array();
		foreach($arr as $key => $value) {
			if (!isset($keys[$key])) {
				if (is_object($value)) {
					$value = $value->export();
				}
				if (is_array($value)) {
					if (is_string($key)) $keys[$key] = true;
					$value = self::toArr($value, $keys);
				}
				$result[$key] = $value;
			}
		}
		return $result;
	}

	public function toArrFilter($arr, $keys) {
		return self::toArr($arr, array_flip($keys));
	}
}

