cd ./src
if not exist data\ (git clone https://github.com/Amleth/ceres-www-content.git ./data)
cd ./data
git pull
curl "https://opentheso.huma-num.fr/opentheso/api/all/theso?id=th265&format=jsonld" -o thesaurus.json 
cd ../..

npm start