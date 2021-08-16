# gnomebot

## quick install

se placer sous /gnomebot
executer: 
    docker-compose up
    ou
    ./start.sh

## Usage

###  je signal un gnome

(1) liste gnome | (2) form | (3) retour 
--| -- | --
![](./docs/100.PNG) | ![](./docs/110.PNG) | ![](./docs/100.PNG)
je clique sur add | j'ajoute un commentaire | je reviens sur la liste

    le systeme doit purger les alert obsoletes ( date, distance, appreciation )

###  je peux apprecier une geololisation : par exemple : si un gnome n'est plus la, je click un bouton j'aime pas

![](./docs/120.PNG)

## schema

![sql](./docs/gnomebot.png)