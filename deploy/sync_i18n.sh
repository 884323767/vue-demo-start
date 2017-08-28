#/bin/bash
DIR=$(dirname $0)

PROJECT_ID=59701d5c0637b10001f821a9

for lang in en zh-hans zh-hant
do
    file=${DIR}/../src/i18n/${lang}.js
    url="http://linguist.aqumon.com/api/projects/${PROJECT_ID}/${lang}/download?format=js"
    if wget "${url}" -q -O "$file"; then
        if ! [ -s "$file" ]; then
            printf "\n\e[01;31mERROR!\e[0m\n$file is empty\n\n"

        fi
        echo "Download $url => $file successfully"
    else
        printf "\n\e[01;31mERROR!\e[0m\nFailed to download $url\n\n"
        exit 1
    fi
done
