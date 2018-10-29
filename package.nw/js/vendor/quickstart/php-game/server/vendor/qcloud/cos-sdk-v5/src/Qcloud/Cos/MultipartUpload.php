<?php

namespace Qcloud\Cos;

use Guzzle\Http\ReadLimitEntityBody;

class MultipartUpload {
    /**
     * const var: part size from 5MB to 5GB, and max parts of 10000 are allowed for each upload.
     */
    const MIN_PART_SIZE = 5242880;
    const MAX_PART_SIZE = 5368709120;
    const MAX_PARTS     = 10000;

    private $client;
    private $source;
    private $options;
    private $partSize;

    public function __construct($client, $source, $minPartSize, $options = array()) {
        $this->client = $client;
        $this->source = $source;
        $this->options = $options;
        $this->partSize = $this->calculatePartSize($minPartSize);
    }

    public function performUploading() {
        $uploadId = $this->initiateMultipartUpload();

        $partNumber = 1;
        $parts = array();
        for (;;) {
            if ($this->source->isConsumed()) {
                break;
            }

            $body = new ReadLimitEntityBody($this->source, $this->partSize, $this->source->ftell());
            if ($body->getContentLength() == 0) {
                break;
            }

            $result = $this->client->uploadPart(array(
                        'Bucket' => $this->options['Bucket'],
                        'Key' => $this->options['Key'],
                        'Body' => $body,
                        'UploadId' => $uploadId,
                        'PartNumber' => $partNumber));
            $part = array('PartNumber' => $partNumber, 'ETag' => $result['ETag']);
            array_push($parts, $part);
            ++$partNumber;
        }

        return $this->client->completeMultipartUpload(array(
                    'Bucket' => $this->options['Bucket'],
                    'Key' => $this->options['Key'],
                    'UploadId' => $uploadId,
                    'Parts' => $parts));
    }

    private function calculatePartSize($minPartSize) {
        $partSize = intval(ceil(($this->source->getContentLength() / self::MAX_PARTS)));
        $partSize = max($minPartSize, $partSize);
        $partSize = min($partSize, self::MAX_PART_SIZE);
        $partSize = max($partSize, self::MIN_PART_SIZE);

        return $partSize;
    }

    private function initiateMultipartUpload() {
        $result = $this->client->createMultipartUpload($this->options);
        return $result['UploadId'];
    }
}
