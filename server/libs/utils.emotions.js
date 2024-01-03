/**
 * Calculates the expression status based on the given expression object.
 * @param {object} expression - The expression object containing emotion values.
 * @returns {string} - The status value indicating the expression status.
 */
export const getExpressionsStatus = (expression) => {
    let possibleStatus = {
        positive: "positive",
        negative: "negative",
        neutral: "neutral",
    };

    let status = "neutral";

    // positive emotions
    let positive = expression.happy + expression.surprised;

    // negative emotions
    let negative =
        expression.angry +
        expression.disgusted +
        expression.fearful +
        expression.sad;

    // status comparison
    if (positive > negative) {
        status = possibleStatus.positive;
    } else if (negative > positive) {
        status = possibleStatus.negative;
    }

    return status;
};

/**
 * Returns the expression with the highest percentage.
 *
 * @param {Object} expressions - An object containing expressions and their corresponding percentages.
 * @returns {string} - The expression with the highest percentage.
 */
export const getMaxExpression = (expressions) => {
    // get the expression with the highest percentage
    let maxExpression = "";
    let maxPercentage = 0;

    for (let key in expressions) {
        if (expressions[key] > maxPercentage) {
            maxPercentage = expressions[key];
            maxExpression = key;
        }
    }

    return maxExpression;
};

/**
 * Calculates the percentage of each expression in the given data.
 * @param {Object} expressions - The data containing expressions.
 * @returns {Object} - An object containing the percentage of each expression.
 */
export const getExpressionPercentage = (expressions) => {
    // get the expressions and global percentage of each expression
    const total = expressions.length;
    const expressionPercentages = {};

    expressions.forEach((expression) => {
        for (let key in expression) {
            if (expressionPercentages[key]) {
                expressionPercentages[key] += expression[key];
            } else {
                expressionPercentages[key] = expression[key];
            }
        }
    });

    for (let key in expressionPercentages) {
        expressionPercentages[key] = expressionPercentages[key] / total;
    }

    return expressionPercentages;
};

/**
 * Joins all expressions from the given notes into a single array.
 *
 * @param {Array} notes - The array of notes.
 * @returns {Array} - The array containing all expressions from the notes.
 */
export const joinAllNotesExpressions = (notes) => {
    // join all notes expressions into one array
    let allNotesExpressions = [];

    notes.forEach((note) => {
        allNotesExpressions = allNotesExpressions.concat(note.expressions);
    });

    return allNotesExpressions;
};

/**
 * Returns an array of emotion values for a given emotion.
 *
 * @param {string} emotion - The emotion to retrieve values for.
 * @param {Array} expressions - An array of expressions containing emotion values.
 * @returns {Array} - An array of emotion values.
 */
export const getEmotionValues = (emotion, expressions) => {
    // join all notes expressions of one emotion into one array
    try{
        return expressions.map((expression) => expression[emotion]);
    }catch (error) {
        console.log(error);
    }
};

/**
 * Normalizes the emotions data by removing the 'neutral' emotion and calculating the normalized probabilities.
 * @param {Object} emotionsData - The emotions data object.
 * @returns {Array} - The normalized emotions data array.
 */
export const normalizeEmotionsData = (emotionsData) => {
    try {

        let getRidOfNeutral = Object.keys(emotionsData)
            .filter(emotion => emotion !== 'neutral')
            .map(emotion => emotionsData[emotion]);

        let probSum = getRidOfNeutral.reduce((sum, prob) => sum + prob, 0);
        return getRidOfNeutral.map(prob => prob / probSum);

    }catch (error) {
        console.log(error);
    }
}

/**
 * Calculates the emotions entropy.
 * @param {Array} emotionsData - The emotions data array.
 * @returns {number} - The emotions entropy.
 */
export const calculateEmotionsEntropy = (emotionsData) => {
    try {
        let entropy = 0;

        emotionsData.forEach(prob => {
            entropy -= prob * Math.log2(prob);
        });

        return entropy;
    }catch (error) {
        console.log(error);
    }
}

/**
 * Calculates the emotion analysis of a note.
 * @param {Object} data - The data object containing the note expressions.
 * @returns {Object} - The analysis object containing the expressions list, expressions percentage, main expression, and status.
 */
export const getNoteEmotionAnalysis = (data) => {

    try {

        // get the emotion analysis of a note
        let analysis = {};

        const expressions_percentage = getExpressionPercentage(data);
        const main_expression = getMaxExpression(expressions);

        analysis = {
            expressions_list: data.expressions,
            expressions_percentage: expressions_percentage,
            main_expression: main_expression,
            status: getExpressionsStatus(expressions_percentage),
        };

        return analysis;
    }catch (error) {
        console.log(error);
    }
};
