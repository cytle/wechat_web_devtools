<?php

namespace Qcloud\Cos\Tests;

use Qcloud\Cos\Client;
use Qcloud\Cos\Exception\CosException;

class BucketTest extends \PHPUnit_Framework_TestCase
{
    private $cosClient;

    protected function setUp()
    {
        TestHelper::nuke('testbucket');

        $this->cosClient = new Client(array('region' => getenv('COS_REGION'),
            'credentials' => array(
                'appId' => getenv('COS_APPID'),
                'secretId' => getenv('COS_KEY'),
                'secretKey' => getenv('COS_SECRET'))));
    }

    protected function tearDown()
    {
        TestHelper::nuke('testbucket');
        sleep(2);
    }

    public function testCreateBucket()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            var_dump($result);
            sleep(2);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }


    public function testDeleteBucket()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            var_dump($result);
            sleep(2);
            $result = $this->cosClient->deleteBucket(array('Bucket' => 'testbucket'));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }

    public function testDeleteNonexistedBucket()
    {
        try {
            $result = $this->cosClient->deleteBucket(array('Bucket' => 'testbucket'));
            var_dump($result);
            sleep(2);
        } catch (CosException $e) {
            $this->assertTrue($e->getExceptionCode() === 'NoSuchBucket');
            $this->assertTrue($e->getStatusCode() === 404);
        }
    }

    public function testDeleteNonemptyBucket()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putObject(array(
                'Bucket' => 'testbucket', 'Key' => 'hello.txt', 'Body' => 'Hello World!'));
            $result = $this->cosClient->deleteBucket(array('Bucket' => 'testbucket'));
        } catch (CosException $e) {
            echo "$e\n";
            echo $e->getExceptionCode();
            $this->assertTrue($e->getExceptionCode() === 'BucketNotEmpty');
            $this->assertTrue($e->getStatusCode() === 409);
        }
    }

    public function testPutBucketACL()
    {
        try {
            $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(5);
            $this->cosClient->PutBucketAcl(array(
                'Bucket' => 'testbucket',
                'Grants' => array(
                    array(
                        'Grantee' => array(
                            'DisplayName' => 'qcs::cam::uin/327874225:uin/327874225',
                            'ID' => 'qcs::cam::uin/327874225:uin/327874225',
                            'Type' => 'CanonicalUser',
                        ),
                        'Permission' => 'FULL_CONTROL',
                    ),
                    // ... repeated
                ),
                'Owner' => array(
                    'DisplayName' => 'qcs::cam::uin/3210232098:uin/3210232098',
                    'ID' => 'qcs::cam::uin/3210232098:uin/3210232098',
                ),));
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }

    }

    public function testGetBucketACL()
    {
        try {
            $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(5);
            $this->cosClient->PutBucketAcl(array(
                'Bucket' => 'testbucket',
                'Grants' => array(
                    array(
                        'Grantee' => array(
                            'DisplayName' => 'qcs::cam::uin/327874225:uin/327874225',
                            'ID' => 'qcs::cam::uin/327874225:uin/327874225',
                            'Type' => 'CanonicalUser',
                        ),
                        'Permission' => 'FULL_CONTROL',
                    ),
                    // ... repeated
                ),
                'Owner' => array(
                    'DisplayName' => 'qcs::cam::uin/3210232098:uin/3210232098',
                    'ID' => 'qcs::cam::uin/3210232098:uin/3210232098',
                ),));

        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }

    public function testPutBucketLifecycle()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putBucketLifecycle(array(
                // Bucket is required
                'Bucket' => 'testbucket',
                // Rules is required
                'Rules' => array(
                    array(
                        'Expiration' => array(
                            'Days' => 1,
                        ),
                        'ID' => 'id1',
                        'Filter' => array(
                            'Prefix' => 'documents/'
                        ),
                        // Status is required
                        'Status' => 'Enabled',
                        'Transition' => array(
                            'Days' => 100,
                            'StorageClass' => 'NEARLINE',
                        ),
                        // ... repeated
                    ),
                )));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }

    public function testGetBucketLifecycle()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putBucketLifecycle(array(
                // Bucket is required
                'Bucket' => 'testbucket',
                // Rules is required
                'Rules' => array(
                    array(
                        'Expiration' => array(
                            'Days' => 1,
                        ),
                        'ID' => 'id1',
                        'Filter' => array(
                            'Prefix' => 'documents/'
                        ),
                        // Status is required
                        'Status' => 'Enabled',
                        'Transition' => array(
                            'Days' => 100,
                            'StorageClass' => 'NEARLINE',
                        ),
                        // ... repeated
                    ),
                )));
            sleep(5);
            $result = $this->cosClient->getBucketLifecycle(array(
                // Bucket is required
                'Bucket' => 'testbucket',
            ));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }

    public function testDeleteBucketLifecycle()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putBucketLifecycle(array(
                // Bucket is required
                'Bucket' => 'testbucket',
                // Rules is required
                'Rules' => array(
                    array(
                        'Expiration' => array(
                            'Days' => 1,
                        ),
                        'ID' => 'id1',
                        'Filter' => array(
                            'Prefix' => 'documents/'
                        ),
                        // Status is required
                        'Status' => 'Enabled',
                        'Transition' => array(
                            'Days' => 100,
                            'StorageClass' => 'NEARLINE',
                        ),
                        // ... repeated
                    ),
                )));
            sleep(5);
            $result = $this->cosClient->deleteBucketLifecycle(array(
                // Bucket is required
                'Bucket' => 'testbucket',
            ));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }

    public function testPutBucketCors()
    {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putBucketCors(array(
                // Bucket is required
                'Bucket' => 'testbucket',
                // CORSRules is required
                'CORSRules' => array(
                    array(
                        'AllowedHeaders' => array('*',),
                        // AllowedMethods is required
                        'AllowedMethods' => array('Put',),
                        // AllowedOrigins is required
                        'AllowedOrigins' => array('*',),
                        'ExposeHeaders' => array('*',),
                        'MaxAgeSeconds' => 1,
                    ),
                    // ... repeated
                ),
            ));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }
    }
    public function testGetBucketCors() {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putBucketCors(array(
                // Bucket is required
                'Bucket' => 'testbucket',
                // CORSRules is required
                'CORSRules' => array(
                    array(
                        'AllowedHeaders' => array('*',),
                        // AllowedMethods is required
                        'AllowedMethods' => array('Put', ),
                        // AllowedOrigins is required
                        'AllowedOrigins' => array('*', ),
                        'ExposeHeaders' => array('*', ),
                        'MaxAgeSeconds' => 1,
                    ),
                    // ... repeated
                ),
            ));
            $result = $this->cosClient->getBucketCors(array(
                'Bucket' => 'testbucket',
            ));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }}
    public function testDeleteBucketCors() {
        try {
            $result = $this->cosClient->createBucket(array('Bucket' => 'testbucket'));
            sleep(2);
            $result = $this->cosClient->putBucketCors(array(
                // Bucket is required
                'Bucket' => 'testbucket',
                // CORSRules is required
                'CORSRules' => array(
                    array(
                        'AllowedHeaders' => array('*',),
                        // AllowedMethods is required
                        'AllowedMethods' => array('Put', ),
                        // AllowedOrigins is required
                        'AllowedOrigins' => array('*', ),
                        'ExposeHeaders' => array('*', ),
                        'MaxAgeSeconds' => 1,
                    ),
                    // ... repeated
                ),
            ));
            $result = $this->cosClient->deleteBucketCors(array(
                'Bucket' => 'testbucket',
            ));
            var_dump($result);
        } catch (\Exception $e) {
            $this->assertFalse(true, $e);
        }}
}