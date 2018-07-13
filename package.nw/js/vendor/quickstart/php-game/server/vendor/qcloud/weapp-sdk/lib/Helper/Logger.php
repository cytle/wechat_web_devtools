<?php
namespace QCloud_WeApp_SDK\Helper;

use \QCloud_WeApp_SDK\Conf as Conf;

/**
 * @codeCoverageIgnore
 */
class Logger {
    // Singleton instance
    protected static $instance = NULL;

    // Path to save log files
    protected $_log_path;

    // Level of logging
    protected $_threshold = 0;

    // Array of threshold levels to log
    protected $_threshold_array = array();

    // File permissions
    protected $_file_permissions = 0644;

    // Format of timestamp for log files
    protected $_date_fmt = 'Y-m-d H:i:s';

    // Filename prefix
    protected $_file_prefix = 'log-';

    // Filename extension
    protected $_file_ext = 'log';

    // Whether or not the logger can write to the log files
    protected $_enabled = TRUE;

    // Predefined logging levels
    protected $_levels = array('ERROR' => 1, 'DEBUG' => 2, 'INFO' => 3, 'ALL' => 4);

    protected function __construct() {
        // do nothing if output log is disabled
        if (!Conf::getEnableOutputLog()) {
            $this->_enabled = FALSE;
            return;
        }

        $this->_log_path = Conf::getLogPath();
        $this->_threshold = Conf::getLogThreshold();
        $this->_threshold_array = Conf::getLogThresholdArray();

        if (!file_exists($this->_log_path)) {
            mkdir($this->_log_path, 0755, TRUE);
        }

        if (!is_dir($this->_log_path) || !is_writable($this->_log_path)) {
            $this->_enabled = FALSE;
        }

        if (!empty($this->_threshold_array)) {
            $this->_threshold = 0;
            $this->_threshold_array = array_flip($this->_threshold_array);
        }
    }

    public static function __callStatic($name, $arguments) {
        if (in_array($name, array('error', 'debug', 'info'))) {
            return static::writeLog($name, $arguments);
        }

        throw new Exception("Call to undefined method {$class}::{$name}()", 1);
    }

    private static function getInstance() {
        if (static::$instance === NULL) {
            static::$instance = new static();
        }

        return static::$instance;
    }

    private static function writeLog($level, $messages) {
        $result = array();

        for ($i = 0, $size = count($messages); $i < $size; $i += 1) {
            $message = $messages[$i];

            if (is_array($message)) {
                $message = json_encode($message, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            if (is_string($message) || is_numeric($message)) {
                $result[] = $message;
            }
        }

        $instance = static::getInstance();
        $instance->write_log($level, implode(' ', $result) . "\n");
    }

    // Private clone method to prevent cloning of the instance of the *Singleton* instance.
    private function __clone() {}

    // Private unserialize method to prevent unserializing of the *Singleton* instance.
    private function __wakeup() {}

    /**
     * Write Log File
     * @param  string $level The error level
     * @param  string $msg   The error message
     * @return bool
     */
    private function write_log($level, $msg) {
        if ($this->_enabled === FALSE) {
            return FALSE;
        }

        $level = strtoupper($level);

        if (TRUE
            && (!isset($this->_levels[$level]) || $this->_levels[$level] > $this->_threshold)
            && !isset($this->_threshold_array[$this->_levels[$level]])
        ) {
            return FALSE;
        }

        $filepath = $this->_log_path . $this->_file_prefix . date('Y-m-d') . '.' . $this->_file_ext;
        $message = '';

        if (!file_exists($filepath)) {
            $newfile = TRUE;
        }

        if (!$fp = @fopen($filepath, 'ab')) {
            return FALSE;
        }

        flock($fp, LOCK_EX);

        // Instantiating DateTime with microseconds appended to initial date
        // is needed for proper support of this format
        if (strpos($this->_date_fmt, 'u') !== FALSE) {
            $microtime_full = microtime(TRUE);
            $microtime_short = sprintf('%06d', ($microtime_full - floor($microtime_full)) * 1000000);
            $date = new DateTime(date('Y-m-d H:i:s.' . $microtime_short, $microtime_full));
            $date = $date->format($this->_date_fmt);

        } else {
            $date = date($this->_date_fmt);
        }

        $message .= $this->_format_line($level, $date, $msg);

        for ($written = 0, $length = strlen($message); $written < $length; $written += $result) {
            if (($result = fwrite($fp, substr($message, $written))) === FALSE) {
                break;
            }
        }

        flock($fp, LOCK_UN);
        fclose($fp);

        if (isset($newfile) && $newfile === TRUE) {
            chmod($filepath, $this->_file_permissions);
        }

        return is_int($result);
    }

    /**
     * Format the log line.
     * @param  string $level   The error level
     * @param  string $date    Formatted date string
     * @param  string $message The log message
     * @return string          Formatted log line with a new line character '\n' at the end
     */
    protected function _format_line($level, $date, $message) {
        return "[{$date}][{$level}] {$message}\n";
    }
}
