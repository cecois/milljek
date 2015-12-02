#!/bin/sh


jekyls=$(find /Users/ccmiller/git/milleriajek/_site -d -type f -iname "*.html" -not -iname "index*")

for j in $jekyls; do
	id=$(basename "${j}" .html)

# echo "checking $j..."

# manualstr=""

# locsarr=$(cat $j | grep cartodb\:)

# for l in $locsarr; do
	
	# echo $l|awk -F '[:]' '{print $(NF-0)}'
	# echo $l| cut -d':' -f 2

# done

# echo $locsarr

# body=$(xml sel -Q -t --value-of //body $j)
# bodypeach=$(echo $body | php -r 'echo htmlentities($argn);')
# 
# echo $body;

	# echo "submitting"$id"..."
	# echo "bodypeach:"$bodypeach
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true" -F "myfile=@"$j
	curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&fmap.body=body" -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&literal.body="$body -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&literal.body=${bodypeach}" -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&literal.body=${bodypeach}" -F "myfile=@"$j
done