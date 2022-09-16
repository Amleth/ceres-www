cd src/data
git pull https://github.com/Amleth/ceres-www-content.git
curl "https://opentheso.huma-num.fr/opentheso/api/all/theso?id=th265&format=jsonld" -o thesaurus.json 
cd ../..

npm start