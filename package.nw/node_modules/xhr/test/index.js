var window = require("global/window")
var test = require("tape")
var forEach = require("for-each")

var xhr = require("../index.js")

test("constructs and calls callback without throwing", { timeout: 500 }, function(assert) {
    xhr({}, function(err, resp, body) {
        assert.ok(true, "got here")
        assert.end()
    })
})

test("[func] Can GET a url (cross-domain)", { timeout: 2000 }, function(assert) {
    xhr({
        uri: "http://www.mocky.io/v2/55a02cb72651260b1a94f024",
        useXDR: true
    }, function(err, resp, body) {
        assert.ifError(err, "no err")
        assert.equal(resp.statusCode, 200)
        assert.equal(typeof resp.rawRequest, "object")
        assert.notEqual(resp.body.length, 0)
        assert.equal(resp.body, '{"a":1}')
        assert.notEqual(body.length, 0)
        assert.end()
    })
})

test("[func] Returns http error responses like npm's request (cross-domain)", { timeout: 2000 }, function(assert) {
    if (!window.XDomainRequest) {
        xhr({
            uri: "http://www.mocky.io/v2/55a02d63265126221a94f025",
        }, function(err, resp, body) {
            assert.ifError(err, "no err")
            assert.equal(resp.statusCode, 404)
            assert.equal(typeof resp.rawRequest, "object")
            assert.end()
        })
    } else {
        assert.end();
    }
})

test("[func] Request to domain with not allowed cross-domain", { timeout: 2000 }, function(assert) {
    xhr({
        uri: "http://www.mocky.io/v2/57bb70c21000002f175850bd",
    }, function(err, resp, body) {
        assert.ok(err instanceof Error, "should return error")
        assert.equal(resp.statusCode, 0)
        assert.equal(typeof resp.rawRequest, "object")
        assert.end()
    })
})

test("[func] Returns a falsy body for 2xx responses", { timeout: 500 }, function(assert) {
  assert.plan(8)
    xhr({
        uri: "/mock/no-content/200"
    }, function(err, resp, body) {
        assert.notOk(body, "body should be falsy")
        assert.equal(resp.statusCode, 200)
    })
    xhr({
        uri: "/mock/no-content/201"
    }, function(err, resp, body) {
        assert.notOk(body, "body should be falsy")
        assert.equal(resp.statusCode, 201)
    })
    xhr({
        uri: "/mock/no-content/204"
    }, function(err, resp, body) {
        assert.notOk(body, "body should be falsy")
        assert.equal(resp.statusCode, 204)
    })
    xhr({
        uri: "/mock/no-content/205"
    }, function(err, resp, body) {
        assert.notOk(body, "body should be falsy")
        assert.equal(resp.statusCode, 205)
    })

})

test("[func] Calls the callback at most once even if error is thrown issue #127", { timeout: 500 }, function(assert) {
    //double call happened in chrome
    var count = 0;
    setTimeout(function() {
        assert.ok(count <= 1, "expected at most one call")
        assert.end()
    }, 100)
    try {
        xhr({
            uri: "instanterror://foo"
        }, function(err, resp, body) {
            count++;
            throw Error("dummy error")
        })
    } catch(e){}
})

test("[func] Times out to an error ", { timeout: 500 }, function(assert) {
    xhr({
        timeout: 1,
        uri: "/mock/timeout"
    }, function(err, resp, body) {
        assert.ok(err instanceof Error, "should return error")
        assert.equal(err.message, "XMLHttpRequest timeout")
        assert.equal(err.code, "ETIMEDOUT")
        assert.equal(resp.statusCode, 0)
        assert.end()
    })
})

test("withCredentials option", { timeout: 500 }, function(assert) {
    if (!window.XDomainRequest) {
        var req = xhr({}, function() {})
        assert.ok(!req.withCredentials,
            "withCredentials not true"
        )
        req = xhr({
            withCredentials: true
        }, function() {})
        assert.ok(
            req.withCredentials,
            "withCredentials set to true"
        )
    }
    assert.end()
})

test("withCredentials ignored when using synchronous requests", { timeout: 500 }, function(assert) {
    if (!window.XDomainRequest) {
        var req = xhr({
            withCredentials: true,
            sync: true
        }, function() {})
        assert.ok(!req.withCredentials,
            "sync overrides withCredentials"
        )
    }
    assert.end()
})

test("XDR usage (run on IE8 or 9)", { timeout: 500 }, function(assert) {
    var req = xhr({
        useXDR: true,
        uri: window.location.href,
    }, function() {})

    assert.ok(!window.XDomainRequest || window.XDomainRequest === req.constructor,
        "Uses XDR when told to"
    )


    if (!!window.XDomainRequest) {
        assert.throws(function() {
            xhr({
                useXDR: true,
                uri: window.location.href,
                headers: {
                    "foo": "bar"
                }
            }, function() {})
        }, true, "Throws when trying to send headers with XDR")
    }
    assert.end()
})

test("handles errorFunc call with no arguments provided", { timeout: 500 }, function(assert) {
    var req = xhr({}, function(err) {
        assert.ok(err instanceof Error, "callback should get an error")
        assert.equal(err.message, "Unknown XMLHttpRequest Error", "error message incorrect")
    })
    assert.doesNotThrow(function() {
        req.onerror()
    }, "should not throw when error handler called without arguments")
    assert.end()

})

test("constructs and calls callback without throwing", { timeout: 500 }, function(assert) {
    assert.throws(function() {
        xhr({})
    }, "callback is not optional")
    assert.end()
})

if (!window.XDomainRequest) {
    var methods = ["get", "put", "post", "patch"]
} else {
    var methods = ["get", "post"]
}

test("[func] xhr[method] get, put, post, patch", { timeout: 500 }, function(assert) {
    var i = 0

    forEach(methods, function(method) {
        xhr[method]({
            uri: "/mock/200ok"
        }, function(err, resp, body) {
            i++
            assert.ifError(err, "no err")
            assert.equal(resp.statusCode, 200)
            assert.equal(resp.method, method.toUpperCase())
            if (i === methods.length) assert.end()
        })
    })
})

test("xhr[method] get, put, post, patch with url shorthands", { timeout: 500 }, function(assert) {
    var i = 0
    forEach(methods, function(method) {
        var req = xhr[method]("/some-test", function() {})
        i++
        assert.equal(req.method, method.toUpperCase())

        if (i === methods.length) assert.end()
    })
})

test("[func] sends options.body as json body when options.json === true", { timeout: 500 }, function(assert) {
    xhr.post("/mock/echo", {
        json: true,
        body: {
            foo: "bar"
        }
    }, function(err, resp, body) {
        assert.equal(resp.rawRequest.headers["Content-Type"], "application/json")
        assert.deepEqual(body, {
            foo: "bar"
        })
        assert.end()
    })
})

test("[func] doesn't freak out when json option is false", { timeout: 500 }, function(assert) {
    xhr.post("/mock/echo", {
        json: false,
        body: "{\"a\":1}"
    }, function(err, resp, body) {
        assert.notEqual(resp.rawRequest.headers["Content-Type"], "application/json")
        assert.equal(body, "{\"a\":1}")
        assert.end()
    })
})

test("[func] sends options.json as body when it's not a boolean", { timeout: 500 }, function(assert) {
    xhr.post("/mock/echo", {
        json: {
            foo: "bar"
        }
    }, function(err, resp, body) {
        assert.equal(resp.rawRequest.headers["Content-Type"], "application/json")
        assert.deepEqual(body, {
            foo: "bar"
        })
        assert.end()
    })
})

test("xhr[method] get, put, post, patch with url shorthands and options", { timeout: 500 }, function(assert) {
    var i = 0
    forEach(methods, function(method) {
        var req = xhr[method]("/some-test", {
            headers: {
                foo: 'bar'
            }
        }, function(err, resp, body) {
            i++
            assert.equal(resp.rawRequest.headers.foo, 'bar')
            assert.equal(resp.method, method.toUpperCase())

            if (i === methods.length) assert.end()
        })
    })
})
if (!window.XDomainRequest) {
    test("[func] xhr.head", function(assert) {
        xhr.head({
            uri: "/mock/200ok",
        }, function(err, resp, body) {
            assert.ifError(err, "no err")
            assert.equal(resp.statusCode, 200)
            assert.equal(resp.method, "HEAD")
            assert.notOk(resp.body)
            assert.end()
        })
    })

    test("xhr.head url shorthand", { timeout: 500 }, function(assert) {
        xhr.head("/mock/200ok", function(err, resp, body) {
            assert.equal(resp.method, "HEAD")
            assert.end()
        })
    })

    test("[func] xhr.del", { timeout: 500 }, function(assert) {
        xhr.del({
            uri: "/mock/200ok"
        }, function(err, resp, body) {
            assert.ifError(err, "no err")
            assert.equal(resp.statusCode, 200)
            assert.equal(resp.method, "DELETE")
            assert.end()
        })
    })

    test("xhr.del url shorthand", { timeout: 500 }, function(assert) {
        xhr.del("/mock/200ok", function(err, resp, body) {
            assert.equal(resp.method, "DELETE")
            assert.end()
        })
    })
}
test("url signature without object", { timeout: 500 }, function(assert) {
    xhr("/some-test", function(err, resp, body) {
        assert.equal(resp.url, '/some-test')
        assert.end()
    })
})

test("url signature with object", { timeout: 500 }, function(assert) {
    xhr("/some-test", {
        headers: {
            "foo": "bar"
        }
    }, function(err, resp, body) {
        assert.equal(resp.url, '/some-test')
        assert.equal(resp.rawRequest.headers.foo, 'bar')
        assert.end()
    })
})

test("aborting XHR immediately prevents callback from being called", { timeout: 500 }, function(assert) {
    var req = xhr({ uri: "/mock/200ok" }, function(err, response) {
        assert.fail('this callback should not be called');
    });
    req.abort();
    setTimeout(function() {
        assert.end()
    }, 2)
})

test("aborting XHR asynchronously still prevents callback from being called", { timeout: 500 }, function(assert) {
    var req = xhr({ uri: "/mock/timeout" }, function(err, response) {
        assert.fail('this callback should not be called');
    });
    setTimeout(function() {
        req.abort();
    }, 0)
    setTimeout(function() {
        assert.end()
    }, 2)
})

test("XHR can be overridden", { timeout: 500 }, function(assert) {
    var xhrs = 0
    var noop = function() {}
    var fakeXHR = function() {
        xhrs++
        this.open = this.send = noop
    }
    var xdrs = 0
    var fakeXDR = function() {
        xdrs++
        this.open = this.send = noop
    }
    xhr.XMLHttpRequest = fakeXHR
    xhr({}, function() {})
    assert.equal(xhrs, 1, "created the custom XHR")

    xhr.XDomainRequest = fakeXDR
    xhr({
        useXDR: true
    }, function() {});
    assert.equal(xdrs, 1, "created the custom XDR")
    assert.end()
})
