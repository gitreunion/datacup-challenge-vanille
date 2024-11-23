
//! Catégorie : Formatage de dates

/**
 * Formate une date au format "jj/mm/aaaa".
 *
 * @param {Date} date La date à formater.
 * @returns {string} La date formatée.
 */
export function FormatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); // Jour avec deux chiffres (ex: "01").
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois avec deux chiffres (les mois sont indexés à partir de 0).
    const year = date.getFullYear(); // Année à 4 chiffres.

    return `${day}/${month}/${year}`; // Retourne la date sous forme de chaîne "jj/mm/aaaa".
}

/**
 * Formate une date au format utilisé pour les messages "jj mois aaaa".
 *
 * @param {Date} date La date à formater.
 * @returns {string} La date formatée.
 */
export function FormatDateForMessage(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); // Jour avec deux chiffres.
    const monthNames = ["janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"];
    const month = monthNames[date.getMonth()]; // Nom abrégé du mois en français.
    const year = date.getFullYear(); // Année à 4 chiffres.

    return `${day} ${month} ${year}`; // Retourne la date au format "jj mois aaaa".
}

/**
 * Extrait l'heure et les minutes d'une date et les formate au format "hhhmm".
 *
 * @param {Date} date La date contenant l'heure à extraire.
 * @returns {string} L'heure au format "hhhmm".
 */
export function ExtractTimeFromISO(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0'); // Heure avec deux chiffres.
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutes avec deux chiffres.

    return `${hours}h${minutes}`; // Retourne l'heure au format "hhhmm".
}

//! Catégorie : Formatage de prix

/**
 * Formate un prix en ajoutant des espaces comme séparateurs de milliers.
 *
 * @param {number|string} price Le prix à formater.
 * @returns {string} Le prix formaté avec des espaces.
 */
export function FormatPrice(price: number | string): string {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return formattedPrice; // Retourne le prix formaté (ex: "1234" -> "1 234").
}

//! Catégorie : Récupération de données

/**
 * Récupère des données depuis une URL fournie.
 *
 * @param {string} url L'URL à laquelle effectuer la requête.
 * @returns {Promise<any|null>} Les données récupérées ou null en cas d'erreur.
 */
export const FetchData = async (url: string): Promise<any | null> => {
    try {
        const response = await fetch(url); // Effectue une requête HTTP GET.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Vérifie si la réponse HTTP est une erreur.
        }
        const data = await response.json(); // Parse le corps de la réponse en JSON.
        return data; // Retourne les données récupérées.
    } catch (error) {
        console.error("Error fetching data:", error); // Gère les erreurs de réseau ou d'analyse.
        return null; // Retourne null en cas d'erreur.
    }
};

/**
 * Envoie des données JSON via une requête POST.
 *
 * @param {string} url L'URL à laquelle envoyer la requête.
 * @param {any} body Les données à envoyer dans le corps de la requête.
 * @returns {Promise<any|null>} La réponse du serveur ou null en cas d'erreur.
 * @example
 * const response = await PostData("https://example.com/api", { key: "value" });
 */
export const PostData = async (url: string, body: any): Promise<any | null> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // Convertit les données en JSON pour l'envoi.
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse la réponse en JSON.
        return data;
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
};

/**
 * Envoie un fichier et des données associées à une URL fournie.
 *
 * @param {string} url L'URL à laquelle envoyer la requête.
 * @param {File} file Le fichier à envoyer.
 * @returns {Promise<any|null>} La réponse du serveur ou null en cas d'erreur.
 * @example
 * const file = document.querySelector("input[type='file']")!.files![0];
 * const response = await PostFile("https://example.com/upload", file);
 */
export const PostFile = async (
    url: string,
    file: File,
): Promise<any | null> => {
    try {
        const formData = new FormData();

        // Ajoute le fichier au FormData.
        formData.append("file", file);

        const response = await fetch(url, {
            method: "POST",
            body: formData, // Ajoute le FormData au corps de la requête.
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Vérifie si la réponse HTTP est une erreur.
        }

        const responseData = await response.json(); // Parse la réponse en JSON.
        return responseData; // Retourne la réponse du serveur.
    } catch (error) {
        console.error("Error posting file:", error); // Gère les erreurs de réseau ou d'analyse.
        return null; // Retourne null en cas d'erreur.
    }
};


//! Catégorie : Formatage de texte      

/**
 * Met en majuscule la première lettre d'une chaîne de caractères.
 *
 * @param {string} text La chaîne à transformer.
 * @returns {string} La chaîne avec la première lettre en majuscule.
 */
export function FirstLetterToUpperCase(text: string): string {
    const textTransformed = text.slice(0, 1).toUpperCase() + text.slice(1);
    return textTransformed; // Retourne la chaîne transformée.
}

/**
 * Supprime les espaces en début et fin de chaîne.
 *
 * @param {string} str La chaîne à nettoyer.
 * @returns {string} La chaîne nettoyée.
 */
export function trimString(str: string): string {
    return str.trim(); // Retourne la chaîne de caractères sans espaces en début et fin.
}

//! Catégorie : Vérifications et utilitaires

/**
 * Vérifie si un objet est vide.
 *
 * @param {Object} obj L'objet à vérifier.
 * @returns {boolean} True si l'objet est vide, sinon false.
 */
export function ObjectIsEmpty(obj: Object): boolean {
    return Object.keys(obj).length === 0; // Retourne true si l'objet n'a aucune clé.
}