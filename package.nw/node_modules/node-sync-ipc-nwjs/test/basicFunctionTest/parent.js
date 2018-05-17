/**
 * @file parent.js
 *
 * Created by mmhunter on 17/10/2017.
 */
const path = require("path");
const assert = require("assert");
const syncIpc = require("../../index").parent();

describe("Basic Function Test",()=>{

    it("should get the right sum",(done)=>{
        var child = syncIpc.fork(path.join(__dirname,"./child-cal-sum.js"));

        var nextNumber = getNextNumber();

        var sum = 0;

        child.onSync("next",function(res){
            res(nextNumber);
            sum += nextNumber;
            nextNumber = getNextNumber();
        });

        child.onSync("result",function(res,result){
            res();
            assert.equal(sum,result);
            done();
        });
    });

    it("should get the right sum [using add child]",(done)=>{

        var child = require("child_process").fork(path.join(__dirname,"./child-cal-sum.js"));
        syncIpc.addChild(child);
        var nextNumber = getNextNumber();

        var sum = 0;

        child.onSync("next",function(res){
            res(nextNumber);
            sum += nextNumber;
            nextNumber = getNextNumber();
        });

        child.onSync("result",function(res,result){
            res();
            assert.equal(sum,result);
            done();
        });
    });

    it("long arr should be same",(done)=>{

        var child = syncIpc.fork(path.join(__dirname,"./child-long-str.js"));

        var r;

        child.onSync("foo",function(res,bar){

            r = bar;
            setTimeout(function(){
                res(bar);
            },500);
        });

        child.onSync("result",function(res,bar){
            res();
            assert.equal(r.length,bar.length);
            for(let i = 0; i < 5; i++){
                let index = Math.floor(Math.random() * r.length);
                assert.equal(r[index], bar[index]);
            }
            done();
        });
    })

    it("multiple child share data",(done)=>{
        var nextNumber = getNextNumber();
        var sum = 0;
        var finishedCount = 0;
        var childSum = 0;
        for(let i = 0; i < 5; i++){
            var child = syncIpc.fork(path.join(__dirname,"./child-cal-sum-multiple.js"));

            child.onSync("next",function(res){
                res(nextNumber);
                sum += nextNumber;
                nextNumber = getNextNumber();
            });

            child.onSync("result",function(res,result){
                res();
                childSum += result;
                finishedCount ++;
                if(finishedCount === 5){
                    assert.equal(sum,childSum);
                    done();
                }
            });
        }

    })

});

function getNextNumber(){
    return Math.floor(Math.random()*1000);
}