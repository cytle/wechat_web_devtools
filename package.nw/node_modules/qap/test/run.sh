fails=0
n=0
sdate=$(date +"%s")
for t in test/*-test.js; do
  echo -e "\n[ Qap" $t "]\n"
  node $t || let fails++
  let n++
done
edate=$(date +"%s")
etime=$[ $edate-$sdate ]
echo -e "\n" $n "test files executed ("$etime"s):"
echo -e " tests passed:" $[ $n - $fails ] 'files.'
echo -e " tests failed:" $fails 'files.\n'
exit $fails
