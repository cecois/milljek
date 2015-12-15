#!/bin/sh


jekyls_raw=$(find /Users/ccmiller/git/milleriajek/_site -d -type f -iname "*.html" -not -iname "index*")
 # jekyls_raw=$(find /Users/ch23936/git/milljek/_site -d -type f -iname "*.html" -not -iname "index*")

for j in $jekyls_raw; do
	id=$(basename "${j}" .html)

# echo $j|tr "_site" " " | awk 'print {$0}'
lopathsfx=$(echo $j | awk -F'_site' '{print $2}')
lopathpfx="_site"
lopath=$lopathpfx$lopathsfx

# echo "abc:def" | awk -F':' '{print $1}'

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
curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&literal.lopath="$lopath"&commit=true" -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&fmap.body=body" -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&literal.body="$body -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&literal.body=${bodypeach}" -F "myfile=@"$j
	# curl "http://localhost:8983/solr/miljek/update/extract?literal.id="$id"&commit=true&literal.body=${bodypeach}" -F "myfile=@"$j
done


# mv /Users/ccmiller/git/milleriajek/_site /Users/ccmiller/git/milljek/_site
rsync -r /Users/ccmiller/git/milleriajek/_site/ /Users/ccmiller/git/milljek/_site
