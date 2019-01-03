fails=0
n=0
for t in bench/*-bench.js; do
  echo -e "\n[" $t "]\n"
  node $t || let fails++
  let n++
done
echo -e "\n" $n "bench files executed\n"
exit $fails
