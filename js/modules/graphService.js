// js/modules/graphService.js

export const apiService = {
    // Méthode pour effectuer des appels API
   
    async get(url) {
        // Retourne la promesse résultant de la fonction fetch
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur réseau, réponse non ok');
                }
                return response.json();
            })
            .catch((error) => {
                console.log("fetch error get:", error);
                throw error;
            });
    },

    async post(url, datas) {
        console.log("Waiting for response");
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
        });
        console.log("Response received");
    
        if (!response.ok || !response.body) {
            console.error("Error response", response)
            throw new Error('Erreur réseau, réponse non ok');
        }
    
        console.log("Response before json():", response);
        return response.json();
    }
    ,

    put(url, data) {
        const response = fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        response.then((response) => {
            if (!response.ok) {
                throw new Error('Erreur réseau, réponse non ok');
            }
        }).catch((error) => {
            console.error('fetch error put:', error);
            throw error;
        })
    }
};
