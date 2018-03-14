<?php

namespace Qcloud\Cos;

// http://guzzle3.readthedocs.io/webservice-client/guzzle-service-descriptions.html
class Service {
    public static function getService() {
        return array(
                'name' => 'Cos Service',
                'apiVersion' => 'V5',
                'description' => 'Cos V5 API Service',

                'operations' => array(
                    'AbortMultipartUpload' => array(
                        'httpMethod' => 'DELETE',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'AbortMultipartUploadOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')),
                            'UploadId' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'uploadId')),
                        'errorResponses' => array(
                                array(
                                    'reason' => 'The specified multipart upload does not exist.',
                                    'class' => 'NoSuchUploadException'))),
                    'CreateBucket' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'CreateBucketOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'CreateBucketConfiguration')),
                        'parameters' => array(
                            'ACL' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-acl'),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri')),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again.',
                                'class' => 'BucketAlreadyExistsException'))),
                    'CompleteMultipartUpload' => array(
                        'httpMethod' => 'POST',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'CompleteMultipartUploadOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'CompleteMultipartUpload')),
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')),
                            'Parts' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'data' => array(
                                    'xmlFlattened' => true),
                                'items' => array(
                                    'name' => 'CompletedPart',
                                    'type' => 'object',
                                    'sentAs' => 'Part',
                                    'properties' => array(
                                        'ETag' => array(
                                            'type' => 'string'),
                                        'PartNumber' => array(
                                            'type' => 'numeric')))),
                            'UploadId' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'uploadId'),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml'))),
                    'CreateMultipartUpload' => array(
                        'httpMethod' => 'POST',
                        'uri' => '/{Bucket}{/Key*}?uploads',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'CreateMultipartUploadOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'CreateMultipartUploadRequest')),
                        'parameters' => array(
                            'ACL' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-acl'),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'CacheControl' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Cache-Control'),
                            'ContentDisposition' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Disposition'),
                            'ContentEncoding' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Encoding'),
                            'ContentLanguage' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Language'),
                            'ContentType' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Type'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')),
                            'Metadata' => array(
                                'type' => 'object',
                                'location' => 'header',
                                'sentAs' => 'x-cos-meta-',
                                'additionalProperties' => array(
                                    'type' => 'string')),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml'))),
                    'CopyObject' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'CopyObjectOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'CopyObjectRequest',
                            ),
                        ),
                        'parameters' => array(
                            'ACL' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-acl',
                            ),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'CacheControl' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Cache-Control',
                            ),
                            'ContentDisposition' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Disposition',
                            ),
                            'ContentEncoding' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Encoding',
                            ),
                            'ContentLanguage' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Language',
                            ),
                            'ContentType' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Type',
                            ),
                            'CopySource' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source',
                            ),
                            'CopySourceIfMatch' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-if-match',
                            ),
                            'CopySourceIfModifiedSince' => array(
                                'type' => array(
                                    'object',
                                    'string',
                                    'integer',
                                ),
                                'format' => 'date-time-http',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-if-modified-since',
                            ),
                            'CopySourceIfNoneMatch' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-if-none-match',
                            ),
                            'CopySourceIfUnmodifiedSince' => array(
                                'type' => array(
                                    'object',
                                    'string',
                                    'integer',
                                ),
                                'format' => 'date-time-http',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-if-unmodified-since',
                            ),
                            'Expires' => array(
                                'type' => array(
                                    'object',
                                    'string',
                                    'integer',
                                ),
                                'format' => 'date-time-http',
                                'location' => 'header',
                            ),
                            'GrantFullControl' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-full-control',
                            ),
                            'GrantRead' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-read',
                            ),
                            'GrantReadACP' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-read-acp',
                            ),
                            'GrantWriteACP' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-write-acp',
                            ),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                            ),
                            'Metadata' => array(
                                'type' => 'object',
                                'location' => 'header',
                                'sentAs' => 'x-cos-meta-',
                                'additionalProperties' => array(
                                    'type' => 'string',
                                ),
                            ),
                            'MetadataDirective' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-metadata-directive',
                            ),
                            'ServerSideEncryption' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-server-side-encryption',
                            ),
                            'StorageClass' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-storage-class',
                            ),
                            'WebsiteRedirectLocation' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-website-redirect-location',
                            ),
                            'SSECustomerAlgorithm' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-server-side-encryption-customer-algorithm',
                            ),
                            'SSECustomerKey' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-server-side-encryption-customer-key',
                            ),
                            'CopySourceSSECustomerAlgorithm' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-server-side-encryption-customer-algorithm',
                            ),
                            'CopySourceSSECustomerKey' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-server-side-encryption-customer-key',
                            ),
                            'CopySourceSSECustomerKeyMD5' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-server-side-encryption-customer-key-MD5',
                            ),
                            'RequestPayer' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-payer',
                            ),
                            'ACP' => array(
                                'type' => 'object',
                                'additionalProperties' => true,
                            ),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml',
                            ),
                        ),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The source object of the COPY operation is not in the active tier and is only stored in Amazon Glacier.',
                                'class' => 'ObjectNotInActiveTierErrorException',
                            ),
                        ),
                    ),
                    'DeleteBucket' => array(
                        'httpMethod' => 'DELETE',
                        'uri' => '/{Bucket}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'DeleteBucketOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'))),
                    'DeleteBucketCors' => array(
                        'httpMethod' => 'DELETE',
                        'uri' => '/{Bucket}?cors',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'DeleteBucketCorsOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                        ),
                    ),
                    'DeleteObject' => array(
                        'httpMethod' => 'DELETE',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'DeleteObjectOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')))),
                    'DeleteBucketLifecycle' => array(
                        'httpMethod' => 'DELETE',
                        'uri' => '/{Bucket}?lifecycle',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'DeleteBucketLifecycleOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                        ),
                    ),
                    'PutBucketAcl' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}?acl',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'PutBucketAclOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'AccessControlPolicy',
                            ),
                        ),
                        'parameters' => array(
                            'ACL' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-acl',
                            ),
                            'Grants' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'AccessControlList',
                                'items' => array(
                                    'name' => 'Grant',
                                    'type' => 'object',
                                    'properties' => array(
                                        'Grantee' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'DisplayName' => array(
                                                    'type' => 'string',
                                                ),
                                                'EmailAddress' => array(
                                                    'type' => 'string',
                                                ),
                                                'ID' => array(
                                                    'type' => 'string',
                                                ),
                                                'Type' => array(
                                                    'required' => true,
                                                    'type' => 'string',
                                                    'sentAs' => 'xsi:type',
                                                    'data' => array(
                                                        'xmlAttribute' => true,
                                                        'xmlNamespace' => 'http://www.w3.org/2001/XMLSchema-instance',
                                                    ),
                                                ),
                                                'URI' => array(
                                                    'type' => 'string',
                                                ),
                                            ),
                                        ),
                                        'Permission' => array(
                                            'type' => 'string',
                                        ),
                                    ),
                                ),
                            ),
                            'Owner' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'DisplayName' => array(
                                        'type' => 'string',
                                    ),
                                    'ID' => array(
                                        'type' => 'string',
                                    ),
                                ),
                            ),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'GrantFullControl' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-full-control',
                            ),
                            'GrantRead' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-read',
                            ),
                            'GrantReadACP' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-read-acp',
                            ),
                            'GrantWrite' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-write',
                            ),
                            'GrantWriteACP' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-write-acp',
                            ),
                            'ACP' => array(
                                'type' => 'object',
                                'additionalProperties' => true,
                            ),
                        ),
                    ),
                    'GetObject' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'GetObjectOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'IfMatch' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'If-Match'),
                            'IfModifiedSince' => array(
                                'type' => array(
                                    'object',
                                    'string',
                                    'integer'),
                                'format' => 'date-time-http',
                                'location' => 'header',
                                'sentAs' => 'If-Modified-Since'),
                            'IfNoneMatch' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'If-None-Match'),
                            'IfUnmodifiedSince' => array(
                                'type' => array(
                                    'object',
                                    'string',
                                    'integer'),
                                'format' => 'date-time-http',
                                'location' => 'header',
                                'sentAs' => 'If-Unmodified-Since'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')),
                            'Range' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'ResponseCacheControl' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'response-cache-control'),
                            'ResponseContentDisposition' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'response-content-disposition'),
                            'ResponseContentEncoding' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'response-content-encoding'),
                            'ResponseContentLanguage' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'response-content-language'),
                            'ResponseContentType' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'response-content-type'),
                            'ResponseExpires' => array(
                                'type' => array(
                                    'object',
                                    'string',
                                    'integer'),
                                'format' => 'date-time-http',
                                'location' => 'query',
                                'sentAs' => 'response-expires'),
                            'SaveAs' => array(
                                'location' => 'response_body')),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The specified key does not exist.',
                                'class' => 'NoSuchKeyException'))),
                    'GetObjectAcl' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}{/Key*}?acl',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'GetObjectAclOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                            ),
                            'VersionId' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'versionId',
                            ),
                            'RequestPayer' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-payer',
                            ),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml',
                            ),
                        ),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The specified key does not exist.',
                                'class' => 'NoSuchKeyException',
                            ),
                        ),
                    ),
                    'GetBucketAcl' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}?acl',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'GetBucketAclOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml'))),
                    'GetBucketCors' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}?cors',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'GetBucketCorsOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml',
                            ),
                        ),
                    ),
                    'GetBucketLifecycle' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}?lifecycle',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'GetBucketLifecycleOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml',
                            ),
                        ),
                    ),
                    'UploadPart' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'UploadPartOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'UploadPartRequest')),
                        'parameters' => array(
                            'Body' => array(
                                'type' => array(
                                    'string',
                                    'object'),
                                'location' => 'body'),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'ContentLength' => array(
                                'type' => 'numeric',
                                'location' => 'header',
                                'sentAs' => 'Content-Length'),
                            'ContentMD5' => array(
                                'type' => array(
                                    'string',
                                    'boolean'),
                                'location' => 'header',
                                'sentAs' => 'Content-MD5'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')),
                            'PartNumber' => array(
                                'required' => true,
                                'type' => 'numeric',
                                'location' => 'query',
                                'sentAs' => 'partNumber'),
                            'UploadId' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'uploadId'))),
                    'PutObject' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'PutObjectOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'PutObjectRequest')),
                        'parameters' => array(
                            'ACL' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-acl'),
                            'Body' => array(
                                'type' => array(
                                    'string',
                                    'object'),
                                'location' => 'body'),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'ContentDisposition' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Disposition'),
                            'ContentEncoding' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Encoding'),
                            'ContentLanguage' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Language'),
                            'ContentLength' => array(
                                    'type' => 'numeric',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Length'),
                            'ContentMD5' => array(
                                    'type' => array(
                                        'string',
                                        'boolean'),
                                    'location' => 'header',
                                    'sentAs' => 'Content-MD5'),
                            'ContentType' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Type'),
                            'Key' => array(
                                    'required' => true,
                                    'type' => 'string',
                                    'location' => 'uri',
                                    'minLength' => 1,
                                    'filters' => array(
                                        'Qcloud\\Cos\\Client::explodeKey')),
                            'Metadata' => array(
                                    'type' => 'object',
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-meta-',
                                    'additionalProperties' => array(
                                        'type' => 'string')))),
                    'PutObjectAcl' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}{/Key*}?acl',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'PutObjectAclOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'AccessControlPolicy',
                            ),
                        ),
                        'parameters' => array(
                            'ACL' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-acl',
                            ),
                            'Grants' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'AccessControlList',
                                'items' => array(
                                    'name' => 'Grant',
                                    'type' => 'object',
                                    'properties' => array(
                                        'Grantee' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'DisplayName' => array(
                                                    'type' => 'string'),
                                                'ID' => array(
                                                    'type' => 'string'),
                                                'Type' => array(
                                                    'type' => 'string',
                                                    'sentAs' => 'xsi:type',
                                                    'data' => array(
                                                        'xmlAttribute' => true,
                                                        'xmlNamespace' => 'http://www.w3.org/2001/XMLSchema-instance')),
                                                'URI' => array(
                                                    'type' => 'string') )),
                                        'Permission' => array(
                                            'type' => 'string',
                                        ),
                                    ),
                                ),
                            ),
                            'Owner' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'DisplayName' => array(
                                        'type' => 'string',
                                    ),
                                    'ID' => array(
                                        'type' => 'string',
                                    ),
                                ),
                            ),
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'GrantFullControl' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-full-control',
                            ),
                            'GrantRead' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-read',
                            ),
                            'GrantReadACP' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-read-acp',
                            ),
                            'GrantWrite' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-write',
                            ),
                            'GrantWriteACP' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-grant-write-acp',
                            ),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                            ),
                            'RequestPayer' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-payer',
                            ),
                            'ACP' => array(
                                'type' => 'object',
                                'additionalProperties' => true,
                            ),
                        ),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The specified key does not exist.',
                                'class' => 'NoSuchKeyException',
                            ),
                        ),
                    ),
                    'PutBucketCors' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}?cors',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'PutBucketCorsOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'CORSConfiguration',
                            ),
                            'contentMd5' => true,
                        ),
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'CORSRules' => array(
                                'required' => true,
                                'type' => 'array',
                                'location' => 'xml',
                                'data' => array(
                                    'xmlFlattened' => true,
                                ),
                                'items' => array(
                                    'name' => 'CORSRule',
                                    'type' => 'object',
                                    'sentAs' => 'CORSRule',
                                    'properties' => array(
                                        'AllowedHeaders' => array(
                                            'type' => 'array',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'AllowedHeader',
                                                'type' => 'string',
                                                'sentAs' => 'AllowedHeader',
                                            ),
                                        ),
                                        'AllowedMethods' => array(
                                            'required' => true,
                                            'type' => 'array',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'AllowedMethod',
                                                'type' => 'string',
                                                'sentAs' => 'AllowedMethod',
                                            ),
                                        ),
                                        'AllowedOrigins' => array(
                                            'required' => true,
                                            'type' => 'array',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'AllowedOrigin',
                                                'type' => 'string',
                                                'sentAs' => 'AllowedOrigin',
                                            ),
                                        ),
                                        'ExposeHeaders' => array(
                                            'type' => 'array',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'ExposeHeader',
                                                'type' => 'string',
                                                'sentAs' => 'ExposeHeader',
                                            ),
                                        ),
                                        'MaxAgeSeconds' => array(
                                            'type' => 'numeric',
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'PutBucketLifecycle' => array(
                        'httpMethod' => 'PUT',
                        'uri' => '/{Bucket}?lifecycle',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'PutBucketLifecycleOutput',
                        'responseType' => 'model',
                        'data' => array(
                            'xmlRoot' => array(
                                'name' => 'LifecycleConfiguration',
                            ),
                            'contentMd5' => true,
                        ),
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                            ),
                            'Rules' => array(
                                'required' => true,
                                'type' => 'array',
                                'location' => 'xml',
                                'data' => array(
                                    'xmlFlattened' => true,
                                ),
                                'items' => array(
                                    'name' => 'Rule',
                                    'type' => 'object',
                                    'sentAs' => 'Rule',
                                    'properties' => array(
                                        'Expiration' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'Date' => array(
                                                    'type' => array(
                                                        'object',
                                                        'string',
                                                        'integer',
                                                    ),
                                                    'format' => 'date-time',
                                                ),
                                                'Days' => array(
                                                    'type' => 'numeric',
                                                ),
                                            ),
                                        ),
                                        'ID' => array(
                                            'type' => 'string',
                                        ),
                                        'Filter' => array(
                                            'type' => 'object',
                                            'require' => true,
                                            'properties' => array(
                                                'Prefix' => array(
                                                    'type' => 'string',
                                                    'require' => true,
                                                ),
                                            ),
                                        ),
                                        'Status' => array(
                                            'required' => true,
                                            'type' => 'string',
                                        ),
                                        'Transition' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'Date' => array(
                                                    'type' => array(
                                                        'object',
                                                        'string',
                                                        'integer',
                                                    ),
                                                    'format' => 'date-time',
                                                ),
                                                'Days' => array(
                                                    'type' => 'numeric',
                                                ),
                                                'StorageClass' => array(
                                                    'type' => 'string',
                                                ),
                                            ),
                                        ),
                                        'NoncurrentVersionTransition' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'NoncurrentDays' => array(
                                                    'type' => 'numeric',
                                                ),
                                                'StorageClass' => array(
                                                    'type' => 'string',
                                                ),
                                            ),
                                        ),
                                        'NoncurrentVersionExpiration' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'NoncurrentDays' => array(
                                                    'type' => 'numeric',
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'ListParts' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'ListPartsOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey')),
                            'MaxParts' => array(
                                'type' => 'numeric',
                                'location' => 'query',
                                'sentAs' => 'max-parts'),
                            'PartNumberMarker' => array(
                                'type' => 'numeric',
                                'location' => 'query',
                                'sentAs' => 'part-number-marker'),
                            'UploadId' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'uploadId'),
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml'))),
                    'ListObjects' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/{Bucket}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'ListObjectsOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'Delimiter' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'delimiter'),
                            'EncodingType' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'encoding-type'),
                            'Marker' => array(
                                'type' => 'string',
                                'location' => 'query',
                                'sentAs' => 'marker'),
                            'MaxKeys' => array(
                                    'type' => 'numeric',
                                    'location' => 'query',
                                    'sentAs' => 'max-keys'),
                            'Prefix' => array(
                                    'type' => 'string',
                                    'location' => 'query',
                                    'sentAs' => 'prefix'),
                            'command.expects' => array(
                                    'static' => true,
                                    'default' => 'application/xml')),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The specified bucket does not exist.',
                                'class' => 'NoSuchBucketException'))),
                    'ListBuckets' => array(
                        'httpMethod' => 'GET',
                        'uri' => '/',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseClass' => 'ListBucketsOutput',
                        'responseType' => 'model',
                        'parameters' => array(
                            'command.expects' => array(
                                'static' => true,
                                'default' => 'application/xml',
                            ),
                        ),
                    ),
                    'HeadObject' => array(
                        'httpMethod' => 'HEAD',
                        'uri' => '/{Bucket}{/Key*}',
                        'class' => 'Qcloud\\Cos\\Command',
                        'responseType' => 'model',
                        'responseClass' => 'HeadObjectOutput',
                        'parameters' => array(
                            'Bucket' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri'),
                            'Key' => array(
                                'required' => true,
                                'type' => 'string',
                                'location' => 'uri',
                                'minLength' => 1,
                                'filters' => array(
                                    'Qcloud\\Cos\\Client::explodeKey'))),
                        'errorResponses' => array(
                            array(
                                'reason' => 'The specified key does not exist.',
                                'class' => 'NoSuchKeyException')))),
                'models' => array(
                    'AbortMultipartUploadOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'CreateBucketOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Location' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'CompleteMultipartUploadOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Location' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'Bucket' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'Key' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'ETag' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'CreateMultipartUploadOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Bucket' => array(
                                'type' => 'string',
                                'location' => 'xml',
                                'sentAs' => 'Bucket'),
                            'Key' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'UploadId' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'CopyObjectOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'ETag' => array(
                                'type' => 'string',
                                'location' => 'xml',
                            ),
                            'LastModified' => array(
                                'type' => 'string',
                                'location' => 'xml',
                            ),
                            'Expiration' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-expiration',
                            ),
                            'CopySourceVersionId' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-copy-source-version-id',
                            ),
                            'VersionId' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-version-id',
                            ),
                            'ServerSideEncryption' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-server-side-encryption',
                            ),
                            'SSECustomerAlgorithm' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-server-side-encryption-customer-algorithm',
                            ),
                            'RequestCharged' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-charged',
                            ),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'DeleteBucketOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'DeleteBucketCorsOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'DeleteObjectOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'DeleteBucketLifecycleOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'GetObjectOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Body' => array(
                                'type' => 'string',
                                'instanceOf' => 'Guzzle\\Http\\EntityBody',
                                'location' => 'body'),
                            'AcceptRanges' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'accept-ranges'),
                            'LastModified' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Last-Modified'),
                            'ContentLength' => array(
                                'type' => 'numeric',
                                'location' => 'header',
                                'sentAs' => 'Content-Length'),
                            'ETag' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'CacheControl' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Cache-Control'),
                            'ContentDisposition' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Disposition'),
                            'ContentEncoding' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Encoding'),
                            'ContentLanguage' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Language'),
                            'ContentRange' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Range'),
                            'ContentType' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Type'),
                            'Expires' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'Metadata' => array(
                                'type' => 'object',
                                'location' => 'header',
                                'sentAs' => 'x-cos-meta-',
                                'additionalProperties' => array(
                                    'type' => 'string')),
                            'StorageClass' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-storage-class'),
                            'RequestId' => array(
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-request-id'))),
                    'GetObjectAclOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Owner' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'DisplayName' => array(
                                        'type' => 'string',
                                    ),
                                    'ID' => array(
                                        'type' => 'string',
                                    ),
                                ),
                            ),
                            'Grants' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'AccessControlList',
                                'items' => array(
                                    'name' => 'Grant',
                                    'type' => 'object',
                                    'sentAs' => 'Grant',
                                    'properties' => array(
                                        'Grantee' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'DisplayName' => array(
                                                    'type' => 'string'),
                                                /*
                                                'EmailAddress' => array(
                                                    'type' => 'string'),
                                                */
                                                'ID' => array(
                                                    'type' => 'string'),
                                                /*
                                                'Type' => array(
                                                    'type' => 'string',
                                                    'sentAs' => 'xsi:type',
                                                    'data' => array(
                                                        'xmlAttribute' => true,
                                                        'xmlNamespace' => 'http://www.w3.org/2001/XMLSchema-instance')),
                                                */
                                                /*'URI' => array(
                                                    'type' => 'string') */)),
                                        'Permission' => array(
                                            'type' => 'string',
                                        ),
                                    ),
                                ),
                            ),
                            'RequestCharged' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-charged',
                            ),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'GetBucketAclOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Owner' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'DisplayName' => array(
                                        'type' => 'string'),
                                    'ID' => array(
                                        'type' => 'string'))),
                            'Grants' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'AccessControlList',
                                'items' => array(
                                    'name' => 'Grant',
                                    'type' => 'object',
                                    'sentAs' => 'Grant',
                                    'properties' => array(
                                        'Grantee' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'DisplayName' => array(
                                                    'type' => 'string'),
                                                /*
                                                'EmailAddress' => array(
                                                    'type' => 'string'),
                                                */
                                                'ID' => array(
                                                    'type' => 'string'),
                                                /*
                                                'Type' => array(
                                                    'type' => 'string',
                                                    'sentAs' => 'xsi:type',
                                                    'data' => array(
                                                        'xmlAttribute' => true,
                                                        'xmlNamespace' => 'http://www.w3.org/2001/XMLSchema-instance')),
                                                */
                                                /*'URI' => array(
                                                    'type' => 'string') */)),
                                        'Permission' => array(
                                            'type' => 'string')))),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'GetBucketCorsOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'CORSRules' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'CORSRule',
                                'data' => array(
                                    'xmlFlattened' => true,
                                ),
                                'items' => array(
                                    'name' => 'CORSRule',
                                    'type' => 'object',
                                    'sentAs' => 'CORSRule',
                                    'properties' => array(
                                        'AllowedHeaders' => array(
                                            'type' => 'array',
                                            'sentAs' => 'AllowedHeader',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'AllowedHeader',
                                                'type' => 'string',
                                                'sentAs' => 'AllowedHeader',
                                            ),
                                        ),
                                        'AllowedMethods' => array(
                                            'type' => 'array',
                                            'sentAs' => 'AllowedMethod',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'AllowedMethod',
                                                'type' => 'string',
                                                'sentAs' => 'AllowedMethod',
                                            ),
                                        ),
                                        'AllowedOrigins' => array(
                                            'type' => 'array',
                                            'sentAs' => 'AllowedOrigin',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'AllowedOrigin',
                                                'type' => 'string',
                                                'sentAs' => 'AllowedOrigin',
                                            ),
                                        ),
                                        'ExposeHeaders' => array(
                                            'type' => 'array',
                                            'sentAs' => 'ExposeHeader',
                                            'data' => array(
                                                'xmlFlattened' => true,
                                            ),
                                            'items' => array(
                                                'name' => 'ExposeHeader',
                                                'type' => 'string',
                                                'sentAs' => 'ExposeHeader',
                                            ),
                                        ),
                                        'MaxAgeSeconds' => array(
                                            'type' => 'numeric',
                                        ),
                                    ),
                                ),
                            ),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'GetBucketLifecycleOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Rules' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'Rule',
                                'data' => array(
                                    'xmlFlattened' => true,
                                ),
                                'items' => array(
                                    'name' => 'Rule',
                                    'type' => 'object',
                                    'sentAs' => 'Rule',
                                    'properties' => array(
                                        'Expiration' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'Date' => array(
                                                    'type' => 'string',
                                                ),
                                                'Days' => array(
                                                    'type' => 'numeric',
                                                ),
                                            ),
                                        ),
                                        'ID' => array(
                                            'type' => 'string',
                                        ),
                                        'Prefix' => array(
                                            'type' => 'string',
                                        ),
                                        'Status' => array(
                                            'type' => 'string',
                                        ),
                                        'Transition' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'Date' => array(
                                                    'type' => 'string',
                                                ),
                                                'Days' => array(
                                                    'type' => 'numeric',
                                                ),
                                                'StorageClass' => array(
                                                    'type' => 'string',
                                                ),
                                            ),
                                        ),
                                        'NoncurrentVersionTransition' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'NoncurrentDays' => array(
                                                    'type' => 'numeric',
                                                ),
                                                'StorageClass' => array(
                                                    'type' => 'string',
                                                ),
                                            ),
                                        ),
                                        'NoncurrentVersionExpiration' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'NoncurrentDays' => array(
                                                    'type' => 'numeric',
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'UploadPartOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'ETag' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'PutBucketAclOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'PutObjectOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'ETag' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'RequestId' => array(
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-request-id'),
                            'ObjectURL' => array(
                                    ))),
                    'PutObjectAclOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestCharged' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-charged',
                            ),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'PutBucketCorsOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'PutBucketLifecycleOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'ListPartsOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Bucket' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'Key' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'UploadId' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'PartNumberMarker' => array(
                                'type' => 'numeric',
                                'location' => 'xml'),
                            'NextPartNumberMarker' => array(
                                'type' => 'numeric',
                                'location' => 'xml'),
                            'MaxParts' => array(
                                'type' => 'numeric',
                                'location' => 'xml'),
                            'IsTruncated' => array(
                                'type' => 'boolean',
                                'location' => 'xml'),
                            'Parts' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'sentAs' => 'Part',
                                'data' => array(
                                    'xmlFlattened' => true),
                                'items' => array(
                                    'name' => 'Part',
                                    'type' => 'object',
                                    'sentAs' => 'Part',
                                    'properties' => array(
                                        'PartNumber' => array(
                                            'type' => 'numeric'),
                                        'LastModified' => array(
                                            'type' => 'string'),
                                        'ETag' => array(
                                            'type' => 'string'),
                                        'Size' => array(
                                            'type' => 'numeric')))),
                            'Initiator' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'ID' => array(
                                        'type' => 'string'),
                                    'DisplayName' => array(
                                        'type' => 'string'))),
                            'Owner' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'DisplayName' => array(
                                        'type' => 'string'),
                                    'ID' => array(
                                        'type' => 'string'))),
                            'StorageClass' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id'))),
                    'ListObjectsOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'IsTruncated' => array(
                                'type' => 'boolean',
                                'location' => 'xml'),
                            'Marker' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'NextMarker' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'Contents' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'data' => array(
                                    'xmlFlattened' => true),
                                'items' => array(
                                    'name' => 'Object',
                                    'type' => 'object',
                                    'properties' => array(
                                        'Key' => array(
                                            'type' => 'string'),
                                        'LastModified' => array(
                                            'type' => 'string'),
                                        'ETag' => array(
                                            'type' => 'string'),
                                        'Size' => array(
                                            'type' => 'numeric'),
                                        'StorageClass' => array(
                                            'type' => 'string'),
                                        'Owner' => array(
                                            'type' => 'object',
                                            'properties' => array(
                                                'DisplayName' => array(
                                                    'type' => 'string'),
                                                'ID' => array(
                                                    'type' => 'string')))))),
                            'Name' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'Prefix' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'Delimiter' => array(
                                'type' => 'string',
                                'location' => 'xml'),
                            'MaxKeys' => array(
                                'type' => 'numeric',
                                'location' => 'xml'),
                            'CommonPrefixes' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'data' => array(
                                    'xmlFlattened' => true),
                                'items' => array(
                                    'name' => 'CommonPrefix',
                                    'type' => 'object',
                                    'properties' => array(
                                        'Prefix' => array(
                                            'type' => 'string')))),
                            'EncodingType' => array(
                                    'type' => 'string',
                                    'location' => 'xml'),
                            'RequestId' => array(
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-request-id'))),
                    'ListBucketsOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'Buckets' => array(
                                'type' => 'array',
                                'location' => 'xml',
                                'items' => array(
                                    'name' => 'Bucket',
                                    'type' => 'object',
                                    'sentAs' => 'Bucket',
                                    'properties' => array(
                                        'Name' => array(
                                            'type' => 'string',
                                        ),
                                        'CreationDate' => array(
                                            'type' => 'string',
                                        ),
                                    ),
                                ),
                            ),
                            'Owner' => array(
                                'type' => 'object',
                                'location' => 'xml',
                                'properties' => array(
                                    'DisplayName' => array(
                                        'type' => 'string',
                                    ),
                                    'ID' => array(
                                        'type' => 'string',
                                    ),
                                ),
                            ),
                            'RequestId' => array(
                                'location' => 'header',
                                'sentAs' => 'x-cos-request-id',
                            ),
                        ),
                    ),
                    'HeadObjectOutput' => array(
                        'type' => 'object',
                        'additionalProperties' => true,
                        'properties' => array(
                            'LastModified' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Last-Modified'),
                            'ContentLength' => array(
                                'type' => 'numeric',
                                'location' => 'header',
                                'sentAs' => 'Content-Length'),
                            'ETag' => array(
                                'type' => 'string',
                                'location' => 'header'),
                            'ContentDisposition' => array(
                                'type' => 'string',
                                'location' => 'header',
                                'sentAs' => 'Content-Disposition'),
                            'ContentEncoding' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Encoding'),
                            'ContentLanguage' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Language'),
                            'ContentType' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'Content-Type'),
                            'Metadata' => array(
                                    'type' => 'object',
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-meta-',
                                    'additionalProperties' => array(
                                        'type' => 'string')),
                            'StorageClass' => array(
                                    'type' => 'string',
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-storage-class'),
                            'RequestId' => array(
                                    'location' => 'header',
                                    'sentAs' => 'x-cos-request-id')))));
    }
}
