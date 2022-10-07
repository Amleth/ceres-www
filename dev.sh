cd src/
if ![ -d "./data" ];
then
    git clone https://github.com/Amleth/ceres-www-content.git ./data
fi
cd ./data
curl "https://opentheso.huma-num.fr/opentheso/api/all/theso?id=th358&format=jsonld" -o thesaurus.json 
cd ../..

npm start