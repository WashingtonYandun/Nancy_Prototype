import axios from "axios";

/**
 * Fetches categories from the Classifier API.
 * @returns {Promise<Array>} The array of categories.
 */
export const fetchCategories = async () => {

    try {

        const response = await axios.get(
            "https://nancy-classifier-wy.vercel.app/categories",
        );

        if (response.status === 200) {
            return response.data
        } else {
            console.error("Error using Classifier api", response);
        }
    } catch (error) {
        console.error("Error using Classifier api", error);

    };
}

export const CATEGORIES = await fetchCategories();
